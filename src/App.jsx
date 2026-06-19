import { useState, useCallback } from 'react'
import { makeInitialState, CURRENT_MONTH, TODAY } from './state.js'
import {
  S, roomById, tenantById, roomStatusMeta, billStatusMeta, maintStatusMeta, computeBill,
} from './helpers.js'
import Icon from './Icon.jsx'
import Entry from './views/Entry.jsx'
import PublicSite from './views/PublicSite.jsx'
import OwnerDashboard from './views/OwnerDashboard.jsx'
import TenantPortal from './views/TenantPortal.jsx'
import RoleSwitcher from './components/RoleSwitcher.jsx'
import Toasts from './components/Toasts.jsx'
import Modals from './components/Modals.jsx'

export default function App() {
  const [s, setS] = useState(makeInitialState)
  const patch = useCallback((obj) => setS((prev) => ({ ...prev, ...obj })), [])

  // ---------- toasts ----------
  const toast = useCallback((text, kind = 'success') => {
    const id = 'to' + Date.now() + Math.random()
    const meta = kind === 'success' ? { accent: '#0EA5A4', bg: '#E6FAF8', icon: 'checkCircle' }
      : kind === 'line' ? { accent: '#06C755', bg: '#E7F9EE', icon: 'send' }
      : kind === 'info' ? { accent: '#3B82F6', bg: '#EFF6FF', icon: 'bell' }
      : { accent: '#F59E0B', bg: '#FFFBEB', icon: 'alert' }
    setS((prev) => ({ ...prev, toasts: [...prev.toasts, { id, text, ...meta }] }))
    setTimeout(() => setS((prev) => ({ ...prev, toasts: prev.toasts.filter((t) => t.id !== id) })), 3400)
  }, [])

  // ---------- navigation ----------
  const enterRole = (r) => { setS((p) => ({ ...p, role: r, roleMenuOpen: false, publicPage: 'home', ownerPage: 'overview', tenantPage: 'home' })); window.scrollTo(0, 0) }
  const exitToEntry = () => { setS((p) => ({ ...p, role: null, roleMenuOpen: false, modal: null })); window.scrollTo(0, 0) }
  const toggleRoleMenu = () => setS((p) => ({ ...p, roleMenuOpen: !p.roleMenuOpen }))
  const setOwnerPage = (p) => { patch({ ownerPage: p }); window.scrollTo(0, 0) }
  const setTenantPage = (p) => { patch({ tenantPage: p }); window.scrollTo(0, 0) }
  const setPublicPage = (p) => { patch({ publicPage: p }); window.scrollTo(0, 0) }
  const openRoomDetail = (typeName) => { patch({ selectedType: typeName, publicPage: 'roomDetail' }); window.scrollTo(0, 0) }
  const setBillingTab = (t) => patch({ billingTab: t })
  const setMaintView = (v) => patch({ maintView: v })

  // ---------- modals & forms ----------
  const openModal = (type, data) => setS((p) => ({ ...p, modal: { type, data: data || {} }, form: data && data.form ? data.form : {} }))
  const closeModal = () => patch({ modal: null })
  const onField = (e) => { const { name, value } = e.target; setS((p) => ({ ...p, form: { ...p.form, [name]: value } })) }
  const onPromo = (e) => { const { name, value } = e.target; setS((p) => ({ ...p, promo: { ...p.promo, [name]: value } })) }
  const onSetting = (e) => { const { name, value } = e.target; setS((p) => ({ ...p, settings: { ...p.settings, [name]: value } })) }

  // ---------- room CRUD ----------
  const openRoomModal = (room) => openModal('room', { form: room ? { ...room } : { number: '', type: 'Studio', floor: 1, status: 'vacant', rent: 4500 }, editing: !!room })
  const saveRoom = () => {
    const f = s.form
    setS((p) => {
      let rooms = [...p.rooms]
      if (f.id) rooms = rooms.map((r) => (r.id === f.id ? { ...r, ...f, rent: Number(f.rent), floor: Number(f.floor) } : r))
      else rooms.push({ ...f, id: 'r' + Date.now(), rent: Number(f.rent), floor: Number(f.floor), tenantId: null })
      return { ...p, rooms, modal: null }
    })
    toast(f.id ? 'บันทึกข้อมูลห้องเรียบร้อย ✓' : 'เพิ่มห้องใหม่เรียบร้อย ✓')
  }

  // ---------- tenant CRUD ----------
  const openTenantModal = () => {
    const vacant = s.rooms.filter((r) => r.status === 'vacant')
    openModal('tenant', { form: { name: '', phone: '', line: '', roomId: vacant[0] ? vacant[0].id : '', moveIn: TODAY, deposit: '' }, vacant })
  }
  const saveTenant = () => {
    const f = s.form
    if (!f.name) { toast('กรุณากรอกชื่อผู้เช่า', 'warn'); return }
    setS((p) => {
      const id = 't' + Date.now()
      const tenants = [...p.tenants, { ...f, id, deposit: Number(f.deposit) || 0 }]
      const rooms = p.rooms.map((r) => (r.id === f.roomId ? { ...r, status: 'occupied', tenantId: id } : r))
      return { ...p, tenants, rooms, modal: null }
    })
    toast('เพิ่มข้อมูลผู้เช่าใหม่เรียบร้อย ✓')
  }
  const openTenantDrawer = (t) => openModal('tenantDrawer', { tenant: t })

  // ---------- billing / LINE ----------
  const setMeter = (billId, field, value) => {
    const v = Number(value) || 0
    setS((p) => ({ ...p, bills: p.bills.map((b) => (b.id === billId ? { ...b, [field]: v } : b)) }))
  }
  const generateBills = () => toast('สร้างบิลประจำเดือน ' + CURRENT_MONTH + ' เรียบร้อย ✓')
  const sendBill = (billId) => {
    if (s.sendingIds.includes(billId)) return
    setS((p) => ({ ...p, sendingIds: [...p.sendingIds, billId] }))
    setTimeout(() => {
      setS((p) => {
        const b = p.bills.find((x) => x.id === billId)
        const room = b ? roomById(p, b.roomId) : null
        toast('ส่งบิลให้ลูกบ้านผ่าน LINE เรียบร้อย ✓' + (room ? ' (ห้อง ' + room.number + ')' : ''), 'line')
        return {
          ...p,
          sendingIds: p.sendingIds.filter((i) => i !== billId),
          bills: p.bills.map((x) => (x.id === billId && x.status === 'draft' ? { ...x, status: 'unpaid' } : x)),
        }
      })
    }, 1000)
  }
  const sendAllBills = () => {
    const drafts = s.bills.filter((b) => b.month === CURRENT_MONTH && b.status === 'draft')
    if (drafts.length === 0) { toast('ไม่มีบิลที่รอส่งในขณะนี้', 'warn'); return }
    const ids = drafts.map((b) => b.id)
    setS((p) => ({ ...p, sendingIds: [...p.sendingIds, ...ids] }))
    setTimeout(() => {
      setS((p) => ({
        ...p,
        sendingIds: p.sendingIds.filter((i) => !ids.includes(i)),
        bills: p.bills.map((b) => (ids.includes(b.id) ? { ...b, status: 'unpaid' } : b)),
      }))
      toast('ส่งบิลทั้งหมด ' + ids.length + ' รายการ ผ่าน LINE เรียบร้อย ✓', 'line')
    }, 1300)
  }
  const previewBill = (bill) => openModal('billPreview', { bill })

  // ---------- payment (tenant) ----------
  const openPay = (bill) => openModal('pay', { bill })
  const confirmPay = (billId) => {
    patch({ paying: true })
    setTimeout(() => {
      setS((p) => ({ ...p, paying: false, modal: null, bills: p.bills.map((b) => (b.id === billId ? { ...b, status: 'paid' } : b)) }))
      toast('ชำระเงินเรียบร้อย ขอบคุณค่ะ ✓')
    }, 1400)
  }

  // ---------- maintenance ----------
  const openRepairModal = () => openModal('repair', { form: { category: 'ประปา', title: '', detail: '' } })
  const submitRepair = () => {
    const f = s.form
    if (!f.title) { toast('กรุณากรอกหัวข้อการแจ้งซ่อม', 'warn'); return }
    const t = tenantById(s, s.currentTenantId)
    setS((p) => ({
      ...p,
      maintenance: [{ id: 'm' + Date.now(), roomId: t.roomId, tenantId: t.id, title: f.title, category: f.category, detail: f.detail || '', date: TODAY, status: 'pending' }, ...p.maintenance],
      modal: null,
    }))
    toast('ส่งคำขอแจ้งซ่อมเรียบร้อย เจ้าหน้าที่จะติดต่อกลับ ✓')
  }
  const updateMaint = (id, status) => {
    setS((p) => ({ ...p, maintenance: p.maintenance.map((m) => (m.id === id ? { ...m, status } : m)) }))
    toast('อัปเดตสถานะงานซ่อมเรียบร้อย ✓', 'info')
  }

  const savePromo = () => toast('บันทึกและเผยแพร่ขึ้นหน้าเว็บสาธารณะแล้ว ✓')
  const navContact = () => toast('ขอบคุณที่สนใจ! ทีมงานจะติดต่อกลับโดยเร็ว ✓')
  const submitBooking = () => toast('ส่งคำขอจองเรียบร้อย ทีมงานจะติดต่อกลับภายใน 24 ชม. ✓')

  const vm = buildVM(s, {
    enterRole, exitToEntry, toggleRoleMenu, setPublicPage, openRoomDetail,
    setOwnerPage, setTenantPage, setBillingTab, setMaintView,
    openModal, closeModal, onField, onPromo, onSetting,
    openRoomModal, saveRoom, openTenantModal, saveTenant, openTenantDrawer,
    setMeter, generateBills, sendBill, sendAllBills, previewBill,
    openPay, confirmPay, openRepairModal, submitRepair, updateMaint,
    savePromo, navContact, submitBooking,
  })

  return (
    <div style={{ minHeight: '100vh' }}>
      {vm.isEntry && <Entry vm={vm} />}
      {vm.isPublic && <PublicSite vm={vm} />}
      {vm.isOwner && <OwnerDashboard vm={vm} />}
      {vm.isTenant && <TenantPortal vm={vm} />}
      {vm.showSwitcher && <RoleSwitcher vm={vm} />}
      <Toasts toasts={vm.toasts} />
      {vm.modalOpen && <Modals vm={vm} />}
    </div>
  )
}

// ---- view-model builder (port of the design's renderVals) ----
function buildVM(s, a) {
  const role = s.role
  const ic = (name, size) => <Icon name={name} size={size} />

  const roleCards = [
    { key: 'public', title: 'ผู้เยี่ยมชม / ค้นหาหอพัก', desc: 'ดูห้องว่าง ราคา สิ่งอำนวยความสะดวก และติดต่อจองห้องพัก', iconBg: '#EFF6FF', iconColor: '#2563EB', iconEl: ic('search', 24), enter: () => a.enterRole('public') },
    { key: 'owner', title: 'เจ้าของหอพัก', desc: 'จัดการห้อง ผู้เช่า ออกบิลค่าน้ำค่าไฟ ส่งบิลผ่าน LINE และแก้ไขหน้าเว็บ', iconBg: '#E6FAF8', iconColor: '#0EA5A4', iconEl: ic('building', 24), enter: () => a.enterRole('owner') },
    { key: 'tenant', title: 'ผู้เช่า / ลูกบ้าน', desc: 'ดูบิลของฉัน ชำระเงิน ดูข้อมูลห้อง แจ้งซ่อม และอ่านประกาศ', iconBg: '#FEF3F2', iconColor: '#F97316', iconEl: ic('user', 24), enter: () => a.enterRole('tenant') },
  ]
  const roleLabel = role === 'owner' ? 'เจ้าของหอพัก' : role === 'tenant' ? 'ผู้เช่า' : role === 'public' ? 'ผู้เยี่ยมชม' : ''
  const switchOptions = [
    { key: 'public', label: 'ผู้เยี่ยมชม', iconBg: '#EFF6FF', iconColor: '#2563EB', iconEl: ic('search', 16), active: role === 'public', go: () => a.enterRole('public') },
    { key: 'owner', label: 'เจ้าของหอพัก', iconBg: '#E6FAF8', iconColor: '#0EA5A4', iconEl: ic('building', 16), active: role === 'owner', go: () => a.enterRole('owner') },
    { key: 'tenant', label: 'ผู้เช่า / ลูกบ้าน', iconBg: '#FEF3F2', iconColor: '#F97316', iconEl: ic('user', 16), active: role === 'tenant', go: () => a.enterRole('tenant') },
  ]
  const toasts = s.toasts.map((t) => ({ ...t, iconEl: ic(t.icon, 15) }))

  // ---- PUBLIC ----
  const facilities = s.promo.facilities.map((f) => ({ ...f, iconEl: ic(f.icon, 22) }))
  const pubRoomTypes = s.promo.roomTypes.map((rt, i) => {
    const rs = s.rooms.filter((r) => r.type === rt.type)
    const price = Math.min(...rs.map((r) => r.rent))
    const vac = rs.filter((r) => r.status === 'vacant').length
    return {
      ...rt, index: i, price, priceDisplay: S(price), total: rs.length, vacant: vac,
      availLabel: vac > 0 ? 'ว่าง ' + vac + ' ห้อง' : 'เต็มแล้ว',
      availBg: vac > 0 ? '#ECFDF5' : '#FEF2F2', availColor: vac > 0 ? '#047857' : '#DC2626',
      soldOut: vac === 0, open: () => a.openRoomDetail(rt.type),
    }
  })
  const reviews = s.reviews.map((r) => ({ ...r, initial: r.name.slice(0, 1), stars: Array.from({ length: 5 }, (_, i) => i < r.rating) }))
  const selRT = pubRoomTypes.find((r) => r.type === s.selectedType) || pubRoomTypes[0]
  const selRooms = s.rooms.filter((r) => r.type === (selRT ? selRT.type : '')).map((r) => {
    const m = roomStatusMeta(r.status)
    return { ...r, statusLabel: m.label, statusBg: m.bg, statusColor: m.color, vacant: r.status === 'vacant' }
  })
  const galleryEls = s.gallery

  // ---- OWNER ----
  const navDef = [
    ['overview', 'ภาพรวม', 'grid'], ['rooms', 'จัดการห้อง', 'bed'], ['tenants', 'จัดการผู้เช่า', 'users'],
    ['billing', 'บิล & ค่าน้ำค่าไฟ', 'receipt'], ['promo', 'จัดการโปรโมท', 'megaphone'],
    ['maintenance', 'แจ้งซ่อม', 'wrench'], ['settings', 'ตั้งค่า', 'gear'],
  ]
  const ownerNav = navDef.map(([key, label, icon]) => {
    const active = s.ownerPage === key
    return { key, label, active, navBg: active ? '#E6FAF8' : 'transparent', navColor: active ? '#0C8F8E' : '#5B636E', navWeight: active ? '700' : '500', iconEl: ic(icon, 19), go: () => a.setOwnerPage(key) }
  })
  const ownerPageTitles = {
    overview: ['ภาพรวม', 'สรุปภาพรวมหอพักของคุณ'], rooms: ['จัดการห้อง', 'ดูและจัดการห้องพักทั้งหมด'],
    tenants: ['จัดการผู้เช่า', 'ข้อมูลผู้เช่าและสถานะการชำระ'], billing: ['บิล & ค่าน้ำค่าไฟ', 'บันทึกมิเตอร์ ออกบิล และส่งผ่าน LINE'],
    promo: ['จัดการโปรโมท / หน้าเว็บ', 'แก้ไขเนื้อหาที่แสดงบนเว็บไซต์สาธารณะ'], maintenance: ['แจ้งซ่อม', 'คำขอแจ้งซ่อมจากผู้เช่า'],
    settings: ['ตั้งค่า', 'ข้อมูลหอพักและการเชื่อมต่อ'],
  }
  const otitle = ownerPageTitles[s.ownerPage] || ['', '']

  const curBills = s.bills.filter((b) => b.month === CURRENT_MONTH)
  const billRows = curBills.map((b) => {
    const c = computeBill(s, b), room = roomById(s, b.roomId), tn = tenantById(s, b.tenantId), m = billStatusMeta(b.status)
    return {
      id: b.id, roomNo: room ? room.number : '-', tenant: tn ? tn.name : '-', line: tn ? tn.line : '', total: c.total, totalDisplay: S(c.total),
      statusLabel: m.label, statusBg: m.bg, statusColor: m.color, status: b.status, isDraft: b.status === 'draft', isPaid: b.status === 'paid',
      sending: s.sendingIds.includes(b.id), notSending: !s.sendingIds.includes(b.id), sentOrPaid: b.status !== 'draft',
      send: () => a.sendBill(b.id), preview: () => a.previewBill(b),
    }
  })
  const draftCount = curBills.filter((b) => b.status === 'draft').length
  const meterRows = curBills.map((b) => {
    const c = computeBill(s, b), room = roomById(s, b.roomId), tn = tenantById(s, b.tenantId)
    return {
      id: b.id, roomNo: room ? room.number : '-', tenant: tn ? tn.name : '-', pw: b.pw, cw: b.cw, pe: b.pe, ce: b.pe2,
      wUnits: c.wUnits, eUnits: c.eUnits, wAmt: S(c.wAmt), eAmt: S(c.eAmt), rent: S(c.rent), total: S(c.total),
      onW: (e) => a.setMeter(b.id, 'cw', e.target.value), onE: (e) => a.setMeter(b.id, 'pe2', e.target.value),
    }
  })

  const occupied = s.rooms.filter((r) => r.status === 'occupied').length
  const vacantN = s.rooms.filter((r) => r.status === 'vacant').length
  const revPaid = curBills.filter((b) => b.status === 'paid').reduce((acc, b) => acc + computeBill(s, b).total, 0)
  const outstanding = curBills.filter((b) => b.status === 'unpaid').reduce((acc, b) => acc + computeBill(s, b).total, 0)
  const outCount = curBills.filter((b) => b.status === 'unpaid').length
  const kpis = [
    { label: 'ห้องทั้งหมด', value: String(s.rooms.length), sub: 'มีผู้เช่า ' + occupied + ' ห้อง', icon: 'bed', accent: '#0EA5A4', bg: '#E6FAF8' },
    { label: 'ห้องว่าง', value: String(vacantN), sub: 'พร้อมปล่อยเช่า', icon: 'key', accent: '#2563EB', bg: '#EFF6FF' },
    { label: 'ผู้เช่าปัจจุบัน', value: String(s.tenants.length), sub: 'อัตราเข้าพัก ' + Math.round((occupied / s.rooms.length) * 100) + '%', icon: 'users', accent: '#7C3AED', bg: '#F3EEFF' },
    { label: 'รายได้เดือนนี้', value: S(revPaid), sub: 'จากบิลที่ชำระแล้ว', icon: 'trending', accent: '#047857', bg: '#ECFDF5' },
    { label: 'ค้างชำระ', value: S(outstanding), sub: outCount + ' รายการ', icon: 'alert', accent: '#DC2626', bg: '#FEF2F2' },
  ].map((k) => ({ ...k, iconEl: ic(k.icon, 20) }))
  const maxRev = Math.max(...s.revenueSeries.map((r) => r.v))
  const revBars = s.revenueSeries.map((r) => ({ ...r, pct: Math.round((r.v / maxRev) * 100), disp: '฿' + Math.round(r.v / 1000) + 'k' }))
  const actIcon = { paid: ['checkCircle', '#047857', '#ECFDF5'], repair: ['wrench', '#B45309', '#FFFBEB'], bill: ['send', '#06A94D', '#E7F9EE'], tenant: ['user', '#2563EB', '#EFF6FF'] }
  const activityVM = s.activity.map((act) => { const [icn, col, bg] = actIcon[act.type] || ['bell', '#6B7280', '#F2F4F7']; return { ...act, iconEl: ic(icn, 15), col, bg } })

  const ownerRooms = s.rooms.map((r) => { const m = roomStatusMeta(r.status), tn = tenantById(s, r.tenantId); return { ...r, statusLabel: m.label, statusBg: m.bg, statusColor: m.color, rentDisplay: S(r.rent), tenantName: tn ? tn.name : '—', edit: () => a.openRoomModal(r) } })
  const ownerTenants = s.tenants.map((t) => {
    const room = roomById(s, t.roomId); const bill = curBills.find((b) => b.tenantId === t.id); const pm = bill ? billStatusMeta(bill.status) : { label: '—', bg: '#F2F4F7', color: '#6B7280' }
    return { ...t, initial: t.name.slice(0, 1), roomNo: room ? room.number : '-', roomType: room ? room.type : '', payLabel: pm.label, payBg: pm.bg, payColor: pm.color, open: () => a.openTenantDrawer(t) }
  })

  const maintVM = s.maintenance.map((mt) => {
    const m = maintStatusMeta(mt.status), room = roomById(s, mt.roomId), tn = tenantById(s, mt.tenantId)
    return {
      ...mt, roomNo: room ? room.number : '-', tenant: tn ? tn.name : '(ส่วนกลาง)', statusLabel: m.label, statusBg: m.bg, statusColor: m.color,
      canStart: mt.status === 'pending', canDone: mt.status === 'inprogress', canReopen: mt.status === 'done',
      setPending: () => a.updateMaint(mt.id, 'pending'), setProg: () => a.updateMaint(mt.id, 'inprogress'), setDone: () => a.updateMaint(mt.id, 'done'),
    }
  })
  const maintCols = [
    { key: 'pending', label: 'รอดำเนินการ', color: '#B45309', dot: '#F59E0B', items: maintVM.filter((m) => m.status === 'pending') },
    { key: 'inprogress', label: 'กำลังซ่อม', color: '#1D4ED8', dot: '#3B82F6', items: maintVM.filter((m) => m.status === 'inprogress') },
    { key: 'done', label: 'เสร็จสิ้น', color: '#047857', dot: '#22C55E', items: maintVM.filter((m) => m.status === 'done') },
  ].map((c) => ({ ...c, count: c.items.length }))
  const tab = (on) => (on ? { bg: '#fff', color: '#1A1D24', shadow: '0 1px 3px rgba(16,24,40,.12)' } : { bg: 'transparent', color: '#8A929C', shadow: 'none' })
  const mt1 = tab(s.billingTab === 'meter'), mt2 = tab(s.billingTab === 'list'), kn1 = tab(s.maintView !== 'table'), kn2 = tab(s.maintView === 'table')
  const pendingCount = maintVM.filter((m) => m.status === 'pending').length

  // ---- TENANT ----
  const ten = tenantById(s, s.currentTenantId)
  const tenRoom = ten ? roomById(s, ten.roomId) : null
  const tenNavDef = [['home', 'หน้าหลัก', 'home'], ['bills', 'บิลของฉัน', 'receipt'], ['room', 'ห้องของฉัน', 'bed'], ['repair', 'แจ้งซ่อม', 'wrench'], ['news', 'ประกาศ', 'bell']]
  const tenantNav = tenNavDef.map(([key, label, icon]) => {
    const active = s.tenantPage === key
    return { key, label, active, navBg: active ? '#E6FAF8' : 'transparent', navColor: active ? '#0C8F8E' : '#5B636E', navWeight: active ? '700' : '500', iconEl: ic(icon, 19), go: () => a.setTenantPage(key) }
  })
  const tenTitles = {
    home: ['สวัสดี ' + (ten ? ten.name.split(' ')[0] : ''), 'ภาพรวมการพักอาศัยของคุณ'], bills: ['บิลของฉัน', 'ค่าเช่าและค่าสาธารณูปโภค'],
    room: ['ห้องของฉัน', 'ข้อมูลห้องพักและสัญญา'], repair: ['แจ้งซ่อม', 'แจ้งปัญหาและติดตามสถานะ'], news: ['ประกาศ / ข่าวสาร', 'ข่าวสารจากหอพัก'],
  }
  const tt = tenTitles[s.tenantPage] || ['', '']
  const myBills = s.bills.filter((b) => b.tenantId === s.currentTenantId).map((b) => {
    const c = computeBill(s, b), m = billStatusMeta(b.status)
    return {
      id: b.id, month: b.month, rentD: S(c.rent), wUnits: c.wUnits, wAmtD: S(c.wAmt), eUnits: c.eUnits, eAmtD: S(c.eAmt), feeD: S(c.fee), totalD: S(c.total),
      statusLabel: m.label, statusBg: m.bg, statusColor: m.color, isUnpaid: b.status === 'unpaid', isPaid: b.status === 'paid', isDraft: b.status === 'draft',
      pay: () => a.openPay(b), view: () => a.previewBill(b),
    }
  })
  const curBill = myBills.find((b) => b.month === CURRENT_MONTH) || myBills[0]
  const myReqs = s.maintenance.filter((m) => m.tenantId === s.currentTenantId).map((mt) => { const m = maintStatusMeta(mt.status); return { ...mt, statusLabel: m.label, statusBg: m.bg, statusColor: m.color } })
  const annVM = s.announcements.map((an) => {
    const tg = an.tag === 'สำคัญ' ? { bg: '#FEF2F2', c: '#DC2626' } : an.tag === 'แจ้งเตือน' ? { bg: '#FFFBEB', c: '#B45309' } : an.tag === 'กิจกรรม' ? { bg: '#F3EEFF', c: '#7C3AED' } : { bg: '#EFF6FF', c: '#2563EB' }
    return { ...an, tagBg: tg.bg, tagColor: tg.c }
  })
  const tenInitial = ten ? ten.name.slice(0, 1) : ''
  const sizeMap = { Studio: '24 ตร.ม.', '1 Bedroom': '35 ตร.ม.', Deluxe: '48 ตร.ม.' }
  const tenRoomSize = tenRoom ? sizeMap[tenRoom.type] || '' : ''

  // ---- MODALS ----
  const modal = s.modal, mType = modal ? modal.type : null
  const billForModal = modal && (mType === 'billPreview' || mType === 'pay') ? modal.data.bill : null
  let billPV = null
  if (billForModal) {
    const c = computeBill(s, billForModal), room = roomById(s, billForModal.roomId), tn = tenantById(s, billForModal.tenantId), mm = billStatusMeta(billForModal.status)
    billPV = {
      id: billForModal.id, month: billForModal.month, roomNo: room ? room.number : '-', tenant: tn ? tn.name : '-', line: tn ? tn.line : '',
      rentD: S(c.rent), wUnits: c.wUnits, wAmtD: S(c.wAmt), eUnits: c.eUnits, eAmtD: S(c.eAmt), feeD: S(c.fee), totalD: S(c.total),
      statusLabel: mm.label, statusBg: mm.bg, statusColor: mm.color, confirmPay: () => a.confirmPay(billForModal.id),
    }
  }
  const drawerT = modal && mType === 'tenantDrawer' ? modal.data.tenant : null
  let drawerVM = null
  if (drawerT) {
    const room = roomById(s, drawerT.roomId)
    const dbills = s.bills.filter((b) => b.tenantId === drawerT.id).map((b) => { const c = computeBill(s, b), mm = billStatusMeta(b.status); return { month: b.month, totalD: S(c.total), statusLabel: mm.label, statusBg: mm.bg, statusColor: mm.color } })
    drawerVM = { ...drawerT, initial: drawerT.name.slice(0, 1), roomNo: room ? room.number : '-', roomType: room ? room.type : '', floor: room ? room.floor : '', depositD: S(drawerT.deposit), bills: dbills }
  }
  const tenantVacant = modal && mType === 'tenant' ? (modal.data.vacant || []).map((r) => ({ id: r.id, label: 'ห้อง ' + r.number + ' · ' + r.type + ' (฿' + r.rent.toLocaleString() + ')' })) : []

  return {
    isEntry: role === null, isPublic: role === 'public', isOwner: role === 'owner', isTenant: role === 'tenant',
    showSwitcher: role !== null, roleMenuOpen: s.roleMenuOpen, roleLabel,
    roleCards, switchOptions, toasts,
    toggleRoleMenu: a.toggleRoleMenu, exitToEntry: a.exitToEntry,
    // public
    promo: s.promo, settings: s.settings, facilities, pubRoomTypes, reviews, galleryEls,
    pubPageHome: s.publicPage === 'home', pubPageDetail: s.publicPage === 'roomDetail',
    selRT, selRooms, contactIcon: ic('phone', 18),
    setPublicHome: () => a.setPublicPage('home'),
    openRoomDetail: a.openRoomDetail,
    heroIcons: { wifi: ic('wifi', 18), shield: ic('shield', 18), car: ic('car', 18), pin: ic('mapPin', 16) },
    navContact: a.navContact, submitBooking: a.submitBooking,
    // owner
    ownerNav, ownerPage: s.ownerPage, oTitle: otitle[0], oSub: otitle[1],
    oIs: { overview: s.ownerPage === 'overview', rooms: s.ownerPage === 'rooms', tenants: s.ownerPage === 'tenants', billing: s.ownerPage === 'billing', promo: s.ownerPage === 'promo', maintenance: s.ownerPage === 'maintenance', settings: s.ownerPage === 'settings' },
    kpis, revBars, activityVM, ownerRooms, ownerTenants,
    billRows, meterRows, draftCount, billTabMeter: s.billingTab === 'meter', billTabList: s.billingTab === 'list',
    roomCount: String(s.rooms.length), tenantCount: String(s.tenants.length),
    meterTabBg: mt1.bg, meterTabColor: mt1.color, meterTabShadow: mt1.shadow, listTabBg: mt2.bg, listTabColor: mt2.color, listTabShadow: mt2.shadow,
    kanbanBg: kn1.bg, kanbanColor: kn1.color, kanbanShadow: kn1.shadow, tableBg: kn2.bg, tableColor: kn2.color, tableShadow: kn2.shadow,
    setBillingTabMeter: () => a.setBillingTab('meter'), setBillingTabList: () => a.setBillingTab('list'),
    setMaintKanban: () => a.setMaintView('kanban'), setMaintTable: () => a.setMaintView('table'),
    maintKanban: s.maintView !== 'table', maintCols, pendingCount, maintTable: s.maintView === 'table', maintVM,
    bellIcon: ic('bell', 19), searchIcon: ic('search', 16), plusIcon: ic('plus', 17),
    sendAllIcon: ic('send', 16), dropIcon: ic('droplet', 16), boltIcon: ic('bolt', 16),
    openRoomModal: a.openRoomModal, openTenantModal: a.openTenantModal,
    sendAllBills: a.sendAllBills, generateBills: a.generateBills, savePromo: a.savePromo,
    onPromo: a.onPromo, onSetting: a.onSetting,
    // tenant
    tenantNav, tIs: { home: s.tenantPage === 'home', bills: s.tenantPage === 'bills', room: s.tenantPage === 'room', repair: s.tenantPage === 'repair', news: s.tenantPage === 'news' },
    tTitle: tt[0], tSub: tt[1], ten, tenRoom, tenInitial,
    myBills, curBill, myReqs, annVM,
    tenRentD: tenRoom ? S(tenRoom.rent) : '', tenDepositD: ten ? S(ten.deposit) : '', tenRoomSize,
    tenRoomNo: tenRoom ? tenRoom.number : '', tenRoomType: tenRoom ? tenRoom.type : '', tenRoomFloor: tenRoom ? String(tenRoom.floor) : '',
    tenName: ten ? ten.name : '', tenPhone: ten ? ten.phone : '', tenLine: ten ? ten.line : '', tenMoveIn: ten ? ten.moveIn : '',
    latestAnn: annVM[0],
    // modals
    modalOpen: !!modal, mRoom: mType === 'room', mTenant: mType === 'tenant', mBillPreview: mType === 'billPreview', mPay: mType === 'pay', mDrawer: mType === 'tenantDrawer', mRepair: mType === 'repair',
    form: s.form, onField: a.onField, closeModal: a.closeModal, stopProp: (e) => e.stopPropagation(),
    saveRoom: a.saveRoom, saveTenant: a.saveTenant, submitRepair: a.submitRepair,
    billPV, drawerVM, tenantVacant, paying: s.paying, notPaying: !s.paying,
    roomModalTitle: modal && mType === 'room' && modal.data.editing ? 'แก้ไขข้อมูลห้อง' : 'เพิ่มห้องใหม่',
    openRepairModal: a.openRepairModal,
    hasReqs: myReqs.length > 0, noReqs: myReqs.length === 0,
    curIsUnpaid: curBill ? curBill.isUnpaid : false, curIsPaid: curBill ? curBill.isPaid : false,
  }
}
