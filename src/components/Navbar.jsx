import React from 'react';
import { Compass, Building2, Layers, Trophy, RotateCcw, Volume2, VolumeX, ShieldAlert, LogOut, Globe, Bot } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  players, 
  currentPlayerIdx, 
  myPlayerId,
  gameMode, // 'bot' | 'online'
  onlineRoomCode,
  onLeaveToLobby,
  onResetGame, 
  soundEnabled, 
  setSoundEnabled 
}) {
  const currentPlayer = players[currentPlayerIdx] || players[0];
  const isMyTurn = currentPlayer && currentPlayer.id === myPlayerId;

  const tabs = [
    { id: 'board', label: 'กระดานเกม', icon: Compass },
    { id: 'properties', label: 'โฉนด & โรงงาน', icon: Building2 },
    { id: 'cards', label: 'สารานุกรมการ์ด', icon: Layers },
    { id: 'leaderboard', label: 'สรุปอันดับ', icon: Trophy },
  ];

  const getPlayerBadgeColor = (color) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'sky': return 'bg-sky-50 text-sky-800 border-sky-300';
      case 'pink': return 'bg-pink-50 text-pink-800 border-pink-300';
      case 'amber': return 'bg-amber-50 text-amber-900 border-amber-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Logo & School Name */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('board')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-sky-500 p-0.5 shadow-md shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-base sm:text-xl">
                🐘
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-heading font-black text-sm sm:text-lg tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                  MC GREEN CHOICE
                </span>
                {gameMode === 'bot' ? (
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 hidden xs:inline-flex items-center space-x-1">
                    <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>Bot</span>
                  </span>
                ) : (
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-bold border border-sky-200 hidden xs:inline-flex items-center space-x-1">
                    <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{onlineRoomCode || 'ห้อง'}</span>
                  </span>
                )}
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-500 hidden md:block">
                โรงเรียนมงฟอร์ตวิทยาลัย • SDGs Monopoly Online
              </p>
            </div>
          </div>

          {/* Current Turn Status Badge */}
          {currentPlayer && (
            <div className="flex items-center">
              <div className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full border text-xs font-semibold shadow-xs ${
                isMyTurn 
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-400 ring-2 ring-emerald-400/40 animate-pulse'
                  : getPlayerBadgeColor(currentPlayer.color)
              }`}>
                <span className="text-sm">{currentPlayer.avatar}</span>
                <span className="hidden sm:inline">
                  {isMyTurn ? <b className="text-emerald-900">ตาของคุณ!</b> : `ตาของ:`}
                </span>
                <span className="font-bold truncate max-w-[70px] sm:max-w-[90px]">{currentPlayer.name}</span>
                <span className="hidden lg:inline bg-white/80 px-2 py-0.2 rounded-full text-emerald-700 font-mono text-[11px] font-bold border border-emerald-200">
                  ฿{currentPlayer.balance.toLocaleString()}
                </span>
                {currentPlayer.inJail && (
                  <span className="bg-red-500 text-white px-1.5 py-0.2 text-[9px] rounded-full font-bold">
                    ติดยักยอก
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "ปิดเสียง" : "เปิดเสียง"}
              className="p-1.5 sm:p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {gameMode === 'bot' && (
              <button
                onClick={onResetGame}
                className="flex items-center space-x-1 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
                title="เริ่มเกมกระดานนี้ใหม่"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">เริ่มใหม่</span>
              </button>
            )}

            <button
              onClick={onLeaveToLobby}
              className="flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition shadow-xs"
              title="ออกจากเกม กลับหน้าเมนูหลัก"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ล็อบบี้</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-1.5 border-t border-slate-100 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
