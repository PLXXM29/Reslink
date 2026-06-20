// Package main — โปรแกรมทดสอบเฟส 0
//
// หน้าที่เดียวของไฟล์นี้: พิสูจน์ว่า "โค้ด Go ต่อ PostgreSQL ได้จริง"
// ยังไม่มี business logic, ยังไม่แตะตาราง — แค่ต่อให้ติดแล้วทักทาย DB
//
// ที่อยู่ cmd/dbcheck/ เพราะตาม convention ของ Go ทุกโปรแกรมที่ "รันได้"
// (มี func main) จะอยู่ใต้ cmd/<ชื่อ>/ แยกกัน ไฟล์นี้เป็นตัวชั่วคราวสำหรับเทสต์
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool" // driver ต่อ Postgres (ตัวเดียวกับที่ sqlc จะใช้)
	"github.com/joho/godotenv"        // โหลดค่าจากไฟล์ .env เข้าเป็น env variable
)

func main() {
	// โหลด .env เข้าหน่วยความจำ
	// ทำไม: connection string มี password เราไม่อยากฮาร์ดโค้ดความลับลงในซอร์ส
	//        เลยเก็บไว้ในไฟล์ .env (ที่ไม่ commit) แล้วอ่านตอนรันแทน
	if err := godotenv.Load(); err != nil {
		log.Fatalf("โหลดไฟล์ .env ไม่สำเร็จ (อยู่โฟลเดอร์ backend/ หรือยัง?): %v", err)
	}

	// DATABASE_URL = สายอักขระที่บอกว่าจะต่อ DB ตัวไหน user/password อะไร
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("ไม่พบ DATABASE_URL ใน .env — เปิดไฟล์ .env แล้วใส่ค่าให้ครบ")
	}

	// context = ตัวคุม "เวลา/การยกเลิก" ของงานที่คุยกับ DB
	// pgx บังคับให้ส่ง context ทุกครั้ง เผื่อในอนาคตอยากตั้ง timeout หรือยกเลิกกลางคัน
	ctx := context.Background()

	// สร้าง connection pool — กลุ่มของการเชื่อมต่อที่เปิดค้างไว้แล้วหมุนเวียนใช้ซ้ำ
	// ทำไมใช้ pool ไม่ใช่ connection เดี่ยว:
	//   1) เปิด/ปิด connection ใหม่ทุกครั้งช้า pool ช่วยใช้ซ้ำ
	//   2) ต่อไป sqlc จะรับ pool แบบนี้ตรง ๆ เลย เราเลยวางรากให้ตรงกันตั้งแต่ตอนนี้
	pool, err := pgxpool.New(ctx, dbURL)
	if err != nil {
		log.Fatalf("สร้าง connection pool ไม่สำเร็จ: %v", err)
	}
	defer pool.Close() // ปิด pool เมื่อ main จบเสมอ กัน connection ค้างเปิด

	// Ping = ส่งสัญญาณสั้น ๆ ไปถาม DB ว่า "ได้ยินไหม"
	// ถ้าผ่าน = ต่อติดจริง (ไม่ใช่แค่สร้าง pool สำเร็จ ซึ่งยังไม่ได้คุยกับ DB จริง)
	if err := pool.Ping(ctx); err != nil {
		log.Fatalf("Ping ฐานข้อมูลไม่สำเร็จ (DB เปิดอยู่ไหม? password ถูกไหม?): %v", err)
	}

	// ถามเวอร์ชันกลับมาโชว์ เป็นการพิสูจน์ว่า "คุยกันรู้เรื่อง" ไม่ใช่แค่ต่อสาย
	var version string
	if err := pool.QueryRow(ctx, "SELECT version()").Scan(&version); err != nil {
		log.Fatalf("query เวอร์ชันไม่สำเร็จ: %v", err)
	}

	fmt.Println("✅ ต่อ PostgreSQL สำเร็จ!")
	fmt.Println("DB ตอบกลับมาว่า:", version)
}
