// Pure helpers shared across views.

export const S = (n) => '฿' + Number(n).toLocaleString('en-US')

export const roomById = (state, id) => state.rooms.find((r) => r.id === id)
export const tenantById = (state, id) => state.tenants.find((t) => t.id === id)

export function roomStatusMeta(s) {
  if (s === 'vacant') return { label: 'ว่าง', bg: '#ECFDF5', color: '#047857' }
  if (s === 'maintenance') return { label: 'ซ่อมบำรุง', bg: '#FFFBEB', color: '#B45309' }
  return { label: 'ไม่ว่าง', bg: '#EEF2FF', color: '#4338CA' }
}

export function billStatusMeta(s) {
  if (s === 'paid') return { label: 'ชำระแล้ว', bg: '#ECFDF5', color: '#047857' }
  if (s === 'draft') return { label: 'รอส่ง', bg: '#FFFBEB', color: '#B45309' }
  return { label: 'ค้างชำระ', bg: '#FEF2F2', color: '#DC2626' }
}

export function maintStatusMeta(s) {
  if (s === 'done') return { label: 'เสร็จสิ้น', bg: '#ECFDF5', color: '#047857' }
  if (s === 'inprogress') return { label: 'กำลังซ่อม', bg: '#EFF6FF', color: '#1D4ED8' }
  return { label: 'รอดำเนินการ', bg: '#FFFBEB', color: '#B45309' }
}

// Compute bill amounts from meter readings + settings.
export function computeBill(state, b) {
  const st = state.settings
  const room = roomById(state, b.roomId)
  const rent = room ? room.rent : 0
  const wUnits = Math.max(0, b.cw - b.pw)
  const eUnits = Math.max(0, b.pe2 - b.pe)
  const wAmt = wUnits * st.waterRate
  const eAmt = eUnits * st.elecRate
  const fee = st.commonFee
  const total = rent + wAmt + eAmt + fee
  return { rent, wUnits, eUnits, wAmt, eAmt, fee, total }
}
