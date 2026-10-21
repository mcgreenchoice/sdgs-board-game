import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import Navbar from './components/Navbar';
import BoardView from './components/BoardView';
import PropertyManager from './components/PropertyManager';
import CardDrawer from './components/CardDrawer';
import Leaderboard from './components/Leaderboard';
import DeedModal from './components/DeedModal';
import TurnActionModal from './components/TurnActionModal';
import ImageModal from './components/ImageModal';
import LobbyView from './components/LobbyView';
import RulesModal from './components/RulesModal';
import GameOverModal from './components/GameOverModal';
import { INITIAL_PLAYERS, DEEDS_DATA, BOARD_TILES, SDG_CARDS } from './data/gameData';
import { playDiceSound, playMoneySound, playCardSound, playPenaltySound } from './utils/audio';
import {
  BOT_AVATARS,
  botShouldBuyProperty,
  botChooseHazardDeed,
  botFindCurableHazard,
  botFindFactoryToBuild,
  botChooseStealTarget
} from './utils/aiBotEngine';

export default function App() {
  // Navigation & Screen Modes: 'lobby' | 'bot' | 'online'
  const [gameMode, setGameMode] = useState('lobby');
  const [activeTab, setActiveTab] = useState('board');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Player Profile Settings
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('sdg_player_name') || 'ผู้เล่น (คุณ)');
  const [playerAvatar, setPlayerAvatar] = useState(() => localStorage.getItem('sdg_player_avatar') || '🐘');
  const [playerColor, setPlayerColor] = useState(() => localStorage.getItem('sdg_player_color') || 'emerald');
  const [myPlayerId, setMyPlayerId] = useState(1);

  // Core Game State
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [deeds, setDeeds] = useState(() => DEEDS_DATA.map(d => ({ ...d, owner: null, factories: 0, hazard: null })));
  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }), text: 'ยินดีต้อนรับสู่เกมเศรษฐีเพื่อความยั่งยืน "MC THE GREEN CHOICE" 🎉' }
  ]);
  const [lastDice, setLastDice] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [winner, setWinner] = useState(null);

  // Modals state
  const [activeDeedModal, setActiveDeedModal] = useState(null);
  const [turnActionState, setTurnActionState] = useState({ isOpen: false, tile: null, player: null });
  const [imageModalState, setImageModalState] = useState({ isOpen: false, src: '', title: '' });
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [cardDrawerModalOpen, setCardDrawerModalOpen] = useState(false);

  // Online Multiplayer State
  const [socket, setSocket] = useState(null);
  const [onlineRoom, setOnlineRoom] = useState(null);
  const [isConnectingSocket, setIsConnectingSocket] = useState(false);
  const [socketError, setSocketError] = useState('');

  // Save Player Profile
  useEffect(() => {
    localStorage.setItem('sdg_player_name', playerName);
    localStorage.setItem('sdg_player_avatar', playerAvatar);
    localStorage.setItem('sdg_player_color', playerColor);
  }, [playerName, playerAvatar, playerColor]);

  // Log helper
  const addLog = useCallback((text) => {
    const time = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [...prev, { time, text }]);
  }, []);

  // Broadcast state in online multiplayer mode
  const syncOnlineGameState = useCallback((updatedPlayers, updatedDeeds, nextIdx, newDice, newLogs, rolledStatus) => {
    if (gameMode === 'online' && socket && onlineRoom) {
      socket.emit('sync_game_state', {
        roomCode: onlineRoom.code,
        gameState: {
          players: updatedPlayers || players,
          deeds: updatedDeeds || deeds,
          currentPlayerIdx: nextIdx !== undefined ? nextIdx : currentPlayerIdx,
          lastDice: newDice || lastDice,
          logs: newLogs || logs,
          hasRolled: rolledStatus !== undefined ? rolledStatus : hasRolled
        }
      });
    }
  }, [gameMode, socket, onlineRoom, players, deeds, currentPlayerIdx, lastDice, logs, hasRolled]);

  // Connect Socket on demand
  const getOrCreateSocket = useCallback(() => {
    if (socket) return socket;
    setIsConnectingSocket(true);
    setSocketError('');

    const socketServerUrl = import.meta.env.VITE_SOCKET_URL || (window.location.hostname === 'localhost' ? undefined : undefined);
    const newSocket = io(socketServerUrl, {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Socket connected successfully:', newSocket.id);
      setIsConnectingSocket(false);
    });

    newSocket.on('connect_error', (err) => {
      console.error('Socket connect error:', err);
      setIsConnectingSocket(false);
      setSocketError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ออนไลน์ได้ กรุณาลองใหม่อีกครั้ง');
    });

    newSocket.on('room_updated', (updatedRoom) => {
      setOnlineRoom(updatedRoom);
    });

    newSocket.on('game_started', ({ room, gameState }) => {
      setOnlineRoom(room);
      setPlayers(room.players);
      setDeeds(gameState.deeds.length > 0 ? gameState.deeds : DEEDS_DATA.map(d => ({ ...d, owner: null, factories: 0, hazard: null })));
      setCurrentPlayerIdx(gameState.currentPlayerIdx || 0);
      setLogs(gameState.logs || []);
      setHasRolled(false);
      setWinner(null);
      setGameMode('online');
      setActiveTab('board');
    });

    newSocket.on('game_state_updated', ({ gameState }) => {
      if (gameState.players) setPlayers(gameState.players);
      if (gameState.deeds) setDeeds(gameState.deeds);
      if (gameState.currentPlayerIdx !== undefined) setCurrentPlayerIdx(gameState.currentPlayerIdx);
      if (gameState.lastDice) setLastDice(gameState.lastDice);
      if (gameState.logs) setLogs(gameState.logs);
      if (gameState.hasRolled !== undefined) setHasRolled(gameState.hasRolled);
    });

    newSocket.on('player_left', ({ leavingPlayerName, room }) => {
      setOnlineRoom(room);
      addLog(`🚪 ${leavingPlayerName || 'ผู้เล่น'} ได้ออกจากห้อง`);
    });

    setSocket(newSocket);
    return newSocket;
  }, [socket, addLog]);

  // Clean up socket on unmount
  useEffect(() => {
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  // Check Game Over
  useEffect(() => {
    if (gameMode !== 'lobby' && players.length > 1) {
      const activePlayers = players.filter(p => p.balance > 0);
      if (activePlayers.length === 1 && !winner) {
        setWinner(activePlayers[0]);
      }
    }
  }, [players, gameMode, winner]);

  // --- MODE 1: START BOT GAME ---
  const handleStartBotGame = (botCount) => {
    const humanPlayer = {
      id: 1,
      name: playerName || 'คุณ',
      avatar: playerAvatar,
      color: playerColor,
      isBot: false,
      balance: 25000,
      position: 0,
      inJail: false,
      jailTurns: 0,
      sdgPoints: 0,
      cards: [6, 16, 25] // 3 initial solution cards
    };

    const newPlayers = [humanPlayer];
    const availableBots = [...BOT_AVATARS];

    for (let i = 0; i < botCount; i++) {
      const botTemplate = availableBots[i % availableBots.length];
      newPlayers.push({
        id: i + 2,
        name: botTemplate.name,
        avatar: botTemplate.avatar,
        color: botTemplate.color,
        isBot: true,
        balance: 25000,
        position: 0,
        inJail: false,
        jailTurns: 0,
        sdgPoints: 0,
        cards: [7 + i, 17 + i, 26 + i]
      });
    }

    setMyPlayerId(1);
    setPlayers(newPlayers);
    setDeeds(DEEDS_DATA.map(d => ({ ...d, owner: null, factories: 0, hazard: null })));
    setCurrentPlayerIdx(0);
    setHasRolled(false);
    setLastDice([1, 1]);
    setWinner(null);
    setGameMode('bot');
    setActiveTab('board');
    setLogs([
      { time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }), text: `🤖 เริ่มเกมโหมดแข่งกับ Bot (${botCount} บอท) ทุกคนมีเงิน 25,000 ฿ และการ์ดช่วยเหลือ 3 ใบ` }
    ]);
  };

  // --- MODE 2: ONLINE MULTIPLAYER ROOMS ---
  const handleCreateOnlineRoom = () => {
    const sock = getOrCreateSocket();
    sock.emit('create_room', {
      playerName,
      avatar: playerAvatar,
      color: playerColor
    }, (res) => {
      if (res && res.success) {
        setOnlineRoom(res.room);
        setMyPlayerId(res.player.id);
        console.log('Online room created:', res.roomCode);
      } else {
        setSocketError(res?.message || 'เกิดข้อผิดพลาดในการสร้างห้อง');
      }
    });
  };

  const handleJoinOnlineRoom = (codeToJoin) => {
    const sock = getOrCreateSocket();
    sock.emit('join_room', {
      roomCode: codeToJoin,
      playerName,
      avatar: playerAvatar,
      color: playerColor
    }, (res) => {
      if (res && res.success) {
        setOnlineRoom(res.room);
        setMyPlayerId(res.player.id);
        setSocketError('');
        console.log('Joined online room:', res.roomCode);
      } else {
        setSocketError(res?.message || 'ไม่สามารถเข้าร่วมห้องได้');
      }
    });
  };

  const handleStartOnlineGame = (roomCode) => {
    if (!socket) return;
    const initialDeedsList = DEEDS_DATA.map(d => ({ ...d, owner: null, factories: 0, hazard: null }));
    const initialCardHands = [
      [6, 16, 25],
      [7, 17, 28],
      [8, 18, 26],
      [9, 19, 30]
    ];

    socket.emit('start_game', {
      roomCode,
      initialDeeds: initialDeedsList,
      initialCardsPerPlayer: initialCardHands
    }, (res) => {
      if (!res?.success) {
        alert(res?.message || 'ไม่สามารถเริ่มเกมได้');
      }
    });
  };

  const handleLeaveOnlineRoom = () => {
    if (socket) {
      socket.emit('leave_room');
    }
    setOnlineRoom(null);
    setGameMode('lobby');
  };

  // Leave Game and return to Lobby
  const handleLeaveToLobby = () => {
    if (window.confirm('คุณต้องการออกจากเกมและกลับไปยังหน้าเมนูหลักใช่หรือไม่?')) {
      if (gameMode === 'online' && socket) {
        socket.emit('leave_room');
      }
      setOnlineRoom(null);
      setGameMode('lobby');
      setWinner(null);
    }
  };

  // Reset current game
  const handleResetCurrentGame = () => {
    if (window.confirm('ต้องการเริ่มเกมกระดานนี้ใหม่ทั้งหมดใช่หรือไม่?')) {
      if (gameMode === 'bot') {
        handleStartBotGame(players.length - 1);
      }
    }
  };

  // --- AUTOMATED TURN FLOW & GAME ENGINE ---

  // Roll Dice logic
  const handleRollDice = () => {
    if (isRolling || hasRolled) return;
    const player = players[currentPlayerIdx];

    // Check Jail
    if (player.inJail) {
      playPenaltySound(soundEnabled);
      alert(`${player.name} ติดโทษคดียักยอก ต้องหยุดเดินในตานี้! กรุณากดปุ่ม 'รับโทษ & ข้ามตา'`);
      return;
    }

    setIsRolling(true);
    playDiceSound(soundEnabled);

    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const steps = d1 + d2;
      setLastDice([d1, d2]);

      const oldPos = player.position;
      const newPos = (oldPos + steps) % 38;
      const passedStart = newPos < oldPos;

      let newBalance = player.balance;
      let startBonusDesc = '';
      if (passedStart) {
        newBalance += 1000;
        startBonusDesc = ' (ผ่านจุดเริ่มต้น รับเงินเดือน +1,000 ฿)';
        playMoneySound(soundEnabled);
      }
      if (newPos === 0) {
        newBalance += 500;
        startBonusDesc += ' (ตกจุดเริ่มต้นพอดี รับโบนัส +500 ฿)';
      }

      const updatedPlayer = { ...player, position: newPos, balance: newBalance };
      const updatedPlayers = players.map(p => p.id === player.id ? updatedPlayer : p);
      setPlayers(updatedPlayers);

      const landedTile = BOARD_TILES[newPos];
      const logText = `🎲 ${player.name} ทอยได้ ${d1}+${d2} = ${steps} ก้าว เดินไปที่ #${newPos} "${landedTile.name}"${startBonusDesc}`;
      addLog(logText);

      setIsRolling(false);
      setHasRolled(true);

      // --- AUTOMATIC TILE RESOLUTION ---
      resolveTileLanding(landedTile, updatedPlayer, updatedPlayers, deeds);
    }, 800);
  };

  // Resolve Landing on a tile
  const resolveTileLanding = (tile, activePlayer, currentPlayersList, currentDeedsList) => {
    const isHuman = activePlayer.id === myPlayerId;

    // 1. PROPERTY TILE
    if (tile.type === 'property' && tile.deedId) {
      const deed = currentDeedsList.find(d => d.id === tile.deedId);
      if (!deed) return;

      // If owned by someone else -> Automatic Rent Payment!
      if (deed.owner && deed.owner !== activePlayer.id) {
        const owner = currentPlayersList.find(p => p.id === deed.owner);
        const rentAmount = deed.rent[deed.factories];
        
        // Transfer rent automatically
        const updatedAfterRent = currentPlayersList.map(p => {
          if (p.id === activePlayer.id) return { ...p, balance: Math.max(0, p.balance - rentAmount) };
          if (p.id === deed.owner) return { ...p, balance: p.balance + rentAmount };
          return p;
        });
        setPlayers(updatedAfterRent);
        addLog(`💸 ${activePlayer.name} ตกที่ดิน "${deed.name}" จ่ายค่าเช่า ฿ ${rentAmount.toLocaleString()} ให้ ${owner?.name}`);
        playMoneySound(soundEnabled);
        syncOnlineGameState(updatedAfterRent, currentDeedsList, undefined, undefined, undefined, true);
        return;
      }

      // If unowned -> human gets modal choice, bot decides automatically!
      if (!deed.owner) {
        if (isHuman) {
          setTurnActionState({ isOpen: true, tile, player: activePlayer });
        } else {
          // Bot Buy Decision
          const shouldBuy = botShouldBuyProperty(activePlayer, deed);
          if (shouldBuy) {
            handleBuyProperty(deed.id, activePlayer.id, deed.price, currentPlayersList, currentDeedsList);
          } else {
            addLog(`🤖 ${activePlayer.name} ตัดสินใจผ่าน ไม่ซื้อ "${deed.name}" เพื่อเก็บเงินสำรอง`);
          }
        }
        return;
      }

      // If owned by activePlayer -> can upgrade factory if bot
      if (deed.owner === activePlayer.id && !isHuman) {
        if (deed.factories < 4 && activePlayer.balance >= deed.factoryCost + 1500) {
          handleBuildFactory(deed.id, 1, currentPlayersList, currentDeedsList);
        }
      }
      return;
    }

    // 2. TAX TILE -> Automatic Payment
    if (tile.type === 'tax') {
      const taxAmt = 300;
      const updated = currentPlayersList.map(p => p.id === activePlayer.id ? { ...p, balance: Math.max(0, p.balance - taxAmt) } : p);
      setPlayers(updated);
      addLog(`💸 ${activePlayer.name} ตกช่องเสียภาษี ชำระภาษีสิ่งแวดล้อม ฿ 300 ให้ธนาคาร`);
      playPenaltySound(soundEnabled);
      syncOnlineGameState(updated, currentDeedsList, undefined, undefined, undefined, true);
      return;
    }

    // 3. JAIL TILE -> Automatic Fine & Skip
    if (tile.type === 'jail') {
      const fine = 500;
      const updated = currentPlayersList.map(p => p.id === activePlayer.id ? { ...p, balance: Math.max(0, p.balance - fine), inJail: true, jailTurns: 1 } : p);
      setPlayers(updated);
      addLog(`⛓️ ${activePlayer.name} ตกช่องคดียักยอก ถูกปรับ ฿ 500 และต้องหยุดเดิน 1 ตา`);
      playPenaltySound(soundEnabled);
      syncOnlineGameState(updated, currentDeedsList, undefined, undefined, undefined, true);
      return;
    }

    // 4. CHANCE TILE
    if (tile.type === 'chance') {
      if (isHuman) {
        setTurnActionState({ isOpen: true, tile, player: activePlayer });
      } else {
        // Bot Chance Resolution
        resolveBotChance(activePlayer, currentPlayersList, currentDeedsList);
      }
      return;
    }

    // 5. STEAL TILE
    if (tile.type === 'steal') {
      if (isHuman) {
        setTurnActionState({ isOpen: true, tile, player: activePlayer });
      } else {
        // Bot Steal Resolution
        resolveBotSteal(activePlayer, currentPlayersList, currentDeedsList);
      }
      return;
    }
  };

  // Bot Chance Draw
  const resolveBotChance = (bot, currentPlayersList, currentDeedsList) => {
    const randCard = SDG_CARDS[Math.floor(Math.random() * SDG_CARDS.length)];
    if (randCard.type === 'hazard') {
      const owned = currentDeedsList.filter(d => d.owner === bot.id);
      if (owned.length > 0) {
        const target = botChooseHazardDeed(bot, owned);
        handleApplyHazardToDeed(target.id, randCard.id, currentDeedsList);
      } else {
        // Pay 300 fine
        const updated = currentPlayersList.map(p => p.id === bot.id ? { ...p, balance: Math.max(0, p.balance - 300) } : p);
        setPlayers(updated);
        addLog(`🤖 ${bot.name} สุ่มได้การ์ดปัญหา #${randCard.id} แต่ยังไม่มีที่ดิน จึงเสียค่าปรับ ฿ 300 แทน`);
      }
    } else {
      // Solution Card -> Add to hand
      handleAddCardToHand(bot.id, randCard.id, currentPlayersList);
    }
  };

  // Bot Steal
  const resolveBotSteal = (bot, currentPlayersList, currentDeedsList) => {
    const decision = botChooseStealTarget(bot, currentPlayersList);
    if (!decision) return;

    if (decision.type === 'card') {
      handleStealCard(bot.id, decision.targetId, currentPlayersList);
    } else {
      handleTransferMoney(decision.targetId, bot.id, 200, 'ขโมยเงิน', currentPlayersList);
    }
  };

  // End Turn
  const handleEndTurn = () => {
    const player = players[currentPlayerIdx];

    // Deduct recurring penalty for any active hazard on player's lands
    const playerHazardDeeds = deeds.filter(d => d.owner === player.id && d.hazard);
    let updatedPlayers = [...players];

    if (playerHazardDeeds.length > 0) {
      const penaltyPerLand = 200;
      const totalPenalty = playerHazardDeeds.length * penaltyPerLand;
      const newBal = Math.max(0, player.balance - totalPenalty);
      updatedPlayers = updatedPlayers.map(p => p.id === player.id ? { ...p, balance: newBal } : p);
      
      const deedNames = playerHazardDeeds.map(d => `"${d.name}"`).join(', ');
      addLog(`🚨 ที่ดิน ${deedNames} ของ ${player.name} มีปัญหาสิ่งแวดล้อม! หักเงินบำรุงสิ่งแวดล้อม ฿ ${totalPenalty.toLocaleString()} (${playerHazardDeeds.length} แห่ง)`);
      playPenaltySound(soundEnabled);
    }

    // Release from jail
    if (player.inJail) {
      updatedPlayers = updatedPlayers.map(p => p.id === player.id ? { ...p, inJail: false, jailTurns: 0 } : p);
      addLog(`🔓 ${player.name} พ้นโทษคดียักยอกแล้ว สามารถเดินได้ในรอบถัดไป`);
    }

    const nextIdx = (currentPlayerIdx + 1) % players.length;
    setPlayers(updatedPlayers);
    setCurrentPlayerIdx(nextIdx);
    setHasRolled(false);
    addLog(`➡️ ส่งต่อเทิร์นให้ ${players[nextIdx].name}`);

    // Sync online
    syncOnlineGameState(updatedPlayers, deeds, nextIdx, lastDice, logs, false);
  };

  // Autonomous Bot Turn Loop
  useEffect(() => {
    if (gameMode !== 'bot' || winner) return;

    const currentPlayer = players[currentPlayerIdx];
    if (currentPlayer && currentPlayer.isBot) {
      const timer = setTimeout(() => {
        // If bot in jail -> end turn
        if (currentPlayer.inJail) {
          handleEndTurn();
          return;
        }

        // 1. Roll dice if not rolled
        if (!hasRolled && !isRolling) {
          handleRollDice();
          return;
        }

        // 2. If rolled -> check if bot can cure any hazard with cards in hand
        if (hasRolled && !isRolling) {
          const curable = botFindCurableHazard(currentPlayer, deeds, SDG_CARDS);
          if (curable) {
            handleCureHazard(curable.deed.id, currentPlayer.id, curable.solutionCardId);
          }

          // Then end turn after short natural pause
          const endTimer = setTimeout(() => {
            handleEndTurn();
          }, 1200);
          return () => clearTimeout(endTimer);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameMode, currentPlayerIdx, players, hasRolled, isRolling, deeds, winner]);

  // --- ACTIONS: BUY, BUILD, CURE, HAZARD, STEAL ---

  const handleBuyProperty = (deedId, playerId, price, customPlayers, customDeeds) => {
    const playerList = customPlayers || players;
    const deedsList = customDeeds || deeds;
    const player = playerList.find(p => p.id === playerId);
    if (!player || player.balance < price) return;

    const updatedPlayers = playerList.map(p => p.id === playerId ? { ...p, balance: p.balance - price } : p);
    const updatedDeeds = deedsList.map(d => d.id === deedId ? { ...d, owner: playerId, factories: 0 } : d);
    const deedName = deedsList.find(d => d.id === deedId)?.name;

    setPlayers(updatedPlayers);
    setDeeds(updatedDeeds);
    addLog(`🏢 ${player.name} ซื้อกรรมสิทธิ์ "${deedName}" ราคา ฿ ${price.toLocaleString()}`);
    playMoneySound(soundEnabled);
    syncOnlineGameState(updatedPlayers, updatedDeeds, undefined, undefined, undefined, hasRolled);
  };

  const handleBuildFactory = (deedId, count, customPlayers, customDeeds) => {
    const playerList = customPlayers || players;
    const deedsList = customDeeds || deeds;
    const deed = deedsList.find(d => d.id === deedId);
    if (!deed || !deed.owner) return;
    const owner = playerList.find(p => p.id === deed.owner);

    if (count > 0) {
      if (owner.balance < deed.factoryCost) return;
      const updatedPlayers = playerList.map(p => p.id === owner.id ? { ...p, balance: p.balance - deed.factoryCost } : p);
      const updatedDeeds = deedsList.map(d => d.id === deedId ? { ...d, factories: Math.min(4, d.factories + 1) } : d);

      setPlayers(updatedPlayers);
      setDeeds(updatedDeeds);
      addLog(`🏭 ${owner.name} สร้างโรงงานเพิ่ม 1 หลังที่ "${deed.name}" (จ่าย ฿ ${deed.factoryCost})`);
      playMoneySound(soundEnabled);
      syncOnlineGameState(updatedPlayers, updatedDeeds, undefined, undefined, undefined, hasRolled);
    }
  };

  const handleApplyHazardToDeed = (deedId, hazardCardId, customDeeds) => {
    const deedsList = customDeeds || deeds;
    const deed = deedsList.find(d => d.id === deedId);
    const hazardCard = SDG_CARDS.find(c => c.id === hazardCardId);
    if (!deed || !hazardCard) return;

    const updatedDeeds = deedsList.map(d => d.id === deedId ? { ...d, hazard: hazardCardId } : d);
    const owner = players.find(p => p.id === deed.owner);

    setDeeds(updatedDeeds);
    addLog(`☣️ วางการ์ดปัญหา #${hazardCard.id} "${hazardCard.titleTh}" ลงที่ดิน "${deed.name}" ของ ${owner?.name}! (หักเงิน ฿200 ทุกเทิร์นจนกว่าจะมีคนนำการ์ดช่วย #${hazardCard.curedBy} มารักษา)`);
    playPenaltySound(soundEnabled);
    syncOnlineGameState(players, updatedDeeds, undefined, undefined, undefined, hasRolled);
  };

  const handleAddCardToHand = (playerId, cardId, customPlayers) => {
    const playerList = customPlayers || players;
    const player = playerList.find(p => p.id === playerId);
    const card = SDG_CARDS.find(c => c.id === cardId);
    if (!player || !card) return;

    if ((player.cards || []).length >= 5) {
      if (player.id === myPlayerId) alert('การ์ดในมือเต็ม 5 ใบแล้ว');
      return;
    }

    const updatedPlayers = playerList.map(p => p.id === playerId ? { ...p, cards: [...(p.cards || []), cardId] } : p);
    setPlayers(updatedPlayers);
    addLog(`📥 ${player.name} สุ่มได้การ์ดช่วยเหลือ #${card.id} "${card.titleTh}" เก็บเข้าสู่มือ`);
    playCardSound(soundEnabled);
    syncOnlineGameState(updatedPlayers, deeds, undefined, undefined, undefined, hasRolled);
  };

  const handleCureHazard = (deedId, playerId, solutionCardId) => {
    const deed = deeds.find(d => d.id === deedId);
    const player = players.find(p => p.id === playerId);
    if (!deed || !deed.hazard || !player) return;

    const solutionCard = SDG_CARDS.find(c => c.id === solutionCardId);
    const updatedDeeds = deeds.map(d => d.id === deedId ? { ...d, hazard: null } : d);
    const updatedPlayers = players.map(p => {
      if (p.id === playerId) {
        return {
          ...p,
          cards: (p.cards || []).filter(cId => cId !== solutionCardId),
          balance: p.balance + 300,
          sdgPoints: p.sdgPoints + 2
        };
      }
      return p;
    });

    setDeeds(updatedDeeds);
    setPlayers(updatedPlayers);
    addLog(`🎉 ${player.name} ใช้การ์ดช่วยเหลือ #${solutionCard.id} "${solutionCard.titleTh}" รักษาที่ดิน "${deed.name}" สำเร็จ! ได้รับรางวัล ฿ 300 และ +2 แต้ม SDG`);
    playMoneySound(soundEnabled);
    syncOnlineGameState(updatedPlayers, updatedDeeds, undefined, undefined, undefined, hasRolled);
  };

  const handleTransferMoney = (fromId, toId, amount, note, customPlayers) => {
    const playerList = customPlayers || players;
    const updatedPlayers = playerList.map(p => {
      if (p.id === fromId) return { ...p, balance: Math.max(0, p.balance - amount) };
      if (p.id === toId) return { ...p, balance: p.balance + amount };
      return p;
    });
    setPlayers(updatedPlayers);
    const sender = playerList.find(p => p.id === fromId)?.name;
    const receiver = playerList.find(p => p.id === toId)?.name;
    addLog(`🔄 ${sender} โอน ฿ ${amount.toLocaleString()} ให้ ${receiver} (${note})`);
    playMoneySound(soundEnabled);
    syncOnlineGameState(updatedPlayers, deeds, undefined, undefined, undefined, hasRolled);
  };

  const handleStealCard = (stealerId, targetId, customPlayers) => {
    const playerList = customPlayers || players;
    const stealer = playerList.find(p => p.id === stealerId);
    const target = playerList.find(p => p.id === targetId);
    if (!target || !target.cards || target.cards.length === 0) {
      handleTransferMoney(targetId, stealerId, 200, 'ขโมยเงินแทนการ์ด', playerList);
      return;
    }

    const stolenCardId = target.cards[0];
    const cardInfo = SDG_CARDS.find(c => c.id === stolenCardId);
    const updatedPlayers = playerList.map(p => {
      if (p.id === targetId) return { ...p, cards: p.cards.filter((_, idx) => idx !== 0) };
      if (p.id === stealerId) return { ...p, cards: [...(p.cards || []), stolenCardId] };
      return p;
    });

    setPlayers(updatedPlayers);
    addLog(`🥷 ${stealer.name} ขโมยการ์ดช่วยเหลือ "${cardInfo?.titleTh || stolenCardId}" มาจาก ${target.name}!`);
    playMoneySound(soundEnabled);
    syncOnlineGameState(updatedPlayers, deeds, undefined, undefined, undefined, hasRolled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/60 via-slate-50 to-teal-50/50 text-slate-800 flex flex-col font-sans select-none">
      
      {/* 1. LOBBY VIEW (When not in game) */}
      {gameMode === 'lobby' ? (
        <main className="flex-1 flex flex-col justify-center">
          <LobbyView
            playerName={playerName}
            setPlayerName={setPlayerName}
            playerAvatar={playerAvatar}
            setPlayerAvatar={setPlayerAvatar}
            playerColor={playerColor}
            setPlayerColor={setPlayerColor}
            onStartBotGame={handleStartBotGame}
            onCreateOnlineRoom={handleCreateOnlineRoom}
            onJoinOnlineRoom={handleJoinOnlineRoom}
            onStartOnlineGame={handleStartOnlineGame}
            onLeaveOnlineRoom={handleLeaveOnlineRoom}
            onlineRoom={onlineRoom}
            isConnectingSocket={isConnectingSocket}
            socketError={socketError}
            onOpenCardDrawer={() => setCardDrawerModalOpen(true)}
            onOpenRulesModal={() => setRulesModalOpen(true)}
          />
        </main>
      ) : (
        /* 2. IN-GAME VIEW (Bot mode or Online mode) */
        <>
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            players={players}
            currentPlayerIdx={currentPlayerIdx}
            myPlayerId={myPlayerId}
            gameMode={gameMode}
            onlineRoomCode={onlineRoom?.code}
            onLeaveToLobby={handleLeaveToLobby}
            onResetGame={handleResetCurrentGame}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4">
            {activeTab === 'board' && (
              <BoardView
                players={players}
                currentPlayerIdx={currentPlayerIdx}
                myPlayerId={myPlayerId}
                deeds={deeds}
                hasRolled={hasRolled}
                onRollDice={handleRollDice}
                onEndTurn={handleEndTurn}
                onOpenDeedModal={(deed) => setActiveDeedModal(deed)}
                onOpenImageModal={(src, title) => setImageModalState({ isOpen: true, src, title })}
                onCureHazard={handleCureHazard}
                logs={logs}
                isRolling={isRolling}
                lastDice={lastDice}
              />
            )}

            {activeTab === 'properties' && (
              <PropertyManager
                deeds={deeds}
                players={players}
                onBuildFactory={(deedId, count) => handleBuildFactory(deedId, count)}
                onOpenDeedModal={(deed) => setActiveDeedModal(deed)}
                onOpenImageModal={(src, title) => setImageModalState({ isOpen: true, src, title })}
              />
            )}

            {activeTab === 'cards' && (
              <CardDrawer
                onOpenImageModal={(src, title) => setImageModalState({ isOpen: true, src, title })}
              />
            )}

            {activeTab === 'leaderboard' && (
              <Leaderboard
                players={players}
                deeds={deeds}
              />
            )}
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/80 py-3 text-center text-xs text-slate-500">
        <p className="px-4">
          โครงงาน SDGs Board Game "MC THE GREEN CHOICE" • โรงเรียนมงฟอร์ตวิทยาลัย แผนการเรียนรู้เพื่อความยั่งยืน
        </p>
      </footer>

      {/* Deed Details Modal */}
      {activeDeedModal && (
        <DeedModal
          deed={activeDeedModal}
          players={players}
          currentPlayer={players.find(p => p.id === myPlayerId)}
          onClose={() => setActiveDeedModal(null)}
          onBuildFactory={(deedId, count) => handleBuildFactory(deedId, count)}
          onCureHazard={handleCureHazard}
          onOpenImageModal={(src, title) => setImageModalState({ isOpen: true, src, title })}
        />
      )}

      {/* Turn Action Modal (Triggered when human player lands on action tile) */}
      <TurnActionModal
        isOpen={turnActionState.isOpen}
        tile={turnActionState.tile}
        player={turnActionState.player}
        deeds={deeds}
        players={players}
        onClose={() => setTurnActionState({ isOpen: false, tile: null, player: null })}
        onBuyProperty={(deedId, playerId, price) => handleBuyProperty(deedId, playerId, price)}
        onPayTax={(pId, amt) => {
          const updated = players.map(p => p.id === pId ? { ...p, balance: Math.max(0, p.balance - amt) } : p);
          setPlayers(updated);
          addLog(`💸 ชำระค่าปรับมลพิษ ฿ ${amt} เข้าธนาคาร`);
        }}
        onEnterJail={(pId, fine) => {
          const updated = players.map(p => p.id === pId ? { ...p, balance: Math.max(0, p.balance - fine), inJail: true, jailTurns: 1 } : p);
          setPlayers(updated);
        }}
        onStealMoney={(stealer, target, amt) => handleTransferMoney(target, stealer, amt, 'ขโมยเงิน')}
        onStealCard={(stealer, target) => handleStealCard(stealer, target)}
        onApplyHazardToDeed={handleApplyHazardToDeed}
        onAddCardToHand={handleAddCardToHand}
        onCureHazard={handleCureHazard}
        onOpenImageModal={(src, title) => setImageModalState({ isOpen: true, src, title })}
      />

      {/* Lightbox Image Preview Modal */}
      <ImageModal
        isOpen={imageModalState.isOpen}
        imageSrc={imageModalState.src}
        title={imageModalState.title}
        onClose={() => setImageModalState({ isOpen: false, src: '', title: '' })}
      />

      {/* Rules Modal */}
      <RulesModal
        isOpen={rulesModalOpen}
        onClose={() => setRulesModalOpen(false)}
      />

      {/* Card Drawer Modal from Lobby */}
      {cardDrawerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setCardDrawerModalOpen(false)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
            >
              ✕ ปิด
            </button>
            <CardDrawer onOpenImageModal={(src, title) => setImageModalState({ isOpen: true, src, title })} />
          </div>
        </div>
      )}

      {/* Game Over / Winner Modal */}
      {winner && (
        <GameOverModal
          winner={winner}
          players={players}
          deeds={deeds}
          onPlayAgain={() => {
            if (gameMode === 'bot') handleStartBotGame(players.length - 1);
            else setWinner(null);
          }}
          onReturnToLobby={() => {
            setGameMode('lobby');
            setWinner(null);
          }}
        />
      )}

    </div>
  );
}
