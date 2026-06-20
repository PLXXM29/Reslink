// Floating demo role switcher (bottom-right).
export default function RoleSwitcher({ vm }) {
  return (
    <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 120 }}>
      {vm.roleMenuOpen && (
        <div style={{ position: 'absolute', bottom: 54, right: 0, width: 236, background: '#fff', border: '1px solid #ECEEF2', borderRadius: 16, boxShadow: '0 18px 50px rgba(16,24,40,.18)', padding: 8, animation: 'rsPop .16s ease' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#9AA1AC', letterSpacing: '.04em', padding: '8px 10px 6px' }}>สลับมุมมอง (เดโม)</div>
          {vm.switchOptions.map((opt) => (
            <button key={opt.key} onClick={opt.go} className="rs-navbtn" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', border: 'none', background: opt.active ? '#F4F6F8' : 'transparent', borderRadius: 10, cursor: 'pointer', textAlign: 'left', marginBottom: 2 }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', background: opt.iconBg, color: opt.iconColor, flex: 'none' }}>{opt.iconEl}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: '#1A1D24' }}>{opt.label}</span>
              {opt.active && (
                <span style={{ marginLeft: 'auto', color: '#0EA5A4' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
              )}
            </button>
          ))}
          <div style={{ height: 1, background: '#F0F1F4', margin: '6px 4px' }} />
          <button onClick={vm.exitToEntry} className="rs-logout" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', border: 'none', background: 'transparent', borderRadius: 10, cursor: 'pointer', textAlign: 'left', color: '#DC2626' }}>
            <span style={{ width: 30, height: 30, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>
            </span>
            <span style={{ fontSize: 13.5, fontWeight: 600 }}>ออกไปหน้าเลือกบทบาท</span>
          </button>
        </div>
      )}
      <button onClick={vm.toggleRoleMenu} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 15px 9px 11px', background: '#1A1D24', color: '#fff', border: 'none', borderRadius: 30, cursor: 'pointer', boxShadow: '0 10px 28px rgba(16,24,40,.28)', fontSize: 13, fontWeight: 600 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 0 3px rgba(52,211,153,.25)' }} />
        เดโม · {vm.roleLabel}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
      </button>
    </div>
  )
}
