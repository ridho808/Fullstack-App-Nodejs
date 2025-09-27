# Test Fullstack Project

Proyek ini adalah aplikasi fullstack yang terdiri dari backend Node.js dengan Express dan frontend Next.js. Aplikasi ini menyediakan sistem manajemen karyawan dan pengguna dengan fitur autentikasi.

## Struktur Proyek

```
Test_Fullstack/
├── Backend_Nodejs/       # Backend API dengan Express dan Prisma
├── Frontend_Nextjs/      # Frontend dengan Next.js dan HeroUI
└── README.MD             # Dokumentasi utama
```

## Komponen Utama

### Backend (Node.js)

Backend dibangun menggunakan Express.js, Prisma ORM, dan TypeScript. Menyediakan API untuk autentikasi, manajemen karyawan, dan manajemen pengguna.

**Fitur Utama:**
- Autentikasi (sign up, sign in)
- Manajemen karyawan (CRUD)
- Manajemen pengguna (CRUD)
- Upload file untuk foto karyawan

**Teknologi:**
- Express.js
- Prisma ORM
- TypeScript
- JWT Authentication

**Dokumentasi Lengkap:**
Lihat [Backend README](./Backend_Nodejs/README.md) untuk informasi lebih detail tentang struktur, endpoint API, dan cara penggunaan.

### Frontend (Next.js)

Frontend dibangun menggunakan Next.js 14 dengan App Router dan HeroUI untuk komponen UI. Menyediakan antarmuka pengguna untuk mengakses semua fitur backend.

**Fitur Utama:**
- Autentikasi (Sign In/Sign Up)
- Dashboard Admin
- Manajemen Karyawan (CRUD)
- Manajemen Pengguna (CRUD)
- Tema Gelap/Terang

**Teknologi:**
- Next.js 14 (App Router)
- HeroUI
- Tailwind CSS
- TypeScript

**Dokumentasi Lengkap:**
Lihat [Frontend README](./Frontend_Nextjs/README.md) untuk informasi lebih detail tentang struktur, komponen, dan cara penggunaan.

## Cara Menjalankan Proyek

### Backend

```bash
cd Backend_Nodejs
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Frontend

```bash
cd Frontend_Nextjs
npm install
npm run dev
```

