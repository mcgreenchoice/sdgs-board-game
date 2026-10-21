import React, { useState, useEffect } from 'react';
import { X, Building, DollarSign, AlertTriangle, Sparkles, Shuffle, ShieldAlert, Award, ArrowRight } from 'lucide-react';
import { SDG_CARDS } from '../data/gameData';

export default function TurnActionModal({
  isOpen,
  tile,
  player,
  deeds,
  players,
  onClose,
  onBuyProperty,
  onPayRent,
  onBuildFactory,
  onApplyCardEffect,
  onPayTax,
  onEnterJail,
  onStealMoney,
  onStealCard,
  onApplyHazardToDeed,
  onAddCardToHand,
  onCureHazard,
  onOpenImageModal
}) {
  const [chanceCard, setChanceCard] = useState(null);
  const [isFlippingCard, setIsFlippingCard] = useState(false);
  const [selectedHazardDeed, setSelectedHazardDeed] = useState(null);
  const [selectedStealTarget, setSelectedStealTarget] = useState(null);

  useEffect(() => {
    if (isOpen && tile && tile.type === 'chance') {
      setIsFlippingCard(true);
      const timer = setTimeout(() => {
        const randomCard = SDG_CARDS[Math.floor(Math.random() * SDG_CARDS.length)];
        setChanceCard(randomCard);
        setIsFlippingCard(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen, tile]);

  useEffect(() => {
    if (isOpen && tile && tile.type === 'steal') {
      const otherPlayers = players.filter(p => p.id !== player.id);
      if (otherPlayers.length > 0) {
        setSelectedStealTarget(otherPlayers[0].id);
      }
    }
  }, [isOpen, tile]);

  if (!isOpen || !tile || !player) return null;

  const deed = tile.deedId ? deeds.find(d => d.id === tile.deedId) : null;
  const owner = deed?.owner ? players.find(p => p.id === deed.owner) : null;
  const isOwner = deed && deed.owner === player.id;
  const rentAmount = deed ? deed.rent[deed.factories] : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-slate-800">
        
        {/* Modal Header */}
        <div className="p-3.5 sm:p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <span className="text-xl sm:text-2xl">{player.avatar}</span>
            <div>
              <span className="text-xs text-slate-500">ตาของ: <b className="text-slate-900">{player.name}</b></span>
              <h3 className="font-heading font-black text-slate-900 text-sm sm:text-base leading-tight">
                ตกช่อง #{tile.index}: {tile.name}
              </h3>
            </div>
          </div>
          <span className="text-[11px] sm:text-xs font-mono px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold">
            ฿{player.balance.toLocaleString()}
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-3.5 max-h-[78vh] overflow-y-auto">
          
          {/* CASE 1: Unowned Property -> Player can choose to BUY or PASS */}
          {deed && !owner && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
                <span className="text-3xl block mb-1">🏢</span>
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                  ที่ดินว่าง (ยังไม่มีเจ้าของ)
                </span>
                <h4 className="font-heading font-bold text-slate-900 text-base mt-0.5">{deed.name}</h4>
                
                <div className="text-2xl font-black text-emerald-700 my-1.5 font-heading font-mono">
                  ราคาซื้อ: ฿ {deed.price.toLocaleString()}
                </div>
                
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1 text-left">
                  <div className="flex justify-between">
                    <span>ค่าเช่าที่ดินเปล่า:</span>
                    <b className="text-slate-900 font-mono">฿ {deed.rent[0]}</b>
                  </div>
                  <div className="flex justify-between">
                    <span>ค่าสร้างโรงงาน:</span>
                    <b className="text-amber-700 font-mono">฿ {deed.factoryCost} / แห่ง</b>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onBuyProperty(deed.id, player.id, deed.price);
                    onClose();
                  }}
                  disabled={player.balance < deed.price}
                  className="w-full py-3 rounded-xl font-heading font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md transition active:scale-98"
                >
                  {player.balance >= deed.price 
                    ? `ตกลงซื้อที่ดิน (จ่าย ฿ ${deed.price.toLocaleString()})` 
                    : 'เงินสดไม่พอซื้อที่ดินนี้'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenImageModal(deed.image, `โฉนด: ${deed.name}`)}
                    className="flex-1 py-2 rounded-xl text-xs font-medium text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition"
                  >
                    ดูภาพโฉนดจริง
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
                  >
                    ไม่ซื้อ (ข้ามไป)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CASE 2: Opponent's Property -> MUST Pay Rent */}
          {deed && owner && !isOwner && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                <span className="text-3xl block mb-1">⚠️</span>
                <span className="text-[10px] text-rose-800 font-bold uppercase tracking-wider block">
                  ตกที่ดินของฝ่ายตรงข้าม
                </span>
                <h4 className="font-heading font-bold text-slate-900 text-base mt-0.5">{deed.name}</h4>
                <p className="text-xs text-rose-800 mt-1">
                  เป็นกรรมสิทธิ์ของ <b>{owner.name}</b> {deed.factories > 0 && `(มีโรงงาน ${deed.factories} แห่ง 🏭)`}
                </p>
                
                <div className="text-3xl font-black text-rose-700 my-2 font-heading font-mono">
                  ค่าเช่า: ฿ {rentAmount.toLocaleString()}
                </div>
              </div>

              <button
                onClick={() => {
                  onPayRent(player.id, owner.id, rentAmount, `ค่าเช่า ${deed.name}`);
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl font-heading font-bold text-sm bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white shadow-md transition active:scale-98"
              >
                จ่ายค่าเช่า ฿ {rentAmount.toLocaleString()} ให้ {owner.name}
              </button>
            </div>
          )}

          {/* CASE 3: Player's Own Property -> Option to upgrade factory */}
          {deed && isOwner && (
            <div className="space-y-3.5 text-center">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                <span className="text-3xl block mb-1">🏡</span>
                <span className="text-[10px] text-sky-800 font-bold uppercase tracking-wider block">
                  ที่ดินของคุณเอง
                </span>
                <h4 className="font-heading font-bold text-slate-900 text-base mt-0.5">{deed.name}</h4>
                <p className="text-xs text-slate-600 mt-1">
                  ปัจจุบันมีโรงงาน: <b>{deed.factories} / 4 หลัง</b>
                </p>
                <p className="text-xs text-amber-700 font-bold mt-0.5">
                  ค่าเช่าปัจจุบัน: ฿ {deed.rent[deed.factories].toLocaleString()}
                </p>
              </div>

              {deed.factories < 4 ? (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onBuildFactory(deed.id, 1);
                      onClose();
                    }}
                    disabled={player.balance < deed.factoryCost}
                    className="w-full py-3 rounded-xl font-heading font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:opacity-40 text-white shadow-md transition active:scale-98"
                  >
                    {player.balance >= deed.factoryCost 
                      ? `สร้างโรงงานเพิ่ม (+1) จ่าย ฿ ${deed.factoryCost.toLocaleString()}` 
                      : 'เงินสดไม่พอสร้างโรงงาน'}
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    ไม่สร้าง (เสร็จสิ้น)
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-emerald-700 font-bold">ที่ดินแปลงนี้พัฒนาโรงงานเต็ม 4 หลังแล้ว!</p>
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white transition"
                  >
                    ตกลง
                  </button>
                </div>
              )}
            </div>
          )}

          {/* CASE 4: Chance Tile -> Automatic Random Card Draw */}
          {tile.type === 'chance' && (
            <div className="space-y-3.5 text-center">
              {isFlippingCard || !chanceCard ? (
                <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col items-center justify-center space-y-3">
                  <Shuffle className="w-8 h-8 text-purple-600 animate-spin" />
                  <p className="font-heading font-bold text-purple-900 text-sm">
                    กำลังสุ่มจั่วการ์ดภารกิจ SDGs จากกอง...
                  </p>
                </div>
              ) : (
                <div className="space-y-3 animate-fadeIn">
                  {/* Card Preview */}
                  <div 
                    onClick={() => onOpenImageModal(chanceCard.image, `${chanceCard.titleTh} (${chanceCard.titleEn})`)}
                    className="cursor-pointer max-w-[220px] mx-auto rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
                    title="คลิกดูภาพขยาย HD"
                  >
                    <img
                      src={chanceCard.image}
                      alt={chanceCard.titleTh}
                      className="w-full h-auto aspect-[750/1050] object-contain block"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                        {chanceCard.category.toUpperCase()} • ใบที่ #{chanceCard.id}
                      </span>
                      <span className={`font-bold px-2 py-0.5 rounded ${
                        chanceCard.type === 'solution' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {chanceCard.type === 'solution' ? '🌿 การ์ดช่วยเหลือ' : '⚠️ การ์ดปัญหา'}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-slate-900 text-sm">
                      {chanceCard.titleTh}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {chanceCard.titleEn}
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {chanceCard.desc}
                    </p>

                    {/* Pairing & Mechanics Information */}
                    {chanceCard.type === 'hazard' ? (
                      <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-rose-800">
                          <span>🚨 ปัญหาสิ่งแวดล้อม</span>
                          <span className="bg-rose-100 px-2 py-0.5 rounded font-mono text-[10px] border border-rose-200">
                            แก้ด้วยการ์ด #{chanceCard.curedBy}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {chanceCard.matchDesc || `ต้องใช้การ์ดช่วยเหลือ #${chanceCard.curedBy} ในการฟื้นฟู`}
                        </p>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-emerald-800">
                          <span>✨ แนวทางแก้ไขและฟื้นฟู</span>
                          <span className="bg-emerald-100 px-2 py-0.5 rounded font-mono text-[10px] border border-emerald-200">
                            ใช้แก้ปัญหา #{chanceCard.cures}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {chanceCard.matchDesc || `สามารถใช้รักษาและฟื้นฟูปัญหาสิ่งแวดล้อมหมายเลข #${chanceCard.cures}`}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions for Hazard Card */}
                  {chanceCard.type === 'hazard' && (() => {
                    const playerOwnedDeeds = deeds.filter(d => d.owner === player.id);
                    const targetDeedId = selectedHazardDeed || (playerOwnedDeeds.length > 0 ? playerOwnedDeeds[0].id : null);
                    const targetDeed = deeds.find(d => d.id === targetDeedId);

                    if (playerOwnedDeeds.length > 0) {
                      return (
                        <div className="space-y-2.5 pt-1 text-left">
                          <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 shadow-xs">
                            <label className="text-xs text-slate-700 font-semibold block">
                              📍 เลือกที่ดินของคุณที่จะวางการ์ดปัญหานี้:
                            </label>
                            <select
                              value={targetDeedId || ''}
                              onChange={(e) => setSelectedHazardDeed(Number(e.target.value))}
                              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:outline-none"
                            >
                              {playerOwnedDeeds.map(d => (
                                <option key={d.id} value={d.id}>
                                  {d.name} {d.hazard ? `(มีปัญหา #${d.hazard} อยู่แล้ว)` : ''}
                                </option>
                              ))}
                            </select>
                            <p className="text-[11px] text-amber-800 leading-tight pt-0.5">
                              ⚠️ ที่ดินที่ถูกวางการ์ดปัญหา จะถูกหักเงิน <b>฿200 ทุกๆ ตา</b> จนกว่าจะนำการ์ด <b>#{chanceCard.curedBy}</b> มารักษา
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              if (targetDeedId && onApplyHazardToDeed) {
                                onApplyHazardToDeed(targetDeedId, chanceCard.id);
                              } else {
                                onApplyCardEffect(player.id, chanceCard);
                              }
                              onClose();
                            }}
                            className="w-full py-3 rounded-xl font-heading font-bold text-xs sm:text-sm bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white shadow-md transition active:scale-98"
                          >
                            ☣️ ยืนยันวางการ์ดปัญหา #{chanceCard.id} ลงที่ดิน "{targetDeed?.name}"
                          </button>
                        </div>
                      );
                    } else {
                      return (
                        <div className="space-y-2.5 pt-1">
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 text-left">
                            <p className="text-amber-800 font-semibold mb-1">ℹ️ คุณยังไม่มีที่ดินในครอบครอง</p>
                            <p className="text-[11px] text-slate-600">
                              เนื่องจากไม่มีที่ดินให้วางการ์ดปัญหาสิ่งแวดล้อม ผู้เล่นจะต้องชำระค่าปรับมลพิษ ฿ 300 ให้แก่ธนาคารแทน
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              onPayTax(player.id, 300);
                              onClose();
                            }}
                            className="w-full py-3 rounded-xl font-heading font-bold text-xs sm:text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition active:scale-98"
                          >
                            💸 ชำระค่าปรับมลพิษ ฿ 300 เข้าธนาคาร
                          </button>
                        </div>
                      );
                    }
                  })()}

                  {/* Actions for Solution Card */}
                  {chanceCard.type === 'solution' && (() => {
                    const contaminatedDeed = deeds.find(d => d.hazard === chanceCard.cures);
                    const currentHandCount = (player.cards || []).length;
                    const canAddToHand = currentHandCount < 5;

                    return (
                      <div className="space-y-2 pt-1">
                        {contaminatedDeed && (
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-left space-y-2">
                            <div className="text-xs text-emerald-800 font-bold flex items-center space-x-1.5">
                              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>พบที่ดินที่ตรงกับปัญหา: "{contaminatedDeed.name}"!</span>
                            </div>
                            <p className="text-[11px] text-slate-600">
                              ที่ดินนี้กำลังติดปัญหาสิ่งแวดล้อม #{chanceCard.cures} คุณสามารถใช้การ์ดใบนี้รักษาได้ทันที (+฿300 & +2 SDG)!
                            </p>
                            <button
                              onClick={() => {
                                if (onCureHazard) {
                                  onCureHazard(contaminatedDeed.id, player.id, chanceCard.id);
                                }
                                onClose();
                              }}
                              className="w-full py-2.5 rounded-lg font-heading font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition"
                            >
                              ✨ ใช้รักษาที่ดิน "{contaminatedDeed.name}" ทันที
                            </button>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            if (onAddCardToHand) {
                              onAddCardToHand(player.id, chanceCard.id);
                            }
                            onClose();
                          }}
                          disabled={!canAddToHand}
                          className="w-full py-3 rounded-xl font-heading font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white shadow-md transition active:scale-98"
                        >
                          {canAddToHand 
                            ? `📥 เก็บการ์ดช่วยเหลือเข้ามือ (${currentHandCount}/5 ใบ)` 
                            : 'การ์ดในมือเต็ม 5 ใบแล้ว'}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* CASE 5: Tax Tile */}
          {tile.type === 'tax' && (
            <div className="space-y-3.5 text-center">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <span className="text-4xl block mb-1">💸</span>
                <span className="text-[10px] text-rose-800 font-bold uppercase tracking-wider block">
                  ช่องเสียภาษีสิ่งแวดล้อม
                </span>
                <h4 className="font-heading font-bold text-slate-900 text-base mt-0.5">ชำระภาษีบำรุงสังคม</h4>
                <div className="text-3xl font-black text-rose-700 my-2 font-heading font-mono">
                  - 300 ฿
                </div>
              </div>

              <button
                onClick={() => {
                  onPayTax(player.id, 300);
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl font-heading font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition active:scale-98"
              >
                ชำระภาษี 300 ฿ เข้าธนาคาร
              </button>
            </div>
          )}

          {/* CASE 6: Jail Tile */}
          {tile.type === 'jail' && (
            <div className="space-y-3.5 text-center">
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200">
                <span className="text-4xl block mb-1">⛓️</span>
                <span className="text-[10px] text-orange-800 font-bold uppercase tracking-wider block">
                  คดียักยอกทรัพย์
                </span>
                <h4 className="font-heading font-bold text-slate-900 text-base mt-0.5">ถูกสั่งระงับและปรับเงิน</h4>
                <div className="text-3xl font-black text-orange-700 my-2 font-heading font-mono">
                  - 500 ฿ + หยุดเดิน 1 ตา
                </div>
              </div>

              <button
                onClick={() => {
                  onEnterJail(player.id, 500);
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl font-heading font-bold text-sm bg-orange-600 hover:bg-orange-700 text-white shadow-md transition active:scale-98"
              >
                รับโทษหยุดเดิน 1 ตา และจ่าย 500 ฿
              </button>
            </div>
          )}

          {/* CASE 7: Steal Tile */}
          {tile.type === 'steal' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center">
                <span className="text-4xl block mb-1">🥷</span>
                <span className="text-[10px] text-indigo-800 font-bold uppercase tracking-wider block">
                  ช่อง STEAL (ขโมย)
                </span>
                <h4 className="font-heading font-bold text-slate-900 text-base mt-0.5">เลือกขโมยทรัพยากร</h4>
                <p className="text-xs text-slate-600 mt-1">สามารถเลือกขโมยการ์ดช่วยเหลือ 1 ใบ หรือขโมยเงิน 200 ฿</p>
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-medium">เลือกเป้าหมายที่ต้องการขโมย:</label>
                <select
                  value={selectedStealTarget || ''}
                  onChange={(e) => setSelectedStealTarget(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:outline-none"
                >
                  {players.filter(p => p.id !== player.id).map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (มีเงิน ฿{p.balance.toLocaleString()} | การ์ด {(p.cards || []).length} ใบ)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (selectedStealTarget && onStealCard) {
                      onStealCard(player.id, selectedStealTarget);
                      onClose();
                    } else if (selectedStealTarget) {
                      onStealMoney(player.id, selectedStealTarget, 200);
                      onClose();
                    }
                  }}
                  className="w-full py-3 rounded-xl font-heading font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md transition active:scale-98"
                >
                  🎴 ขโมยการ์ดช่วยเหลือ 1 ใบ
                </button>

                <button
                  onClick={() => {
                    if (selectedStealTarget) {
                      onStealMoney(player.id, selectedStealTarget, 200);
                      onClose();
                    }
                  }}
                  className="w-full py-2.5 rounded-xl font-heading font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                >
                  💵 ขโมยเงินสด 200 ฿ แทน
                </button>
              </div>
            </div>
          )}

          {/* CASE 8: Start Tile */}
          {tile.type === 'start' && (
            <div className="space-y-3.5 text-center">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-4xl block mb-1">🏁</span>
                <h4 className="font-heading font-bold text-slate-900 text-base">จุดเริ่มต้น (Start)</h4>
                <p className="text-xs text-amber-800 mt-1">
                  ตกจุดเริ่มต้นพอดี ได้รับโบนัสพิเศษ +500 ฿!
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-heading font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition active:scale-98"
              >
                ตกลง
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
