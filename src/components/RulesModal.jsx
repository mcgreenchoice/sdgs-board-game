import React from 'react';
import { X, ShieldCheck, Heart, Leaf, Sun, Award, AlertTriangle, Sparkles } from 'lucide-react';

export default function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[88vh] text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg sm:text-xl">
              📜
            </span>
            <div>
              <h3 className="font-heading font-black text-slate-900 text-sm sm:text-lg">
                กติกาเกมเศรษฐี SDGs "MC THE GREEN CHOICE"
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500">
                โรงเรียนมงฟอร์ตวิทยาลัย • แผนการเรียนรู้เป้าหมายความยั่งยืน
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Section 1 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-heading font-bold text-emerald-800 text-sm flex items-center space-x-1.5">
              <span>🎯</span>
              <span>1. เป้าหมายของเกม และเงื่อนไขชนะ</span>
            </h4>
            <p className="text-slate-700 text-xs">
              ผู้เล่นจะต้องบริหารเงินทุน <b>฿ 25,000</b> เริ่มต้น ซื้อที่ดินและพัฒนาโรงงาน สร้างรายได้จากค่าเช่า พร้อมทั้งดูแลสิ่งแวดล้อม
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
              <li><b>ชนะทันที:</b> เมื่อทำให้ผู้เล่นคู่แข่งทุกคนล้มละลาย (เงินสดหมดตัว)</li>
              <li><b>ชนะตามคะแนนรวม:</b> เมื่อเกมจบลง ผู้เล่นที่มี <b>มูลค่าทรัพย์สินรวม (เงินสด + มูลค่าที่ดินและโรงงาน)</b> สูงที่สุดจะเป็นผู้ชนะ</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-heading font-bold text-amber-800 text-sm flex items-center space-x-1.5">
              <span>🏢</span>
              <span>2. การซื้อที่ดินและสร้างโรงงาน</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
              <li>เมื่อเดินตกช่องที่ดินที่ยังไม่มีเจ้าของ สามารถเลือกซื้อกรรมสิทธิ์ได้ตามราคาที่ระบุบนโฉนด</li>
              <li>หากเดินตกที่ดินของผู้อื่น จะต้องจ่ายค่าเช่าให้แก่เจ้าของทันทีตามอัตราในโฉนด</li>
              <li>เจ้าของสามารถสร้างโรงงานเพิ่มได้สูงสุด 4 หลัง เพื่อเพิ่มอัตราค่าเช่า</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-heading font-bold text-rose-800 text-sm flex items-center space-x-1.5">
              <span>☣️</span>
              <span>3. การ์ดปัญหา และการหักเงินต่อเนื่อง</span>
            </h4>
            <p className="text-slate-700 text-xs">
              เมื่อเดินตกช่อง "สุ่มการ์ด SDGs" หากได้ <b>การ์ดปัญหาสิ่งแวดล้อม</b> (มีเลขกำกับ เช่น #1, #11, #21):
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
              <li>จะต้องเลือกวางการ์ดปัญหาลงบนที่ดิน 1 แปลงของตนเอง</li>
              <li>ที่ดินที่ติดปัญหาจะขึ้นสัญลักษณ์ ☣️ และเจ้าของจะ <b>ถูกหักเงิน ฿200 ทุกเทิร์นไปเรื่อยๆ</b> จนกว่าจะได้รับการรักษา</li>
              <li>หากยังไม่มีที่ดิน จะต้องจ่ายค่าปรับมลพิษ ฿300 ให้ธนาคารแทน</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-heading font-bold text-sky-800 text-sm flex items-center space-x-1.5">
              <span>🌿</span>
              <span>4. การ์ดช่วยเหลือ และการฟื้นฟูสิ่งแวดล้อม</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
              <li>ผู้เล่นทุกคนได้รับการ์ดช่วยเหลือในมือคนละ <b>3 ใบ</b> ตั้งแต่เริ่มเกม (ถือได้สูงสุด 5 ใบ)</li>
              <li>การ์ดช่วยเหลือแต่ละใบจะมีหมายเลขระบุว่า <b>ใช้แก้ปัญหาหมายเลขใด</b> (เช่น การ์ดช่วย #6 แก้ปัญหา #1)</li>
              <li>เมื่อนำการ์ดช่วยมารักษาที่ดินที่มีปัญหาได้สำเร็จ:
                <ul className="list-circle pl-5 pt-1 space-y-0.5 text-emerald-800 font-semibold">
                  <li>สถานะปนเปื้อน ☣️ บนที่ดินจะหายไปทันที (หยุดโดนหักเงินทุกเทิร์น)</li>
                  <li>ผู้รักษาจะได้รับเงินรางวัล <b>฿ 300</b> และ <b>+2 แต้ม SDG Points</b></li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-heading font-bold text-purple-800 text-sm flex items-center space-x-1.5">
              <span>🥷</span>
              <span>5. ช่องพิเศษ (STEAL & ยักยอก)</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
              <li><b>ช่อง STEAL (ช่อง 19):</b> สามารถเลือกขโมยการ์ดช่วยเหลือ 1 ใบ หรือขโมยเงิน 200 ฿</li>
              <li><b>ช่องยักยอก (ช่อง 28):</b> ถูกปรับเงิน 500 ฿ และหยุดเดิน 1 ตา</li>
              <li><b>ช่องจุดเริ่มต้น (ช่อง 0):</b> ผ่านรับเงินเดือน 1,000 ฿ (หากตกพอดีรับโบนัสเพิ่ม 500 ฿)</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-heading font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm"
          >
            เข้าใจแล้ว เข้าสู่เกม
          </button>
        </div>

      </div>
    </div>
  );
}
