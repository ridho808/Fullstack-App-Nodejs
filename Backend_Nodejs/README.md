# Backend Node.js API

Backend API untuk aplikasi Fullstack menggunakan Express.js, Prisma ORM,Zod, dan TypeScript.

## Struktur Proyek

```
Backend_Nodejs/
├── prisma/                # Database schema dan migrations
│   ├── migrations/        # Database migrations
│   └── schema.prisma      # Prisma schema
├── src/
│   ├── config/            # Konfigurasi aplikasi
│   │   ├── config.ts      # Konfigurasi umum
│   │   └── env.ts         # Environment variables
│   ├── middleware/        # Middleware Express
│   │   ├── authGuard.ts   # Middleware autentikasi
│   │   ├── error.ts       # Error handling
│   │   ├── normalizeMultipart.ts # Normalisasi multipart form
│   │   ├── notfound.ts    # Handler 404
│   │   ├── upload.ts      # File upload
│   │   └── validate.ts    # Validasi request
│   ├── modules/           # Modul fitur aplikasi
│   │   ├── auth/          # Modul autentikasi
│   │   ├── employees/     # Modul karyawan
│   │   └── users/         # Modul pengguna
│   ├── repositories/      # Repository untuk akses database
│   │   ├── employees.repo.ts  # Repository karyawan
│   │   ├── refreshtoken.repo.ts # Repository refresh token
│   │   └── user.repo.ts   # Repository pengguna
│   ├── routes/            # Definisi route API
│   │   ├── auth.routes.ts # Route autentikasi
│   │   ├── employees.routes.ts # Route karyawan
│   │   ├── index.ts       # Route utama
│   │   └── users.routes.ts # Route pengguna
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   │   ├── cookie.ts      # Utilitas cookie
│   │   ├── crypto.ts      # Utilitas enkripsi
│   │   ├── jwt.ts         # Utilitas JWT
│   │   ├── logger.ts      # Logger
│   │   ├── pinohttp.ts    # HTTP logger
│   │   └── prisma.ts      # Prisma client
│   ├── app.ts             # Express app setup
│   └── server.ts          # Entry point aplikasi
├── uploads/               # Folder untuk file upload
│   └── employees/         # Foto karyawan
├── .env.example           # Contoh environment variables
├── .gitignore             # Git ignore file
├── package.json           # Dependencies dan scripts
├── package-lock.json      # Lock file
└── tsconfig.json          # TypeScript configuration
```

## Instalasi

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Jalankan migrasi database
npm run prisma:migrate

# Jalankan server development
npm run dev
```

## Scripts

- `npm run dev` - Menjalankan server development dengan hot reload
- `npm run build` - Build aplikasi untuk production
- `npm run start` - Menjalankan aplikasi production
- `npm run lint` - Menjalankan linter
- `npm run format` - Format kode dengan Prettier
- `npm run test` - Menjalankan unit tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Jalankan migrasi database

## API Endpoints

### Auth API

- `POST /auth/sign_up` - Registrasi pengguna baru
- `POST /auth/sign_in` - Login pengguna
- `POST /auth/sign_up/admin` - Registrasi admin baru
- `POST /auth/sign_in/admin` - Login admin

### Employees API

Semua endpoint memerlukan autentikasi (authAccessGuard)

- `GET /employees` - Mendapatkan semua data karyawan
- `POST /employees` - Membuat data karyawan baru (dengan upload foto)
- `GET /employees/get?name=...` - Mencari karyawan berdasarkan nama
- `GET /employees/id/:id` - Mendapatkan detail karyawan berdasarkan ID
- `PATCH /employees/id/:id` - Memperbarui data karyawan berdasarkan ID (dengan upload foto)
- `DELETE /employees/id/:id` - Menghapus data karyawan berdasarkan ID

### Users API

Semua endpoint memerlukan autentikasi (authAccessGuard)

- `GET /users` - Mendapatkan semua data pengguna
- `GET /users/:id` - Mendapatkan detail pengguna berdasarkan ID
- `PATCH /users/:id` - Memperbarui data pengguna berdasarkan ID
- `DELETE /users/:id` - Menghapus data pengguna berdasarkan ID (memerlukan role admin)
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Menjalankan migrasi database

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Mendapatkan semua users
- `GET /api/users/:id` - Mendapatkan user berdasarkan ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Employees
- `GET /api/employees` - Mendapatkan semua employees
- `GET /api/employees/:id` - Mendapatkan employee berdasarkan ID
- `POST /api/employees` - Membuat employee baru
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee