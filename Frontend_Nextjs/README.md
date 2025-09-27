# Frontend Next.js

Frontend untuk aplikasi Fullstack menggunakan Next.js 15 (app directory) dan HeroUI (v2).

## Struktur Proyek

```
Frontend_Nextjs/
├── app/                   # App directory (Next.js)
│   ├── (dashboard)/       # Dashboard layout group
│   │   ├── employees/     # Halaman manajemen karyawan
│   │   ├── layout.tsx     # Layout untuk dashboard
│   │   ├── page.tsx       # Halaman dashboard utama
│   │   └── users/         # Halaman manajemen pengguna
│   ├── api/               # API routes
│   │   └── auth/          # Endpoint autentikasi
│   ├── error.tsx          # Error handling
│   ├── layout.tsx         # Root layout
│   ├── providers.tsx      # Provider context
│   ├── sign-in/           # Halaman login
│   │   └── page.tsx       # Komponen halaman login
│   └── sign-up/           # Halaman registrasi
│       └── page.tsx       # Komponen halaman registrasi
├── src/
│   ├── actions/           # Server actions
│   │   ├── FormAuthAction.ts  # Aksi autentikasi form
│   │   └── LogoutAction.ts    # Aksi logout
│   ├── components/        # Komponen UI
│   │   ├── counter.tsx    # Komponen counter
│   │   ├── icons.tsx      # Komponen icon
│   │   ├── navbar.tsx     # Komponen navbar
│   │   ├── primitives.ts  # Komponen primitif
│   │   ├── sideBar.tsx    # Komponen sidebar
│   │   └── theme-switch.tsx # Toggle tema gelap/terang
│   ├── config/            # Konfigurasi aplikasi
│   │   ├── fonts.ts       # Konfigurasi font
│   │   └── site.ts        # Konfigurasi situs
│   ├── hooks/             # Custom hooks
│   │   ├── useEmployee.tsx # Hook untuk data karyawan
│   │   ├── useFormEmployee.tsx # Hook untuk form karyawan
│   │   └── useUsers.tsx   # Hook untuk data pengguna
│   ├── libs/              # Library dan utilitas
│   │   └── httpApi.ts     # Konfigurasi HTTP client
│   ├── types/             # Type definitions
│   │   └── index.ts       # Type utama
│   └── utils/             # Utility functions
│       └── cookie.ts      # Utilitas cookie
├── styles/                # Global styles
│   └── globals.css        # CSS global
├── public/                # Static files
│   ├── favicon.ico        # Favicon
│   ├── next.svg           # Logo Next.js
│   └── vercel.svg         # Logo Vercel
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── next.config.js         # Konfigurasi Next.js
├── package.json           # Dependencies dan scripts
├── postcss.config.js      # Konfigurasi PostCSS
├── tailwind.config.js     # Konfigurasi Tailwind CSS
└── tsconfig.json          # TypeScript configuration
```

## Teknologi yang Digunakan

- [Next.js 15](https://nextjs.org/docs/getting-started) - Framework React dengan fitur App Router
- [HeroUI](https://heroui.com/) - Library komponen UI modern
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [TypeScript](https://www.typescriptlang.org/) - JavaScript dengan type checking
- [next-themes](https://github.com/pacocoursey/next-themes) - Dukungan tema gelap/terang

## Fitur Utama

- Autentikasi (Sign In/Sign Up)
- Dashboard Admin
- Manajemen Karyawan (CRUD)
- Manajemen Pengguna (CRUD)
- Tema Gelap/Terang

## Cara Penggunaan

### Instalasi

```bash
# Install dependencies
npm install

# Jalankan server development
npm run dev
```

### Scripts

- `npm run dev` - Menjalankan server development dengan Turbopack
- `npm run build` - Build aplikasi untuk production
- `npm run start` - Menjalankan aplikasi production
- `npm run lint` - Menjalankan linter


## License

Licensed under the [MIT license](https://github.com/heroui-inc/next-app-template/blob/main/LICENSE).
