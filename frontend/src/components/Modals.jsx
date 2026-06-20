import { LineGlyph } from '../views/PublicSite.jsx'

const inputStyle = { width: '100%', padding: '11px 13px', border: '1px solid #DDE1E6', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }
const spinner = { width: 16, height: 16, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'rsSpin .7s linear infinite' }

export default function Modals({ vm }) {
  return (
    <div onClick={vm.closeModal} style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(15,18,24,.45)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 18px', overflowY: 'auto' }}>
      {vm.mRoom && <RoomModal vm={vm} />}
      {vm.mTenant && <TenantModal vm={vm} />}
      {vm.mBillPreview && <BillPreview vm={vm} />}
      {vm.mPay && <PayModal vm={vm} />}
      {vm.mDrawer && <TenantDrawer vm={vm} />}
      {vm.mRepair && <RepairModal vm={vm} />}
    </div>
  )
}

function Shell({ vm, maxWidth = 460, children, overflowHidden }) {
  return (
    <div onClick={vm.stopProp} style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth, boxShadow: '0 24px 60px rgba(16,24,40,.28)', animation: 'rsPop .2s ease', margin: 'auto', overflow: overflowHidden ? 'hidden' : undefined }}>
      {children}
    </div>
  )
}

function Header({ title, onClose, icon }) {
  return (
    <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0F1F4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{icon}<h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{title}</h3></div>
      <CloseBtn onClose={onClose} />
    </div>
  )
}

function CloseBtn({ onClose, dark }) {
  return (
    <button onClick={onClose} className={dark ? '' : 'rs-btn-soft'} style={{ width: 32, height: 32, borderRadius: 9, border: 'none', background: dark ? 'rgba(255,255,255,.2)' : '#F2F4F7', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: dark ? '#fff' : '#5B636E' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
    </button>
  )
}

function Label({ children }) {
  return <label style={{ fontSize: 13, fontWeight: 600, color: '#3C434E', display: 'block', marginBottom: 6 }}>{children}</label>
}

function FooterButtons({ onCancel, onSave, saveLabel }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <button onClick={onCancel} className="rs-btn-outline" style={{ flex: 1, background: '#fff', border: '1px solid #DDE1E6', color: '#3C434E', borderRadius: 11, padding: 12, fontSize: 14.5, fontWeight: 600, cursor: 'pointer' }}>ยกเลิก</button>
      <button onClick={onSave} className="rs-btn-primary" style={{ flex: 1.4, background: '#0EA5A4', color: '#fff', border: 'none', borderRadius: 11, padding: 12, fontSize: 14.5, fontWeight: 700, cursor: 'pointer' }}>{saveLabel}</button>
    </div>
  )
}

function RoomModal({ vm }) {
  const { form } = vm
  return (
    <Shell vm={vm}>
      <Header title={vm.roomModalTitle} onClose={vm.closeModal} />
      <div style={{ padding: 24 }}>
        <Label>เลขห้อง</Label>
        <input name="number" defaultValue={form.number} onChange={vm.onField} placeholder="เช่น 405" className="rs-input" style={{ ...inputStyle, marginBottom: 14 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div>
            <Label>ประเภท</Label>
            <select name="type" defaultValue={form.type} onChange={vm.onField} className="rs-input" style={{ ...inputStyle, background: '#fff' }}>
              <option value="Studio">Studio</option><option value="1 Bedroom">1 Bedroom</option><option value="Deluxe">Deluxe</option>
            </select>
          </div>
          <div><Label>ชั้น</Label><input name="floor" type="number" defaultValue={form.floor} onChange={vm.onField} className="rs-input" style={inputStyle} /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
          <div><Label>ค่าเช่า/เดือน (บาท)</Label><input name="rent" type="number" defaultValue={form.rent} onChange={vm.onField} className="rs-input" style={inputStyle} /></div>
          <div>
            <Label>สถานะ</Label>
            <select name="status" defaultValue={form.status} onChange={vm.onField} className="rs-input" style={{ ...inputStyle, background: '#fff' }}>
              <option value="vacant">ว่าง</option><option value="occupied">ไม่ว่าง</option><option value="maintenance">ซ่อมบำรุง</option>
            </select>
          </div>
        </div>
        <FooterButtons onCancel={vm.closeModal} onSave={vm.saveRoom} saveLabel="บันทึก" />
      </div>
    </Shell>
  )
}

function TenantModal({ vm }) {
  const { form } = vm
  return (
    <Shell vm={vm} maxWidth={480}>
      <Header title="เพิ่มข้อมูลลูกค้า / ผู้เช่าใหม่" onClose={vm.closeModal} />
      <div style={{ padding: 24 }}>
        <Label>ชื่อ-นามสกุล</Label>
        <input name="name" defaultValue={form.name} onChange={vm.onField} placeholder="ชื่อผู้เช่า" className="rs-input" style={{ ...inputStyle, marginBottom: 14 }} />
        <Label>ห้องพัก (เฉพาะห้องว่าง)</Label>
        <select name="roomId" defaultValue={form.roomId} onChange={vm.onField} className="rs-input" style={{ ...inputStyle, background: '#fff', marginBottom: 14 }}>
          {vm.tenantVacant.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
        </select>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div><Label>เบอร์โทร</Label><input name="phone" defaultValue={form.phone} onChange={vm.onField} placeholder="08x-xxx-xxxx" className="rs-input" style={inputStyle} /></div>
          <div><Label>LINE ID</Label><input name="line" defaultValue={form.line} onChange={vm.onField} placeholder="line_id" className="rs-input" style={inputStyle} /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
          <div><Label>วันเข้าพัก</Label><input name="moveIn" defaultValue={form.moveIn} onChange={vm.onField} className="rs-input" style={inputStyle} /></div>
          <div><Label>เงินประกัน (บาท)</Label><input name="deposit" type="number" defaultValue={form.deposit} onChange={vm.onField} placeholder="9000" className="rs-input" style={inputStyle} /></div>
        </div>
        <FooterButtons onCancel={vm.closeModal} onSave={vm.saveTenant} saveLabel="เพิ่มผู้เช่า" />
      </div>
    </Shell>
  )
}

function BillPreview({ vm }) {
  const { billPV } = vm
  if (!billPV) return null
  return (
    <Shell vm={vm} maxWidth={420} overflowHidden>
      <Header title="ตัวอย่างบิลบน LINE" onClose={vm.closeModal} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="#06C755"><path d="M12 2C6.5 2 2 5.7 2 10.2c0 2.6 1.5 4.9 3.8 6.4-.2.7-.7 2.4-.8 2.8 0 0-.1.4.2.5.2.1.4 0 .4 0 .6-.1 2.9-1.9 3.9-2.6.8.1 1.6.2 2.5.2 5.5 0 10-3.7 10-8.3S17.5 2 12 2z" /></svg>} />
      <div style={{ background: '#A4CEE8', padding: 20 }}>
        <div style={{ fontSize: 11.5, color: '#3C5A6E', textAlign: 'center', marginBottom: 12, fontWeight: 600 }}>ส่งถึง {billPV.tenant} · LINE: {billPV.line}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#0EA5A4,#0C8F8E)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V8l9-5 9 5v13" /><path d="M9 21v-7h6v7" /></svg>
          </span>
          <div style={{ background: '#fff', borderRadius: '4px 16px 16px 16px', overflow: 'hidden', width: 248, boxShadow: '0 2px 6px rgba(0,0,0,.1)' }}>
            <div style={{ background: 'linear-gradient(135deg,#0EA5A4,#0C8F8E)', color: '#fff', padding: '14px 16px' }}>
              <div style={{ fontSize: 12, opacity: .9 }}>Reslink Residence</div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>ใบแจ้งหนี้ · ห้อง {billPV.roomNo}</div>
              <div style={{ fontSize: 12, opacity: .9, marginTop: 2 }}>ประจำเดือน {billPV.month}</div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <PvRow label="ค่าเช่า" value={billPV.rentD} />
              <PvRow label={'ค่าน้ำ (' + billPV.wUnits + ' หน่วย)'} value={billPV.wAmtD} />
              <PvRow label={'ค่าไฟ (' + billPV.eUnits + ' หน่วย)'} value={billPV.eAmtD} />
              <PvRow label="ค่าส่วนกลาง" value={billPV.feeD} last />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0 4px' }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>รวมทั้งสิ้น</span>
                <span style={{ fontSize: 19, fontWeight: 800, color: '#0C8F8E' }}>{billPV.totalD}</span>
              </div>
              <div style={{ fontSize: 11, color: '#9AA1AC', marginBottom: 10 }}>กรุณาชำระภายในวันที่ 5 ของเดือน</div>
              <div style={{ background: '#06C755', color: '#fff', textAlign: 'center', fontSize: 13, fontWeight: 700, padding: 9, borderRadius: 8 }}>💳 ชำระเงิน</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '16px 22px' }}>
        <button onClick={vm.closeModal} className="rs-btn-soft" style={{ width: '100%', background: '#F2F4F7', border: 'none', color: '#3C434E', borderRadius: 11, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>ปิด</button>
      </div>
    </Shell>
  )
}

function PayModal({ vm }) {
  const { billPV } = vm
  if (!billPV) return null
  return (
    <Shell vm={vm} maxWidth={400} overflowHidden>
      <Header title="ชำระเงินผ่าน PromptPay" onClose={vm.closeModal} />
      <div style={{ padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: '#8A929C' }}>ยอดชำระ · {billPV.month}</div>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', margin: '4px 0 18px', color: '#0C8F8E' }}>{billPV.totalD}</div>
        <div style={{ width: 200, height: 200, margin: '0 auto 18px', border: '1px solid #ECEEF2', borderRadius: 16, padding: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(45deg,#1A1D24 0 6px,#fff 6px 12px),repeating-linear-gradient(-45deg,#1A1D24 0 6px,#fff 6px 12px)', backgroundBlendMode: 'multiply', borderRadius: 8, opacity: .92, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ background: '#fff', padding: '5px 8px', borderRadius: 6, fontSize: 10, fontFamily: 'ui-monospace,Menlo,monospace', color: '#5B636E' }}>QR PromptPay</span>
          </div>
        </div>
        <div style={{ fontSize: 13, color: '#5B636E', marginBottom: 4 }}>สแกนเพื่อชำระ หรือกดยืนยันด้านล่าง</div>
        <div style={{ fontSize: 12, color: '#9AA1AC', marginBottom: 20 }}>บจก. เรสลิงค์ พร็อพเพอร์ตี้</div>
        <button onClick={billPV.confirmPay} className="rs-btn-primary" style={{ width: '100%', background: '#0EA5A4', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 20px rgba(14,165,164,.26)' }}>
          {vm.paying ? <><span style={spinner} /> กำลังตรวจสอบ...</> : 'ยืนยันการชำระเงิน'}
        </button>
      </div>
    </Shell>
  )
}

function TenantDrawer({ vm }) {
  const { drawerVM } = vm
  if (!drawerVM) return null
  return (
    <Shell vm={vm} maxWidth={440} overflowHidden>
      <div style={{ padding: 24, background: 'linear-gradient(120deg,#0EA5A4,#0C8F8E)', color: '#fff', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 16, right: 16 }}><CloseBtn onClose={vm.closeModal} dark /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22, flex: 'none' }}>{drawerVM.initial}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{drawerVM.name}</div>
            <div style={{ fontSize: 13, opacity: .9 }}>ห้อง {drawerVM.roomNo} · {drawerVM.roomType} · ชั้น {drawerVM.floor}</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '22px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
          <Info label="เบอร์โทร" value={drawerVM.phone} />
          <Info label="LINE" value={drawerVM.line} />
          <Info label="วันเข้าพัก" value={drawerVM.moveIn} />
          <Info label="เงินประกัน" value={drawerVM.depositD} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#8A929C', marginBottom: 10 }}>ประวัติบิล</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {drawerVM.bills.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', background: '#FAFBFC', border: '1px solid #F0F1F4', borderRadius: 11 }}>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{b.month}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{b.totalD}</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: b.statusBg, color: b.statusColor }}>{b.statusLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  )
}

function RepairModal({ vm }) {
  const { form } = vm
  return (
    <Shell vm={vm}>
      <Header title="แจ้งซ่อม" onClose={vm.closeModal} />
      <div style={{ padding: 24 }}>
        <Label>ประเภทปัญหา</Label>
        <select name="category" defaultValue={form.category} onChange={vm.onField} className="rs-input" style={{ ...inputStyle, background: '#fff', marginBottom: 14 }}>
          <option value="ประปา">ประปา / น้ำ</option><option value="ไฟฟ้า">ไฟฟ้า</option><option value="เครื่องปรับอากาศ">เครื่องปรับอากาศ</option><option value="ทั่วไป">ทั่วไป / อื่นๆ</option>
        </select>
        <Label>หัวข้อ</Label>
        <input name="title" defaultValue={form.title} onChange={vm.onField} placeholder="เช่น ก๊อกน้ำรั่ว" className="rs-input" style={{ ...inputStyle, marginBottom: 14 }} />
        <Label>รายละเอียด</Label>
        <textarea name="detail" defaultValue={form.detail} onChange={vm.onField} rows="3" placeholder="อธิบายปัญหาที่พบ" className="rs-input" style={{ ...inputStyle, resize: 'vertical', marginBottom: 14 }} />
        <Label>แนบรูปภาพ (ถ้ามี)</Label>
        <div className="rs-uploader" style={{ border: '1.5px dashed #CBD2DA', borderRadius: 12, padding: 22, textAlign: 'center', color: '#9AA1AC', marginBottom: 22, cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 4 }}><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><circle cx="12" cy="13" r="3.5" /></svg>
          <div style={{ fontSize: 12.5 }}>คลิกหรือวางรูปภาพที่นี่</div>
        </div>
        <FooterButtons onCancel={vm.closeModal} onSave={vm.submitRepair} saveLabel="ส่งคำขอแจ้งซ่อม" />
      </div>
    </Shell>
  )
}

function PvRow({ label, value, last }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '5px 0', color: '#3C434E', borderBottom: last ? '1px solid #EEF0F3' : undefined, paddingBottom: last ? 9 : 5 }}>
      <span>{label}</span><span style={{ fontWeight: 600 }}>{value}</span>
    </div>
  )
}
function Info({ label, value }) {
  return (<div><div style={{ fontSize: 12, color: '#9AA1AC' }}>{label}</div><div style={{ fontSize: 14.5, fontWeight: 600 }}>{value}</div></div>)
}
