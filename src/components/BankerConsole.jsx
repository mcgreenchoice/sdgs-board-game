import React, { useState } from 'react';
import { DollarSign, ArrowRightLeft, PlusCircle, MinusCircle, ShieldAlert, CheckCircle2, Award, Landmark, Wallet } from 'lucide-react';
import { BANKNOTES } from '../data/gameData';

export default function BankerConsole({
  players,
  onUpdateBalance,
  onTransferMoney,
  onUpdateSdgPoints,
  onToggleJail,
  onOpenImageModal
}) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(players[0]?.id || 1);
  const [targetPlayerId, setTargetPlayerId] = useState(players[1]?.id || 2);
  const [transferAmount, setTransferAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [note, setNote] = useState('');

  const selectedPlayer = players.find(p => p.id === selectedPlayerId) || players[0];
  const targetPlayer = players.find(p => p.id === targetPlayerId) || players[1];

  const handleCustomAdd = () => {
    const val = parseInt(customAmount, 10);
    if (!isNaN(val) && val > 0) {
      onUpdateBalance(selectedPlayerId, val, `รับเงิน ${val} ฿ ${note ? `(${note})` : ''}`);
      setCustomAmount('');
      setNote('');
    }
  };

  const handleCustomDeduct = () => {
    const val = parseInt(customAmount, 10);
    if (!isNaN(val) && val > 0) {
      onUpdateBalance(selectedPlayerId, -val, `จ่ายเงิน ${val} ฿ ${note ? `(${note})` : ''}`);
      setCustomAmount('');
      setNote('');
    }
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    const val = parseInt(transferAmount, 10);
    if (!isNaN(val) && val > 0 && selectedPlayerId !== targetPlayerId) {
      onTransferMoney(selectedPlayerId, targetPlayerId, val, note || 'โอนเงินระหว่างผู้เล่น');
      setTransferAmount('');
      setNote('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900/60 via-slate-800/80 to-slate-900/80 border border-emerald-500/30 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl">
            🏦
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              ระบบธนาคาร & คนคุมเกม (Banker Console)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              ควบคุมการเงิน จ่ายเงินเดือน หักค่าปรับ และทำธุรกรรมระหว่างผู้เล่นได้ทันที
            </p>
          </div>
        </div>
        
        {/* Total Bank Circulating Cash */}
        <div className="bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-700 text-right">
          <span className="text-[11px] text-slate-400 block uppercase">เงินหมุนเวียนในเกม</span>
          <span className="text-lg font-bold text-emerald-400">
            ฿ {players.reduce((sum, p) => sum + p.balance, 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Select Active Player to Manage */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {players.map((p) => {
          const isSelected = p.id === selectedPlayerId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlayerId(p.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-700 border-emerald-400 ring-2 ring-emerald-500/30 shadow-lg'
                  : 'bg-slate-800/60 border-slate-700 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{p.avatar}</span>
                {p.inJail && (
                  <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-1.5 py-0.2 rounded font-bold">
                    ยักยอก
                  </span>
                )}
              </div>
              <p className="font-heading font-semibold text-white text-sm truncate">{p.name}</p>
              <p className="text-sm font-bold text-emerald-400 mt-1">฿ {p.balance.toLocaleString()}</p>
              <p className="text-[11px] text-amber-400">⭐ {p.sdgPoints} แต้ม</p>
            </button>
          );
        })}
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Banker Actions for Selected Player (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-5">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedPlayer.avatar}</span>
                <div>
                  <h3 className="font-heading font-bold text-white text-base sm:text-lg">
                    จัดการผู้เล่น: <span className="text-emerald-400">{selectedPlayer.name}</span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    ยอดเงินปัจจุบัน: <b className="text-white">฿ {selectedPlayer.balance.toLocaleString()}</b>
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => onToggleJail(selectedPlayer.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  selectedPlayer.inJail
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                    : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border-rose-500/40'
                }`}
              >
                {selectedPlayer.inJail ? '🔓 ปลดปล่อยจากคดียักยอก' : '⛓️ ขัง/สั่งหยุดเดิน 1 ตา'}
              </button>
            </div>

            {/* Quick Game Rules Presets */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2 uppercase tracking-wide">
                  ⚡ ปุ่มลัดตามกติกาของเกม (คลิกเดียวทำงานทันที)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => onUpdateBalance(selectedPlayer.id, 1000, 'ผ่านจุดเริ่มต้น รับเงินเดือน')}
                    className="p-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs text-left transition flex items-center justify-between"
                  >
                    <span>🏁 ผ่านจุดเริ่มต้น</span>
                    <span className="font-bold">+1,000 ฿</span>
                  </button>

                  <button
                    onClick={() => onUpdateBalance(selectedPlayer.id, 500, 'ตกที่จุดเริ่มต้น ได้รับโบนัส')}
                    className="p-3 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 font-semibold text-xs text-left transition flex items-center justify-between"
                  >
                    <span>🎯 ตกจุดเริ่มต้น</span>
                    <span className="font-bold">+500 ฿</span>
                  </button>

                  <button
                    onClick={() => onUpdateBalance(selectedPlayer.id, -300, 'เสียภาษีสิ่งแวดล้อม')}
                    className="p-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-semibold text-xs text-left transition flex items-center justify-between"
                  >
                    <span>💸 เสียภาษี</span>
                    <span className="font-bold">-300 ฿</span>
                  </button>

                  <button
                    onClick={() => {
                      onUpdateBalance(selectedPlayer.id, -500, 'คดียักยอก เสียค่าปรับ 500 ฿');
                      if (!selectedPlayer.inJail) onToggleJail(selectedPlayer.id);
                    }}
                    className="p-3 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-semibold text-xs text-left transition flex items-center justify-between"
                  >
                    <span>⛓️ คดียักยอก</span>
                    <span className="font-bold">-500 ฿</span>
                  </button>

                  <button
                    onClick={() => onUpdateSdgPoints(selectedPlayer.id, 1, 'ทำกิจกรรมความยั่งยืน')}
                    className="p-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold text-xs text-left transition flex items-center justify-between"
                  >
                    <span>🌱 กิจกรรมสีเขียว</span>
                    <span className="font-bold">+1 แต้ม</span>
                  </button>

                  <button
                    onClick={() => onUpdateSdgPoints(selectedPlayer.id, -1, 'ปล่อยมลพิษสิ่งแวดล้อม')}
                    className="p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-slate-300 font-semibold text-xs text-left transition flex items-center justify-between"
                  >
                    <span>⚠️ ปล่อยมลพิษ</span>
                    <span className="font-bold">-1 แต้ม</span>
                  </button>
                </div>
              </div>

              {/* Custom Cash Adjustment */}
              <div className="pt-4 border-t border-slate-700/60">
                <label className="text-xs font-semibold text-slate-300 block mb-2 uppercase tracking-wide">
                  💵 กำหนดจำนวนเงินเอง
                </label>
                <div className="flex flex-wrap sm:flex-nowrap gap-2">
                  <input
                    type="number"
                    placeholder="ระบุจำนวนเงิน ฿"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full sm:w-48 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="หมายเหตุ (เช่น ซื้อที่ดิน, จ่ายค่าปรับ)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full sm:flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    onClick={handleCustomAdd}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition whitespace-nowrap shadow"
                  >
                    + เพิ่มเงิน
                  </button>
                  <button
                    onClick={handleCustomDeduct}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition whitespace-nowrap shadow"
                  >
                    - หักเงิน
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Player Transfer Card */}
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-3xl p-5 shadow-xl">
            <h3 className="font-heading font-bold text-white text-base mb-3 flex items-center space-x-2">
              <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
              <span>โอนเงินระหว่างผู้เล่น (เช่น จ่ายค่าเช่าเมื่อตกที่ดินคนอื่น)</span>
            </h3>

            <form onSubmit={handleTransfer} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">ผู้จ่ายเงิน (จาก):</label>
                  <select
                    value={selectedPlayerId}
                    onChange={(e) => setSelectedPlayerId(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    {players.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (฿ {p.balance.toLocaleString()})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">ผู้รับเงิน (ไปยัง):</label>
                  <select
                    value={targetPlayerId}
                    onChange={(e) => setTargetPlayerId(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    {players.map(p => (
                      <option key={p.id} value={p.id} disabled={p.id === selectedPlayerId}>
                        {p.name} (฿ {p.balance.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="จำนวนเงินที่โอน ฿"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs shadow transition whitespace-nowrap"
                >
                  ยืนยันการโอนเงิน
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Banknotes Dispenser / Cash Register (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-3xl p-5 shadow-xl">
            <h3 className="font-heading font-bold text-white text-base mb-1 flex items-center justify-between">
              <span>💵 ลิ้นชักธนบัตรจำลอง (Cash Drawer)</span>
              <span className="text-[11px] text-slate-400">คลิกที่ธนบัตรเพื่อจ่าย/รับ</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              คลิกที่แบงก์เพื่อเพิ่มหรือหักเงินเข้ากระเป๋าของ <b>{selectedPlayer.name}</b>
            </p>

            <div className="space-y-2.5">
              {BANKNOTES.map((note) => (
                <div
                  key={note.value}
                  className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between hover:border-slate-500 transition"
                >
                  <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => onOpenImageModal(note.image, `ธนบัตรใบละ ${note.name}`)}
                  >
                    <img
                      src={note.image}
                      alt={note.name}
                      className="w-16 h-10 object-cover rounded-lg border border-slate-600 shadow hover:scale-105 transition"
                    />
                    <div>
                      <span className="font-heading font-bold text-white text-sm block">{note.name}</span>
                      <span className="text-[10px] text-slate-400">คลิกรูปเพื่อดูภาพขยาย</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => onUpdateBalance(selectedPlayer.id, note.value, `รับธนบัตรใบละ ${note.value} ฿`)}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold transition"
                      title={`เพิ่ม ${note.value} ฿`}
                    >
                      +{note.value}
                    </button>
                    <button
                      onClick={() => onUpdateBalance(selectedPlayer.id, -note.value, `จ่ายธนบัตรใบละ ${note.value} ฿`)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-bold transition"
                      title={`หัก ${note.value} ฿`}
                    >
                      -{note.value}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
