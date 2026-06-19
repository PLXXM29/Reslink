import { LogoMark } from '../components/Logo.jsx'
import Icon from '../Icon.jsx'

// Role-picker landing screen.
export default function Entry({ vm }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', background: 'radial-gradient(900px 500px at 15% -10%,#E6FAF8 0,rgba(230,250,248,0) 55%),radial-gradient(800px 600px at 100% 0,#EAF1FF 0,rgba(234,241,255,0) 50%),#F7F8FA', position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: '100%', maxWidth: 1060, animation: 'rsFade .5s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
          <LogoMark size={38} radius={11} iconSize={20} />
          <span style={{ fontWeight: 800, fontSize: 23, letterSpacing: '-.02em' }}>Reslink</span>
        </div>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 40px' }}>
          <h1 style={{ fontSize: 34, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 12px' }}>ยินดีต้อนรับสู่ Reslink</h1>
          <p style={{ fontSize: 16, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
            ระบบจัดการหอพักครบวงจร — จัดการห้อง บิลค่าน้ำค่าไฟ ผู้เช่า และเว็บไซต์โปรโมท ในที่เดียว<br />
            <span style={{ fontSize: 13.5, color: '#9AA1AC' }}>เลือกบทบาทเพื่อเข้าสู่ระบบ (โหมดสาธิต ไม่ต้องลงชื่อเข้าใช้)</span>
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {vm.roleCards.map((card) => (
            <button key={card.key} onClick={card.enter} className="rs-lift"
              style={{ textAlign: 'left', cursor: 'pointer', background: '#fff', border: '1px solid #ECEEF2', borderRadius: 20, padding: '28px 24px 24px', boxShadow: '0 1px 2px rgba(16,24,40,.04)' }}>
              <div style={{ width: 52, height: 52, borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, background: card.iconBg, color: card.iconColor }}>
                <span style={{ display: 'flex' }}>{card.iconEl}</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 7, letterSpacing: '-.01em' }}>{card.title}</div>
              <div style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.55, minHeight: 42 }}>{card.desc}</div>
              <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 600, color: '#0EA5A4' }}>
                เข้าสู่ระบบ<Icon name="arrowRight" size={15} />
              </div>
            </button>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 34, fontSize: 12.5, color: '#AEB4BD' }}>เดโมพอร์ตโฟลิโอ · ข้อมูลทั้งหมดเป็นข้อมูลจำลอง</div>
      </div>
    </div>
  )
}
