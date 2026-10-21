import React, { useState, useEffect } from 'react';
import { 
  Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices, 
  ChevronRight, ChevronDown, ChevronUp, Eye, ShieldAlert, 
  Sparkles, Maximize2, Minimize2 
} from 'lucide-react';
import { BOARD_TILES, TILE_COORDS, SDG_CARDS } from '../data/gameData';

export default function BoardView({
  players,
  currentPlayerIdx,
  myPlayerId,
  deeds,
  hasRolled,
  onRollDice,
  onEndTurn,
  onOpenDeedModal,
  onOpenImageModal,
  onCureHazard,
  isRolling,
  lastDice
}) {
  const [boardViewMode, setBoardViewMode] = useState('real'); // 'real' or 'grid'
  const [hoveredTileIndex, setHoveredTileIndex] = useState(null);
  const [inspectedTileIndex, setInspectedTileIndex] = useState(null);
  const [hudMinimized, setHudMinimized] = useState(false);
  const [scoreboardOpen, setScoreboardOpen] = useState(false);

  const currentPlayer = players[currentPlayerIdx] || players[0];
  const isMyTurn = myPlayerId ? currentPlayer.id === myPlayerId : true;
  const myPlayer = players.find(p => p.id === myPlayerId) || players[0];
  const myHandCards = myPlayer?.cards || [];

  // When turn changes or current player position changes, reset inspectedTileIndex
  // so the HUD always tracks and displays the current player's location!
  useEffect(() => {
    setInspectedTileIndex(null);
  }, [currentPlayerIdx, currentPlayer.position]);

  // Priority: Hovered tile -> Inspected tile -> Current Player's standing tile
  const activeTileIndex = hoveredTileIndex !== null 
    ? hoveredTileIndex 
    : (inspectedTileIndex !== null ? inspectedTileIndex : currentPlayer.position);
  const activeTile = BOARD_TILES[activeTileIndex] || BOARD_TILES[0];
  const activeDeed = activeTile.deedId ? deeds.find(d => d.id === activeTile.deedId) : null;
  const activeDeedOwner = activeDeed?.owner ? players.find(p => p.id === activeDeed.owner) : null;

  const renderDiceIcon = (val) => {
    switch (val) {
      case 1: return <Dice1 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />;
      case 2: return <Dice2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />;
      case 3: return <Dice3 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />;
      case 4: return <Dice4 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />;
      case 5: return <Dice5 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />;
      case 6: return <Dice6 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />;
      default: return <Dices className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />;
    }
  };

  const getPlayerBadgeColor = (color) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-500 text-white border-emerald-400';
      case 'sky': return 'bg-sky-500 text-white border-sky-400';
      case 'pink': return 'bg-pink-500 text-white border-pink-400';
      case 'amber': return 'bg-amber-500 text-slate-900 border-amber-400';
      default: return 'bg-slate-600 text-white border-slate-500';
    }
  };

  const getPlayerGlow = (color) => {
    switch (color) {
      case 'emerald': return 'shadow-[0_0_10px_rgba(16,185,129,0.8)] ring-2 ring-emerald-400';
      case 'sky': return 'shadow-[0_0_10px_rgba(14,165,233,0.8)] ring-2 ring-sky-400';
      case 'pink': return 'shadow-[0_0_10px_rgba(236,72,153,0.8)] ring-2 ring-pink-400';
      case 'amber': return 'shadow-[0_0_10px_rgba(245,158,11,0.8)] ring-2 ring-amber-400';
      default: return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-2 sm:space-y-2.5 px-1 sm:px-2">
      
      {/* 1. Top Control Bar (Mobile-first responsive layout, Bright theme) */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2 sm:p-2.5 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-slate-800">
        
        {/* Row 1 / Left: Active Player Info */}
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-sm border shrink-0 ${getPlayerBadgeColor(currentPlayer.color)}`}>
            {currentPlayer.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1.5 flex-wrap">
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                กำลังเล่น
              </span>
              <span className="text-[11px] text-slate-500 truncate">
                #{currentPlayer.position} {BOARD_TILES[currentPlayer.position]?.name}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold font-heading text-slate-900 flex items-center space-x-2 flex-wrap">
              <span className="truncate">{currentPlayer.name}</span>
              <span className="text-emerald-700 text-xs sm:text-sm font-bold font-mono">
                ฿{currentPlayer.balance.toLocaleString()}
              </span>
              <span className="text-amber-600 text-xs font-semibold">
                ⭐ {currentPlayer.sdgPoints}
              </span>
            </h2>
          </div>
        </div>

        {/* Row 2 / Right: Dice, Actions, View Mode Toggle */}
        <div className="flex items-center justify-between sm:justify-end space-x-1.5 sm:space-x-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          
          {/* Dice Result Display */}
          <div className="flex items-center space-x-1 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200 shrink-0 shadow-2xs">
            {renderDiceIcon(lastDice[0])}
            {renderDiceIcon(lastDice[1])}
            <div className="text-center pl-1.5 border-l border-slate-200">
              <span className="text-[8px] text-slate-500 block uppercase font-mono">รวม</span>
              <span className="text-xs sm:text-sm font-black text-slate-900">{lastDice[0] + lastDice[1]}</span>
            </div>
          </div>

          {isMyTurn ? (
            currentPlayer.inJail ? (
              <div className="flex items-center space-x-1.5">
                <div className="px-2 py-1 rounded-xl bg-orange-50 text-orange-800 border border-orange-200 text-[11px] font-bold flex items-center space-x-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                  <span className="hidden xs:inline">ติดยักยอก</span>
                </div>
                <button
                  onClick={onEndTurn}
                  className="px-3 py-1.5 rounded-xl font-heading font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-sm transition flex items-center space-x-1 animate-pulse"
                >
                  <span>ข้ามตา ➡️</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 flex-1 sm:flex-none justify-end">
                <button
                  onClick={onRollDice}
                  disabled={isRolling || hasRolled}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-xl font-heading font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 shadow-md transition-all active:scale-95 ${
                    isRolling
                      ? 'bg-slate-200 text-slate-400 cursor-wait'
                      : hasRolled
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-80'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/40'
                  }`}
                  title={hasRolled ? "คุณทอยลูกเต๋าแล้วในตานี้" : "ทอยลูกเต๋าเพื่อเดิน"}
                >
                  <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
                  <span>{isRolling ? 'กำลังทอย...' : hasRolled ? '✓ ทอยแล้ว' : 'ทอยลูกเต๋า'}</span>
                </button>

                <button
                  onClick={onEndTurn}
                  disabled={isRolling || !hasRolled}
                  className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition flex items-center justify-center space-x-1 ${
                    hasRolled
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-md shadow-teal-500/20 ring-2 ring-teal-400 animate-pulse'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                  title={hasRolled ? "กดเพื่อส่งต่อเทิร์น" : "ต้องทอยลูกเต๋าก่อน"}
                >
                  <span>จบตา</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          ) : (
            <div className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-none">
                รอตา <b className="text-slate-900">{currentPlayer.name}</b> {currentPlayer.isBot ? '(Bot)' : ''}
              </span>
            </div>
          )}

          <button
            onClick={() => setBoardViewMode(boardViewMode === 'real' ? 'grid' : 'real')}
            className="p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition shrink-0"
            title="สลับมุมมองกระดาน / รายการ"
          >
            <span>{boardViewMode === 'real' ? '📋' : '🗺️'}</span>
          </button>
        </div>
      </div>

      {/* 2. Collapsible Players & Assets Deck (กดย่อ/ขยายได้, สีสว่าง, รองรับ Touch) */}
      <div className="transition-all duration-300">
        {!scoreboardOpen ? (
          /* Collapsed View: Sleek horizontal bar */
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-2.5 sm:px-3 py-1.5 shadow-sm flex items-center justify-between gap-1.5 overflow-x-auto text-slate-800">
            <div className="flex items-center space-x-1.5 text-xs shrink-0 font-bold text-slate-600">
              <span className="text-sm">👥</span>
              <span className="hidden xs:inline">ผู้เล่น:</span>
            </div>

            {/* Quick Player Badges */}
            <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5 scrollbar-none flex-1 justify-start touch-pan-x">
              {players.map((p, idx) => {
                const isTurn = idx === currentPlayerIdx;
                const isMe = p.id === myPlayerId;
                const owned = deeds.filter(d => d.owner === p.id);
                const totalFactories = owned.reduce((sum, d) => sum + d.factories, 0);

                return (
                  <div
                    key={p.id}
                    className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-xl text-xs transition border shrink-0 ${
                      isTurn
                        ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shadow-2xs ${getPlayerBadgeColor(p.color)}`}>
                      {p.avatar}
                    </span>
                    <span className="font-bold text-slate-800 text-[11px] truncate max-w-[65px] sm:max-w-[85px]">
                      {p.name.split(' ')[0]} {isMe ? '(คุณ)' : ''}
                    </span>
                    <span className="text-emerald-700 font-mono font-bold text-[11px]">
                      ฿{p.balance >= 1000 ? `${(p.balance / 1000).toFixed(0)}k` : p.balance}
                    </span>
                    <span className="text-sky-700 font-mono text-[10px] hidden sm:inline" title="โฉนดที่ครอบครอง">
                      🏢{owned.length}{totalFactories > 0 ? `(${totalFactories}🏭)` : ''}
                    </span>
                    <span className="text-amber-600 font-mono text-[10px] hidden md:inline" title="แต้ม SDG">
                      ⭐{p.sdgPoints}
                    </span>
                    <span className="text-purple-700 font-mono text-[10px] hidden md:inline" title="การ์ดในมือ">
                      🎴{(p.cards || []).length}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Expand Button */}
            <button
              onClick={() => setScoreboardOpen(true)}
              className="px-2 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 text-[11px] font-semibold transition shrink-0 flex items-center space-x-1"
              title="ขยายเพื่อดูรายละเอียดทรัพย์สิน"
            >
              <span>📊 ทรัพย์สิน</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
            </button>
          </div>
        ) : (
          /* Expanded View: Full Dossier Grid */
          <div className="bg-white/98 backdrop-blur-md border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xl space-y-3 animate-fadeIn text-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg">👥</span>
                <h3 className="font-heading font-bold text-slate-900 text-xs sm:text-sm">
                  สรุปทรัพย์สินผู้เล่น ({players.length} คน)
                </h3>
              </div>
              <button
                onClick={() => setScoreboardOpen(false)}
                className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold transition flex items-center space-x-1"
              >
                <span>ย่อแถบ</span>
                <ChevronUp className="w-3.5 h-3.5 text-amber-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {players.map((p, idx) => {
                const isTurn = idx === currentPlayerIdx;
                const isMe = p.id === myPlayerId;
                const owned = deeds.filter(d => d.owner === p.id);
                const totalFactories = owned.reduce((sum, d) => sum + d.factories, 0);

                return (
                  <div
                    key={p.id}
                    className={`p-2.5 sm:p-3 rounded-xl border flex flex-col justify-between transition ${
                      isTurn
                        ? 'bg-emerald-50/60 border-emerald-400 ring-2 ring-emerald-400/30 shadow-md'
                        : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100/70'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 min-w-0">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shadow-sm border shrink-0 ${getPlayerBadgeColor(p.color)}`}>
                          {p.avatar}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-1">
                            <span className="font-heading font-bold text-slate-900 text-xs truncate">
                              {p.name}
                            </span>
                            {isMe && (
                              <span className="text-[8px] bg-sky-100 text-sky-800 px-1 rounded font-bold border border-sky-300">
                                คุณ
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono block truncate">
                            #{p.position} {BOARD_TILES[p.position]?.name.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                      {isTurn && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" title="กำลังเดิน" />
                      )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] sm:text-[11px] font-mono">
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200 flex justify-between">
                        <span className="text-slate-500">เงิน:</span>
                        <span className="text-emerald-700 font-bold">฿{p.balance.toLocaleString()}</span>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200 flex justify-between">
                        <span className="text-slate-500">ที่ดิน:</span>
                        <span className="text-sky-700 font-bold">🏢 {owned.length}</span>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200 flex justify-between">
                        <span className="text-slate-500">โรงงาน:</span>
                        <span className="text-amber-700 font-bold">🏭 {totalFactories}</span>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200 flex justify-between">
                        <span className="text-slate-500">SDG:</span>
                        <span className="text-purple-700 font-bold">⭐ {p.sdgPoints}</span>
                      </div>
                    </div>

                    {/* Cards Count */}
                    <div className="mt-2 pt-1.5 border-t border-slate-200 flex justify-between items-center text-[10px]">
                      <span className="text-slate-500">การ์ดในมือ:</span>
                      <span className="text-purple-700 font-bold">🎴 {(p.cards || []).length} ใบ</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. The Board (With Center Standing Tile HUD restored right in the middle, Bright Theme!) */}
      {boardViewMode === 'real' ? (
        <div className="relative w-full max-w-[min(100%,480px)] sm:max-w-[min(510px,50vh)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-300 bg-white aspect-square select-none">
          
          {/* Authentic 1280x1280 Board Artwork Image */}
          <img
            src="/assets/board.jpg"
            alt="SDGs Board Game Map"
            className="w-full h-full object-cover block pointer-events-none"
          />

          {/* Interactive Tiles Layer */}
          {BOARD_TILES.map((tile) => {
            const coord = TILE_COORDS[tile.index];
            if (!coord) return null;

            const isCurrentTile = currentPlayer.position === tile.index;
            const isHovered = hoveredTileIndex === tile.index;
            const isInspected = inspectedTileIndex === tile.index;
            const deed = tile.deedId ? deeds.find(d => d.id === tile.deedId) : null;
            const owner = deed?.owner ? players.find(p => p.id === deed.owner) : null;
            const playersOnTile = players.filter(p => p.position === tile.index);

            return (
              <div
                key={tile.index}
                style={{
                  left: `${coord.left}%`,
                  top: `${coord.top}%`,
                  width: `${coord.width}%`,
                  height: `${coord.height}%`
                }}
                onClick={() => {
                  setInspectedTileIndex(tile.index);
                  if (deed) onOpenDeedModal(deed);
                }}
                onMouseEnter={() => setHoveredTileIndex(tile.index)}
                onMouseLeave={() => setHoveredTileIndex(null)}
                className={`absolute cursor-pointer transition-all duration-150 flex items-center justify-center group ${
                  isHovered || isInspected
                    ? 'bg-emerald-400/30 ring-2 ring-emerald-500 shadow-md z-25'
                    : isCurrentTile
                    ? 'bg-amber-400/25 ring-2 ring-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)] z-20'
                    : 'hover:bg-slate-900/10'
                }`}
                title={`#${tile.index} ${tile.name}`}
              >
                {/* Tile Number Badge on hover */}
                <span className="absolute top-0.5 left-0.5 text-[8px] sm:text-[9px] font-mono font-bold bg-white/90 text-slate-800 px-1 rounded shadow-xs pointer-events-none opacity-0 group-hover:opacity-100 transition border border-slate-200">
                  #{tile.index}
                </span>

                {/* Hazard Warning Badge (☣️) */}
                {deed && deed.hazard && (
                  <div
                    className="absolute top-0.5 left-0.5 bg-rose-600 text-white text-[7px] sm:text-[9px] px-1 py-0.2 rounded font-bold shadow animate-pulse flex items-center space-x-0.5 border border-rose-300 z-10"
                    title={`มีปัญหาสิ่งแวดล้อม #${deed.hazard}`}
                  >
                    <span>☣️</span>
                    <span>#{deed.hazard}</span>
                  </div>
                )}

                {/* Ownership Bar (Shows player color on their owned properties) */}
                {owner && (
                  <div
                    className={`absolute bottom-0 inset-x-0 h-1.5 sm:h-2 ${
                      owner.color === 'emerald' ? 'bg-emerald-500' :
                      owner.color === 'sky' ? 'bg-sky-500' :
                      owner.color === 'pink' ? 'bg-pink-500' : 'bg-amber-500'
                    } shadow-xs`}
                  />
                )}

                {/* Factory Badges (🏭) */}
                {deed && deed.factories > 0 && (
                  <div className="absolute top-0.5 right-0.5 bg-white/95 text-amber-700 text-[8px] sm:text-[10px] px-1 py-0.2 rounded font-bold shadow-xs border border-amber-300 flex items-center space-x-0.5">
                    <span>🏭</span>
                    <span>{deed.factories}</span>
                  </div>
                )}

                {/* Player Tokens (Walking on this space!) */}
                {playersOnTile.length > 0 && (
                  <div className="flex items-center justify-center -space-x-1.5 z-30 pointer-events-none animate-bounce">
                    {playersOnTile.map(p => (
                      <div
                        key={p.id}
                        className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm shadow-md border-2 ${
                          getPlayerBadgeColor(p.color)
                        } ${getPlayerGlow(p.color)}`}
                        title={`${p.name} อยู่ที่นี่`}
                      >
                        {p.avatar}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Center Info HUD: Standing Tile & Property Info (ตรงกลางกระดาน, สีสว่าง สะอาดตา) */}
          <div className="absolute inset-x-[15%] inset-y-[15%] pointer-events-none flex flex-col items-center justify-center z-20">
            <div className={`pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 sm:p-4 shadow-2xl max-w-[240px] sm:max-w-sm w-full text-center transition-all ${
              hudMinimized ? 'scale-75 opacity-80 hover:opacity-100' : 'scale-100 opacity-100'
            }`}>
              
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                <div className="flex items-center space-x-1 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-mono truncate">
                    {activeTileIndex === currentPlayer.position ? (
                      <span className="text-emerald-700 font-bold flex items-center space-x-1">
                        <span>📍 ช่องของ {currentPlayer.name.split(' ')[0]}</span>
                        <span className="text-slate-400 font-normal">(#{activeTile.index})</span>
                      </span>
                    ) : (
                      <span className="text-sky-700 font-medium flex items-center space-x-1">
                        <span>🔍 ดูช่อง #{activeTile.index}</span>
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  {activeTileIndex !== currentPlayer.position && (
                    <button
                      onClick={() => setInspectedTileIndex(null)}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition font-bold"
                      title={`กลับไปดูช่องของ ${currentPlayer.name}`}
                    >
                      📍 ช่อง {currentPlayer.name.split(' ')[0]}
                    </button>
                  )}
                  <button
                    onClick={() => setHudMinimized(!hudMinimized)}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                    title={hudMinimized ? "ขยาย" : "ย่อ"}
                  >
                    {hudMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {!hudMinimized ? (
                <>
                  <div className="text-xl sm:text-2xl mb-0.5">{activeTile.icon || (activeDeed ? '🏢' : '📍')}</div>
                  <h4 className="font-heading font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 mb-1">
                    {activeTile.name}
                  </h4>

                  {activeDeed ? (
                    <div className="space-y-1 sm:space-y-1.5 text-xs text-slate-700">
                      <p className="text-[10px] sm:text-[11px] text-slate-600">
                        {activeDeedOwner ? (
                          <span className="text-emerald-800 font-bold">
                            เจ้าของ: {activeDeedOwner.name} ({activeDeed.factories} โรงงาน 🏭)
                          </span>
                        ) : (
                          <span className="text-amber-800 font-medium">
                            ยังไม่มีเจ้าของ • ราคา ฿{activeDeed.price.toLocaleString()}
                          </span>
                        )}
                      </p>

                      <div className="bg-slate-50 py-1 px-2 rounded-lg border border-slate-200 flex justify-between items-center text-[10px] sm:text-xs">
                        <span className="text-slate-500">ค่าเช่าปัจจุบัน:</span>
                        <span className="font-bold text-amber-700">฿{activeDeed.rent[activeDeed.factories].toLocaleString()}</span>
                      </div>

                      {/* Active Hazard Warning & Cure Option */}
                      {activeDeed.hazard && (() => {
                        const activeHazard = SDG_CARDS.find(c => c.id === activeDeed.hazard);
                        const hasSolution = currentPlayer.cards && currentPlayer.cards.includes(activeHazard?.curedBy);
                        const solutionCard = activeHazard ? SDG_CARDS.find(c => c.id === activeHazard.curedBy) : null;

                        return (
                          <div className="p-1.5 sm:p-2 rounded-xl bg-rose-50 border border-rose-300 text-left space-y-1 animate-fadeIn">
                            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-rose-800">
                              <span className="flex items-center space-x-1">
                                <span className="animate-pulse">☣️</span>
                                <span>มลพิษ #{activeDeed.hazard}</span>
                              </span>
                              <span className="text-[9px] font-mono bg-rose-100 text-rose-800 px-1 py-0.2 rounded border border-rose-200">
                                -฿200/ตา
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-700 leading-tight">
                              {activeHazard?.titleTh}
                            </p>
                            {hasSolution ? (
                              <button
                                onClick={() => onCureHazard(activeDeed.id, currentPlayer.id, activeHazard.curedBy)}
                                className="w-full py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-sm flex items-center justify-center space-x-1 transition"
                              >
                                <Sparkles className="w-3 h-3 text-amber-200" />
                                <span>ใช้การ์ด #{activeHazard.curedBy} รักษา (+฿300 & +2 SDG)</span>
                              </button>
                            ) : (
                              <p className="text-[9px] text-amber-800 font-medium">
                                💡 ต้องใช้การ์ด #{activeHazard?.curedBy} ({solutionCard?.titleTh}) เพื่อฟื้นฟู
                              </p>
                            )}
                          </div>
                        );
                      })()}

                      <div className="flex gap-1.5 pt-0.5">
                        <button
                          onClick={() => onOpenDeedModal(activeDeed)}
                          className="flex-1 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-emerald-800 border border-slate-200 transition"
                        >
                          📜 ดูโฉนด
                        </button>
                        <button
                          onClick={() => onOpenImageModal(activeDeed.image, `โฉนด: ${activeDeed.name}`)}
                          className="px-2 py-1 rounded-lg text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-sky-800 border border-slate-200 transition"
                        >
                          <Eye className="w-3 h-3 inline mr-0.5" />
                          รูป
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-xs text-slate-700 py-1">
                      <p className="text-[10px] sm:text-[11px] text-slate-600 leading-relaxed">
                        {activeTile.desc || 'ช่องพิเศษบนกระดาน'}
                      </p>
                      {activeTile.type === 'chance' && (
                        <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-800 text-[10px]">
                          ✨ สุ่มจั่วการ์ดภารกิจ SDGs เมื่อเดินมาตก
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-[11px] sm:text-xs text-slate-900 font-bold truncate">
                  #{activeTile.index} {activeTile.name}
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* Grid View Layout (Bright Theme) */
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-lg">
          <h3 className="font-heading font-semibold text-slate-800 text-xs sm:text-sm mb-2.5">
            📋 แผนผังช่องแบบตาราง (38 ช่อง)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-[460px] overflow-y-auto pr-1">
            {BOARD_TILES.map((tile) => {
              const deed = tile.deedId ? deeds.find(d => d.id === tile.deedId) : null;
              const owner = deed?.owner ? players.find(p => p.id === deed.owner) : null;
              const playersOnTile = players.filter(p => p.position === tile.index);
              const isInspected = inspectedTileIndex === tile.index;
              const isCurrentPlayerTile = currentPlayer.position === tile.index;

              return (
                <div
                  key={tile.index}
                  onClick={() => {
                    setInspectedTileIndex(tile.index);
                    if (deed) onOpenDeedModal(deed);
                  }}
                  className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between min-h-[85px] relative ${
                    isInspected
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-400/40'
                      : isCurrentPlayerTile
                      ? 'border-amber-400 bg-amber-50/60 ring-1 ring-amber-400/50'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span className="font-mono font-bold">#{tile.index}</span>
                    {deed && <span className="text-[9px] text-slate-600 font-semibold">{deed.price}฿</span>}
                  </div>
                  <p className="text-[11px] font-semibold text-slate-800 line-clamp-2 leading-tight">
                    {tile.name}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[10px]">
                    {owner ? (
                      <span className={`text-[9px] font-bold ${owner.color === 'emerald' ? 'text-emerald-700' : owner.color === 'sky' ? 'text-sky-700' : owner.color === 'pink' ? 'text-pink-700' : 'text-amber-700'}`}>
                        {owner.name.split(' ')[0]}
                      </span>
                    ) : (
                      <span className="text-slate-400">{deed ? 'ว่าง' : tile.icon}</span>
                    )}
                    <div className="flex items-center space-x-1">
                      {deed && deed.hazard && (
                        <span className="text-rose-600 font-bold text-[9px] animate-pulse" title={`มีปัญหา #${deed.hazard}`}>
                          ☣️#{deed.hazard}
                        </span>
                      )}
                      {deed && deed.factories > 0 && (
                        <span className="text-amber-600 font-bold">🏭{deed.factories}</span>
                      )}
                    </div>
                  </div>
                  {playersOnTile.length > 0 && (
                    <div className="absolute -top-1.5 -right-1.5 flex -space-x-1">
                      {playersOnTile.map(p => (
                        <span key={p.id} className="text-xs">{p.avatar}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Hand of Real Playing Cards (เหมือนถือจริง, เลื่อนบนมือถือได้สบาย) */}
      {myHandCards.length > 0 && (
        <div className="pt-1 pb-1 space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-1.5">
              <span className="text-base">🎴</span>
              <h3 className="font-heading font-black text-slate-800 text-xs sm:text-sm flex items-center space-x-1.5">
                <span>การ์ดในมือคุณ (เหมือนถือจริง)</span>
                <span className="text-emerald-700 font-mono text-xs font-bold">({myHandCards.length}/5 ใบ)</span>
              </h3>
            </div>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              ✨ แตะการ์ดเพื่อดูขยาย หรือกดรักษา
            </span>
          </div>

          {/* Realistic Playing Cards Fan / Row with mobile touch scroll */}
          <div className="flex items-end justify-start sm:justify-center gap-2 sm:gap-3.5 overflow-x-auto py-2 px-1 scrollbar-none touch-pan-x">
            {myHandCards.map((cardId, index) => {
              const card = SDG_CARDS.find(c => c.id === cardId);
              if (!card) return null;
              const curableDeed = deeds.find(d => d.hazard === card.cures);

              return (
                <div
                  key={`${cardId}-${index}`}
                  onClick={() => {
                    if (curableDeed) {
                      onCureHazard(curableDeed.id, myPlayer.id, card.id);
                    } else {
                      onOpenImageModal(card.image, `${card.titleTh} (${card.titleEn})`);
                    }
                  }}
                  className={`group relative flex-shrink-0 transition-all duration-300 transform hover:-translate-y-4 hover:scale-105 active:scale-95 cursor-pointer select-none ${
                    curableDeed ? 'z-20' : ''
                  }`}
                  style={{ width: 'clamp(92px, 22vw, 125px)' }}
                >
                  {/* Real Full Card Graphic */}
                  <img
                    src={card.image}
                    alt={card.titleTh}
                    className={`w-full h-auto aspect-[750/1050] object-contain rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition duration-300 ${
                      curableDeed
                        ? 'ring-4 ring-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.7)] animate-pulse'
                        : 'ring-1 ring-slate-200/80 hover:ring-2 hover:ring-emerald-400'
                    }`}
                  />

                  {/* Cure Action Pill */}
                  {curableDeed && (
                    <div className="absolute -bottom-2.5 inset-x-0 flex justify-center z-30">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCureHazard(curableDeed.id, myPlayer.id, card.id);
                        }}
                        className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-heading font-black text-[9px] sm:text-[10px] shadow-lg shadow-emerald-500/40 flex items-center space-x-1 animate-bounce border border-emerald-200"
                        title={`ใช้การ์ดนี้รักษาที่ดิน "${curableDeed.name}"`}
                      >
                        <Sparkles className="w-2.5 h-2.5 text-amber-200" />
                        <span>รักษา #{curableDeed.hazard}!</span>
                      </button>
                    </div>
                  )}

                  {/* Quick zoom hint on hover */}
                  <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition bg-white/90 rounded-full p-1 text-slate-700 shadow-sm pointer-events-none">
                    <Eye className="w-3 h-3 text-slate-700" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
