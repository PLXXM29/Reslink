import Sidebar, { DashHeader } from '../components/Sidebar.jsx'
import Icon from '../Icon.jsx'
import { LineGlyph } from './PublicSite.jsx'

export default function TenantPortal({ vm }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F8FA' }}>
      <Sidebar
        sectionLabel="เมนูผู้เช่า" nav={vm.tenantNav}
        userInitial={vm.tenInitial} userInitialBg="linear-gradient(135deg,#F97316,#EA580C)"
        userName={vm.tenName} userRole={'ห้อง ' + vm.tenRoomNo + ' · ผู้เช่า'} onExit={vm.exitToEntry}
      />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <DashHeader title={vm.tTitle} sub={vm.tSub}>
          <button className="rs-iconbtn" style={{ marginLeft: 'auto', width: 40, height: 40, borderRadius: 10, background: '#fff', border: '1px solid #E7EAEE', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#5B636E', position: 'relative' }}>
            {vm.bellIcon}<span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, background: '#EF4444', borderRadius: '50%', border: '1.5px solid #fff' }} />
          </button>
        </DashHeader>
        <div className="rs-main-pad" style={{ padding: '26px 28px 60px' }}>
          {vm.tIs.home && <Home vm={vm} />}
          {vm.tIs.bills && <Bills vm={vm} />}
          {vm.tIs.room && <Room vm={vm} />}
          {vm.tIs.repair && <Repair vm={vm} />}
          {vm.tIs.news && <News vm={vm} />}
        </div>
      </main>
    </div>
  )
}

function Home({ vm }) {
  const { curBill, latestAnn } = vm
  return (
    <div style={{ animation: 'rsFade .3s ease', maxWidth: 980 }}>
      <div className="rs-2c" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginBottom: 18 }}>
        <div style={{ background: 'linear-gradient(120deg,#0EA5A4,#0C8F8E)', borderRadius: 20, padding: 26, color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 12px 30px rgba(14,165,164,.22)' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 13.5, opacity: .85, marginBottom: 6 }}>ยินดีต้อนรับกลับ</div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.01em', marginBottom: 18 }}>{vm.tenName}</div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <div><div style={{ fontSize: 12, opacity: .8 }}>ห้องพัก</div><div style={{ fontSize: 18, fontWeight: 700 }}>{vm.tenRoomNo} · {vm.tenRoomType}</div></div>
              <div><div style={{ fontSize: 12, opacity: .8 }}>ค่าเช่า/เดือน</div><div style={{ fontSize: 18, fontWeight: 700 }}>{vm.tenRentD}</div></div>
            </div>
          </div>
          <div style={{ position: 'absolute', right: -30, bottom: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }} />
        </div>

        {vm.curIsUnpaid && curBill && (
          <div style={{ background: '#fff', border: '1px solid #FCD9D9', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#EF4444' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>ค้างชำระ — {curBill.month}</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginBottom: 4 }}>{curBill.totalD}</div>
            <div style={{ fontSize: 12.5, color: '#8A929C', marginBottom: 'auto' }}>กรุณาชำระภายในวันที่ 5 ของเดือน</div>
            <button onClick={curBill.pay} className="rs-btn-primary" style={{ marginTop: 18, width: '100%', background: '#0EA5A4', color: '#fff', border: 'none', borderRadius: 12, padding: 13, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 18px rgba(14,165,164,.26)' }}>ชำระเงินตอนนี้</button>
          </div>
        )}
        {vm.curIsPaid && curBill && (
          <div style={{ background: '#fff', border: '1px solid #C9EED9', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ width: 46, height: 46, borderRadius: 13, background: '#ECFDF5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Icon name="checkCircle" size={24} /></span>
            <div style={{ fontSize: 18, fontWeight: 800 }}>ชำระครบแล้ว</div>
            <div style={{ fontSize: 13, color: '#8A929C', marginTop: 4 }}>บิลเดือน {curBill.month} ชำระเรียบร้อย ขอบคุณค่ะ</div>
          </div>
        )}
      </div>

      <div className="rs-quick" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 18 }}>
        <QuickBtn onClick={curBill && curBill.view} bg="#E6FAF8" color="#0C8F8E" icon={<Icon name="receipt" size={20} />} title="ดูบิลล่าสุด" sub="รายละเอียดค่าใช้จ่าย" />
        <QuickBtn onClick={vm.openRepairModal} bg="#FFFBEB" color="#B45309" icon={<Icon name="wrench" size={20} />} title="แจ้งซ่อม" sub="แจ้งปัญหาห้องพัก" />
        <QuickBtn onClick={vm.navContact} bg="#EFF6FF" color="#2563EB" icon={vm.contactIcon} title="ติดต่อหอพัก" sub="สอบถามเจ้าหน้าที่" />
      </div>

      <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 18, padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ color: '#0C8F8E' }}>{vm.bellIcon}</span>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>ประกาศล่าสุด</h3>
        </div>
        {latestAnn && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, background: '#FAFBFC', borderRadius: 13 }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: latestAnn.tagBg, color: latestAnn.tagColor, flex: 'none' }}>{latestAnn.tag}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{latestAnn.title}</div>
              <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>{latestAnn.body}</div>
              <div style={{ fontSize: 12, color: '#AEB4BD', marginTop: 6 }}>{latestAnn.date}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Bills({ vm }) {
  const { curBill } = vm
  return (
    <div style={{ animation: 'rsFade .3s ease', maxWidth: 760 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#8A929C', marginBottom: 12 }}>บิลปัจจุบัน</div>
      {curBill && (
        <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 20, overflow: 'hidden', marginBottom: 28, boxShadow: '0 4px 16px rgba(16,24,40,.04)' }}>
          <div style={{ padding: '22px 24px', borderBottom: '1px solid #F0F1F4', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div><div style={{ fontSize: 13, color: '#8A929C' }}>บิลประจำเดือน</div><div style={{ fontSize: 20, fontWeight: 800 }}>{curBill.month}</div></div>
            <span style={{ fontSize: 13, fontWeight: 700, padding: '6px 14px', borderRadius: 20, background: curBill.statusBg, color: curBill.statusColor }}>{curBill.statusLabel}</span>
          </div>
          <div style={{ padding: '8px 24px' }}>
            <BillRow label="ค่าเช่าห้อง" value={curBill.rentD} />
            <BillRow label={<>ค่าน้ำ <span style={{ color: '#9AA1AC', fontSize: 12.5 }}>({curBill.wUnits} หน่วย × ฿18)</span></>} value={curBill.wAmtD} />
            <BillRow label={<>ค่าไฟ <span style={{ color: '#9AA1AC', fontSize: 12.5 }}>({curBill.eUnits} หน่วย × ฿8)</span></>} value={curBill.eAmtD} />
            <BillRow label="ค่าส่วนกลาง" value={curBill.feeD} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0 14px' }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>ยอดรวมทั้งสิ้น</span>
              <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.02em', color: '#0C8F8E' }}>{curBill.totalD}</span>
            </div>
          </div>
          {curBill.isUnpaid && (
            <div style={{ padding: '0 24px 22px' }}>
              <button onClick={curBill.pay} className="rs-btn-primary" style={{ width: '100%', background: '#0EA5A4', color: '#fff', border: 'none', borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 20px rgba(14,165,164,.26)' }}>
                <Icon name="qr" size={18} /> ชำระเงินผ่าน QR PromptPay
              </button>
            </div>
          )}
        </div>
      )}
      <div style={{ fontSize: 13, fontWeight: 700, color: '#8A929C', marginBottom: 12 }}>ประวัติการชำระ</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {vm.myBills.map((b) => (
          <div key={b.id} style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
            <div><div style={{ fontSize: 14.5, fontWeight: 700 }}>{b.month}</div><div style={{ fontSize: 12.5, color: '#9AA1AC' }}>ค่าเช่า + น้ำ + ไฟ + ส่วนกลาง</div></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>{b.totalD}</span>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 11px', borderRadius: 20, background: b.statusBg, color: b.statusColor }}>{b.statusLabel}</span>
              <button onClick={b.view} className="rs-btn-soft" style={{ background: '#F2F4F7', border: 'none', color: '#3C434E', fontSize: 12.5, fontWeight: 600, padding: '7px 12px', borderRadius: 9, cursor: 'pointer' }}>ดูบิล</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Room({ vm }) {
  const amenities = ['เครื่องปรับอากาศ', 'เครื่องทำน้ำอุ่น', 'เฟอร์นิเจอร์ครบ', 'Wi-Fi', 'ทีวี']
  return (
    <div style={{ animation: 'rsFade .3s ease', maxWidth: 860 }}>
      <div className="rs-2c" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ aspectRatio: '16/10', background: 'repeating-linear-gradient(135deg,#EEF1F4 0 12px,#F5F7F9 12px 24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B0BA', fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 12, borderBottom: '1px solid #EEF0F3' }}>[ ภาพห้อง {vm.tenRoomNo} ]</div>
          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>ห้อง {vm.tenRoomNo}</h3>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 11px', borderRadius: 20, background: '#EEF2FF', color: '#4338CA' }}>{vm.tenRoomType}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Cell label="ชั้น" value={'ชั้น ' + vm.tenRoomFloor} />
              <Cell label="ขนาด" value={vm.tenRoomSize} />
              <Cell label="ค่าเช่า/เดือน" value={vm.tenRentD} valueColor="#0C8F8E" />
              <Cell label="เงินประกัน" value={vm.tenDepositD} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 18, padding: 22 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px' }}>ข้อมูลสัญญา</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <InfoRow bg="#E6FAF8" color="#0C8F8E" icon={<Icon name="calendar" size={19} />} label="วันเข้าพัก" value={vm.tenMoveIn} />
              <InfoRow bg="#EFF6FF" color="#2563EB" icon={vm.contactIcon} label="เบอร์ติดต่อ" value={vm.tenPhone} />
              <InfoRow bg="#E7F9EE" color="#06A94D" icon={<LineGlyph size={19} />} label="LINE" value={vm.tenLine} />
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 18, padding: 22 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>สิ่งอำนวยความสะดวกในห้อง</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {amenities.map((a) => <span key={a} style={{ fontSize: 13, background: '#F2F4F7', borderRadius: 20, padding: '6px 13px' }}>{a}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Repair({ vm }) {
  return (
    <div style={{ animation: 'rsFade .3s ease', maxWidth: 760 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 13.5, color: '#5B636E' }}>คำขอแจ้งซ่อมของคุณ</div>
        <button onClick={vm.openRepairModal} className="rs-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#0EA5A4', color: '#fff', border: 'none', borderRadius: 11, padding: '11px 17px', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 6px 16px rgba(14,165,164,.26)' }}>{vm.plusIcon} แจ้งซ่อมใหม่</button>
      </div>
      {vm.hasReqs && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {vm.myReqs.map((m) => (
            <div key={m.id} style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 16, padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: '#8A929C', background: '#F2F4F7', borderRadius: 7, padding: '3px 9px' }}>{m.category}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{m.title}</div>
                  <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>{m.detail}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 20, background: m.statusBg, color: m.statusColor, flex: 'none' }}>{m.statusLabel}</span>
              </div>
              <div style={{ fontSize: 12, color: '#AEB4BD', marginTop: 12 }}>แจ้งเมื่อ {m.date}</div>
            </div>
          ))}
        </div>
      )}
      {vm.noReqs && (
        <div style={{ background: '#fff', border: '1px dashed #D7DBE2', borderRadius: 18, padding: '48px 24px', textAlign: 'center' }}>
          <span style={{ width: 56, height: 56, borderRadius: 16, background: '#F2F4F7', color: '#9AA1AC', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Icon name="wrench" size={28} /></span>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>ยังไม่มีคำขอแจ้งซ่อม</div>
          <div style={{ fontSize: 13.5, color: '#9AA1AC' }}>หากพบปัญหาในห้องพัก กดปุ่ม &quot;แจ้งซ่อมใหม่&quot; เพื่อแจ้งเจ้าหน้าที่</div>
        </div>
      )}
    </div>
  )
}

function News({ vm }) {
  return (
    <div style={{ animation: 'rsFade .3s ease', maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {vm.annVM.map((a) => (
        <div key={a.id} style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 16, padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, padding: '4px 11px', borderRadius: 20, background: a.tagBg, color: a.tagColor }}>{a.tag}</span>
            <span style={{ fontSize: 12.5, color: '#AEB4BD', marginLeft: 'auto' }}>{a.date}</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{a.title}</div>
          <div style={{ fontSize: 14, color: '#5B636E', lineHeight: 1.6 }}>{a.body}</div>
        </div>
      ))}
    </div>
  )
}

// ---- shared bits ----
function QuickBtn({ onClick, bg, color, icon, title, sub }) {
  return (
    <button onClick={onClick} className="rs-lift-soft" style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 16, padding: 18, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'transform .15s ease, border-color .15s ease' }}>
      <span style={{ width: 40, height: 40, borderRadius: 11, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{icon}</span>
      <div><div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div><div style={{ fontSize: 12, color: '#9AA1AC' }}>{sub}</div></div>
    </button>
  )
}
function BillRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid #F4F5F7' }}>
      <span style={{ fontSize: 14, color: '#5B636E' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{value}</span>
    </div>
  )
}
function Cell({ label, value, valueColor }) {
  return (<div><div style={{ fontSize: 12.5, color: '#9AA1AC' }}>{label}</div><div style={{ fontSize: 15, fontWeight: 600, color: valueColor }}>{value}</div></div>)
}
function InfoRow({ bg, color, icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 38, height: 38, borderRadius: 11, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{icon}</span>
      <div><div style={{ fontSize: 12.5, color: '#9AA1AC' }}>{label}</div><div style={{ fontSize: 14.5, fontWeight: 700 }}>{value}</div></div>
    </div>
  )
}
