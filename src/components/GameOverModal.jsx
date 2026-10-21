import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, RotateCcw, Home, Sparkles } from 'lucide-react';

export default function GameOverModal({
  winner,
  players,
  deeds,
  onPlayAgain,
  onReturnToLobby
}) {
  useEffect(() => {
    // Fire confetti bursts
    const end = Date.now() + 3 * 1000;
    const colors = ['#10b981', '#0ea5e9', '#f59e0b', '#ec4899'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  if (!winner) return null;

  // Rank players by Net Worth = balance + deed prices + factories
  const rankedPlayers = [...players].map(p => {
    const owned = deeds.filter(d => d.owner === p.id);
    const propValue = owned.reduce((sum, d) => sum + d.price + (d.factories * d.factoryCost), 0);
    const netWorth = p.balance + propValue;
    return { ...p, propValue, netWorth, ownedCount: owned.length };
  }).sort((a, b) => b.netWorth - a.netWorth);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border-2 border-amber-300 rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-center text-slate-800">
        
        {/* Top Trophy Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-amber-50 to-white border-b border-amber-100 flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-4xl sm:text-5xl mb-2.5 shadow-md shadow-amber-400/20 animate-bounce">
            🏆
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-800 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 mb-1">
            เกมสิ้นสุดแล้ว!
          </span>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900">
            ขอแสดงความยินดีกับ {winner.name}!
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            ผู้ชนะแห่งการพัฒนาที่ยั่งยืน "MC THE GREEN CHOICE"
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-left">
            📊 สรุปอันดับทรัพย์สินรวม (Net Worth):
          </h4>

          <div className="space-y-2">
            {rankedPlayers.map((p, idx) => (
              <div
                key={p.id}
                className={`p-2.5 sm:p-3 rounded-2xl border flex items-center justify-between text-xs ${
                  idx === 0 
                    ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs' 
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="font-heading font-black text-base w-6 text-center">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </span>
                  <span className="text-lg">{p.avatar}</span>
                  <div className="text-left">
                    <span className="font-bold block text-slate-900">{p.name}</span>
                    <span className="text-[10px] text-slate-500">
                      ที่ดิน {p.ownedCount} แปลง • ⭐ {p.sdgPoints} แต้ม
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-heading font-bold text-sm text-emerald-700 block font-mono">
                    ฿ {p.netWorth.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    เงินสด ฿{p.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-3.5 sm:p-5 border-t border-slate-100 bg-slate-50 flex gap-2.5">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 rounded-xl font-heading font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center justify-center space-x-1.5 active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>เล่นอีกรอบ</span>
          </button>

          <button
            onClick={onReturnToLobby}
            className="flex-1 py-3 rounded-xl font-heading font-bold text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition flex items-center justify-center space-x-1.5 shadow-2xs active:scale-98"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>กลับล็อบบี้</span>
          </button>
        </div>

      </div>
    </div>
  );
}
