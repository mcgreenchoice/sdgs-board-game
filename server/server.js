import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3001;

// In-memory Room Storage
const rooms = new Map();

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SDG-${code}`;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', activeRooms: rooms.size });
});

io.on('connection', (socket) => {
  console.log(`[Socket Connected] ID: ${socket.id}`);

  // 1. Create Room
  socket.on('create_room', ({ playerName, avatar, color }, callback) => {
    let roomCode = generateRoomCode();
    while (rooms.has(roomCode)) {
      roomCode = generateRoomCode();
    }

    const newPlayer = {
      id: 1,
      socketId: socket.id,
      name: playerName || 'ผู้เล่น 1 (โฮสต์)',
      avatar: avatar || '🐘',
      color: color || 'emerald',
      isHost: true,
      balance: 25000,
      position: 0,
      inJail: false,
      jailTurns: 0,
      sdgPoints: 0,
      cards: []
    };

    const room = {
      code: roomCode,
      hostId: socket.id,
      status: 'waiting', // 'waiting' | 'playing' | 'finished'
      players: [newPlayer],
      gameState: null
    };

    rooms.set(roomCode, room);
    socket.join(roomCode);
    socket.data.roomCode = roomCode;

    console.log(`[Room Created] ${roomCode} by ${newPlayer.name}`);
    if (callback) {
      callback({
        success: true,
        roomCode,
        player: newPlayer,
        room
      });
    }
  });

  // 2. Join Room
  socket.on('join_room', ({ roomCode, playerName, avatar, color }, callback) => {
    const formattedCode = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(formattedCode);

    if (!room) {
      if (callback) callback({ success: false, message: 'ไม่พบห้องนี้ กรุณาตรวจสอบรหัสห้องอีกครั้ง' });
      return;
    }

    if (room.status !== 'waiting') {
      if (callback) callback({ success: false, message: 'เกมในห้องนี้ได้เริ่มไปแล้ว ไม่สามารถเข้าร่วมได้' });
      return;
    }

    if (room.players.length >= 4) {
      if (callback) callback({ success: false, message: 'ห้องเต็มแล้ว (สูงสุด 4 คน)' });
      return;
    }

    // Assign color & avatar if collision
    const existingColors = room.players.map(p => p.color);
    const availableColors = ['emerald', 'sky', 'pink', 'amber'].filter(c => !existingColors.includes(c));
    const assignedColor = availableColors[0] || 'sky';

    const newPlayer = {
      id: room.players.length + 1,
      socketId: socket.id,
      name: playerName || `ผู้เล่น ${room.players.length + 1}`,
      avatar: avatar || (assignedColor === 'sky' ? '🦅' : assignedColor === 'pink' ? '🦌' : '⭐'),
      color: assignedColor,
      isHost: false,
      balance: 25000,
      position: 0,
      inJail: false,
      jailTurns: 0,
      sdgPoints: 0,
      cards: []
    };

    room.players.push(newPlayer);
    socket.join(formattedCode);
    socket.data.roomCode = formattedCode;

    console.log(`[Player Joined] ${newPlayer.name} joined room ${formattedCode}`);

    // Notify all players in room
    io.to(formattedCode).emit('room_updated', room);

    if (callback) {
      callback({
        success: true,
        roomCode: formattedCode,
        player: newPlayer,
        room
      });
    }
  });

  // 3. Start Game (Host only)
  socket.on('start_game', ({ roomCode, initialDeeds, initialCardsPerPlayer }, callback) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    if (room.hostId !== socket.id) {
      if (callback) callback({ success: false, message: 'เฉพาะหัวหน้าห้อง (Host) เท่านั้นที่เริ่มเกมได้' });
      return;
    }

    // Give each player 3 initial solution cards if provided
    room.players = room.players.map((p, idx) => {
      const cards = (initialCardsPerPlayer && initialCardsPerPlayer[idx]) || [6, 16, 25];
      return { ...p, cards };
    });

    room.status = 'playing';
    room.gameState = {
      deeds: initialDeeds || [],
      currentPlayerIdx: 0,
      lastDice: [1, 1],
      isRolling: false,
      logs: [
        { time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }), text: `🎮 เริ่มเกมแล้ว! มีผู้เล่นทั้งหมด ${room.players.length} คน` },
        { time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }), text: `➡️ ตาแรกเป็นของ ${room.players[0].name}` }
      ]
    };

    console.log(`[Game Started] Room ${roomCode}`);
    io.to(roomCode).emit('game_started', { room, gameState: room.gameState });

    if (callback) callback({ success: true });
  });

  // 4. Sync Game Action
  socket.on('sync_game_state', ({ roomCode, gameState, actionLog }) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    room.gameState = gameState;
    // Broadcast updated state to all other players in the room
    socket.to(roomCode).emit('game_state_updated', { gameState, actionLog });
  });

  // 5. Leave Room
  socket.on('leave_room', () => {
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;

    handlePlayerLeave(socket, roomCode);
  });

  // 6. Disconnect
  socket.on('disconnect', () => {
    const roomCode = socket.data.roomCode;
    if (roomCode) {
      handlePlayerLeave(socket, roomCode);
    }
    console.log(`[Socket Disconnected] ${socket.id}`);
  });
});

function handlePlayerLeave(socket, roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return;

  const leavingPlayer = room.players.find(p => p.socketId === socket.id);
  room.players = room.players.filter(p => p.socketId !== socket.id);
  socket.leave(roomCode);
  socket.data.roomCode = null;

  if (room.players.length === 0) {
    rooms.delete(roomCode);
    console.log(`[Room Deleted] ${roomCode} is empty`);
  } else {
    // If host left, assign new host
    if (room.hostId === socket.id && room.players.length > 0) {
      room.players[0].isHost = true;
      room.hostId = room.players[0].socketId;
    }
    io.to(roomCode).emit('player_left', {
      leavingPlayerName: leavingPlayer?.name,
      room
    });
    io.to(roomCode).emit('room_updated', room);
  }
}

// Serve frontend static files if dist exists (All-in-One deployment)
if (fs.existsSync(distPath)) {
  console.log(`📦 Serving static files from ${distPath}`);
  app.use(express.static(distPath));
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`🚀 SDGs Board Game WebSocket Server running on port ${PORT}`);
});
