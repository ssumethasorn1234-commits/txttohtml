# TXT to HTML Converter

เครื่องมือแปลงไฟล์ `.txt` เป็น `.html` ทำงานในเบราว์เซอร์ทั้งหมด (ไม่ต้องมีเซิร์ฟเวอร์ ไม่ส่งข้อมูลออกนอกเครื่อง) รองรับภาษาไทย UTF-8 และ Windows-874 อัตโนมัติ

## วิธีใช้งานบน GitHub Pages
1. สร้าง repository ใหม่ แล้วอัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ (`index.html`, `assets/`, `.nojekyll`)
2. ไปที่ **Settings → Pages**
3. เลือก Source: **Deploy from a branch** → Branch: `main` / `(root)` → Save
4. รอสักครู่ แล้วเปิด `https://<username>.github.io/<repo>/`

## ฟีเจอร์
- อัปโหลด/ลากวางไฟล์ .txt หรือวางข้อความเอง
- แปลงบรรทัดว่างเป็นย่อหน้า `<p>`, URL เป็นลิงก์ `<a>`, Escape อักขระพิเศษ HTML
- เลือกฟอนต์ไทย (Noto Sans Thai, Sarabun, Prompt, Kanit)
- ดูตัวอย่าง / ดูโค้ด / คัดลอก / ดาวน์โหลด .html
