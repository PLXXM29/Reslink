# CLAUDE.md — Reslink Project

อ่านไฟล์นี้ก่อนเริ่มทำงานทุกครั้ง และทำตามกฎทุกข้อ

## บริบทโปรเจกต์

Reslink = ระบบจัดการหอพัก/อพาร์ตเมนต์ แบบ SaaS หลายเจ้าของ (multi-tenant)
ตอนนี้กำลังสร้าง **ชั้น entity + การเชื่อมต่อ database เท่านั้น** ยังไม่ทำ business logic, API, หรือ frontend

เจ้าของโปรเจกต์กำลังเรียนรู้ Go และ database design อย่างจริงจัง ตั้งใจเลิก "vibe coding" (เขียนโค้ดโดยไม่เข้าใจ) เป้าหมายคือ **เข้าใจทุกบรรทัดที่เขียน** ไม่ใช่แค่ให้มันรันได้

## Stack ที่ใช้ (ห้ามเปลี่ยนเองโดยไม่ถาม)

- ภาษา: **Go** (เวอร์ชันล่าสุด stable)
- Database: **PostgreSQL**
- Query layer: **sqlc** — เขียน SQL เอง แล้ว gen เป็น Go type-safe code (ห้ามใช้ ORM เช่น GORM, ห้ามใช้ ent)
- Migration: **golang-migrate** — เขียน SQL migration แยกไฟล์ (ห้ามใช้ auto-migrate ใด ๆ)
- Driver: **pgx** (ผ่าน sqlc)

## กฎการทำงานที่สำคัญที่สุด (Teaching Mode)

เจ้าของยังใหม่กับ sqlc และ golang-migrate ดังนั้น:

1. **อธิบายก่อนเขียนเสมอ** — ก่อนสร้างหรือแก้ไฟล์ใด ๆ ให้อธิบายเป็นภาษาไทยก่อนว่า: ไฟล์นี้คืออะไร, ทำไมต้องมี, แต่ละส่วนทำอะไร แล้วค่อยเขียน
2. **ทำทีละเฟส แล้วหยุดรอ** — เมื่อจบแต่ละเฟส (ดูด้านล่าง) ให้หยุด สรุปสิ่งที่ทำ บอกคำสั่งที่เจ้าของต้องรันเอง แล้ว **รอให้เจ้าของยืนยันก่อนไปเฟสถัดไป** ห้ามทำหลายเฟสรวดเดียว
3. **เจ้าของรันคำสั่งเอง** — อย่ารัน `sqlc generate`, `migrate up`, `go run` ให้ บอกคำสั่งให้เจ้าของพิมพ์เอง พร้อมอธิบายว่าคำสั่งนั้นทำอะไร (ยกเว้นเจ้าของขอให้รันให้)
4. **อธิบายศัพท์ใหม่** — เจอคำที่เจ้าของอาจไม่รู้ (เช่น idempotent, sequence, composite index) ให้อธิบายสั้น ๆ ตรงนั้นเลย
5. **ถามเมื่อไม่แน่ใจ ห้ามเดา** — ถ้า requirement กำกวม ให้ถาม ไม่ใช่เดาแล้วทำต่อ
6. **เขียน comment ใน SQL/Go อธิบายว่าทำไม** ไม่ใช่แค่ว่าทำอะไร — โดยเฉพาะจุดที่ตัดสินใจเชิง design

## หลักการ database ที่ต้องยึดทุกตาราง (ห้ามลืม)

ออกแบบมาแล้ว ห้ามเปลี่ยนโดยไม่ถาม:

1. **Primary key = ULID** เก็บเป็น `CHAR(26)` ไม่ใช่ auto-increment int
2. **เงินเก็บเป็น BIGINT หน่วยสตางค์** (5,500 บาท = 550000) ห้ามใช้ float/real เด็ดขาด
3. **ทุกตาราง core มี `account_id`** (CHAR(26)) เพื่อแยกข้อมูลข้ามเจ้าของหอ — ยกเว้นตารางระดับ platform เอง (Account, Plan, User)
4. **ทุกตารางมี audit columns**: `created_at`, `updated_at` (TIMESTAMPTZ NOT NULL DEFAULT now()) และ `deleted_at` (TIMESTAMPTZ NULL = soft delete)
5. **ข้อมูลการเงิน (Bill, Payment, LedgerEntry, Invoice) ห้ามออกแบบให้ลบ/แก้** — LedgerEntry เป็น append-only
6. **FK ภายใน context เดียวกัน** ใส่ FOREIGN KEY constraint ได้
7. **FK ข้าม context (เส้นประใน ERD)** ตอนนี้เป็น monolith DB เดียว — **ใส่ FK constraint ได้** แต่ให้คอมเมนต์กำกับว่า "cross-context ref, จะกลายเป็น API/event ตอนแยก service" เพื่อเตือนว่าโค้ด layer บนไม่ควร JOIN ข้าม context
8. **ตั้ง index ตามที่ระบุในแต่ละเฟส** โดยเฉพาะ UNIQUE constraint กันข้อมูลซ้ำ (เช่น กันออกบิลซ้ำเดือนเดียวกัน)

## ลำดับเฟส (ทำตามนี้เท่านั้น ทีละเฟส)

**เฟส 0** — วาง project structure + ติดตั้ง tools + เชื่อม PostgreSQL ให้ติด (ยังไม่มีตาราง) ทดสอบว่า connect ได้
**เฟส 1** — ชั้นราก: Account, Plan, Subscription, AccountUser, User, UserSession
**เฟส 2** — Property: Building, Floor, RoomType, Room
**เฟส 3** — Resident & Lease: Resident, Lease, Occupant, LeaseDocument
**เฟส 4** — Billing: UtilityRate, MeterReading, Bill, BillLineItem, Invoice
**เฟส 5** — Payment: Payment, PaymentTransaction, LedgerEntry, Deposit
**เฟส 6** — Maintenance + Content: MaintenanceRequest, MaintenanceComment, SiteContent, BookingInquiry, Announcement
**เฟส 7** — Infra: OutboxEvent, NotificationLog, ConsentRecord, AuditLog, RolePermission

แต่ละเฟสทำครบ: เขียน migration SQL (up + down) → เขียน sqlc query พื้นฐาน (CRUD: create, get by id, list, soft delete) → gen code → บอกเจ้าของรัน migrate + ทดสอบ → หยุดรอ

## สิ่งที่ "ยังไม่ต้องทำ" ในตอนนี้ (สำคัญ)

อย่าเผลอสร้างสิ่งเหล่านี้ เจ้าของจะค่อยทำเองทีหลังเพื่อเรียนรู้:
- business logic / service layer
- HTTP handler / API / router
- authentication / middleware
- frontend
- การคำนวณบิล, การส่ง LINE, payment gateway integration
- unit test (ยกเว้นเจ้าของขอ)

ถ้าเจ้าของขอสิ่งเหล่านี้ค่อยทำ — แต่ default คือ entity + DB เท่านั้น

## โครงสร้างโฟลเดอร์ที่แนะนำ (ปรับได้ แต่อธิบายเหตุผลถ้าเปลี่ยน)

```
reslink/
  cmd/                  # entry points (ทีหลัง)
  internal/
    db/
      migrations/       # ไฟล์ .sql ของ golang-migrate
      queries/          # ไฟล์ .sql ที่ sqlc อ่าน (แยกตาม context)
      sqlc/             # โค้ดที่ sqlc gen ออกมา (ห้ามแก้มือ)
  sqlc.yaml             # config ของ sqlc
  .env                  # DB connection string (อย่า commit)
  go.mod
```
