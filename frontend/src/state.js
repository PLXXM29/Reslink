// Initial demo state for Reslink. All data is mock/portfolio data.

export const CURRENT_MONTH = 'มิ.ย. 2569'
export const TODAY = '19 มิ.ย. 2569'

export function makeInitialState() {
  return {
    role: null,            // null | 'public' | 'owner' | 'tenant'
    publicPage: 'home',    // 'home' | 'roomDetail'
    selectedType: null,
    ownerPage: 'overview',
    tenantPage: 'home',
    billingTab: 'meter',   // 'meter' | 'list'
    maintView: 'table',    // 'table' | 'kanban'
    roleMenuOpen: false,
    currentTenantId: 't1',
    modal: null,           // { type, data }
    form: {},
    toasts: [],
    sendingIds: [],
    paying: false,

    settings: {
      dorm: 'Reslink Residence',
      address: '88/12 ซอยสุขุมวิท 26 แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110',
      phone: '02-258-9000',
      line: '@reslink',
      email: 'contact@reslink.co.th',
      waterRate: 18,
      elecRate: 8,
      commonFee: 100,
      bank: 'ธนาคารกสิกรไทย',
      acct: '123-4-56789-0',
      acctName: 'บจก. เรสลิงค์ พร็อพเพอร์ตี้',
      lineConnected: true,
      dueDay: 5,
    },

    promo: {
      heroTitle: 'อยู่สบาย ใช้ชีวิตง่าย ที่ Reslink Residence',
      heroTagline: 'หอพักสไตล์โมเดิร์น ใจกลางเมือง ใกล้ BTS',
      heroSub: 'ห้องพักพร้อมเฟอร์นิเจอร์ครบครัน ระบบรักษาความปลอดภัย 24 ชั่วโมง พร้อมสิ่งอำนวยความสะดวกครบครัน เดินทางสะดวกใกล้รถไฟฟ้าและห้างสรรพสินค้า',
      promoBanner: 'จองภายในเดือนนี้ รับส่วนลดค่าแรกเข้า 50% ✨',
      facilities: [
        { icon: 'wifi', name: 'Wi-Fi ความเร็วสูง', desc: 'ฟรีทุกห้อง ไฟเบอร์ 1Gbps' },
        { icon: 'shield', name: 'รักษาความปลอดภัย 24 ชม.', desc: 'รปภ. และคีย์การ์ด' },
        { icon: 'car', name: 'ที่จอดรถ', desc: 'มอเตอร์ไซค์และรถยนต์' },
        { icon: 'wash', name: 'ห้องซักรีด', desc: 'เครื่องซัก-อบ หยอดเหรียญ' },
        { icon: 'dumbbell', name: 'ฟิตเนส', desc: 'เปิด 06:00 - 22:00 น.' },
        { icon: 'cctv', name: 'กล้องวงจรปิด', desc: 'ครอบคลุมทุกพื้นที่ส่วนกลาง' },
      ],
      roomTypes: [
        { type: 'Studio', size: '24 ตร.ม.', tag: 'ยอดนิยม', desc: 'ห้องสตูดิโอกะทัดรัด เหมาะสำหรับอยู่คนเดียว เฟอร์นิเจอร์ครบครัน พร้อมเข้าอยู่ทันที', amenities: ['เตียง 5 ฟุต', 'ตู้เสื้อผ้า', 'โต๊ะทำงาน', 'เครื่องปรับอากาศ', 'เครื่องทำน้ำอุ่น', 'ทีวี 32 นิ้ว'] },
        { type: '1 Bedroom', size: '35 ตร.ม.', tag: '', desc: 'ห้องนอนแยกสัดส่วน มีพื้นที่นั่งเล่นกว้างขวาง เหมาะสำหรับคู่รักหรือผู้ที่ต้องการพื้นที่ส่วนตัวมากขึ้น', amenities: ['เตียง 6 ฟุต', 'โซฟา', 'ครัวขนาดเล็ก', 'ตู้เย็น', 'แอร์ 2 เครื่อง', 'ระเบียงส่วนตัว'] },
        { type: 'Deluxe', size: '48 ตร.ม.', tag: 'พรีเมียม', desc: 'ห้องสุดหรู วิวเมือง พร้อมเฟอร์นิเจอร์พรีเมียม พื้นที่กว้างขวาง ครบครันทุกฟังก์ชันการใช้งาน', amenities: ['เตียง King size', 'โซฟาเบด', 'ครัวเต็มรูปแบบ', 'ตู้เย็นขนาดใหญ่', 'แอร์ 2 เครื่อง', 'ระเบียงกว้าง', 'อ่างอาบน้ำ'] },
      ],
    },

    reviews: [
      { name: 'พิมพ์ชนก ส.', sub: 'ผู้เช่าห้อง Studio · อยู่มา 1 ปี', rating: 5, text: 'ประทับใจมากค่ะ ห้องสะอาด เจ้าของหอใจดี แจ้งซ่อมผ่านแอปแล้วช่างมาเร็วมาก เดินทางสะดวกใกล้ BTS' },
      { name: 'ณัฐพล ว.', sub: 'ผู้เช่าห้อง Deluxe · อยู่มา 8 เดือน', rating: 5, text: 'ห้องกว้าง วิวดี เฟอร์นิเจอร์ครบจริง ระบบรักษาความปลอดภัยดีมาก คุ้มค่ากับราคา แนะนำเลยครับ' },
      { name: 'สุชาดา ม.', sub: 'ผู้เช่าห้อง 1 Bedroom · อยู่มา 6 เดือน', rating: 4, text: 'ทำเลดีมาก ใกล้ห้างและรถไฟฟ้า ส่วนกลางสะอาด ฟิตเนสใช้ได้จริง บิลค่าน้ำค่าไฟส่งผ่าน LINE สะดวกดีค่ะ' },
    ],

    gallery: ['ล็อบบี้ต้อนรับ', 'ห้องพักตัวอย่าง', 'สระว่ายน้ำ', 'ฟิตเนสเซ็นเตอร์', 'ห้องซักรีด', 'ที่จอดรถ', 'พื้นที่ co-working', 'วิวจากระเบียง'],

    rooms: [
      { id: 'r101', number: '101', type: 'Studio', floor: 1, status: 'occupied', rent: 4500, tenantId: 't1' },
      { id: 'r102', number: '102', type: 'Studio', floor: 1, status: 'vacant', rent: 4500, tenantId: null },
      { id: 'r103', number: '103', type: '1 Bedroom', floor: 1, status: 'occupied', rent: 6500, tenantId: 't2' },
      { id: 'r104', number: '104', type: '1 Bedroom', floor: 1, status: 'occupied', rent: 6500, tenantId: 't3' },
      { id: 'r201', number: '201', type: 'Studio', floor: 2, status: 'occupied', rent: 4500, tenantId: 't4' },
      { id: 'r202', number: '202', type: '1 Bedroom', floor: 2, status: 'vacant', rent: 6500, tenantId: null },
      { id: 'r203', number: '203', type: 'Deluxe', floor: 2, status: 'occupied', rent: 9000, tenantId: 't5' },
      { id: 'r204', number: '204', type: '1 Bedroom', floor: 2, status: 'maintenance', rent: 6500, tenantId: null },
      { id: 'r301', number: '301', type: 'Studio', floor: 3, status: 'occupied', rent: 4500, tenantId: 't6' },
      { id: 'r302', number: '302', type: '1 Bedroom', floor: 3, status: 'occupied', rent: 6500, tenantId: 't7' },
      { id: 'r303', number: '303', type: 'Deluxe', floor: 3, status: 'vacant', rent: 9000, tenantId: null },
      { id: 'r304', number: '304', type: 'Studio', floor: 3, status: 'occupied', rent: 4500, tenantId: 't8' },
      { id: 'r401', number: '401', type: 'Deluxe', floor: 4, status: 'occupied', rent: 9000, tenantId: 't9' },
      { id: 'r402', number: '402', type: 'Deluxe', floor: 4, status: 'vacant', rent: 9000, tenantId: null },
    ],

    tenants: [
      { id: 't1', name: 'สมชาย ใจดี', roomId: 'r101', phone: '081-234-5678', line: 'somchai_jd', moveIn: '01 ม.ค. 2568', deposit: 9000 },
      { id: 't2', name: 'นภา ศรีสุข', roomId: 'r103', phone: '089-111-2233', line: 'napa.ss', moveIn: '15 มี.ค. 2568', deposit: 13000 },
      { id: 't3', name: 'วีระ พงษ์ไพร', roomId: 'r104', phone: '062-555-8899', line: 'weera_pp', moveIn: '10 พ.ค. 2568', deposit: 13000 },
      { id: 't4', name: 'มานี รักเรียน', roomId: 'r201', phone: '080-777-1212', line: 'manee.r', moveIn: '01 ก.พ. 2568', deposit: 9000 },
      { id: 't5', name: 'ปิยะ วัฒนา', roomId: 'r203', phone: '085-343-9090', line: 'piya_w', moveIn: '20 ธ.ค. 2567', deposit: 18000 },
      { id: 't6', name: 'กานต์ดา มณี', roomId: 'r301', phone: '063-234-7788', line: 'kanda.m', moveIn: '05 มิ.ย. 2568', deposit: 9000 },
      { id: 't7', name: 'ธนา เจริญสุข', roomId: 'r302', phone: '091-456-1234', line: 'thana.cs', moveIn: '18 เม.ย. 2568', deposit: 13000 },
      { id: 't8', name: 'อรอุมา ทองคำ', roomId: 'r304', phone: '084-909-5656', line: 'onuma.tk', moveIn: '22 พ.ค. 2568', deposit: 9000 },
      { id: 't9', name: 'เอกชัย รุ่งเรือง', roomId: 'r401', phone: '086-121-3434', line: 'ekkachai.r', moveIn: '01 พ.ย. 2567', deposit: 18000 },
    ],

    bills: [
      { id: 'b1', tenantId: 't1', roomId: 'r101', month: 'มิ.ย. 2569', pw: 120, cw: 126, pe: 3420, pe2: 3640, status: 'unpaid' },
      { id: 'b2', tenantId: 't2', roomId: 'r103', month: 'มิ.ย. 2569', pw: 210, cw: 215, pe: 5100, pe2: 5280, status: 'paid' },
      { id: 'b3', tenantId: 't3', roomId: 'r104', month: 'มิ.ย. 2569', pw: 88, cw: 95, pe: 2200, pe2: 2410, status: 'unpaid' },
      { id: 'b4', tenantId: 't4', roomId: 'r201', month: 'มิ.ย. 2569', pw: 300, cw: 304, pe: 4400, pe2: 4560, status: 'paid' },
      { id: 'b5', tenantId: 't5', roomId: 'r203', month: 'มิ.ย. 2569', pw: 150, cw: 158, pe: 6000, pe2: 6320, status: 'draft' },
      { id: 'b6', tenantId: 't6', roomId: 'r301', month: 'มิ.ย. 2569', pw: 75, cw: 80, pe: 1800, pe2: 1995, status: 'unpaid' },
      { id: 'b7', tenantId: 't7', roomId: 'r302', month: 'มิ.ย. 2569', pw: 410, cw: 417, pe: 5500, pe2: 5740, status: 'paid' },
      { id: 'b8', tenantId: 't8', roomId: 'r304', month: 'มิ.ย. 2569', pw: 60, cw: 64, pe: 900, pe2: 1080, status: 'draft' },
      { id: 'b9', tenantId: 't9', roomId: 'r401', month: 'มิ.ย. 2569', pw: 220, cw: 230, pe: 7200, pe2: 7560, status: 'unpaid' },
      { id: 'h1', tenantId: 't1', roomId: 'r101', month: 'พ.ค. 2569', pw: 115, cw: 120, pe: 3210, pe2: 3420, status: 'paid' },
      { id: 'h2', tenantId: 't1', roomId: 'r101', month: 'เม.ย. 2569', pw: 110, cw: 115, pe: 3020, pe2: 3210, status: 'paid' },
    ],

    maintenance: [
      { id: 'm1', roomId: 'r101', tenantId: 't1', title: 'ก๊อกน้ำในห้องน้ำรั่ว', category: 'ประปา', detail: 'น้ำหยดตลอดเวลา ปิดไม่สนิท', date: '16 มิ.ย. 2569', status: 'pending' },
      { id: 'm2', roomId: 'r301', tenantId: 't6', title: 'แอร์มีเสียงดังผิดปกติ', category: 'เครื่องปรับอากาศ', detail: 'มีเสียงดังตอนเปิดใช้งาน', date: '12 มิ.ย. 2569', status: 'inprogress' },
      { id: 'm3', roomId: 'r203', tenantId: 't5', title: 'หลอดไฟห้องครัวเสีย', category: 'ไฟฟ้า', detail: 'หลอดไฟกระพริบและดับ', date: '05 มิ.ย. 2569', status: 'done' },
      { id: 'm4', roomId: 'r401', tenantId: 't9', title: 'ประตูระเบียงปิดไม่สนิท', category: 'ทั่วไป', detail: 'รางประตูฝืด ปิดยาก', date: '17 มิ.ย. 2569', status: 'pending' },
      { id: 'm5', roomId: 'r204', tenantId: null, title: 'ปรับปรุงห้องก่อนปล่อยเช่า', category: 'ทั่วไป', detail: 'ทาสีและตรวจเช็คระบบไฟ', date: '10 มิ.ย. 2569', status: 'inprogress' },
    ],

    announcements: [
      { id: 'a1', title: 'แจ้งปิดปรับปรุงระบบน้ำประปา ชั้น 1-2', body: 'เรียนผู้พักอาศัยทุกท่าน ทางหอพักจะทำการปิดปรับปรุงระบบน้ำประปาบริเวณชั้น 1-2 ในวันที่ 25 มิ.ย. 2569 เวลา 10:00-14:00 น. ขออภัยในความไม่สะดวก', date: '18 มิ.ย. 2569', tag: 'สำคัญ' },
      { id: 'a2', title: 'เปิดให้บริการห้องซักรีดใหม่ ชั้น 1', body: 'เพิ่มเครื่องซัก-อบผ้าใหม่ 4 เครื่อง บริเวณห้องซักรีดชั้น 1 เปิดบริการ 24 ชั่วโมง', date: '14 มิ.ย. 2569', tag: 'ข่าวสาร' },
      { id: 'a3', title: 'แจ้งกำหนดชำระค่าเช่าประจำเดือน', body: 'กรุณาชำระค่าเช่าและค่าสาธารณูปโภคภายในวันที่ 5 ของทุกเดือน เพื่อหลีกเลี่ยงค่าปรับล่าช้า', date: '10 มิ.ย. 2569', tag: 'แจ้งเตือน' },
      { id: 'a4', title: 'กิจกรรมทำความสะอาดพื้นที่ส่วนกลาง', body: 'ขอเชิญผู้พักอาศัยร่วมกิจกรรม Big Cleaning Day วันที่ 30 มิ.ย. 2569 เวลา 09:00 น. บริเวณล็อบบี้', date: '08 มิ.ย. 2569', tag: 'กิจกรรม' },
    ],

    activity: [
      { text: 'ชำระบิลแล้ว · ห้อง 302 (ธนา)', time: '2 ชม. ที่แล้ว', type: 'paid' },
      { text: 'แจ้งซ่อมใหม่ · ห้อง 401 (ประตูระเบียง)', time: '5 ชม. ที่แล้ว', type: 'repair' },
      { text: 'ส่งบิลผ่าน LINE · ห้อง 201', time: 'เมื่อวานนี้', type: 'bill' },
      { text: 'เพิ่มผู้เช่าใหม่ · ห้อง 301 (กานต์ดา)', time: '2 วันที่แล้ว', type: 'tenant' },
      { text: 'ชำระบิลแล้ว · ห้อง 103 (นภา)', time: '3 วันที่แล้ว', type: 'paid' },
    ],

    revenueSeries: [
      { m: 'ม.ค.', v: 48500 }, { m: 'ก.พ.', v: 51000 }, { m: 'มี.ค.', v: 53500 },
      { m: 'เม.ย.', v: 52000 }, { m: 'พ.ค.', v: 56500 }, { m: 'มิ.ย.', v: 54000 },
    ],
  }
}
