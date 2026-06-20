import { LogoMark } from '../components/Logo.jsx'
import Icon from '../Icon.jsx'

const HATCH = 'repeating-linear-gradient(135deg,#EEF1F4 0 12px,#F5F7F9 12px 24px)'
const placeholderBox = (text, extra = {}) => (
  <div style={{ background: HATCH, border: '1px solid #E7EAEE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B0BA', fontFamily: 'ui-monospace,Menlo,monospace', ...extra }}>{text}</div>
)

export default function PublicSite({ vm }) {
  const { promo, settings, heroIcons, contactIcon } = vm
  return (
    <div style={{ background: '#fff' }}>
      {/* NAV */}
      <div style={{ position: 'sticky', top: 0, zIndex: 90, background: 'rgba(255,255,255,.86)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #EEF0F3' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 66, display: 'flex', alignItems: 'center', gap: 18 }}>
          <a href="#top" onClick={vm.setPublicHome} style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', cursor: 'pointer' }}>
            <LogoMark size={32} radius={9} iconSize={17} />
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-.02em', color: '#1A1D24' }}>Reslink</span>
          </a>
          <div style={{ marginLeft: 18, display: 'flex', gap: 4 }} id="pubnav">
            {[['#rooms', 'ห้องพัก'], ['#facilities', 'สิ่งอำนวยความสะดวก'], ['#gallery', 'แกลเลอรี'], ['#reviews', 'รีวิว'], ['#contact', 'ติดต่อ']].map(([href, label]) => (
              <a key={href} href={href} className="rs-navlink" style={{ textDecoration: 'none', color: '#5B636E', fontSize: 14, fontWeight: 500, padding: '8px 13px', borderRadius: 9 }}>{label}</a>
            ))}
          </div>
          <a href="#rooms" className="rs-btn-primary" style={{ marginLeft: 'auto', textDecoration: 'none', background: '#0EA5A4', color: '#fff', fontSize: 14, fontWeight: 600, padding: '10px 18px', borderRadius: 10, boxShadow: '0 6px 16px rgba(14,165,164,.28)' }}>ดูห้องว่าง</a>
        </div>
      </div>

      {vm.pubPageHome && <Home vm={vm} />}
      {vm.pubPageDetail && <RoomDetail vm={vm} />}

      {/* FOOTER */}
      <div style={{ background: '#15181F', color: '#C7CCD3' }}>
        <div className="rs-foot" style={{ maxWidth: 1200, margin: '0 auto', padding: '54px 24px 30px', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
              <LogoMark size={32} radius={9} iconSize={17} />
              <span style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>Reslink</span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#8A929C', margin: 0, maxWidth: 280 }}>หอพักสไตล์โมเดิร์น ใจกลางเมือง พร้อมระบบจัดการครบวงจรเพื่อการอยู่อาศัยที่สะดวกสบาย</p>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 14 }}>เมนู</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 13.5 }}>
              {[['#rooms', 'ห้องพัก'], ['#facilities', 'สิ่งอำนวยความสะดวก'], ['#reviews', 'รีวิว']].map(([h, l]) => (
                <a key={h} href={h} className="rs-footlink" style={{ color: '#8A929C', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 14 }}>ติดต่อ</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 13.5, color: '#8A929C' }}>
              <span>{settings.phone}</span><span>{settings.line}</span><span>{settings.email}</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 14 }}>ที่อยู่</div>
            <div style={{ fontSize: 13.5, color: '#8A929C', lineHeight: 1.6 }}>{settings.address}</div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #262A32' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 12.5, color: '#6B7280' }}>
            <span>© 2569 Reslink Residence. สงวนลิขสิทธิ์</span>
            <span>เดโมพอร์ตโฟลิโอ · ข้อมูลจำลอง</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Home({ vm }) {
  const { promo, settings, heroIcons, contactIcon } = vm
  return (
    <div id="top">
      <div style={{ background: '#0F1115', color: '#fff', textAlign: 'center', fontSize: 13.5, fontWeight: 500, padding: '9px 16px', letterSpacing: '.01em' }}>{promo.promoBanner}</div>

      {/* HERO */}
      <div style={{ background: 'radial-gradient(800px 420px at 12% 10%,#E6FAF8 0,rgba(230,250,248,0) 60%),radial-gradient(700px 500px at 95% 0,#EAF1FF 0,rgba(234,241,255,0) 55%),#fff' }}>
        <div className="rs-hero" style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 56px', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 48, alignItems: 'center' }}>
          <div style={{ animation: 'rsFade .5s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #E2F4F3', color: '#0C8F8E', fontSize: 12.5, fontWeight: 600, padding: '7px 13px', borderRadius: 30, marginBottom: 20, boxShadow: '0 2px 8px rgba(16,24,40,.04)' }}>{heroIcons.pin} {promo.heroTagline}</div>
            <h1 style={{ fontSize: 46, lineHeight: 1.12, fontWeight: 800, letterSpacing: '-.025em', margin: '0 0 18px', color: '#15181F' }}>{promo.heroTitle}</h1>
            <p style={{ fontSize: 16.5, lineHeight: 1.65, color: '#5B636E', margin: '0 0 30px', maxWidth: 520 }}>{promo.heroSub}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#rooms" className="rs-btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0EA5A4', color: '#fff', fontSize: 15, fontWeight: 600, padding: '14px 24px', borderRadius: 12, boxShadow: '0 10px 26px rgba(14,165,164,.3)' }}>ดูห้องว่าง<Icon name="arrowRight" size={16} /></a>
              <a href="#contact" className="rs-btn-outline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', background: '#fff', border: '1px solid #DDE1E6', color: '#1A1D24', fontSize: 15, fontWeight: 600, padding: '14px 24px', borderRadius: 12 }}>ติดต่อจอง</a>
            </div>
            <div style={{ display: 'flex', gap: 30, marginTop: 38 }}>
              <Stat big="฿4,500" unit="/ด." sub="เริ่มต้นเพียง" />
              <div style={{ width: 1, background: '#ECEEF2' }} />
              <Stat big="3 นาที" sub="เดินถึง BTS" />
              <div style={{ width: 1, background: '#ECEEF2' }} />
              <Stat big="24 ชม." sub="รปภ. & CCTV" />
            </div>
          </div>
          <div style={{ position: 'relative', animation: 'rsFade .6s ease' }}>
            {placeholderBox('[ ภาพหอพัก / อาคาร ]', { aspectRatio: '4/4.4', background: 'repeating-linear-gradient(135deg,#EEF1F4 0 14px,#F5F7F9 14px 28px)', borderRadius: 22, fontSize: 13, boxShadow: '0 30px 60px rgba(16,24,40,.10)' })}
            <div style={{ position: 'absolute', left: -18, bottom: 30, background: '#fff', border: '1px solid #EEF0F3', borderRadius: 16, padding: '14px 16px', boxShadow: '0 16px 40px rgba(16,24,40,.14)', display: 'flex', alignItems: 'center', gap: 11 }}>
              <span style={{ width: 38, height: 38, borderRadius: 11, background: '#ECFDF5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="checkCircle" size={20} /></span>
              <div><div style={{ fontSize: 13, fontWeight: 700 }}>พร้อมเข้าอยู่</div><div style={{ fontSize: 12, color: '#8A929C' }}>ห้องว่างหลายห้อง</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* facility strip */}
      <div style={{ borderTop: '1px solid #F0F1F4', borderBottom: '1px solid #F0F1F4', background: '#FAFBFC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '22px 24px', display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <StripItem icon={heroIcons.wifi} text="Wi-Fi ไฟเบอร์ความเร็วสูง" />
          <StripItem icon={heroIcons.shield} text="รักษาความปลอดภัย 24 ชม." />
          <StripItem icon={heroIcons.car} text="ที่จอดรถส่วนตัว" />
          <StripItem icon={contactIcon} text={'โทร ' + settings.phone} />
        </div>
      </div>

      {/* ROOM LISTINGS */}
      <div id="rooms" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px 20px', scrollMarginTop: 80 }}>
        <SectionHead eyebrow="ห้องพักของเรา" title="เลือกห้องที่ใช่สำหรับคุณ" sub="ทุกห้องมาพร้อมเฟอร์นิเจอร์ครบครัน พร้อมเข้าอยู่ทันที" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(310px,1fr))', gap: 24 }}>
          {vm.pubRoomTypes.map((rt) => (
            <div key={rt.type} className="rs-lift-room" style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 20, overflow: 'hidden', boxShadow: '0 1px 2px rgba(16,24,40,.04)', transition: 'transform .18s ease, box-shadow .18s ease' }}>
              <div style={{ position: 'relative', aspectRatio: '16/10', background: HATCH, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B0BA', fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 12, borderBottom: '1px solid #EEF0F3' }}>
                [ ภาพห้อง {rt.type} ]
                {rt.tag && <span style={{ position: 'absolute', top: 12, left: 12, background: '#1A1D24', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 20 }}>{rt.tag}</span>}
                <span style={{ position: 'absolute', top: 12, right: 12, background: rt.availBg, color: rt.availColor, fontSize: 11.5, fontWeight: 700, padding: '5px 11px', borderRadius: 20 }}>{rt.availLabel}</span>
              </div>
              <div style={{ padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>{rt.type}</h3>
                  <span style={{ fontSize: 13, color: '#8A929C', fontWeight: 500 }}>{rt.size}</span>
                </div>
                <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.55, margin: '0 0 18px', minHeight: 62 }}>{rt.desc}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
                  <div><span style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-.02em', color: '#0C8F8E' }}>{rt.priceDisplay}</span><span style={{ fontSize: 13.5, color: '#8A929C', fontWeight: 600 }}> /เดือน</span></div>
                  <button onClick={rt.open} className="rs-btn-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F2F4F7', border: 'none', color: '#1A1D24', fontSize: 13.5, fontWeight: 600, padding: '10px 16px', borderRadius: 10, cursor: 'pointer' }}>ดูรายละเอียด</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FACILITIES */}
      <div id="facilities" style={{ background: '#FAFBFC', borderTop: '1px solid #F0F1F4', marginTop: 60, scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px' }}>
          <div className="rs-2col" style={{ display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0EA5A4', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>สิ่งอำนวยความสะดวก</div>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 14px', lineHeight: 1.2 }}>ครบครันทุกการใช้ชีวิต</h2>
              <p style={{ fontSize: 15.5, color: '#6B7280', lineHeight: 1.65, margin: '0 0 24px' }}>เราใส่ใจทุกรายละเอียด เพื่อให้คุณใช้ชีวิตได้อย่างสะดวกสบายและปลอดภัย ตลอด 24 ชั่วโมง</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#fff', border: '1px solid #EEF0F3', borderRadius: 14, padding: '14px 16px' }}>
                <span style={{ width: 40, height: 40, borderRadius: 11, background: '#E6FAF8', color: '#0C8F8E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{heroIcons.pin}</span>
                <div><div style={{ fontSize: 13.5, fontWeight: 700 }}>ทำเลใจกลางเมือง</div><div style={{ fontSize: 12.5, color: '#8A929C', lineHeight: 1.4 }}>{settings.address}</div></div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
              {vm.facilities.map((f) => (
                <div key={f.name} className="rs-facility" style={{ background: '#fff', border: '1px solid #EEF0F3', borderRadius: 16, padding: 20 }}>
                  <span style={{ width: 42, height: 42, borderRadius: 12, background: '#F2F4F7', color: '#0C8F8E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 13 }}>{f.iconEl}</span>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{f.name}</div>
                  <div style={{ fontSize: 13, color: '#8A929C', lineHeight: 1.45 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div id="gallery" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px', scrollMarginTop: 70 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0EA5A4', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>แกลเลอรี</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>บรรยากาศภายในหอพัก</h2>
        </div>
        <div className="rs-gal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {vm.galleryEls.map((g, i) => (
            <div key={i} style={{ aspectRatio: '1/1', background: 'repeating-linear-gradient(135deg,#EEF1F4 0 11px,#F5F7F9 11px 22px)', border: '1px solid #E7EAEE', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B0BA', fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 11.5, textAlign: 'center', padding: 8 }}>[ {g} ]</div>
          ))}
        </div>
      </div>

      {/* REVIEWS */}
      <div id="reviews" style={{ background: '#FAFBFC', borderTop: '1px solid #F0F1F4', scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0EA5A4', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>รีวิวจากผู้เช่า</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>เสียงจากลูกบ้านของเรา</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 22 }}>
            {vm.reviews.map((rv) => (
              <div key={rv.name} style={{ background: '#fff', border: '1px solid #EEF0F3', borderRadius: 18, padding: 26, boxShadow: '0 1px 2px rgba(16,24,40,.04)' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14, color: '#F59E0B' }}>
                  {rv.stars.map((on, i) => (
                    <svg key={i} width="17" height="17" viewBox="0 0 24 24" fill={on ? 'currentColor' : '#E5E7EB'} stroke="none"><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.6 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" /></svg>
                  ))}
                </div>
                <p style={{ fontSize: 14.5, color: '#3C434E', lineHeight: 1.65, margin: '0 0 18px' }}>&ldquo;{rv.text}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#0EA5A4,#0C8F8E)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flex: 'none' }}>{rv.initial}</span>
                  <div><div style={{ fontSize: 14, fontWeight: 700 }}>{rv.name}</div><div style={{ fontSize: 12.5, color: '#8A929C' }}>{rv.sub}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px', scrollMarginTop: 70 }}>
        <div className="rs-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 40, alignItems: 'stretch' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0EA5A4', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>ติดต่อเรา</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 14px', lineHeight: 1.2 }}>สนใจเข้าชมห้องพัก?</h2>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.65, margin: '0 0 26px' }}>ติดต่อทีมงานเพื่อนัดหมายเข้าชมห้องพัก หรือสอบถามข้อมูลเพิ่มเติมได้ทุกวัน</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              <ContactRow bg="#E6FAF8" color="#0C8F8E" icon={contactIcon} label="โทรศัพท์" value={settings.phone} />
              <ContactRow bg="#E7F9EE" color="#06A94D" icon={<LineGlyph size={19} />} label="LINE Official" value={settings.line} />
              <ContactRow bg="#EFF6FF" color="#2563EB" icon={heroIcons.pin} label="ที่อยู่" value={settings.address} alignStart />
            </div>
            {placeholderBox('[ แผนที่ Google Maps ]', { aspectRatio: '16/8', background: 'repeating-linear-gradient(135deg,#EAEEF2 0 12px,#F2F5F8 12px 24px)', borderRadius: 16, fontSize: 12 })}
          </div>
          <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 20, padding: 30, boxShadow: '0 1px 2px rgba(16,24,40,.04)' }}>
            <h3 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 4px' }}>ส่งคำขอจอง / นัดชมห้อง</h3>
            <p style={{ fontSize: 13.5, color: '#8A929C', margin: '0 0 22px' }}>กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับโดยเร็ว</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <Field label="ชื่อ-นามสกุล"><input className="rs-input" placeholder="ชื่อของคุณ" style={inputStyle} /></Field>
              <Field label="เบอร์โทร"><input className="rs-input" placeholder="08x-xxx-xxxx" style={inputStyle} /></Field>
            </div>
            <div style={{ marginBottom: 14 }}>
              <Field label="ประเภทห้องที่สนใจ">
                <select className="rs-input" style={{ ...inputStyle, background: '#fff' }}>
                  <option>Studio — ฿4,500/เดือน</option>
                  <option>1 Bedroom — ฿6,500/เดือน</option>
                  <option>Deluxe — ฿9,000/เดือน</option>
                </select>
              </Field>
            </div>
            <div style={{ marginBottom: 20 }}>
              <Field label="ข้อความ"><textarea rows="3" className="rs-input" placeholder="วันที่สะดวกเข้าชม / คำถามเพิ่มเติม" style={{ ...inputStyle, resize: 'vertical' }} /></Field>
            </div>
            <button onClick={vm.submitBooking} className="rs-btn-primary" style={{ width: '100%', background: '#0EA5A4', color: '#fff', border: 'none', borderRadius: 11, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 20px rgba(14,165,164,.28)' }}>ส่งคำขอจอง</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function RoomDetail({ vm }) {
  const { selRT } = vm
  const corner = (label) => (
    <div style={{ aspectRatio: '1/1', background: 'repeating-linear-gradient(135deg,#EEF1F4 0 10px,#F5F7F9 10px 20px)', border: '1px solid #E7EAEE', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B0BA', fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10 }}>{label}</div>
  )
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px 72px' }}>
      <button onClick={vm.setPublicHome} className="rs-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'transparent', border: 'none', color: '#5B636E', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: '8px 0', marginBottom: 18 }}>
        <Icon name="arrowLeft" size={17} /> กลับสู่หน้าหลัก
      </button>
      <div className="rs-2col" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 36, alignItems: 'start' }}>
        <div>
          <div style={{ aspectRatio: '16/11', background: 'repeating-linear-gradient(135deg,#EEF1F4 0 14px,#F5F7F9 14px 28px)', border: '1px solid #E7EAEE', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B0BA', fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 13, marginBottom: 12 }}>[ ภาพห้อง {selRT.type} — รูปหลัก ]</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {corner('[ มุม 1 ]')}{corner('[ มุม 2 ]')}{corner('[ ห้องน้ำ ]')}{corner('[ ระเบียง ]')}
          </div>
          <div style={{ marginTop: 26 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>สิ่งอำนวยความสะดวกในห้อง</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
              {selRT.amenities.map((am) => (
                <div key={am} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: '#3C434E' }}>
                  <span style={{ width: 22, height: 22, borderRadius: 7, background: '#E6FAF8', color: '#0C8F8E', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>{am}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 26 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>ห้องที่ว่างในประเภทนี้</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {vm.selRooms.map((rm) => (
                <div key={rm.id} style={{ display: 'flex', alignItems: 'center', gap: 9, border: '1px solid #ECEEF2', borderRadius: 12, padding: '10px 14px', background: '#fff' }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>ห้อง {rm.number}</span>
                  <span style={{ fontSize: 12, color: '#8A929C' }}>ชั้น {rm.floor}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: rm.statusBg, color: rm.statusColor }}>{rm.statusLabel}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: 'sticky', top: 84 }}>
          <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 20, padding: 26, boxShadow: '0 8px 28px rgba(16,24,40,.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ background: selRT.availBg, color: selRT.availColor, fontSize: 11.5, fontWeight: 700, padding: '4px 11px', borderRadius: 20 }}>{selRT.availLabel}</span>
              <span style={{ fontSize: 13, color: '#8A929C' }}>{selRT.size}</span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.02em', margin: '6px 0' }}>ห้อง {selRT.type}</h2>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: '0 0 18px' }}>{selRT.desc}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, padding: '16px 0', borderTop: '1px solid #F0F1F4', borderBottom: '1px solid #F0F1F4', marginBottom: 18 }}>
              <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', color: '#0C8F8E' }}>{selRT.priceDisplay}</span>
              <span style={{ fontSize: 14, color: '#8A929C', fontWeight: 600 }}>/ เดือน</span>
            </div>
            <div style={{ fontSize: 13, color: '#8A929C', lineHeight: 1.8, marginBottom: 20 }}>• เงินประกัน 2 เดือน<br />• ค่าน้ำ ฿18/หน่วย · ค่าไฟ ฿8/หน่วย<br />• ค่าส่วนกลาง ฿100/เดือน<br />• สัญญาขั้นต่ำ 6 เดือน</div>
            <button onClick={vm.submitBooking} className="rs-btn-primary" style={{ width: '100%', background: '#0EA5A4', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 20px rgba(14,165,164,.28)', marginBottom: 10 }}>จองห้องนี้</button>
            <button onClick={vm.navContact} className="rs-btn-outline" style={{ width: '100%', background: '#fff', border: '1px solid #DDE1E6', color: '#1A1D24', borderRadius: 12, padding: 13, fontSize: 14.5, fontWeight: 600, cursor: 'pointer' }}>นัดหมายเข้าชม</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const inputStyle = { width: '100%', padding: '11px 13px', border: '1px solid #DDE1E6', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }

function Field({ label, children }) {
  return (<div><label style={{ fontSize: 13, fontWeight: 600, color: '#3C434E', display: 'block', marginBottom: 6 }}>{label}</label>{children}</div>)
}
function Stat({ big, unit, sub }) {
  return (<div><div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.02em' }}>{big}{unit && <span style={{ fontSize: 14, fontWeight: 600, color: '#8A929C' }}>{unit}</span>}</div><div style={{ fontSize: 13, color: '#8A929C', marginTop: 2 }}>{sub}</div></div>)
}
function StripItem({ icon, text }) {
  return (<div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#3C434E', fontSize: 14, fontWeight: 500 }}>{icon} {text}</div>)
}
function SectionHead({ eyebrow, title, sub }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 44px' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0EA5A4', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>{eyebrow}</div>
      <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 12px' }}>{title}</h2>
      <p style={{ fontSize: 15.5, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>{sub}</p>
    </div>
  )
}
function ContactRow({ bg, color, icon, label, value, alignStart }) {
  return (
    <div style={{ display: 'flex', alignItems: alignStart ? 'flex-start' : 'center', gap: 13 }}>
      <span style={{ width: 42, height: 42, borderRadius: 12, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{icon}</span>
      <div><div style={{ fontSize: 12.5, color: '#8A929C' }}>{label}</div><div style={{ fontSize: label === 'ที่อยู่' ? 14 : 15, fontWeight: label === 'ที่อยู่' ? 600 : 700, lineHeight: 1.45 }}>{value}</div></div>
    </div>
  )
}
export function LineGlyph({ size = 19 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 5.7 2 10.2c0 2.6 1.5 4.9 3.8 6.4-.2.7-.7 2.4-.8 2.8 0 0-.1.4.2.5.2.1.4 0 .4 0 .6-.1 2.9-1.9 3.9-2.6.8.1 1.6.2 2.5.2 5.5 0 10-3.7 10-8.3S17.5 2 12 2z" /></svg>)
}
