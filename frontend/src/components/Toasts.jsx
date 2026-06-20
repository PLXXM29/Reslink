// Toast stack, top-right.
export default function Toasts({ toasts }) {
  return (
    <div style={{ position: 'fixed', top: 18, right: 18, zIndex: 200, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#fff', border: '1px solid #ECEEF2', borderLeft: '4px solid ' + t.accent, borderRadius: 13, padding: '13px 16px', boxShadow: '0 12px 34px rgba(16,24,40,.14)', minWidth: 260, maxWidth: 360, animation: 'rsToast .25s ease', pointerEvents: 'auto' }}>
          <span style={{ width: 26, height: 26, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', background: t.bg, color: t.accent }}>{t.iconEl}</span>
          <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4, color: '#1A1D24' }}>{t.text}</div>
        </div>
      ))}
    </div>
  )
}
