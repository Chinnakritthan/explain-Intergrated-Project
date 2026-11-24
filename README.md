# ⚡ ITB-CSV Explained — เว็บศึกษาโค้ดโปรเจกต์ INT504 (Team zap · Group 43)

แพลตฟอร์มเว็บไซต์สำหรับศึกษาและอธิบายโค้ดโปรเจกต์ **IT-Bangmod Class Schedule Viewing System (`itb-csv`)** ของกลุ่ม 43 (`ip26-zap`) แบบเห็นภาพ แบ่งตาม **Sprint 1–3** และแยกชั้น **Frontend / Backend / Database / Deploy & CI**

🌐 **เปิดใช้งานผ่าน GitHub Pages:** https://chinnakritthan.github.io/explain-Intergrated-Project/

---

## 📚 เนื้อหาภายในเว็บไซต์
- **🏠 ภาพรวม (`index.html`)** — สถาปัตยกรรม 4 Containers, Tech Stack, Stepper ตามรอย 1 Request และโครงสร้างโฟลเดอร์
- **1️⃣ Sprint 1 (`sprint1.html`)** — PBI 1–2 (Guest ดูตารางเรียน & Filter ชั้นปี), DB แรก, API Contract, เรียงลำดับ 6 ขั้น
- **2️⃣ Sprint 2 (`sprint2.html`)** — PBI 3–7 (Keycloak OIDC + PKCE, ถอดรหัสนักศึกษา 11 หลักแบบ Interactive, กฎ Fixed vs Option, Selection CRUD & `<dialog>`)
- **3️⃣ Sprint 3 (`sprint3.html`)** — PBI 8–12 (ตารางสอนอาจารย์, RFC 9457, JWT/JWKS, เครื่องจำลองเวลาชน Clash Simulator, ตารางรายสัปดาห์ 1,181 Sessions)
- **🎨 Frontend (`frontend.html`)** — Modular Vanilla JS, Import Graph, State/Cache, URL History API, Liquid Glass CSS
- **⚙️ Backend (`backend.html`)** — 5-Layer Architecture, ตาราง 11 Endpoints, ลำดับ Middleware (`401 → 403 → 400 → 404 → 409`), ไฟล์เก่าที่ไม่ได้ใช้แล้ว
- **🗄️ Database (`database.html`)** — ER Diagram ครบ 11 ตาราง, วิวัฒนาการราย Sprint, Idempotent Migration, Prisma Schema
- **🚀 Deploy & CI (`devops.html`)** — Proxy 3 ชั้น, VM Quality Gate, GitHub Actions CI (Mock JWKS Server), Playwright
- **🗺️ File Map (`filemap.html`)** — เครื่องมือ Interactive คลิกดูไฟล์ทุกไฟล์ในโปรเจกต์ว่าไฟล์ไหนโยงไปไหน พร้อมโค้ดทางเลือกที่ใช้แทนได้
