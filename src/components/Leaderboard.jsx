import React, { useEffect } from 'react';
import { Trophy, Medal, Award, Building, DollarSign, Sparkles, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Leaderboard({ players, deeds }) {
  // Calculate total net worth for each player
  const leaderboardData = players.map((p) => {
    const ownedDeeds = deeds.filter(d => d.owner === p.id);
    const propertiesValue = ownedDeeds.reduce((sum, d) => sum + d.price, 0);
    const factoriesValue = ownedDeeds.reduce((sum, d) => sum + (d.factories * d.factoryCost), 0);
    const sdgBonus = p.sdgPoints * 200; // 1 SDG point = 200 ฿ worth
    const netWorth = p.balance + propertiesValue + factoriesValue + sdgBonus;

    return {
      ...p,
      propertiesCount: ownedDeeds.length,
      factoriesCount: ownedDeeds.reduce((sum, d) => sum + d.factories, 0),
      propertiesValue,
      factoriesValue,
      sdgBonus,
      netWorth
    };
  }).sort((a, b) => b.netWorth - a.netWorth);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 0:
        return { badge: '🥇 อันดับ 1', color: 'from-amber-400 to-yellow-600', ring: 'ring-amber-400 border-amber-400' };
      case 1:
        return { badge: '🥈 อันดับ 2', color: 'from-slate-400 to-slate-600', ring: 'ring-slate-300 border-slate-300' };
      case 2:
        return { badge: '🥉 อันดับ 3', color: 'from-amber-600 to-amber-800', ring: 'ring-amber-600 border-amber-600' };
      default:
        return { badge: `อันดับ ${rank + 1}`, color: 'from-slate-500 to-slate-700', ring: 'border-slate-300' };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 text-slate-800">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-yellow-50 border border-amber-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl sm:text-3xl shadow-xs">
            🏆
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-heading font-black text-slate-900">
              สรุปผลการแข่งขัน & มูลค่าสินทรัพย์รวม (Leaderboard)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              คำนวณจาก: เงินสด + มูลค่าโฉนดที่ดิน + โรงงาน + คะแนนความยั่งยืน SDGs
            </p>
          </div>
        </div>

        <button
          onClick={fireConfetti}
          className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>จุดพลุฉลอง 🎉</span>
        </button>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {leaderboardData.slice(0, 3).map((player, idx) => {
          const rankInfo = getRankBadge(idx);
          return (
            <div
              key={player.id}
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 border relative overflow-hidden flex flex-col justify-between shadow-md ${
                idx === 0 
                  ? 'bg-gradient-to-b from-amber-50/70 via-white to-yellow-50/50 border-amber-300 ring-2 ring-amber-400/40' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r text-white ${rankInfo.color} shadow-xs`}>
                    {rankInfo.badge}
                  </span>
                  <span className="text-3xl">{player.avatar}</span>
                </div>

                <h3 className="text-base sm:text-lg font-heading font-black text-slate-900 mb-1">
                  {player.name}
                </h3>
                <div className="text-2xl font-black text-emerald-700 font-heading mb-4 font-mono">
                  ฿ {player.netWorth.toLocaleString()}
                  <span className="text-xs text-slate-500 font-normal block font-sans">สินทรัพย์สุทธิรวม</span>
                </div>

                {/* Breakdown Mini List */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">💵 เงินสด:</span>
                    <span className="font-bold text-emerald-700 font-mono">฿ {player.balance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">🏢 ที่ดิน ({player.propertiesCount} แห่ง):</span>
                    <span className="font-bold text-sky-700 font-mono">฿ {player.propertiesValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">🏭 โรงงาน ({player.factoriesCount} หลัง):</span>
                    <span className="font-bold text-amber-700 font-mono">฿ {player.factoriesValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">🌱 แต้ม SDG ({player.sdgPoints} แต้ม):</span>
                    <span className="font-bold text-teal-700 font-mono">+฿ {player.sdgBonus.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Full Table */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-md overflow-x-auto">
        <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>ตารางเปรียบเทียบทรัพย์สินทั้งหมด</span>
        </h3>

        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase">
              <th className="pb-2.5 pl-2">อันดับ</th>
              <th className="pb-2.5">ผู้เล่น</th>
              <th className="pb-2.5 text-right">เงินสด</th>
              <th className="pb-2.5 text-right">มูลค่าที่ดิน</th>
              <th className="pb-2.5 text-right">มูลค่าโรงงาน</th>
              <th className="pb-2.5 text-right">แต้ม SDGs</th>
              <th className="pb-2.5 text-right pr-2">สินทรัพย์สุทธิ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leaderboardData.map((p, idx) => (
              <tr key={p.id} className="hover:bg-slate-50 transition">
                <td className="py-2.5 pl-2 font-bold font-mono text-slate-700">
                  #{idx + 1}
                </td>
                <td className="py-2.5 font-bold text-slate-900 flex items-center space-x-1.5 sm:space-x-2">
                  <span className="text-base sm:text-lg">{p.avatar}</span>
                  <span className="truncate max-w-[100px] sm:max-w-none">{p.name}</span>
                </td>
                <td className="py-2.5 text-right font-semibold text-emerald-700 font-mono">
                  ฿ {p.balance.toLocaleString()}
                </td>
                <td className="py-2.5 text-right text-sky-700 font-mono">
                  ฿ {p.propertiesValue.toLocaleString()} ({p.propertiesCount})
                </td>
                <td className="py-2.5 text-right text-amber-700 font-mono">
                  ฿ {p.factoriesValue.toLocaleString()} ({p.factoriesCount}🏭)
                </td>
                <td className="py-2.5 text-right text-teal-700 font-mono">
                  ⭐ {p.sdgPoints}
                </td>
                <td className="py-2.5 text-right pr-2 font-bold font-heading text-emerald-800 text-sm sm:text-base font-mono">
                  ฿ {p.netWorth.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
