import React, { useState } from 'react';
import { Layers, Search, Filter, Eye, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { SDG_CARDS } from '../data/gameData';

export default function CardDrawer({
  onOpenImageModal
}) {
  const [currentCard, setCurrentCard] = useState(SDG_CARDS[0]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = SDG_CARDS.filter((card) => {
    const matchesCat = filterCategory === 'all' || card.category === filterCategory;
    const matchesType = filterType === 'all' || card.type === filterType;
    const matchesSearch = card.titleTh.includes(searchTerm) || card.titleEn.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesType && matchesSearch;
  });

  const getCategoryTheme = (category) => {
    switch (category) {
      case 'marine':
        return {
          title: 'SDG 14: Marine Ecosystem (นิเวศทางทะเล)',
          badge: 'bg-sky-50 text-sky-800 border-sky-300',
        };
      case 'climate':
        return {
          title: 'SDG 13: Climate Change (สภาพภูมิอากาศ)',
          badge: 'bg-amber-50 text-amber-900 border-amber-300',
        };
      case 'land':
        return {
          title: 'SDG 15: Terrestrial Ecosystem (ระบบนิเวศบนบก)',
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        };
      default:
        return {
          title: 'SDGs Card',
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 text-slate-800">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 border border-purple-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-2xl sm:text-3xl shadow-xs">
            🃏
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-heading font-black text-slate-900">
              คลังการ์ดภารกิจสิ่งแวดล้อม SDGs (30 ใบ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              เรียนรู้ปัญหาสิ่งแวดล้อม 3 ด้าน (ทะเล, สภาพอากาศ, ผืนดิน) และแนวทางแก้ไข
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-purple-600 shrink-0" />
          <span><b>กติกา:</b> การจั่วการ์ดจะเกิดขึ้นเมื่อเดินตกช่อง "สุ่ม" บนกระดาน</span>
        </div>
      </div>

      {/* Main Interactive Gallery Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Card Detailed Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md">
          <div className="w-full max-w-xs text-center">
            {currentCard && (
              <div>
                {/* Real Card Image */}
                <div 
                  className="cursor-pointer relative group rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
                  onClick={() => onOpenImageModal(currentCard.image, `${currentCard.titleTh} (${currentCard.titleEn})`)}
                >
                  <img
                    src={currentCard.image}
                    alt={currentCard.titleTh}
                    className="w-full h-auto aspect-[750/1050] object-contain block"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>คลิกเพื่อดูรูปขยาย HD</span>
                  </div>
                </div>

                {/* Card Info Box */}
                <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryTheme(currentCard.category).badge}`}>
                      {getCategoryTheme(currentCard.category).title.split(' ')[0]}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentCard.type === 'solution' 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {currentCard.type === 'solution' ? '🌿 แนวทางแก้ไข' : '⚠️ ปัญหาสิ่งแวดล้อม'}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-slate-900 text-base">
                    {currentCard.titleTh}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {currentCard.titleEn}
                  </p>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentCard.desc}
                  </p>

                  {/* Card Pair Matching Info */}
                  {currentCard.type === 'hazard' ? (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-left space-y-1">
                      <div className="flex items-center justify-between font-bold text-rose-800">
                        <span>🚨 การจับคู่แก้ไขปัญหา</span>
                        <span className="font-mono text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
                          แก้ด้วยการ์ด #{currentCard.curedBy}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {currentCard.matchDesc || `ต้องใช้การ์ดช่วยเหลือ #${currentCard.curedBy} เพื่อฟื้นฟู`}
                      </p>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-left space-y-1">
                      <div className="flex items-center justify-between font-bold text-emerald-800">
                        <span>✨ การจับคู่แก้ไขปัญหา</span>
                        <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                          ใช้แก้ปัญหา #{currentCard.cures}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {currentCard.matchDesc || `สามารถใช้รักษาและฟื้นฟูปัญหาสิ่งแวดล้อม #${currentCard.cures}`}
                      </p>
                    </div>
                  )}

                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{currentCard.effect}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Explorer / Deck Browser (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
            <h3 className="font-heading font-black text-slate-900 text-base flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>สารานุกรมการ์ด ({filteredCards.length} ใบ)</span>
            </h3>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:bg-white focus:outline-none"
              >
                <option value="all">ทุกด้าน SDGs</option>
                <option value="marine">SDG 14 ทางทะเล (1-10)</option>
                <option value="climate">SDG 13 สภาพอากาศ (11-20)</option>
                <option value="land">SDG 15 ผืนดิน (21-30)</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:bg-white focus:outline-none"
              >
                <option value="all">ทั้งหมด (ปัญหา + ทางแก้)</option>
                <option value="hazard">⚠️ ปัญหาสิ่งแวดล้อม</option>
                <option value="solution">🌿 แนวทางแก้ไข</option>
              </select>
            </div>
          </div>

          {/* Cards List Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredCards.map((card) => {
              const isSelected = currentCard?.id === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => setCurrentCard(card)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50/70 shadow-sm ring-2 ring-purple-400/40'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                      <span className="font-mono font-bold">#{card.id}</span>
                      <span className={`px-1.5 py-0.2 rounded font-bold ${
                        card.type === 'solution' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                      }`}>
                        {card.type === 'solution' ? 'ทางแก้' : 'ปัญหา'}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight">
                      {card.titleTh}
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px]">
                    <span className="text-amber-700 font-bold font-mono">
                      {card.moneyChange > 0 ? `+${card.moneyChange}฿` : card.moneyChange < 0 ? `${card.moneyChange}฿` : '0฿'}
                    </span>
                    <span className="text-slate-500">
                      {card.sdgPoints > 0 ? `+${card.sdgPoints}⭐` : card.sdgPoints < 0 ? `${card.sdgPoints}⭐` : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
