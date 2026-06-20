import Logo from './Logo.jsx'
import Icon from '../Icon.jsx'

// Shared sidebar for the Owner and Tenant dashboards.
export default function Sidebar({ sectionLabel, nav, userInitial, userInitialBg, userName, userRole, onExit }) {
  return (
    <aside className="rs-side" style={{ width: 248, flex: 'none', background: '#fff', borderRight: '1px solid #ECEEF2', position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', zIndex: 50 }}>
      <div style={{ padding: '20px 18px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Logo />
      </div>
      <div className="lbl" style={{ padding: '6px 18px 8px', fontSize: 11, fontWeight: 700, color: '#AEB4BD', letterSpacing: '.05em' }}>{sectionLabel}</div>
      <nav style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
        {nav.map((n) => (
          <button key={n.key} onClick={n.go} title={n.label} className="rs-navbtn"
            style={{ display: 'flex', alignItems: 'center', gap: 11, width: '100%', border: 'none', background: n.navBg, color: n.navColor, fontWeight: n.navWeight, fontSize: 14, padding: '10px 12px', borderRadius: 11, cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ display: 'flex', flex: 'none' }}>{n.iconEl}</span>
            <span className="lbl">{n.label}</span>
          </button>
        ))}
      </nav>
      <div style={{ padding: 12, borderTop: '1px solid #F0F1F4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 6px' }}>
          <span style={{ width: 36, height: 36, borderRadius: '50%', background: userInitialBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flex: 'none' }}>{userInitial}</span>
          <div className="lbl" style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</div>
            <div style={{ fontSize: 12, color: '#8A929C' }}>{userRole}</div>
          </div>
        </div>
        <button onClick={onExit} className="rs-navbtn rs-logout" style={{ display: 'flex', alignItems: 'center', gap: 11, width: '100%', border: 'none', background: 'transparent', color: '#8A929C', fontSize: 13.5, fontWeight: 500, padding: '9px 12px', borderRadius: 10, cursor: 'pointer', marginTop: 4 }}>
          <span style={{ display: 'flex', flex: 'none' }}><Icon name="logout" size={18} /></span>
          <span className="lbl">ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  )
}

// Shared sticky dashboard header.
export function DashHeader({ title, sub, children }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(247,248,250,.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #ECEEF2', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ minWidth: 0 }}>
        <h1 style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>{title}</h1>
        <p style={{ fontSize: 13, color: '#8A929C', margin: '3px 0 0' }}>{sub}</p>
      </div>
      {children}
    </header>
  )
}
