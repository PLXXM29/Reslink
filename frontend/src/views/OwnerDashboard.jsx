import Sidebar, { DashHeader } from '../components/Sidebar.jsx'
import Icon from '../Icon.jsx'

const cardStyle = { background: '#fff', border: '1px solid #ECEEF2', borderRadius: 18, padding: 24 }
const th = { textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#8A929C', padding: '13px 18px' }
const inputStyle = { width: '100%', padding: '11px 13px', border: '1px solid #DDE1E6', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }

export default function OwnerDashboard({ vm }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F8FA' }}>
      <Sidebar
        sectionLabel="เมนูจัดการ" nav={vm.ownerNav}
        userInitial="ก" userInitialBg="linear-gradient(135deg,#0EA5A4,#0C8F8E)"
        userName="คุณกิตติ ผู้จัดการ" userRole="เจ้าของหอพัก" onExit={vm.exitToEntry}
      />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <DashHeader title={vm.oTitle} sub={vm.oSub}>
          <div className="rs-topact" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="rs-search" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #E7EAEE', borderRadius: 10, padding: '9px 12px', color: '#9AA1AC' }}>
              {vm.searchIcon}<input placeholder="ค้นหา..." style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13.5, width: 130, color: '#1A1D24' }} />
            </div>
            <button className="rs-iconbtn" style={{ width: 40, height: 40, borderRadius: 10, background: '#fff', border: '1px solid #E7EAEE', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#5B636E', position: 'relative' }}>
              {vm.bellIcon}<span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, background: '#EF4444', borderRadius: '50%', border: '1.5px solid #fff' }} />
            </button>
          </div>
        </DashHeader>
        <div className="rs-main-pad" style={{ padding: '26px 28px 60px' }}>
          {vm.oIs.overview && <Overview vm={vm} />}
          {vm.oIs.rooms && <Rooms vm={vm} />}
          {vm.oIs.tenants && <Tenants vm={vm} />}
          {vm.oIs.billing && <Billing vm={vm} />}
          {vm.oIs.promo && <Promo vm={vm} />}
          {vm.oIs.maintenance && <Maintenance vm={vm} />}
          {vm.oIs.settings && <Settings vm={vm} />}
        </div>
      </main>
    </div>
  )
}

function Overview({ vm }) {
  return (
    <div style={{ animation: 'rsFade .3s ease' }}>
      <div className="rs-kpi" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, marginBottom: 22 }}>
        {vm.kpis.map((k) => (
          <div key={k.label} style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 16, padding: 18, boxShadow: '0 1px 2px rgba(16,24,40,.03)' }}>
            <span style={{ width: 38, height: 38, borderRadius: 11, background: k.bg, color: k.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>{k.iconEl}</span>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 13, color: '#5B636E', fontWeight: 600, marginTop: 7 }}>{k.label}</div>
            <div style={{ fontSize: 12, color: '#9AA1AC', marginTop: 2 }}>{k.sub}</div>
          </div>
        ))}
      </div>
      <div className="rs-2c" style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 18 }}>
        <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 18, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>รายได้ย้อนหลัง 6 เดือน</h3>
              <p style={{ fontSize: 12.5, color: '#9AA1AC', margin: '3px 0 0' }}>หน่วย: บาท</p>
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#047857', background: '#ECFDF5', padding: '5px 11px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17 9 11l4 4 8-8" /><path d="M17 7h4v4" /></svg> +4.6%
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 14, height: 180, paddingTop: 10 }}>
            {vm.revBars.map((bar) => (
              <div key={bar.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#5B636E' }}>{bar.disp}</div>
                <div style={{ width: '100%', maxWidth: 38, background: 'linear-gradient(180deg,#0EA5A4,#3BC9C7)', borderRadius: '8px 8px 4px 4px', height: bar.pct + '%', minHeight: 6, transition: 'height .4s ease' }} />
                <div style={{ fontSize: 12, color: '#9AA1AC', fontWeight: 600 }}>{bar.m}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 18, padding: 22 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 18px' }}>กิจกรรมล่าสุด</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {vm.activityVM.map((act, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '9px 0' }}>
                <span style={{ width: 30, height: 30, borderRadius: 9, background: act.bg, color: act.col, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 1 }}>{act.iconEl}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4 }}>{act.text}</div>
                  <div style={{ fontSize: 12, color: '#9AA1AC', marginTop: 1 }}>{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Rooms({ vm }) {
  return (
    <div style={{ animation: 'rsFade .3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 13.5, color: '#5B636E' }}>ทั้งหมด <b style={{ color: '#1A1D24' }}>{vm.roomCount}</b> ห้อง</div>
        <button onClick={() => vm.openRoomModal()} className="rs-btn-primary" style={addBtn}>{vm.plusIcon} เพิ่มห้องใหม่</button>
      </div>
      <TableWrap minWidth={680} head={['เลขห้อง', 'ประเภท', 'ชั้น', 'ค่าเช่า/เดือน', 'ผู้เช่า', 'สถานะ', '']}>
        {vm.ownerRooms.map((r) => (
          <tr key={r.id} className="rs-row" style={{ borderTop: '1px solid #F2F3F5' }}>
            <td style={{ padding: '13px 18px', fontSize: 14.5, fontWeight: 700 }}>{r.number}</td>
            <td style={{ padding: '13px 18px', fontSize: 14, color: '#3C434E' }}>{r.type}</td>
            <td style={{ padding: '13px 18px', fontSize: 14, color: '#5B636E' }}>ชั้น {r.floor}</td>
            <td style={{ padding: '13px 18px', fontSize: 14, fontWeight: 600 }}>{r.rentDisplay}</td>
            <td style={{ padding: '13px 18px', fontSize: 14, color: '#3C434E' }}>{r.tenantName}</td>
            <td style={{ padding: '13px 18px' }}><Badge bg={r.statusBg} color={r.statusColor}>{r.statusLabel}</Badge></td>
            <td style={{ padding: '13px 18px', textAlign: 'right' }}>
              <button onClick={r.edit} className="rs-btn-soft-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#F2F4F7', border: 'none', color: '#3C434E', fontSize: 13, fontWeight: 600, padding: '7px 12px', borderRadius: 9, cursor: 'pointer' }}>
                <Icon name="edit" size={14} /> แก้ไข
              </button>
            </td>
          </tr>
        ))}
      </TableWrap>
    </div>
  )
}

function Tenants({ vm }) {
  return (
    <div style={{ animation: 'rsFade .3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 13.5, color: '#5B636E' }}>ผู้เช่าทั้งหมด <b style={{ color: '#1A1D24' }}>{vm.tenantCount}</b> คน</div>
        <button onClick={vm.openTenantModal} className="rs-btn-primary" style={addBtn}>{vm.plusIcon} เพิ่มข้อมูลลูกค้า</button>
      </div>
      <TableWrap minWidth={720} head={['ผู้เช่า', 'ห้อง', 'เบอร์โทร / LINE', 'วันเข้าพัก', 'สถานะชำระ (มิ.ย.)', '']}>
        {vm.ownerTenants.map((t) => (
          <tr key={t.id} className="rs-row" style={{ borderTop: '1px solid #F2F3F5' }}>
            <td style={{ padding: '12px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#EEF2FF', color: '#4338CA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flex: 'none' }}>{t.initial}</span>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
              </div>
            </td>
            <td style={{ padding: '12px 18px', fontSize: 14 }}><b>{t.roomNo}</b> <span style={{ color: '#9AA1AC', fontSize: 12.5 }}>{t.roomType}</span></td>
            <td style={{ padding: '12px 18px', fontSize: 13.5, color: '#3C434E' }}>{t.phone}<br /><span style={{ color: '#9AA1AC', fontSize: 12.5 }}>LINE: {t.line}</span></td>
            <td style={{ padding: '12px 18px', fontSize: 13.5, color: '#5B636E' }}>{t.moveIn}</td>
            <td style={{ padding: '12px 18px' }}><Badge bg={t.payBg} color={t.payColor}>{t.payLabel}</Badge></td>
            <td style={{ padding: '12px 18px', textAlign: 'right' }}>
              <button onClick={t.open} className="rs-btn-soft-teal" style={{ background: '#F2F4F7', border: 'none', color: '#3C434E', fontSize: 13, fontWeight: 600, padding: '7px 13px', borderRadius: 9, cursor: 'pointer' }}>ดูข้อมูล</button>
            </td>
          </tr>
        ))}
      </TableWrap>
    </div>
  )
}

function Billing({ vm }) {
  return (
    <div style={{ animation: 'rsFade .3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #E7EAEE', borderRadius: 10, padding: '9px 14px', fontSize: 14, fontWeight: 600 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0C8F8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg> รอบบิล มิ.ย. 2569
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={vm.generateBills} className="rs-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #DDE1E6', color: '#1A1D24', borderRadius: 11, padding: '11px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            <Icon name="doc" size={16} /> สร้างบิลประจำเดือน
          </button>
          <button onClick={vm.sendAllBills} className="rs-btn-line" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#06C755', color: '#fff', border: 'none', borderRadius: 11, padding: '11px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 16px rgba(6,199,85,.28)' }}>
            {vm.sendAllIcon} ส่งบิลทั้งหมดผ่าน LINE {vm.draftCount > 0 && <span style={{ background: 'rgba(255,255,255,.25)', borderRadius: 20, padding: '1px 8px', fontSize: 12 }}>{vm.draftCount}</span>}
          </button>
        </div>
      </div>
      <div style={{ display: 'inline-flex', background: '#EEF0F3', borderRadius: 11, padding: 3, marginBottom: 18 }}>
        <Tab onClick={vm.setBillingTabMeter} bg={vm.meterTabBg} color={vm.meterTabColor} shadow={vm.meterTabShadow}>บันทึกมิเตอร์</Tab>
        <Tab onClick={vm.setBillingTabList} bg={vm.listTabBg} color={vm.listTabColor} shadow={vm.listTabShadow}>รายการบิล &amp; ส่ง LINE</Tab>
      </div>

      {vm.billTabMeter && (
        <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0F1F4', background: '#FAFBFC', display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 12.5, color: '#8A929C' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0C8F8E' }}>{vm.dropIcon} ค่าน้ำ ฿18/หน่วย</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#B45309' }}>{vm.boltIcon} ค่าไฟ ฿8/หน่วย</span>
            <span>ค่าส่วนกลาง ฿100/ห้อง · กรอกเลขมิเตอร์ปัจจุบันเพื่อคำนวณอัตโนมัติ</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
              <thead>
                <tr style={{ background: '#FAFBFC', borderBottom: '1px solid #F0F1F4' }}>
                  <th style={{ ...th, fontSize: 11.5, padding: '11px 16px' }}>ห้อง / ผู้เช่า</th>
                  <th style={{ ...th, fontSize: 11.5, textAlign: 'center', padding: '11px 12px' }}>น้ำ (ก่อน)</th>
                  <th style={{ ...th, fontSize: 11.5, textAlign: 'center', padding: '11px 12px', color: '#0C8F8E' }}>น้ำ (ปัจจุบัน)</th>
                  <th style={{ ...th, fontSize: 11.5, textAlign: 'center', padding: '11px 12px' }}>ไฟ (ก่อน)</th>
                  <th style={{ ...th, fontSize: 11.5, textAlign: 'center', padding: '11px 12px', color: '#B45309' }}>ไฟ (ปัจจุบัน)</th>
                  <th style={{ ...th, fontSize: 11.5, textAlign: 'right', padding: '11px 12px' }}>ค่าน้ำ</th>
                  <th style={{ ...th, fontSize: 11.5, textAlign: 'right', padding: '11px 12px' }}>ค่าไฟ</th>
                  <th style={{ ...th, fontSize: 11.5, textAlign: 'right', padding: '11px 16px' }}>รวมบิล</th>
                </tr>
              </thead>
              <tbody>
                {vm.meterRows.map((m) => (
                  <tr key={m.id} style={{ borderTop: '1px solid #F4F5F7' }}>
                    <td style={{ padding: '11px 16px' }}><div style={{ fontSize: 14, fontWeight: 700 }}>{m.roomNo}</div><div style={{ fontSize: 12, color: '#9AA1AC' }}>{m.tenant}</div></td>
                    <td style={{ padding: '11px 12px', textAlign: 'center', fontSize: 13.5, color: '#9AA1AC' }}>{m.pw}</td>
                    <td style={{ padding: '11px 12px', textAlign: 'center' }}><input type="number" defaultValue={m.cw} onChange={m.onW} className="rs-input" style={{ width: 74, textAlign: 'center', padding: 7, border: '1px solid #DDE1E6', borderRadius: 8, fontSize: 13.5, fontWeight: 600, outline: 'none' }} /></td>
                    <td style={{ padding: '11px 12px', textAlign: 'center', fontSize: 13.5, color: '#9AA1AC' }}>{m.pe}</td>
                    <td style={{ padding: '11px 12px', textAlign: 'center' }}><input type="number" defaultValue={m.ce} onChange={m.onE} className="rs-input amber" style={{ width: 84, textAlign: 'center', padding: 7, border: '1px solid #DDE1E6', borderRadius: 8, fontSize: 13.5, fontWeight: 600, outline: 'none' }} /></td>
                    <td style={{ padding: '11px 12px', textAlign: 'right', fontSize: 13.5 }}><span style={{ color: '#9AA1AC', fontSize: 12 }}>{m.wUnits} หน่วย</span><br />{m.wAmt}</td>
                    <td style={{ padding: '11px 12px', textAlign: 'right', fontSize: 13.5 }}><span style={{ color: '#9AA1AC', fontSize: 12 }}>{m.eUnits} หน่วย</span><br />{m.eAmt}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', fontSize: 15, fontWeight: 800, color: '#0C8F8E' }}>{m.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {vm.billTabList && (
        <>
          {vm.draftCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#FFFBEB', border: '1px solid #FCE9C0', borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 13.5, color: '#92600A' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>
              มีบิล <b>{vm.draftCount}</b> รายการที่ยังไม่ได้ส่ง — กดส่งผ่าน LINE เพื่อแจ้งลูกบ้าน
            </div>
          )}
          <TableWrap minWidth={680} head={['ห้อง', 'ผู้เช่า', { label: 'ยอดรวม', align: 'right' }, 'สถานะ', { label: 'การดำเนินการ', align: 'right' }]}>
            {vm.billRows.map((b) => (
              <tr key={b.id} className="rs-row" style={{ borderTop: '1px solid #F2F3F5' }}>
                <td style={{ padding: '12px 18px', fontSize: 14.5, fontWeight: 700 }}>{b.roomNo}</td>
                <td style={{ padding: '12px 18px', fontSize: 14, color: '#3C434E' }}>{b.tenant}</td>
                <td style={{ padding: '12px 18px', textAlign: 'right', fontSize: 14.5, fontWeight: 700 }}>{b.totalDisplay}</td>
                <td style={{ padding: '12px 18px' }}><Badge bg={b.statusBg} color={b.statusColor}>{b.statusLabel}</Badge></td>
                <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button onClick={b.preview} title="ดูตัวอย่างบิล" className="rs-btn-soft" style={{ background: '#F2F4F7', border: 'none', color: '#3C434E', fontSize: 13, fontWeight: 600, padding: '7px 11px', borderRadius: 9, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Icon name="eye" size={14} /> ดูบิล
                    </button>
                    {b.isDraft && (
                      <button onClick={b.send} className="rs-btn-line" style={{ background: '#06C755', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, minWidth: 128, justifyContent: 'center' }}>
                        {b.sending
                          ? <><span style={spinner} /> กำลังส่ง...</>
                          : <><Icon name="send" size={14} /> ส่งผ่าน LINE</>}
                      </button>
                    )}
                    {b.sentOrPaid && (
                      <span style={{ fontSize: 12.5, color: '#9AA1AC', padding: '7px 4px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06A94D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg> ส่งแล้ว
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </TableWrap>
        </>
      )}
    </div>
  )
}

function Promo({ vm }) {
  const { promo } = vm
  return (
    <div style={{ animation: 'rsFade .3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#EFF6FF', border: '1px solid #D6E4FF', borderRadius: 12, padding: '12px 16px', marginBottom: 20, fontSize: 13.5, color: '#1E40AF' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>
        การเปลี่ยนแปลงด้านล่างจะแสดงบนหน้าเว็บสาธารณะทันที — สลับไปมุมมอง &quot;ผู้เยี่ยมชม&quot; เพื่อดูผลลัพธ์
      </div>
      <div className="rs-2c" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 18px' }}>เนื้อหาหน้าแรก (Hero)</h3>
          <Label>ภาพหน้าปก</Label>
          <div className="rs-uploader" style={{ aspectRatio: '16/6', background: 'repeating-linear-gradient(135deg,#EEF1F4 0 10px,#F5F7F9 10px 20px)', border: '1.5px dashed #CBD2DA', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9AA1AC', gap: 6, cursor: 'pointer', marginBottom: 16 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 9l5-5 5 5M12 4v12" /></svg>
            <span style={{ fontSize: 12.5 }}>คลิกเพื่ออัปโหลดภาพ (วางไฟล์ที่นี่)</span>
          </div>
          <Label>หัวข้อหลัก</Label>
          <input name="heroTitle" defaultValue={promo.heroTitle} onChange={vm.onPromo} className="rs-input" style={{ ...inputStyle, marginBottom: 14 }} />
          <Label>แท็กไลน์ (ทำเล)</Label>
          <input name="heroTagline" defaultValue={promo.heroTagline} onChange={vm.onPromo} className="rs-input" style={{ ...inputStyle, marginBottom: 14 }} />
          <Label>คำอธิบาย</Label>
          <textarea name="heroSub" defaultValue={promo.heroSub} onChange={vm.onPromo} rows="3" className="rs-input" style={{ ...inputStyle, resize: 'vertical', marginBottom: 14 }} />
          <Label>แบนเนอร์โปรโมชัน</Label>
          <input name="promoBanner" defaultValue={promo.promoBanner} onChange={vm.onPromo} className="rs-input" style={inputStyle} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>ตัวอย่างหน้าเว็บ (Live)</h3>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: '#047857', background: '#ECFDF5', padding: '4px 10px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} /> สด
              </span>
            </div>
            <div style={{ border: '1px solid #EEF0F3', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ background: '#0F1115', color: '#fff', textAlign: 'center', fontSize: 11, padding: 6 }}>{promo.promoBanner}</div>
              <div style={{ background: 'radial-gradient(300px 160px at 10% 0,#E6FAF8 0,transparent 60%),#fff', padding: '22px 20px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid #E2F4F3', color: '#0C8F8E', fontSize: 10.5, fontWeight: 600, padding: '4px 9px', borderRadius: 20, marginBottom: 10 }}>📍 {promo.heroTagline}</span>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.2, marginBottom: 8 }}>{promo.heroTitle}</div>
                <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>{promo.heroSub}</div>
                <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                  <span style={{ background: '#0EA5A4', color: '#fff', fontSize: 11.5, fontWeight: 600, padding: '7px 14px', borderRadius: 8 }}>ดูห้องว่าง</span>
                  <span style={{ background: '#fff', border: '1px solid #DDE1E6', fontSize: 11.5, fontWeight: 600, padding: '7px 14px', borderRadius: 8 }}>ติดต่อจอง</span>
                </div>
              </div>
            </div>
          </div>
          <div style={cardStyle}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px' }}>ราคาห้องพัก (ซิงค์กับตารางห้อง)</h3>
            <p style={{ fontSize: 12.5, color: '#9AA1AC', margin: '0 0 16px' }}>ราคาดึงจากค่าเช่าในเมนู &quot;จัดการห้อง&quot; โดยอัตโนมัติ</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {vm.pubRoomTypes.map((rt) => (
                <div key={rt.type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#FAFBFC', border: '1px solid #F0F1F4', borderRadius: 12 }}>
                  <div><div style={{ fontSize: 14, fontWeight: 700 }}>{rt.type}</div><div style={{ fontSize: 12, color: '#9AA1AC' }}>{rt.size} · {rt.availLabel}</div></div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#0C8F8E' }}>{rt.priceDisplay}<span style={{ fontSize: 11, color: '#9AA1AC', fontWeight: 600 }}>/ด.</span></div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={vm.savePromo} className="rs-btn-primary" style={{ background: '#0EA5A4', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 20px rgba(14,165,164,.26)' }}>บันทึกและเผยแพร่ขึ้นเว็บ</button>
        </div>
      </div>
    </div>
  )
}

function Maintenance({ vm }) {
  return (
    <div style={{ animation: 'rsFade .3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 13.5, color: '#5B636E' }}>มีคำขอรอดำเนินการ <b style={{ color: '#DC2626' }}>{vm.pendingCount}</b> รายการ</div>
        <div style={{ display: 'inline-flex', background: '#EEF0F3', borderRadius: 11, padding: 3 }}>
          <Tab onClick={vm.setMaintKanban} bg={vm.kanbanBg} color={vm.kanbanColor} shadow={vm.kanbanShadow} pad="7px 15px">บอร์ด</Tab>
          <Tab onClick={vm.setMaintTable} bg={vm.tableBg} color={vm.tableColor} shadow={vm.tableShadow} pad="7px 15px">ตาราง</Tab>
        </div>
      </div>

      {vm.maintKanban && (
        <div className="rs-kanban" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, alignItems: 'start' }}>
          {vm.maintCols.map((col) => (
            <div key={col.key} style={{ background: '#F4F6F8', border: '1px solid #ECEEF2', borderRadius: 16, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '0 4px' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: col.dot }} />
                <span style={{ fontSize: 13.5, fontWeight: 700, color: col.color }}>{col.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#8A929C', background: '#fff', borderRadius: 20, padding: '2px 9px' }}>{col.count}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 40 }}>
                {col.items.map((m) => (
                  <div key={m.id} style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 13, padding: 14, boxShadow: '0 1px 2px rgba(16,24,40,.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, background: '#F2F4F7', borderRadius: 7, padding: '3px 8px' }}>ห้อง {m.roomNo}</span>
                      <span style={{ fontSize: 11.5, color: '#9AA1AC' }}>{m.category}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{m.title}</div>
                    <div style={{ fontSize: 12.5, color: '#8A929C', lineHeight: 1.45, marginBottom: 10 }}>{m.detail}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 11.5, color: '#AEB4BD' }}>{m.tenant} · {m.date}</span>
                      <div style={{ display: 'flex', gap: 5 }}>
                        {m.canStart && <button onClick={m.setProg} style={{ fontSize: 11.5, fontWeight: 600, background: '#EFF6FF', color: '#1D4ED8', border: 'none', borderRadius: 7, padding: '5px 9px', cursor: 'pointer' }}>เริ่มซ่อม</button>}
                        {m.canDone && <button onClick={m.setDone} style={{ fontSize: 11.5, fontWeight: 600, background: '#ECFDF5', color: '#047857', border: 'none', borderRadius: 7, padding: '5px 9px', cursor: 'pointer' }}>เสร็จสิ้น</button>}
                        {m.canReopen && <button onClick={m.setProg} style={{ fontSize: 11.5, fontWeight: 600, background: '#F2F4F7', color: '#5B636E', border: 'none', borderRadius: 7, padding: '5px 9px', cursor: 'pointer' }}>เปิดใหม่</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {vm.maintTable && (
        <TableWrap minWidth={760} head={['ห้อง', 'เรื่อง', 'ผู้แจ้ง', 'วันที่', 'สถานะ', { label: 'เปลี่ยนสถานะ', align: 'right' }]}>
          {vm.maintVM.map((m) => (
            <tr key={m.id} className="rs-row" style={{ borderTop: '1px solid #F2F3F5' }}>
              <td style={{ padding: '12px 18px', fontSize: 14, fontWeight: 700 }}>{m.roomNo}</td>
              <td style={{ padding: '12px 18px' }}><div style={{ fontSize: 14, fontWeight: 600 }}>{m.title}</div><div style={{ fontSize: 12, color: '#9AA1AC' }}>{m.category}</div></td>
              <td style={{ padding: '12px 18px', fontSize: 13.5, color: '#5B636E' }}>{m.tenant}</td>
              <td style={{ padding: '12px 18px', fontSize: 13.5, color: '#5B636E' }}>{m.date}</td>
              <td style={{ padding: '12px 18px' }}><Badge bg={m.statusBg} color={m.statusColor}>{m.statusLabel}</Badge></td>
              <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: 5 }}>
                  <button onClick={m.setPending} style={{ fontSize: 11.5, fontWeight: 600, background: '#FFFBEB', color: '#B45309', border: 'none', borderRadius: 7, padding: '5px 9px', cursor: 'pointer' }}>รอ</button>
                  <button onClick={m.setProg} style={{ fontSize: 11.5, fontWeight: 600, background: '#EFF6FF', color: '#1D4ED8', border: 'none', borderRadius: 7, padding: '5px 9px', cursor: 'pointer' }}>กำลังซ่อม</button>
                  <button onClick={m.setDone} style={{ fontSize: 11.5, fontWeight: 600, background: '#ECFDF5', color: '#047857', border: 'none', borderRadius: 7, padding: '5px 9px', cursor: 'pointer' }}>เสร็จ</button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      )}
    </div>
  )
}

function Settings({ vm }) {
  const { settings } = vm
  return (
    <div style={{ animation: 'rsFade .3s ease', maxWidth: 920 }}>
      <div className="rs-2c" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 18px' }}>ข้อมูลหอพัก</h3>
          <Label>ชื่อหอพัก</Label>
          <input name="dorm" defaultValue={settings.dorm} onChange={vm.onSetting} className="rs-input" style={{ ...inputStyle, marginBottom: 14 }} />
          <Label>ที่อยู่</Label>
          <textarea name="address" defaultValue={settings.address} onChange={vm.onSetting} rows="2" className="rs-input" style={{ ...inputStyle, resize: 'vertical', marginBottom: 14 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><Label>เบอร์โทร</Label><input name="phone" defaultValue={settings.phone} onChange={vm.onSetting} className="rs-input" style={inputStyle} /></div>
            <div><Label>LINE ID</Label><input name="line" defaultValue={settings.line} onChange={vm.onSetting} className="rs-input" style={inputStyle} /></div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 18px' }}>อัตราค่าบริการ</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div><Label sm>ค่าน้ำ /หน่วย</Label><input name="waterRate" defaultValue={settings.waterRate} onChange={vm.onSetting} className="rs-input" style={inputStyle} /></div>
              <div><Label sm>ค่าไฟ /หน่วย</Label><input name="elecRate" defaultValue={settings.elecRate} onChange={vm.onSetting} className="rs-input" style={inputStyle} /></div>
              <div><Label sm>ส่วนกลาง</Label><input name="commonFee" defaultValue={settings.commonFee} onChange={vm.onSetting} className="rs-input" style={inputStyle} /></div>
            </div>
          </div>
          <div style={cardStyle}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 14px' }}>ข้อมูลการชำระเงิน</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: '#FAFBFC', border: '1px solid #F0F1F4', borderRadius: 12 }}>
              <span style={{ width: 40, height: 40, borderRadius: 10, background: '#E6FAF8', color: '#0C8F8E', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <Icon name="coins" size={20} />
              </span>
              <div><div style={{ fontSize: 14, fontWeight: 700 }}>{settings.bank}</div><div style={{ fontSize: 12.5, color: '#8A929C' }}>{settings.acct} · {settings.acctName}</div></div>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg,#06C755,#05A848)', borderRadius: 18, padding: 22, color: '#fff', boxShadow: '0 10px 26px rgba(6,199,85,.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.5 2 2 5.7 2 10.2c0 2.6 1.5 4.9 3.8 6.4-.2.7-.7 2.4-.8 2.8 0 0-.1.4.2.5.2.1.4 0 .4 0 .6-.1 2.9-1.9 3.9-2.6.8.1 1.6.2 2.5.2 5.5 0 10-3.7 10-8.3S17.5 2 12 2z" /></svg>
              </span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>เชื่อมต่อ LINE OA แล้ว <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></div>
                <div style={{ fontSize: 13, opacity: .9, marginTop: 2 }}>{settings.line} · ส่งบิลอัตโนมัติพร้อมใช้งาน</div>
              </div>
            </div>
          </div>
          <button onClick={vm.savePromo} className="rs-btn-dark" style={{ background: '#1A1D24', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>บันทึกการตั้งค่า</button>
        </div>
      </div>
    </div>
  )
}

// ---- small shared bits ----
const addBtn = { display: 'inline-flex', alignItems: 'center', gap: 7, background: '#0EA5A4', color: '#fff', border: 'none', borderRadius: 11, padding: '11px 17px', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 6px 16px rgba(14,165,164,.26)' }
const spinner = { width: 14, height: 14, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'rsSpin .7s linear infinite' }

function Badge({ bg, color, children }) {
  return <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 11px', borderRadius: 20, background: bg, color }}>{children}</span>
}
function Tab({ onClick, bg, color, shadow, pad = '8px 18px', children }) {
  return <button onClick={onClick} style={{ border: 'none', borderRadius: 9, padding: pad, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', background: bg, color, boxShadow: shadow }}>{children}</button>
}
function Label({ sm, children }) {
  return <label style={{ fontSize: sm ? 12.5 : 13, fontWeight: 600, color: '#3C434E', display: 'block', marginBottom: 6 }}>{children}</label>
}
function TableWrap({ minWidth, head, children }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #ECEEF2', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth }}>
          <thead>
            <tr style={{ background: '#FAFBFC' }}>
              {head.map((h, i) => {
                const label = typeof h === 'string' ? h : h.label
                const align = typeof h === 'string' ? 'left' : h.align || 'left'
                return <th key={i} style={{ ...th, textAlign: align }}>{label}</th>
              })}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  )
}
