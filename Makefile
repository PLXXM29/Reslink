# Makefile — รวบคำสั่งที่ใช้บ่อยให้สั้นและจำง่าย
#
# วิธีใช้:  make <ชื่อคำสั่ง>   เช่น  make db-up
# ดูคำสั่งทั้งหมด:  make help
#
# หมายเหตุ Windows: ต้องติดตั้ง make ก่อน (เช่น `winget install ezwinports.make`
#                   หรือ `choco install make`) หรือจะพิมพ์คำสั่งเต็มเองตาม README ก็ได้

# โหลดค่าจาก backend/.env เข้ามาเป็นตัวแปร (เอา DATABASE_URL มาใช้กับ migrate)
# เครื่องหมาย - ข้างหน้า = ถ้าไฟล์ยังไม่มีก็ไม่ต้อง error (เผื่อรัน db-up ก่อนตั้ง .env)
-include backend/.env
export

MIGRATIONS := backend/internal/db/migrations

.PHONY: help db-up db-down db-reset run migrate-up migrate-down migrate-create sqlc

help: ## แสดงรายการคำสั่งทั้งหมด
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

db-up: ## เปิด PostgreSQL ใน Docker (รันเบื้องหลัง)
	docker compose up -d

db-down: ## ปิด PostgreSQL (ข้อมูลยังอยู่)
	docker compose down

db-reset: ## ลบ DB ทิ้งแล้วสร้างใหม่ (⚠️ ข้อมูลหายหมด)
	docker compose down -v && docker compose up -d

run: ## ทดสอบต่อ DB (go run dbcheck)
	cd backend && go run ./cmd/dbcheck

migrate-up: ## รัน migration ขึ้นทั้งหมด
	migrate -path $(MIGRATIONS) -database "$(DATABASE_URL)" up

migrate-down: ## ย้อน migration ลง 1 ขั้น
	migrate -path $(MIGRATIONS) -database "$(DATABASE_URL)" down 1

migrate-create: ## สร้างไฟล์ migration ใหม่ — ใช้: make migrate-create name=create_accounts
	migrate create -ext sql -dir $(MIGRATIONS) -seq $(name)

sqlc: ## gen Go code จาก SQL
	cd backend && sqlc generate
