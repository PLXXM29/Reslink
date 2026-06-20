// Reslink logo mark (house glyph) + optional wordmark.
export function LogoMark({ size = 34, radius = 10, iconSize = 18 }) {
  return (
    <span style={{ width: size, height: size, borderRadius: radius, background: 'linear-gradient(135deg,#0EA5A4,#0C8F8E)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V8l9-5 9 5v13" />
        <path d="M9 21v-7h6v7" />
      </svg>
    </span>
  )
}

export default function Logo({ size = 34, radius = 10, iconSize = 18, fontSize = 18, wordClass = 'lbl', color = '#1A1D24' }) {
  return (
    <>
      <LogoMark size={size} radius={radius} iconSize={iconSize} />
      <span className={wordClass} style={{ fontWeight: 800, fontSize, letterSpacing: '-.02em', color }}>Reslink</span>
    </>
  )
}
