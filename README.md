# ดุอาอ์ — Nuxt 3 E-book

โปรเจกต์เว็บอ่านดุอาอ์ที่ย้ายจาก HTML/JavaScript เป็น Nuxt 3 แยก Component และข้อมูลออกจากกัน รองรับมือถือ Tablet Desktop จอแนวตั้ง จอแนวนอน Safe Area และ Touch

## เริ่มต้นใช้งาน

ต้องติดตั้ง Node.js 20.19 ขึ้นไป แล้วรัน:

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000`

## Build

```bash
npm run build
npm run preview
```

สร้าง Static Site:

```bash
npm run generate
```

ไฟล์สำหรับนำขึ้น Hosting จะอยู่ใน `.output/public`

## Docker Hub

### Build และ push image

image เริ่มต้นคือ `selawat/dua-ebook-nuxt:latest` โดยใช้ `selawat` เป็น username หรือ organization บน Docker Hub

ติดตั้ง Docker พร้อม Docker Compose แล้วเตรียมค่าตั้งต้น:

```bash
cp .env.example .env
```

กำหนด image เป็น `docker.io/selawat/dua-ebook-nuxt:latest` โดยตรงใน `docker-compose.yml` หากต้องการเปลี่ยน repository หรือ tag ให้แก้ค่า `image` ในไฟล์นี้ ส่วน `.env` ใช้ตั้งพอร์ต `PORT`

สร้าง repository ชื่อ `dua-ebook-nuxt` บน Docker Hub แล้วรัน:

```bash
docker login
docker compose -f docker-compose.yml -f docker-compose.build.yml build
docker compose -f docker-compose.yml -f docker-compose.build.yml push
```

คำสั่ง build นี้สร้าง image สำหรับสถาปัตยกรรมของเครื่องที่ build เครื่องปลายทางควรใช้สถาปัตยกรรมเดียวกัน

### รันบนเครื่องปลายทาง

คัดลอก `docker-compose.yml` ไปยังเครื่องปลายทาง หากต้องการเปลี่ยนพอร์ต ให้คัดลอก `.env.example` เป็น `.env` ด้วย หากเป็น private repository ให้รัน `docker login` ก่อน

```bash
docker compose pull
docker compose up -d
```

เปิด `http://localhost:3000` เว็บให้บริการผ่าน Nginx และรองรับการเปิดหน้า `/reader` โดยตรง เปลี่ยนพอร์ตได้ด้วยค่า `PORT` ใน `.env` เช่น `PORT=8080`

ดู log และหยุดบริการ:

```bash
docker compose logs -f web
docker compose down
```

เมื่อแก้ไขโค้ด ให้ build และ push ใหม่ จากนั้นบนเครื่องปลายทางรัน `docker compose pull` และ `docker compose up -d` หากเปลี่ยน tag ให้แก้ค่า `image` ใน Compose ของเครื่องปลายทางให้ตรงกัน

## จุดที่แก้ไขบ่อย

- `pages/index.vue` — หน้า Home
- `pages/reader.vue` — หน้า Reader และการเปลี่ยนหน้า
- `components/DigitalBook.vue` — หนังสือหน้า Home
- `components/AppFooter.vue` — เมนู Footer
- `components/ReaderPaper.vue` — รูปแบบหน้ากระดาษ
- `data/duaPages.js` — ข้อความดุอาอ์ทุกหน้า
- `assets/css/main.css` — สี ขนาด และ Responsive
- `public/images` — รูปชั้นหนังสือและต้นฉบับหน้าปก

ข้อความ Arabic เป็น Unicode Text จริง ไม่ได้ Render เป็นภาพ ส่วนปกหนังสือใช้ภาพต้นฉบับตามที่กำหนด
