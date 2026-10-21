import React, { useState } from 'react';
import { Building2, Search, Filter, Eye, Plus, Minus, AlertCircle, Info } from 'lucide-react';
import { DEEDS_DATA } from '../data/gameData';

export default function PropertyManager({
  deeds,
  players,
  onBuildFactory,
  onOpenDeedModal,
  onOpenImageModal
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('all');
  const [filterOwner, setFilterOwner] = useState('all');

  const filteredDeeds = deeds.filter((deed) => {
    const matchesSearch = deed.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = filterGroup === 'all' || deed.group === filterGroup;
    const matchesOwner = filterOwner === 'all' || 
      (filterOwner === 'unowned' && !deed.owner) ||
      (deed.owner === Number(filterOwner));
    return matchesSearch && matchesGroup && matchesOwner;
  });

  const getGroupBadge = (group) => {
    switch (group) {
      case 'marine': return { label: 'SDG 14 ทะเล', class: 'bg-sky-50 text-sky-800 border-sky-300' };
      case 'climate': return { label: 'SDG 13 สภาพอากาศ', class: 'bg-orange-50 text-orange-800 border-orange-300' };
      case 'land': return { label: 'SDG 15 ผืนดิน', class: 'bg-emerald-50 text-emerald-800 border-emerald-300' };
      case 'corporate': return { label: 'องค์กรพันธมิตร', class: 'bg-blue-50 text-blue-800 border-blue-300' };
      default: return { label: 'อุตสาหกรรม', class: 'bg-purple-50 text-purple-800 border-purple-300' };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 text-slate-800">
      {/* Top Banner & Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-100 border border-sky-300 flex items-center justify-center text-xl sm:text-2xl shadow-xs">
              🏢
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-heading font-black text-slate-900">
                สมุดทะเบียนโฉนดที่ดิน & โรงงาน (30 แห่ง)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                ตรวจสอบสถานะกรรมสิทธิ์ อัตราค่าเช่า (ซื้อที่ดินได้เมื่อเดินตกช่องบนกระดาน)
              </p>
            </div>
          </div>

          {/* Quick Summary Counts */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
              ครอบครองแล้ว: <b className="text-emerald-700">{deeds.filter(d => d.owner).length}</b> / 30
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
              โรงงาน: <b className="text-amber-700">{deeds.reduce((s, d) => s + d.factories, 0)}</b> 🏭
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="ค้นหาชื่อที่ดิน / บริษัท..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:bg-white focus:outline-none"
            >
              <option value="all">ทุกหมวดหมู่ SDGs</option>
              <option value="marine">SDG 14 ทางทะเล</option>
              <option value="climate">SDG 13 สภาพอากาศ</option>
              <option value="land">SDG 15 ผืนดิน</option>
              <option value="corporate">องค์กร/บริษัท</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={filterOwner}
              onChange={(e) => setFilterOwner(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:bg-white focus:outline-none"
            >
              <option value="all">เจ้าของทั้งหมด</option>
              <option value="unowned">เฉพาะที่ว่าง (ยังไม่มีเจ้าของ)</option>
              {players.map(p => (
                <option key={p.id} value={p.id}>ของ {p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Deeds Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filteredDeeds.map((deed) => {
          const owner = deed.owner ? players.find(p => p.id === deed.owner) : null;
          const currentRent = deed.rent[deed.factories];
          const badge = getGroupBadge(deed.group);

          return (
            <div
              key={deed.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between p-3.5 sm:p-4 ${
                owner
                  ? 'bg-white border-emerald-300 shadow-md ring-1 ring-emerald-400/30'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.class}`}>
                    {badge.label}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    โฉนด #{deed.id}
                  </span>
                </div>

                <h3 className="font-heading font-black text-slate-900 text-sm line-clamp-1 mb-1" title={deed.name}>
                  {deed.name}
                </h3>

                {/* Owner Status */}
                <div className="flex items-center space-x-2 my-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-base">{owner ? owner.avatar : '🏦'}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-slate-500 block">ผู้ครอบครอง</span>
                    <span className={`text-xs font-semibold truncate block ${owner ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                      {owner ? owner.name : 'ธนาคาร (ว่างอยู่)'}
                    </span>
                  </div>
                  {owner && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                      {deed.factories} 🏭
                    </span>
                  )}
                </div>

                {/* Rent Table Preview */}
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-[11px] space-y-1 mb-2.5">
                  <div className="flex justify-between items-center text-slate-600 pb-1 border-b border-slate-200">
                    <span>ราคา: <b className="text-slate-900 font-mono">฿{deed.price}</b></span>
                    <span>ค่าโรงงาน: <b className="text-amber-700 font-mono">฿{deed.factoryCost}</b></span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-center pt-0.5">
                    {[0, 1, 2, 3, 4].map(level => (
                      <div
                        key={level}
                        className={`p-1 rounded ${
                          deed.factories === level && owner
                            ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                            : 'text-slate-600'
                        }`}
                      >
                        <span className="text-[9px] block">{level === 0 ? 'ที่ดิน' : `${level} รง.`}</span>
                        <span className="font-mono">{deed.rent[level]}฿</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => onOpenImageModal(deed.image, `โฉนด: ${deed.name}`)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center justify-center space-x-1 border border-slate-200"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-600" />
                    <span>รูปโฉนด</span>
                  </button>
                  <button
                    onClick={() => onOpenDeedModal(deed)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-emerald-800 transition flex items-center justify-center space-x-1 border border-slate-200"
                  >
                    <Info className="w-3.5 h-3.5 text-emerald-600" />
                    <span>รายละเอียด</span>
                  </button>
                </div>

                {owner && (
                  <div className="flex items-center space-x-1 text-xs">
                    <button
                      onClick={() => onBuildFactory(deed.id, 1)}
                      disabled={deed.factories >= 4}
                      className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 font-bold transition flex items-center justify-center space-x-0.5 shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>สร้างโรงงาน (฿{deed.factoryCost})</span>
                    </button>
                    <button
                      onClick={() => onBuildFactory(deed.id, -1)}
                      disabled={deed.factories <= 0}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-600 border border-slate-200 font-bold transition"
                      title="รื้อโรงงาน"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
