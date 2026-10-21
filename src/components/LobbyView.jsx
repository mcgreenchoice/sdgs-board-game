import React, { useState } from 'react';
import { Users, Bot, Globe, Sparkles, Copy, Check, Play, BookOpen, ShieldCheck, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

const AVATAR_OPTIONS = [
  { emoji: '🐘', label: 'ช้าง' },
  { emoji: '🦅', label: 'นกอินทรี' },
  { emoji: '🦌', label: 'กวาง' },
  { emoji: '🐯', label: 'เสือ' },
  { emoji: '🐼', label: 'แพนด้า' },
  { emoji: '🦊', label: 'สุนัขจิ้งจอก' },
  { emoji: '🦁', label: 'สิงโต' },
  { emoji: '🐬', label: 'โลมา' }
];

const COLOR_OPTIONS = [
  { id: 'emerald', label: 'เขียวมรกต', bg: 'bg-emerald-500', ring: 'ring-emerald-400' },
  { id: 'sky', label: 'ฟ้าคราม', bg: 'bg-sky-500', ring: 'ring-sky-400' },
  { id: 'pink', label: 'ชมพู', bg: 'bg-pink-500', ring: 'ring-pink-400' },
  { id: 'amber', label: 'ทองอำพัน', bg: 'bg-amber-500', ring: 'ring-amber-400' }
];

export default function LobbyView({
  playerName,
  setPlayerName,
  playerAvatar,
  setPlayerAvatar,
  playerColor,
  setPlayerColor,
  onStartBotGame,
  onCreateOnlineRoom,
  onJoinOnlineRoom,
  onStartOnlineGame,
  onLeaveOnlineRoom,
  onlineRoom,
  isConnectingSocket,
  socketError,
  onOpenCardDrawer,
  onOpenRulesModal
}) {
  const [activeTab, setActiveTab] = useState('modes'); // 'modes' | 'online_create' | 'online_join'
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [botCount, setBotCount] = useState(3); // 1, 2, or 3 bots
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-4xl w-full mx-auto py-4 px-3 sm:py-6 sm:px-4 space-y-5 sm:space-y-8 animate-fadeIn text-slate-800">
      
      {/* Hero Header */}
      <div className="text-center space-y-2 sm:space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>SDGs Monopoly Edition • Montfort College</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600">
          MC THE GREEN CHOICE
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto px-2">
          เกมเศรษฐีจำลองเป้าหมายการพัฒนาที่ยั่งยืน (SDGs 13, 14, 15) ซื้อที่ดิน บริหารโรงงาน เผชิญมลพิษ และใช้การ์ดช่วยเหลือฟื้นฟูโลก
        </p>
      </div>

      {/* Player Identity Card */}
      <div className="bg-white/95 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
            <span>👤</span>
            <span>โปรไฟล์ของคุณ (Player Profile)</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono">เงินตั้งต้น ฿25,000</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
          {/* Avatar Preview */}
          <div className="md:col-span-3 flex sm:flex-col items-center justify-center space-x-3 sm:space-x-0">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shadow-md border-2 transition-all ${
              playerColor === 'emerald' ? 'bg-emerald-50 border-emerald-400 ring-4 ring-emerald-400/20' :
              playerColor === 'sky' ? 'bg-sky-50 border-sky-400 ring-4 ring-sky-400/20' :
              playerColor === 'pink' ? 'bg-pink-50 border-pink-400 ring-4 ring-pink-400/20' :
              'bg-amber-50 border-amber-400 ring-4 ring-amber-400/20'
            }`}>
              {playerAvatar}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 sm:mt-2 truncate max-w-[120px]">
              {playerName || 'ผู้เล่น'}
            </span>
          </div>

          {/* Form Controls */}
          <div className="md:col-span-9 space-y-3">
            <div>
              <label className="text-xs text-slate-600 block mb-1 font-medium">ชื่อในเกมของคุณ:</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                placeholder="กรอกชื่อผู้เล่น..."
                className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none transition shadow-2xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Choose Avatar */}
              <div>
                <label className="text-xs text-slate-600 block mb-1 font-medium">เลือกตัวละคร (Avatar):</label>
                <div className="flex flex-wrap gap-1.5">
                  {AVATAR_OPTIONS.map(item => (
                    <button
                      key={item.emoji}
                      onClick={() => setPlayerAvatar(item.emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition active:scale-95 ${
                        playerAvatar === item.emoji 
                          ? 'bg-emerald-100 border-2 border-emerald-500 scale-105 shadow-xs' 
                          : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Choose Color */}
              <div>
                <label className="text-xs text-slate-600 block mb-1 font-medium">เลือกสีประจำตัว:</label>
                <div className="flex gap-2 pt-0.5">
                  {COLOR_OPTIONS.map(col => (
                    <button
                      key={col.id}
                      onClick={() => setPlayerColor(col.id)}
                      className={`w-8 h-8 rounded-full ${col.bg} transition active:scale-95 ${
                        playerColor === col.id ? `ring-4 ${col.ring} scale-110 shadow-md` : 'opacity-60 hover:opacity-100'
                      }`}
                      title={col.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Online Room Waiting Lobby View (if already in an online room) */}
      {onlineRoom ? (
        <div className="bg-white border border-emerald-300 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-5 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                ห้องออนไลน์พร้อมเล่น
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 flex items-center space-x-2">
                <span>รหัสห้อง:</span>
                <span className="text-emerald-600 font-mono tracking-widest">{onlineRoom.code}</span>
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCopyCode(onlineRoom.code)}
                className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center space-x-1.5 transition"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copiedCode ? 'คัดลอกแล้ว!' : 'คัดลอกรหัส'}</span>
              </button>

              <button
                onClick={onLeaveOnlineRoom}
                className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition"
              >
                ออกจากห้อง
              </button>
            </div>
          </div>

          {/* Connected Players in Room */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-800">
                ผู้เล่นในห้อง ({onlineRoom.players.length}/4 คน):
              </span>
              <span className="text-[11px] text-slate-500">
                (ต้องการผู้เล่นอย่างน้อย 2 คน)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {onlineRoom.players.map((p, idx) => (
                <div
                  key={p.socketId || idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3 shadow-xs"
                >
                  <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-xs">
                    {p.avatar}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold text-slate-900 truncate">{p.name}</span>
                      {p.isHost && (
                        <span className="text-[10px] text-amber-500" title="หัวหน้าห้อง">👑</span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-700 block font-mono font-bold">฿ 25,000</span>
                  </div>
                </div>
              ))}

              {/* Empty Slots */}
              {Array.from({ length: 4 - onlineRoom.players.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="p-3.5 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-xs font-medium space-x-2"
                >
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
                  <span>กำลังรอผู้เล่น...</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host Start Game Controls */}
          <div className="pt-1">
            {onlineRoom.players.find(p => p.name === playerName)?.isHost ? (
              <button
                onClick={() => onStartOnlineGame(onlineRoom.code)}
                disabled={onlineRoom.players.length < 2}
                className="w-full py-3.5 sm:py-4 rounded-2xl font-heading font-bold text-base bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-lg shadow-emerald-500/20 transition flex items-center justify-center space-x-2 active:scale-98"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>
                  {onlineRoom.players.length >= 2 
                    ? `เริ่มเกมพร้อมกัน (${onlineRoom.players.length} คน)` 
                    : 'รอผู้เล่นอย่างน้อย 2 คน'}
                </span>
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600 flex items-center justify-center space-x-2">
                <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>คุณอยู่ในห้องแล้ว กำลังรอให้หัวหน้าห้อง (Host) กดเริ่มเกม...</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Mode Selection Cards (Bright Theme) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* MODE 1: Play vs AI Bot */}
          <div className="bg-gradient-to-b from-white to-emerald-50/40 border border-emerald-100 hover:border-emerald-300 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between transition-all group">
            <div className="space-y-3.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100/60 border border-emerald-200 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-105 transition duration-200">
                🤖
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">
                  เล่นคนเดียว (Singleplayer)
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-black text-slate-900">
                  เล่นกับ AI Bot
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  ท้าทายกับระบบบอทอัจฉริยะที่เดิน ซื้อที่ดิน จัดการมลพิษ และตัดสินใจเองอัตโนมัติ เล่นจบได้รวดเร็วโดยไม่ต้องรอเพื่อน
                </p>
              </div>

              {/* Bot Player Count Options */}
              <div className="pt-1">
                <label className="text-xs text-slate-600 block mb-1.5 font-medium">
                  เลือกจำนวนคู่แข่ง (AI Bots):
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {[
                    { count: 1, label: '1 บอท' },
                    { count: 2, label: '2 บอท' },
                    { count: 3, label: '3 บอท' },
                  ].map(item => (
                    <button
                      key={item.count}
                      onClick={() => setBotCount(item.count)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition border active:scale-95 ${
                        botCount === item.count
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 sm:pt-6">
              <button
                onClick={() => onStartBotGame(botCount)}
                className="w-full py-3 sm:py-3.5 rounded-2xl font-heading font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 transition flex items-center justify-center space-x-2 active:scale-98"
              >
                <span>เริ่มเล่นกับ Bot ทันที</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MODE 2: Online Multiplayer */}
          <div className="bg-gradient-to-b from-white to-sky-50/40 border border-sky-100 hover:border-sky-300 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between transition-all group">
            <div className="space-y-3.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-100/60 border border-sky-200 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-105 transition duration-200">
                🌐
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block mb-0.5">
                  เล่นหลายคน (Online Multiplayer)
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-black text-slate-900">
                  สร้างห้องเล่นกับเพื่อน
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  เล่นพร้อมกันคนละเครื่องแบบ Real-time แค่ส่งรหัสห้องให้เพื่อน ก็เข้าร่วมแข่งขันในกระดานเดียวกันได้ทันที
                </p>
              </div>

              {/* Sub-tabs for Online: Create vs Join */}
              <div className="space-y-2.5 pt-1">
                <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
                  <button
                    onClick={() => setActiveTab('modes')}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition ${
                      activeTab === 'modes' || activeTab === 'online_create'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    สร้างห้องใหม่
                  </button>
                  <button
                    onClick={() => setActiveTab('online_join')}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition ${
                      activeTab === 'online_join'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    เข้าร่วมห้อง
                  </button>
                </div>

                {activeTab === 'online_join' ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={joinCodeInput}
                      onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                      placeholder="กรอกรหัสห้อง เช่น SDG-8821"
                      className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold tracking-wider uppercase focus:bg-white focus:border-sky-500 focus:outline-none shadow-2xs"
                    />
                    {socketError && (
                      <p className="text-[11px] text-rose-600 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{socketError}</span>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-2.5 sm:p-3 rounded-xl bg-sky-50 border border-sky-200 text-[11px] text-slate-600">
                    💡 กดปุ่มด้านล่างเพื่อสร้างห้อง ระบบจะสุ่มรหัสห้องให้คุณส่งต่อให้เพื่อน
                  </div>
                )}
              </div>
            </div>

            <div className="pt-5 sm:pt-6">
              {activeTab === 'online_join' ? (
                <button
                  onClick={() => onJoinOnlineRoom(joinCodeInput)}
                  disabled={!joinCodeInput.trim() || isConnectingSocket}
                  className="w-full py-3 sm:py-3.5 rounded-2xl font-heading font-bold text-sm bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-sky-500/20 transition flex items-center justify-center space-x-2 active:scale-98"
                >
                  <span>{isConnectingSocket ? 'กำลังเชื่อมต่อ...' : 'เข้าร่วมห้องเลย'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onCreateOnlineRoom}
                  disabled={isConnectingSocket}
                  className="w-full py-3 sm:py-3.5 rounded-2xl font-heading font-bold text-sm bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 disabled:opacity-40 text-white shadow-md shadow-sky-500/20 transition flex items-center justify-center space-x-2 active:scale-98"
                >
                  <span>{isConnectingSocket ? 'กำลังสร้างห้อง...' : 'สร้างห้องใหม่ (รับรหัส)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Extra Educational Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
        <button
          onClick={onOpenCardDrawer}
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-purple-700 transition flex items-center space-x-1.5 shadow-xs"
        >
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>📖 สารานุกรมการ์ด SDGs</span>
        </button>

        <button
          onClick={onOpenRulesModal}
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-emerald-700 transition flex items-center space-x-1.5 shadow-xs"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>📜 กติกาการเล่น</span>
        </button>
      </div>

    </div>
  );
}
