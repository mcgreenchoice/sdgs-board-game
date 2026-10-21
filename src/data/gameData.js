// SDGs Board Game: MC THE GREEN CHOICE Data Model

export const SDG_CATEGORIES = {
  MARINE: { id: 'marine', name: 'Marine Ecosystem (SDG 14)', color: 'from-sky-500 to-blue-600', badge: 'bg-sky-100 text-sky-800 border-sky-300', icon: '🌊' },
  CLIMATE: { id: 'climate', name: 'Climate Change (SDG 13)', color: 'from-amber-500 to-orange-600', badge: 'bg-amber-100 text-amber-800 border-amber-300', icon: '☀️' },
  LAND: { id: 'land', name: 'Terrestrial Ecosystem (SDG 15)', color: 'from-emerald-500 to-green-600', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: '🌱' },
};

export const DEEDS_DATA = [
  { id: 1, name: "บริษัทวิจัยและพัฒนาชีววิทยาทางทะเล", heart: 1, group: "marine", price: 200, factoryCost: 100, rent: [80, 100, 120, 300, 450], image: "/deeds/deed_01.png", hazard: null },
  { id: 2, name: "บริษัทก่อสร้าง", heart: 2, group: "industry", price: 360, factoryCost: 150, rent: [180, 210, 250, 700, 950], image: "/deeds/deed_02.png", hazard: null },
  { id: 3, name: "โรงงานแปรรูปไม้", heart: 3, group: "land", price: 600, factoryCost: 200, rent: [320, 380, 450, 1000, 1400], image: "/deeds/deed_03.png", hazard: null },
  { id: 4, name: "บริษัทผลิตและจำหน่ายน้ำดื่ม", heart: 4, group: "marine", price: 800, factoryCost: 250, rent: [400, 480, 600, 1400, 1800], image: "/deeds/deed_04.png", hazard: null },
  { id: 5, name: "บริษัททำความสะอาดและซ่อมบำรุงเรือ", heart: 5, group: "marine", price: 200, factoryCost: 100, rent: [100, 120, 150, 350, 500], image: "/deeds/deed_05.png", hazard: null },
  { id: 6, name: "โรงงานผลิตกระดาษ", heart: 6, group: "land", price: 200, factoryCost: 100, rent: [100, 120, 150, 350, 500], image: "/deeds/deed_06.png", hazard: null },
  { id: 7, name: "บริษัทผลิตอาหาร", heart: 7, group: "land", price: 400, factoryCost: 150, rent: [200, 240, 300, 750, 1000], image: "/deeds/deed_07.png", hazard: null },
  { id: 8, name: "บริษัทบริการดำน้ำและกู้ภัยทางทะเล", heart: 8, group: "marine", price: 240, factoryCost: 100, rent: [120, 140, 180, 400, 550], image: "/deeds/deed_08.png", hazard: null },
  { id: 9, name: "บริษัทขุดเจาะน้ำมัน", heart: 9, group: "climate", price: 440, factoryCost: 150, rent: [220, 270, 330, 800, 1050], image: "/deeds/deed_09.png", hazard: null },
  { id: 10, name: "บริษัทจัดการของเสียอุตสาหกรรม", heart: 10, group: "climate", price: 560, factoryCost: 200, rent: [280, 330, 400, 900, 1250], image: "/deeds/deed_10.png", hazard: null },
  { id: 11, name: "โรงงานผลิตก๊าซชีวภาพ", heart: 11, group: "climate", price: 320, factoryCost: 150, rent: [160, 190, 220, 600, 850], image: "/deeds/deed_11.png", hazard: null },
  { id: 12, name: "สวนสัตว์", heart: 12, group: "land", price: 200, factoryCost: 100, rent: [100, 120, 140, 330, 490], image: "/deeds/deed_12.png", hazard: null },
  { id: 13, name: "โรงงานผลิตภัณฑ์ปศุสัตว์", heart: 13, group: "land", price: 360, factoryCost: 150, rent: [180, 210, 250, 700, 950], image: "/deeds/deed_13.png", hazard: null },
  { id: 14, name: "บริษัทอสังหาริมทรัพย์", heart: 14, group: "land", price: 360, factoryCost: 150, rent: [180, 210, 250, 700, 950], image: "/deeds/deed_14.png", hazard: null },
  { id: 15, name: "THAI WAH", heart: 15, group: "corporate", price: 600, factoryCost: 200, rent: [300, 350, 420, 950, 1300], image: "/deeds/deed_15.png", hazard: null },
  { id: 16, name: "SEA VALUE", heart: 16, group: "corporate", price: 220, factoryCost: 100, rent: [110, 130, 160, 380, 520], image: "/deeds/deed_16.png", hazard: null },
  { id: 17, name: "WHAUP", heart: 17, group: "corporate", price: 400, factoryCost: 150, rent: [200, 240, 300, 750, 1000], image: "/deeds/deed_17.png", hazard: null },
  { id: 18, name: "โรงงานจัดการขยะ", heart: 18, group: "climate", price: 520, factoryCost: 200, rent: [260, 310, 380, 850, 1200], image: "/deeds/deed_18.png", hazard: null },
  { id: 19, name: "โรงงานหมักปุ๋ย", heart: 19, group: "land", price: 760, factoryCost: 250, rent: [380, 450, 550, 1300, 1500], image: "/deeds/deed_19.png", hazard: null },
  { id: 20, name: "บริษัทจัดการทรัพยากรธรรมชาติ", heart: 20, group: "land", price: 440, factoryCost: 150, rent: [220, 270, 330, 800, 1050], image: "/deeds/deed_20.png", hazard: null },
  { id: 21, name: "โรงงานไฟฟ้า", heart: 21, group: "climate", price: 680, factoryCost: 250, rent: [340, 400, 480, 1100, 1500], image: "/deeds/deed_21.png", hazard: null },
  { id: 22, name: "THAI UNION", heart: 22, group: "corporate", price: 320, factoryCost: 150, rent: [160, 190, 220, 600, 850], image: "/deeds/deed_22.png", hazard: null },
  { id: 23, name: "บริษัทขนส่งทางน้ำ", heart: 23, group: "marine", price: 200, factoryCost: 100, rent: [100, 120, 150, 350, 500], image: "/deeds/deed_23.png", hazard: null },
  { id: 24, name: "โรงงานกลั่นน้ำมันปิโตรเลียม", heart: 24, group: "climate", price: 600, factoryCost: 200, rent: [300, 350, 420, 950, 1300], image: "/deeds/deed_24.png", hazard: null },
  { id: 25, name: "บริษัทการเกษตร", heart: 25, group: "land", price: 480, factoryCost: 200, rent: [240, 290, 360, 850, 1100], image: "/deeds/deed_25.png", hazard: null },
  { id: 26, name: "บริษัทผลิตรถยนต์", heart: 26, group: "climate", price: 640, factoryCost: 250, rent: [320, 380, 450, 1000, 1400], image: "/deeds/deed_26.png", hazard: null },
  { id: 27, name: "บริษัทเคมีภัณฑ์", heart: 27, group: "industry", price: 400, factoryCost: 150, rent: [200, 240, 300, 750, 1000], image: "/deeds/deed_27.png", hazard: null },
  { id: 28, name: "บริษัทขนส่งทางบก", heart: 28, group: "climate", price: 720, factoryCost: 250, rent: [360, 420, 500, 1200, 1600], image: "/deeds/deed_28.png", hazard: null },
  { id: 29, name: "บริษัทจัดการสิ่งแวดล้อม", heart: 29, group: "land", price: 840, factoryCost: 300, rent: [420, 500, 620, 1500, 2000], image: "/deeds/deed_29.png", hazard: null },
  { id: 30, name: "CENTRAL GROUP", heart: 30, group: "corporate", price: 240, factoryCost: 100, rent: [120, 140, 180, 400, 550], image: "/deeds/deed_30.png", hazard: null },
];

export const BOARD_TILES = [
  // Tile 0: Bottom-Left Corner (Start)
  { index: 0, name: "จุดเริ่มต้น", side: 'corner', type: 'start', desc: "ผ่านรับ 1,000 ฿ | ตกรับเพิ่ม 500 ฿", icon: '🏁', color: 'from-amber-400 to-yellow-500' },
  
  // Left Side (going UP from index 1 to 9)
  { index: 1, deedId: 1, side: 'left', name: "บริษัทวิจัยและพัฒนาชีววิทยาทางทะเล", type: 'property', color: 'border-l-sky-400' },
  { index: 2, deedId: 2, side: 'left', name: "บริษัทก่อสร้าง", type: 'property', color: 'border-l-pink-400' },
  { index: 3, deedId: 3, side: 'left', name: "โรงงานแปรรูปไม้", type: 'property', color: 'border-l-amber-700' },
  { index: 4, deedId: 4, side: 'left', name: "บริษัทผลิตและจำหน่ายน้ำดื่ม", type: 'property', color: 'border-l-cyan-400' },
  { index: 5, side: 'left', name: "สุ่มการ์ด SDGs", type: 'chance', desc: "จั่วการ์ดภารกิจสิ่งแวดล้อม 1 ใบ", icon: '❓', color: 'border-l-purple-500 bg-purple-950/40' },
  { index: 6, deedId: 5, side: 'left', name: "บริษัททำความสะอาดและจัดการขยะ", type: 'property', color: 'border-l-teal-500' },
  { index: 7, deedId: 6, side: 'left', name: "โรงงานผลิตกระดาษ", type: 'property', color: 'border-l-slate-400' },
  { index: 8, deedId: 7, side: 'left', name: "บริษัทผลิตอาหาร", type: 'property', color: 'border-l-lime-500' },
  { index: 9, deedId: 8, side: 'left', name: "บริษัทบริการดำน้ำและกู้ภัย", type: 'property', color: 'border-l-blue-400' },

  // Tile 10: Top-Left Corner (Tax)
  { index: 10, name: "เสียภาษี", side: 'corner', type: 'tax', amount: 300, desc: "เสียภาษีสิ่งแวดล้อม 300 ฿", icon: '💸', color: 'from-rose-500 to-red-600' },

  // Top Side (going RIGHT from index 11 to 18)
  { index: 11, deedId: 9, side: 'top', name: "บริษัทขุดเจาะน้ำมัน", type: 'property', color: 'border-t-orange-500' },
  { index: 12, deedId: 10, side: 'top', name: "บริษัทจัดการของเสียอุตสาหกรรม", type: 'property', color: 'border-t-emerald-600' },
  { index: 13, deedId: 11, side: 'top', name: "โรงงานผลิตก๊าซชีวภาพ", type: 'property', color: 'border-t-stone-400' },
  { index: 14, side: 'top', name: "สุ่มการ์ด SDGs", type: 'chance', desc: "จั่วการ์ดภารกิจสิ่งแวดล้อม 1 ใบ", icon: '❓', color: 'border-t-purple-500 bg-purple-950/40' },
  { index: 15, deedId: 12, side: 'top', name: "สวนสัตว์", type: 'property', color: 'border-t-yellow-400' },
  { index: 16, deedId: 13, side: 'top', name: "โรงงานผลิตภัณฑ์ปศุสัตว์", type: 'property', color: 'border-t-green-500' },
  { index: 17, deedId: 14, side: 'top', name: "บริษัทอสังหาริมทรัพย์", type: 'property', color: 'border-t-indigo-400' },
  { index: 18, deedId: 15, side: 'top', name: "THAI WAH", type: 'property', color: 'border-t-blue-600' },

  // Tile 19: Top-Right Corner (STEAL)
  { index: 19, name: "STEAL (ขโมย)", side: 'corner', type: 'steal', desc: "ขโมยเงิน 200 ฿ หรือการ์ดจากผู้เล่นอื่น", icon: '🥷', color: 'from-purple-600 to-indigo-800' },

  // Right Side (going DOWN from index 20 to 27)
  { index: 20, deedId: 16, side: 'right', name: "SEA VALUE", type: 'property', color: 'border-r-cyan-500' },
  { index: 21, deedId: 17, side: 'right', name: "WHAUP", type: 'property', color: 'border-r-sky-500' },
  { index: 22, deedId: 18, side: 'right', name: "โรงงานจัดการขยะ", type: 'property', color: 'border-r-amber-600' },
  { index: 23, side: 'right', name: "สุ่มการ์ด SDGs", type: 'chance', desc: "จั่วการ์ดภารกิจสิ่งแวดล้อม 1 ใบ", icon: '❓', color: 'border-r-purple-500 bg-purple-950/40' },
  { index: 24, deedId: 19, side: 'right', name: "โรงงานหมักปุ๋ย", type: 'property', color: 'border-r-yellow-600' },
  { index: 25, deedId: 20, side: 'right', name: "บริษัทจัดการทรัพยากรธรรมชาติ", type: 'property', color: 'border-r-emerald-500' },
  { index: 26, deedId: 21, side: 'right', name: "โรงงานไฟฟ้า", type: 'property', color: 'border-r-red-500' },
  { index: 27, deedId: 22, side: 'right', name: "THAI UNION", type: 'property', color: 'border-r-blue-500' },

  // Tile 28: Bottom-Right Corner (Jail / Embezzlement)
  { index: 28, name: "ยักยอก (หยุด 1 ตา)", side: 'corner', type: 'jail', fine: 500, desc: "หยุดเดิน 1 ตา และปรับ 500 ฿", icon: '⛓️', color: 'from-amber-600 to-red-700' },

  // Bottom Side (going LEFT from index 29 to 37)
  { index: 29, deedId: 23, side: 'bottom', name: "บริษัทขนส่งทางน้ำ", type: 'property', color: 'border-b-blue-400' },
  { index: 30, deedId: 24, side: 'bottom', name: "โรงงานกลั่นน้ำมันปิโตรเลียม", type: 'property', color: 'border-b-stone-500' },
  { index: 31, deedId: 25, side: 'bottom', name: "บริษัทการเกษตร", type: 'property', color: 'border-b-green-600' },
  { index: 32, deedId: 26, side: 'bottom', name: "บริษัทผลิตรถยนต์", type: 'property', color: 'border-b-fuchsia-500' },
  { index: 33, side: 'bottom', name: "สุ่มการ์ด SDGs", type: 'chance', desc: "จั่วการ์ดภารกิจสิ่งแวดล้อม 1 ใบ", icon: '❓', color: 'border-b-purple-500 bg-purple-950/40' },
  { index: 34, deedId: 27, side: 'bottom', name: "บริษัทเคมีภัณฑ์", type: 'property', color: 'border-b-orange-400' },
  { index: 35, deedId: 28, side: 'bottom', name: "บริษัทขนส่งทางบก", type: 'property', color: 'border-b-yellow-500' },
  { index: 36, deedId: 29, side: 'bottom', name: "บริษัทจัดการสิ่งแวดล้อม", type: 'property', color: 'border-b-emerald-400' },
  { index: 37, deedId: 30, side: 'bottom', name: "CENTRAL GROUP", type: 'property', color: 'border-b-blue-700' },
];

export const SDG_CARDS = [
  // --- SDG 14: MARINE ECOSYSTEM (1 - 10) ---
  {
    id: 1,
    category: 'marine',
    titleEn: "Wastewater From Community & Factory",
    titleTh: "น้ำเสียจากชุมชนและโรงงาน",
    type: 'hazard',
    curedBy: 6,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #6 (ระบบบำบัดน้ำเสียก่อนปล่อยลงทะเล)",
    desc: "โรงงานในเครือปล่อยน้ำเสียลงสู่แหล่งน้ำธรรมชาติ ส่งผลให้สัตว์น้ำล้มตายและชุมชนเดือดร้อน",
    effect: "จ่ายค่าบำบัดน้ำเสียฉุกเฉิน 200 ฿ ให้ธนาคาร",
    moneyChange: -200,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 1.png"
  },
  {
    id: 2,
    category: 'marine',
    titleEn: "Seawater Temperature Change",
    titleTh: "ทำลายแนวปะการัง",
    type: 'hazard',
    curedBy: 7,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #7 (เขตอนุรักษ์พันธุ์สัตว์น้ำและฟื้นฟูปะการัง)",
    desc: "อุณหภูมิน้ำทะเลสูงขึ้นอย่างผิดปกติจากการปล่อยก๊าซเรือนกระจก แนวปะการังเกิดความเสียหาย",
    effect: "สนับสนุนกองทุนฟื้นฟูระบบนิเวศทางทะเล เสีย 150 ฿",
    moneyChange: -150,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 2.png"
  },
  {
    id: 3,
    category: 'marine',
    titleEn: "Coral Reef Destruction",
    titleTh: "ปะการังฟอกขาว",
    type: 'hazard',
    curedBy: 8,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #8 (โครงการเฝ้าระวังและลดมลพิษทางทะเล)",
    desc: "วิกฤตปะการังฟอกขาวรุนแรงกระทบธุรกิจท่องเที่ยวและการประมงชายฝั่ง",
    effect: "ขาดรายได้จากการท่องเที่ยว เสีย 250 ฿",
    moneyChange: -250,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 3.png"
  },
  {
    id: 4,
    category: 'marine',
    titleEn: "Abandoned Fishing Nets",
    titleTh: "อวนประมงตกค้าง",
    type: 'hazard',
    curedBy: 9,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #9 (การทำประมงที่รับผิดชอบ)",
    desc: "เศษอวนผีพันสัตว์น้ำหายาก (Ghost Gear) ต้องระดมนักดำน้ำลงไปตัดอวนและทำความสะอาด",
    effect: "จ่ายค่าจ้างอาสาสมัครกู้อวน 100 ฿",
    moneyChange: -100,
    sdgPoints: 0,
    image: "/cards/SDGs Board Game - 4.png"
  },
  {
    id: 5,
    category: 'marine',
    titleEn: "Oil Spills From Cargo Ships",
    titleTh: "น้ำมันรั่วจากเรือขนส่ง",
    type: 'hazard',
    curedBy: 10,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #10 (เดินเรือความเร็วต่ำ ใช้พลังงานสะอาด)",
    desc: "เรือบรรทุกสินค้าเกิดอุบัติเหตุน้ำมันรั่วไหล คราบน้ำมันกระจายเข้าสู่หาดทรายและป่าชายเลน",
    effect: "เสียค่าปรับทำความสะอาดคราบน้ำมัน 400 ฿",
    moneyChange: -400,
    sdgPoints: -2,
    image: "/cards/SDGs Board Game - 5.png"
  },
  {
    id: 6,
    category: 'marine',
    titleEn: "Wastewater Treatment Before Discharge",
    titleTh: "ระบบบำบัดน้ำเสียก่อนปล่อยลงทะเล",
    type: 'solution',
    cures: 1,
    matchDesc: "แก้ปัญหาการ์ด #1 (น้ำเสียจากชุมชนและโรงงาน)",
    desc: "ติดตั้งระบบบำบัดน้ำเสียมาตรฐานสากล น้ำใสสะอาด ปลอดสารเคมี",
    effect: "ได้รับเงินอุดหนุนจากภาครัฐ +300 ฿ และ +2 SDG Points",
    moneyChange: 300,
    sdgPoints: 2,
    image: "/cards/SDGs Board Game - 6.png"
  },
  {
    id: 7,
    category: 'marine',
    titleEn: "Marine Conservation & Coral Nursery",
    titleTh: "เขตอนุรักษ์พันธุ์สัตว์น้ำและฟื้นฟูปะการัง",
    type: 'solution',
    cures: 2,
    matchDesc: "แก้ปัญหาการ์ด #2 (ทำลายแนวปะการัง)",
    desc: "จัดตั้งแปลงเพาะพันธุ์ปะการังและเขตอนุรักษ์ พันธุ์ปลาเพิ่มขึ้นอย่างรวดเร็ว",
    effect: "ได้รับเงินสนับสนุนองค์กรสิ่งแวดล้อม +250 ฿ และ +2 SDG Points",
    moneyChange: 250,
    sdgPoints: 2,
    image: "/cards/SDGs Board Game - 7.png"
  },
  {
    id: 8,
    category: 'marine',
    titleEn: "Marine Pollution Monitoring Project",
    titleTh: "โครงการเฝ้าระวังและลดมลพิษทางทะเล",
    type: 'solution',
    cures: 3,
    matchDesc: "แก้ปัญหาการ์ด #3 (ปะการังฟอกขาว)",
    desc: "ร่วมมือกับชุมชนชายฝั่งติดเซนเซอร์วัดคุณภาพน้ำและดักจับขยะปากแม่น้ำ",
    effect: "ได้รับรางวัลนวัตกรรมสีเขียว +200 ฿ และ +1 SDG Point",
    moneyChange: 200,
    sdgPoints: 1,
    image: "/cards/SDGs Board Game - 8.png"
  },
  {
    id: 9,
    category: 'marine',
    titleEn: "Responsible Fishing Practice",
    titleTh: "การทำประมงที่รับผิดชอบ",
    type: 'solution',
    cures: 4,
    matchDesc: "แก้ปัญหาการ์ด #4 (อวนประมงตกค้าง)",
    desc: "งดจับปลาในฤดูวางไข่ ใช้เครื่องมือประมงที่ไม่ทำลายหน้าดินทะเล",
    effect: "ได้รับมาตรฐานอาหารทะเลยั่งยืน เพิ่มกำไร +200 ฿ และ +1 SDG Point",
    moneyChange: 200,
    sdgPoints: 1,
    image: "/cards/SDGs Board Game - 9.png"
  },
  {
    id: 10,
    category: 'marine',
    titleEn: "Clean Energy & Eco-Vessels",
    titleTh: "เดินเรือความเร็วต่ำ ใช้พลังงานสะอาด",
    type: 'solution',
    cures: 5,
    matchDesc: "แก้ปัญหาการ์ด #5 (น้ำมันรั่วจากเรือขนส่ง)",
    desc: "ปรับมาใช้เรือพลังงานไฟฟ้าและไฮโดรเจน ลดมลพิษทางเสียงและเขม่าควันลงสู่ทะเล",
    effect: "ประหยัดต้นทุนเชื้อเพลิง ได้รับเงินคืน +300 ฿ และ +2 SDG Points",
    moneyChange: 300,
    sdgPoints: 2,
    image: "/cards/SDGs Board Game - 10.png"
  },

  // --- SDG 13: CLIMATE CHANGE (11 - 20) ---
  {
    id: 11,
    category: 'climate',
    titleEn: "Fossil Fuel Consumption",
    titleTh: "การใช้เชื้อเพลิงฟอสซิล",
    type: 'hazard',
    curedBy: 16,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #16 (พลังงานสะอาด (โซลาร์เซลล์ / ลม))",
    desc: "โรงงานใช้พลังงานจากถ่านหินและน้ำมันดีเซลในปริมาณสูง เกิดคาร์บอนฟุตพริ้นท์มหาศาล",
    effect: "จ่ายค่าภาษีคาร์บอน (Carbon Tax) 300 ฿",
    moneyChange: -300,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 11.png"
  },
  {
    id: 12,
    category: 'climate',
    titleEn: "Livestock Methane Emissions",
    titleTh: "อุตสาหกรรมปศุสัตว์ (ก๊าซมีเทน)",
    type: 'hazard',
    curedBy: 17,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #17 (เกษตรกรรมยั่งยืนและก๊าซชีวภาพ)",
    desc: "ฟาร์มปศุสัตว์ขนาดใหญ่ปล่อยก๊าซมีเทนสู่บรรยากาศ เร่งภาวะโลกร้อน",
    effect: "เสียค่าปรับปรับปรุงโรงเรือนและระบายอากาศ 150 ฿",
    moneyChange: -150,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 12.png"
  },
  {
    id: 13,
    category: 'climate',
    titleEn: "Deforestation",
    titleTh: "ตัดไม้ทำลายป่า",
    type: 'hazard',
    curedBy: 18,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #18 (การปลูกป่าทดแทนพื้นที่สีเขียว)",
    desc: "พื้นที่ป่าถูกถางเพื่อการพาณิชย์ ส่งผลให้ขาดแหล่งดูดซับก๊าซคาร์บอนไดออกไซด์",
    effect: "ถูกสั่งระงับกิจการชั่วคราว เสียค่าเสียหาย 350 ฿",
    moneyChange: -350,
    sdgPoints: -2,
    image: "/cards/SDGs Board Game - 13.png"
  },
  {
    id: 14,
    category: 'climate',
    titleEn: "Organic Waste In Landfills",
    titleTh: "ขยะเน่าเสียในหลุมฝังกลบ",
    type: 'hazard',
    curedBy: 19,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #19 (ระบบจัดการขยะและปุ๋ยหมัก)",
    desc: "ขยะอินทรีย์กองสุมจนเกิดการหมักหมม ปล่อยก๊าซเรือนกระจกและมีกลิ่นเหม็นรบกวน",
    effect: "จ่ายค่าจ้างกำจัดและบำบัดขยะ 200 ฿",
    moneyChange: -200,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 14.png"
  },
  {
    id: 15,
    category: 'climate',
    titleEn: "Vehicle Transport Emissions",
    titleTh: "ขนส่งด้วยเครื่องยนต์สันดาป",
    type: 'hazard',
    curedBy: 20,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #20 (ระบบขนส่งสาธารณะรถจักรยานไฟฟ้า)",
    desc: "รถขนส่งเก่าปล่อยควันดำและฝุ่น PM2.5 เกินเกณฑ์มาตรฐาน",
    effect: "จ่ายค่าตรวจสภาพและเปลี่ยนไส้กรอง 150 ฿",
    moneyChange: -150,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 15.png"
  },
  {
    id: 16,
    category: 'climate',
    titleEn: "Clean Energy (Solar & Wind)",
    titleTh: "พลังงานสะอาด (โซลาร์เซลล์ / ลม)",
    type: 'solution',
    cures: 11,
    matchDesc: "แก้ปัญหาการ์ด #11 (การใช้เชื้อเพลิงฟอสซิล)",
    desc: "ติดตั้งโซลาร์รูฟท็อปและกังหันลม ผลิตไฟฟ้าใช้เองและขายคืนสู่โครงข่ายไฟฟ้า",
    effect: "ได้รับค่าขายไฟส่วนเกิน +350 ฿ และ +2 SDG Points",
    moneyChange: 350,
    sdgPoints: 2,
    image: "/cards/SDGs Board Game - 16.png"
  },
  {
    id: 17,
    category: 'climate',
    titleEn: "Sustainable Agriculture & Biogas",
    titleTh: "เกษตรกรรมยั่งยืนและก๊าซชีวภาพ",
    type: 'solution',
    cures: 12,
    matchDesc: "แก้ปัญหาการ์ด #12 (อุตสาหกรรมปศุสัตว์ (ก๊าซมีเทน))",
    desc: "นำมูลสัตว์มาผลิตก๊าซชีวภาพ นำของเสียมาแปรรูปเป็นพลังงานหมุนเวียน",
    effect: "ประหยัดต้นทุนก๊าซ ได้รับเงินรางวัล +250 ฿ และ +1 SDG Point",
    moneyChange: 250,
    sdgPoints: 1,
    image: "/cards/SDGs Board Game - 17.png"
  },
  {
    id: 18,
    category: 'climate',
    titleEn: "Reforestation To Increase Green Space",
    titleTh: "การปลูกป่าทดแทนพื้นที่สีเขียว",
    type: 'solution',
    cures: 13,
    matchDesc: "แก้ปัญหาการ์ด #13 (ตัดไม้ทำลายป่า)",
    desc: "จัดโครงการปลูกป่าไม้โตเร็วและป่าต้นน้ำ เพิ่มการดูดซับก๊าซเรือนกระจก",
    effect: "ได้รับคาร์บอนเครดิตขายได้เงิน +300 ฿ และ +2 SDG Points",
    moneyChange: 300,
    sdgPoints: 2,
    image: "/cards/SDGs Board Game - 18.png"
  },
  {
    id: 19,
    category: 'climate',
    titleEn: "Waste & Compost Management System",
    titleTh: "ระบบจัดการขยะและปุ๋ยหมัก",
    type: 'solution',
    cures: 14,
    matchDesc: "แก้ปัญหาการ์ด #14 (ขยะเน่าเสียในหลุมฝังกลบ)",
    desc: "แยกขยะเศษอาหารมาทำปุ๋ยหมักอินทรีย์ ลดปริมาณขยะลงหลุมฝังกลบได้ถึง 70%",
    effect: "จำหน่ายปุ๋ยอินทรีย์ได้เงิน +200 ฿ และ +1 SDG Point",
    moneyChange: 200,
    sdgPoints: 1,
    image: "/cards/SDGs Board Game - 19.png"
  },
  {
    id: 20,
    category: 'climate',
    titleEn: "Electric Bicycle Public Transport",
    titleTh: "ระบบขนส่งสาธารณะรถจักรยานไฟฟ้า",
    type: 'solution',
    cures: 15,
    matchDesc: "แก้ปัญหาการ์ด #15 (ขนส่งด้วยเครื่องยนต์สันดาป)",
    desc: "ให้บริการจักรยานและสกู๊ตเตอร์ไฟฟ้าในเขตชุมชน ลดการใช้รถยนต์ส่วนบุคคล",
    effect: "ได้รับเงินอุดหนุนเมืองอัจฉริยะ (Smart City) +250 ฿ และ +2 SDG Points",
    moneyChange: 250,
    sdgPoints: 2,
    image: "/cards/SDGs Board Game - 20.png"
  },

  // --- SDG 15: TERRESTRIAL ECOSYSTEM (21 - 30) ---
  {
    id: 21,
    category: 'land',
    titleEn: "Monoculture Farming (Chemicals)",
    titleTh: "การทำเกษตรเชิงเดี่ยว (ใช้สารเคมี)",
    type: 'hazard',
    curedBy: 25,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #25 (เกษตรอินทรีย์ / วนเกษตร)",
    desc: "การปลูกพืชชนิดเดียวและใช้ยาฆ่าแมลงเข้มข้น ดินเสื่อมสภาพและจุลินทรีย์ตายหมด",
    effect: "จ่ายค่าฟื้นฟูสภาพดินและปรับปรุงแปลงเกษตร 200 ฿",
    moneyChange: -200,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 21.png"
  },
  {
    id: 22,
    category: 'land',
    titleEn: "Encroachment On Headwater Forests",
    titleTh: "บุกรุกพื้นที่ป่าต้นน้ำ",
    type: 'hazard',
    curedBy: 28,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #28 (การจัดการที่ดินอย่างถูกวิธี)",
    desc: "สร้างสิ่งปลูกสร้างรุกล้ำเขตป่าสงวน ส่งผลกระทบต่อทางไหลของแม่น้ำลำธาร",
    effect: "ถูกสั่งรื้อถอนและปรับเงิน 400 ฿",
    moneyChange: -400,
    sdgPoints: -2,
    image: "/cards/SDGs Board Game - 22.png"
  },
  {
    id: 23,
    category: 'land',
    titleEn: "Extinction Of Wildlife",
    titleTh: "การสูญพันธุ์ของสัตว์ป่า",
    type: 'hazard',
    curedBy: 26,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #26 (ศูนย์คุ้มครองและฟื้นฟูสัตว์ป่า)",
    desc: "การรบกวนถิ่นที่อยู่อาศัยทำให้สัตว์ป่าใกล้สูญพันธุ์สูญเสียความหลากหลายทางชีวภาพ",
    effect: "สมทบทุนจัดตั้งเขตรักษาพันธุ์สัตว์ป่า เสีย 200 ฿",
    moneyChange: -200,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 23.png"
  },
  {
    id: 24,
    category: 'land',
    titleEn: "Improper Hazardous Waste Disposal",
    titleTh: "การทิ้งขยะอันตรายไม่ถูกวิธี",
    type: 'hazard',
    curedBy: 30,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #30 (การรีไซเคิลขยะอันตรายอย่างถูกวิธี)",
    desc: "ทิ้งถ่านไฟฉายและแบตเตอรี่รวมกับขยะทั่วไป สารพิษซึมลงสู่น้ำใต้ดิน",
    effect: "เสียค่ากำจัดมลพิษตกค้าง 250 ฿",
    moneyChange: -250,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 24.png"
  },
  {
    id: 25,
    category: 'land',
    titleEn: "Organic Farming & Agroforestry",
    titleTh: "เกษตรอินทรีย์ / วนเกษตร",
    type: 'solution',
    cures: 21,
    matchDesc: "แก้ปัญหาการ์ด #21 (การทำเกษตรเชิงเดี่ยว (ใช้สารเคมี))",
    desc: "ปลูกพืชผสมผสานเลียนแบบป่าธรรมชาติ ไม่ใช้สารเคมี ดินอุดมสมบูรณ์และผลผลิตปลอดภัย",
    effect: "ได้รับผลตอบแทนสินค้าออร์แกนิกราคาพรีเมียม +300 ฿ และ +2 SDG Points",
    moneyChange: 300,
    sdgPoints: 2,
    image: "/cards/SDGs Board Game - 25.png"
  },
  {
    id: 26,
    category: 'land',
    titleEn: "Wildlife Conservation & Rescue Center",
    titleTh: "ศูนย์คุ้มครองและฟื้นฟูสัตว์ป่า",
    type: 'solution',
    cures: 23,
    matchDesc: "แก้ปัญหาการ์ด #23 (การสูญพันธุ์ของสัตว์ป่า)",
    desc: "จัดตั้งศูนย์ดูแลสัตว์ป่าบาดเจ็บและเพาะพันธุ์ปล่อยคืนสู่ธรรมชาติอย่างปลอดภัย",
    effect: "ได้รับเงินบริจาคสนับสนุน +250 ฿ และ +2 SDG Points",
    moneyChange: 250,
    sdgPoints: 2,
    image: "/cards/SDGs Board Game - 26.png"
  },
  {
    id: 27,
    category: 'land',
    titleEn: "Toxic Waste Control & Soil Restoration",
    titleTh: "การจำกัดสารพิษและฟื้นฟูดิน",
    type: 'solution',
    cures: 29,
    matchDesc: "แก้ปัญหาการ์ด #29 (สารเคมีปนเปื้อนในดิน)",
    desc: "ใช้พืชดูดซับสารพิษและจุลินทรีย์ชีวภาพบำบัดดินที่ปนเปื้อนให้กลับมาเพาะปลูกได้",
    effect: "ได้รับเงินสนับสนุนโครงการวิจัยสิ่งแวดล้อม +200 ฿ และ +1 SDG Point",
    moneyChange: 200,
    sdgPoints: 1,
    image: "/cards/SDGs Board Game - 27.png"
  },
  {
    id: 28,
    category: 'land',
    titleEn: "Land Management In The Right Way",
    titleTh: "การจัดการที่ดินอย่างถูกวิธี",
    type: 'solution',
    cures: 22,
    matchDesc: "แก้ปัญหาการ์ด #22 (บุกรุกพื้นที่ป่าต้นน้ำ)",
    desc: "จัดโซนนิ่งการใช้ที่ดินตามศักยภาพ รักษาหน้าดินและป้องกันการพังทลายของดิน",
    effect: "เพิ่มมูลค่าที่ดินและผลผลิต ได้รับเงินรางวัล +250 ฿ และ +1 SDG Point",
    moneyChange: 250,
    sdgPoints: 1,
    image: "/cards/SDGs Board Game - 28.png"
  },
  {
    id: 29,
    category: 'land',
    titleEn: "Soil Contamination Chemicals",
    titleTh: "สารเคมีปนเปื้อนในดิน",
    type: 'hazard',
    curedBy: 27,
    matchDesc: "แก้ได้ด้วยการ์ดช่วย #27 (การจำกัดสารพิษและฟื้นฟูดิน)",
    desc: "กากสารเคมีจากโรงงานเก่ารั่วไหลซึมลงผืนดิน พืชผลเหี่ยวเฉา",
    effect: "จ่ายค่าขุดลอกหน้าดินและฟื้นฟูเร่งด่วน 250 ฿",
    moneyChange: -250,
    sdgPoints: -1,
    image: "/cards/SDGs Board Game - 29.png"
  },
  {
    id: 30,
    category: 'land',
    titleEn: "Recycling Hazardous Waste Properly",
    titleTh: "การรีไซเคิลขยะอันตรายอย่างถูกวิธี",
    type: 'solution',
    cures: 24,
    matchDesc: "แก้ปัญหาการ์ด #24 (การทิ้งขยะอันตรายไม่ถูกวิธี)",
    desc: "ส่งขยะอิเล็กทรอนิกส์และสารเคมีเข้าโรงงานรีไซเคิลเฉพาะทาง สกัดโลหะมีค่ากลับมาใช้ใหม่",
    effect: "ได้รับเงินจากการรีไซเคิลโลหะมีค่า +300 ฿ และ +2 SDG Points",
    moneyChange: 300,
    sdgPoints: 2,
    image: "/cards/SDGs Board Game - 30.png"
  }
];

export const BANKNOTES = [
  { value: 5000, name: "5,000 ฿", color: "from-pink-500 to-rose-600", image: "/assets/money/5000.jpg" },
  { value: 1000, name: "1,000 ฿", color: "from-slate-400 to-slate-600", image: "/assets/money/1000.jpg" },
  { value: 100, name: "100 ฿", color: "from-red-500 to-rose-700", image: "/assets/money/100.jpg" },
  { value: 50, name: "50 ฿", color: "from-blue-400 to-indigo-600", image: "/assets/money/50.jpg" },
  { value: 20, name: "20 ฿", color: "from-emerald-500 to-green-700", image: "/assets/money/20.jpg" },
  { value: 10, name: "10 ฿", color: "from-amber-400 to-yellow-600", image: "/assets/money/10.jpg" },
];

export const INITIAL_PLAYERS = [
  { id: 1, name: "ผู้เล่น 1 (ช้างเขียว)", color: "emerald", avatar: "🐘", balance: 25000, sdgPoints: 0, position: 0, inJail: false, jailTurns: 0, cards: [6, 16, 25] },
  { id: 2, name: "ผู้เล่น 2 (ช้างฟ้า)", color: "sky", avatar: "🦣", balance: 25000, sdgPoints: 0, position: 0, inJail: false, jailTurns: 0, cards: [7, 17, 26] },
  { id: 3, name: "ผู้เล่น 3 (ช้างชมพู)", color: "pink", avatar: "🌸", balance: 25000, sdgPoints: 0, position: 0, inJail: false, jailTurns: 0, cards: [8, 18, 27] },
  { id: 4, name: "ผู้เล่น 4 (ช้างส้ม)", color: "amber", avatar: "⭐", balance: 25000, sdgPoints: 0, position: 0, inJail: false, jailTurns: 0, cards: [9, 19, 28] },
];

export const TILE_COORDS = {
  "0": {
    "left": 0.0,
    "top": 83.28,
    "width": 16.72,
    "height": 16.72,
    "cx": 8.36,
    "cy": 91.64
  },
  "1": {
    "left": 0.0,
    "top": 75.89,
    "width": 16.72,
    "height": 7.4,
    "cx": 8.36,
    "cy": 79.58
  },
  "2": {
    "left": 0.0,
    "top": 68.49,
    "width": 16.72,
    "height": 7.4,
    "cx": 8.36,
    "cy": 72.19
  },
  "3": {
    "left": 0.0,
    "top": 61.09,
    "width": 16.72,
    "height": 7.4,
    "cx": 8.36,
    "cy": 64.79
  },
  "4": {
    "left": 0.0,
    "top": 53.7,
    "width": 16.72,
    "height": 7.4,
    "cx": 8.36,
    "cy": 57.4
  },
  "5": {
    "left": 0.0,
    "top": 46.3,
    "width": 16.72,
    "height": 7.4,
    "cx": 8.36,
    "cy": 50.0
  },
  "6": {
    "left": 0.0,
    "top": 38.91,
    "width": 16.72,
    "height": 7.4,
    "cx": 8.36,
    "cy": 42.6
  },
  "7": {
    "left": 0.0,
    "top": 31.51,
    "width": 16.72,
    "height": 7.4,
    "cx": 8.36,
    "cy": 35.21
  },
  "8": {
    "left": 0.0,
    "top": 24.11,
    "width": 16.72,
    "height": 7.4,
    "cx": 8.36,
    "cy": 27.81
  },
  "9": {
    "left": 0.0,
    "top": 16.72,
    "width": 16.72,
    "height": 7.4,
    "cx": 8.36,
    "cy": 20.42
  },
  "10": {
    "left": 0.0,
    "top": 0.0,
    "width": 16.72,
    "height": 16.72,
    "cx": 8.36,
    "cy": 8.36
  },
  "11": {
    "left": 16.72,
    "top": 0.0,
    "width": 8.32,
    "height": 16.72,
    "cx": 20.88,
    "cy": 8.36
  },
  "12": {
    "left": 25.04,
    "top": 0.0,
    "width": 8.32,
    "height": 16.72,
    "cx": 29.2,
    "cy": 8.36
  },
  "13": {
    "left": 33.36,
    "top": 0.0,
    "width": 8.32,
    "height": 16.72,
    "cx": 37.52,
    "cy": 8.36
  },
  "14": {
    "left": 41.68,
    "top": 0.0,
    "width": 8.32,
    "height": 16.72,
    "cx": 45.84,
    "cy": 8.36
  },
  "15": {
    "left": 50.0,
    "top": 0.0,
    "width": 8.32,
    "height": 16.72,
    "cx": 54.16,
    "cy": 8.36
  },
  "16": {
    "left": 58.32,
    "top": 0.0,
    "width": 8.32,
    "height": 16.72,
    "cx": 62.48,
    "cy": 8.36
  },
  "17": {
    "left": 66.64,
    "top": 0.0,
    "width": 8.32,
    "height": 16.72,
    "cx": 70.8,
    "cy": 8.36
  },
  "18": {
    "left": 74.96,
    "top": 0.0,
    "width": 8.32,
    "height": 16.72,
    "cx": 79.12,
    "cy": 8.36
  },
  "19": {
    "left": 83.28,
    "top": 0.0,
    "width": 16.72,
    "height": 16.72,
    "cx": 91.64,
    "cy": 8.36
  },
  "20": {
    "left": 83.28,
    "top": 16.72,
    "width": 16.72,
    "height": 8.32,
    "cx": 91.64,
    "cy": 20.88
  },
  "21": {
    "left": 83.28,
    "top": 25.04,
    "width": 16.72,
    "height": 8.32,
    "cx": 91.64,
    "cy": 29.2
  },
  "22": {
    "left": 83.28,
    "top": 33.36,
    "width": 16.72,
    "height": 8.32,
    "cx": 91.64,
    "cy": 37.52
  },
  "23": {
    "left": 83.28,
    "top": 41.68,
    "width": 16.72,
    "height": 8.32,
    "cx": 91.64,
    "cy": 45.84
  },
  "24": {
    "left": 83.28,
    "top": 50.0,
    "width": 16.72,
    "height": 8.32,
    "cx": 91.64,
    "cy": 54.16
  },
  "25": {
    "left": 83.28,
    "top": 58.32,
    "width": 16.72,
    "height": 8.32,
    "cx": 91.64,
    "cy": 62.48
  },
  "26": {
    "left": 83.28,
    "top": 66.64,
    "width": 16.72,
    "height": 8.32,
    "cx": 91.64,
    "cy": 70.8
  },
  "27": {
    "left": 83.28,
    "top": 74.96,
    "width": 16.72,
    "height": 8.32,
    "cx": 91.64,
    "cy": 79.12
  },
  "28": {
    "left": 83.28,
    "top": 83.28,
    "width": 16.72,
    "height": 16.72,
    "cx": 91.64,
    "cy": 91.64
  },
  "29": {
    "left": 75.89,
    "top": 83.28,
    "width": 7.4,
    "height": 16.72,
    "cx": 79.58,
    "cy": 91.64
  },
  "30": {
    "left": 68.49,
    "top": 83.28,
    "width": 7.4,
    "height": 16.72,
    "cx": 72.19,
    "cy": 91.64
  },
  "31": {
    "left": 61.09,
    "top": 83.28,
    "width": 7.4,
    "height": 16.72,
    "cx": 64.79,
    "cy": 91.64
  },
  "32": {
    "left": 53.7,
    "top": 83.28,
    "width": 7.4,
    "height": 16.72,
    "cx": 57.4,
    "cy": 91.64
  },
  "33": {
    "left": 46.3,
    "top": 83.28,
    "width": 7.4,
    "height": 16.72,
    "cx": 50.0,
    "cy": 91.64
  },
  "34": {
    "left": 38.91,
    "top": 83.28,
    "width": 7.4,
    "height": 16.72,
    "cx": 42.6,
    "cy": 91.64
  },
  "35": {
    "left": 31.51,
    "top": 83.28,
    "width": 7.4,
    "height": 16.72,
    "cx": 35.21,
    "cy": 91.64
  },
  "36": {
    "left": 24.11,
    "top": 83.28,
    "width": 7.4,
    "height": 16.72,
    "cx": 27.81,
    "cy": 91.64
  },
  "37": {
    "left": 16.72,
    "top": 83.28,
    "width": 7.4,
    "height": 16.72,
    "cx": 20.42,
    "cy": 91.64
  }
};
