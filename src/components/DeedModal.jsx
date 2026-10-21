import React from 'react';
import { X, Building, Plus, Minus, Check, Eye, AlertCircle, Sparkles } from 'lucide-react';
import { SDG_CARDS } from '../data/gameData';

export default function DeedModal({
  deed,
  players,
  currentPlayer,
  onClose,
  onBuildFactory,
  onSellDeed,
  onCureHazard,
  onOpenImageModal
}) {
  if (!deed) return null;

  const owner = deed.owner ? players.find(p => p.id === deed.owner) : null;
  const currentRent = deed.rent[deed.factories];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold shadow-2xs">
              📜
            </span>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono">โฉนดเลขที่ #{deed.id}</span>
              <h3 className="font-heading font-black text-slate-900 text-base sm:text-lg leading-tight">
                {deed.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto">
          
          {/* Current Owner & Rent Status */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block mb-1">ผู้ครอบครองกรรมสิทธิ์</span>
              <div className="flex items-center space-x-2">
                <span className="text-xl">{owner ? owner.avatar : '🏦'}</span>
                <span className={`text-sm font-bold truncate ${owner ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {owner ? owner.name : 'ธนาคาร (ว่าง)'}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block mb-1">ค่าเช่าปัจจุบัน</span>
              <div className="text-base font-bold text-amber-700 font-mono">
                ฿ {currentRent.toLocaleString()}
                <span className="text-[10px] text-slate-500 font-normal block">
                  ({deed.factories === 0 ? 'ที่ดินเปล่า' : `มีโรงงาน ${deed.factories} แห่ง`})
                </span>
              </div>
            </div>
          </div>

          {/* Active Hazard Warning & Cure Controls */}
          {deed.hazard && (() => {
            const hazardCard = SDG_CARDS.find(c => c.id === deed.hazard);
            const hasMatchingCard = currentPlayer && (currentPlayer.cards || []).includes(hazardCard?.curedBy);
            const solutionCard = hazardCard ? SDG_CARDS.find(c => c.id === hazardCard.curedBy) : null;

            return (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 space-y-2 animate-fadeIn text-slate-800">
                <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                  <span className="flex items-center space-x-1.5">
                    <span className="text-base animate-pulse">☣️</span>
                    <span>ที่ดินติดปัญหา: #{deed.hazard} {hazardCard?.titleTh}</span>
                  </span>
                  <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[10px] font-mono border border-rose-200">
                    -฿200 ทุกตา
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {hazardCard?.desc}
                </p>

                <div className="p-2.5 rounded-xl bg-white border border-rose-200 text-xs flex flex-wrap items-center justify-between gap-2">
                  <span className="text-slate-700 text-[11px]">
                    ต้องแก้ด้วยการ์ด: <b className="text-emerald-700">#{hazardCard?.curedBy} {solutionCard?.titleTh}</b>
                  </span>
                  {hasMatchingCard ? (
                    <button
                      onClick={() => {
                        if (onCureHazard) onCureHazard(deed.id, currentPlayer.id, hazardCard.curedBy);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>ใช้การ์ดรักษา (+฿300 & +2 SDG)</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-amber-700 font-medium">
                      (คุณยังไม่มีการ์ดนี้ในมือ)
                    </span>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Full Rent Schedule Table */}
          <div className="bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs text-slate-600 mb-2 pb-1.5 border-b border-slate-200">
              <span>ราคาซื้อ: <b className="text-emerald-700 font-mono">฿{deed.price.toLocaleString()}</b></span>
              <span>ค่าสร้างโรงงาน: <b className="text-amber-700 font-mono">฿{deed.factoryCost.toLocaleString()}/แห่ง</b></span>
            </div>

            <div className="space-y-1 text-xs">
              {[
                { label: 'ที่ดินเปล่า', rent: deed.rent[0], fac: 0 },
                { label: 'พร้อมโรงงาน 1 แห่ง', rent: deed.rent[1], fac: 1 },
                { label: 'พร้อมโรงงาน 2 แห่ง', rent: deed.rent[2], fac: 2 },
                { label: 'พร้อมโรงงาน 3 แห่ง', rent: deed.rent[3], fac: 3 },
                { label: 'พร้อมโรงงาน 4 แห่ง', rent: deed.rent[4], fac: 4 },
              ].map((row) => (
                <div
                  key={row.fac}
                  className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition ${
                    deed.factories === row.fac && owner
                      ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center space-x-1.5">
                    {deed.factories === row.fac && owner && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    <span>{row.label}</span>
                  </span>
                  <span className="font-mono font-semibold">฿ {row.rent.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Factory Controls (Available for Owner only) */}
          {owner ? (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">สิ่งปลูกสร้าง ({owner.name})</span>
                <span className="text-[11px] text-slate-500">ปัจจุบัน: {deed.factories} / 4 หลัง</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => onBuildFactory(deed.id, -1)}
                  disabled={deed.factories <= 0}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 border border-slate-200 text-xs font-bold transition flex items-center space-x-1"
                >
                  <Minus className="w-3 h-3" />
                  <span>รื้อ</span>
                </button>
                <button
                  onClick={() => onBuildFactory(deed.id, 1)}
                  disabled={deed.factories >= 4}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-bold shadow-xs transition flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>สร้าง (+฿{deed.factoryCost})</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-2.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center space-x-2 text-xs text-emerald-800">
              <AlertCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>
                <b>กติกา:</b> โฉนดนี้ยังว่างอยู่ จะสามารถซื้อได้เมื่อเดินมาตกที่ช่องนี้เท่านั้น
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
          <button
            onClick={() => onOpenImageModal(deed.image, `โฉนด: ${deed.name}`)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-sky-800 bg-white hover:bg-sky-50 border border-sky-300 transition flex items-center space-x-1.5 shadow-2xs"
          >
            <Eye className="w-4 h-4 text-sky-600" />
            <span>ดูภาพโฉนดจริง</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white transition ml-auto shadow-xs"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
