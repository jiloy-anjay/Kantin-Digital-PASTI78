# Kantin Digital PASTI78 - Next.js (App Router), Tailwind CSS, Radix UI & Prisma ORM

Aplikasi web modern, responsif, dan interaktif untuk pemesanan makanan kantin sekolah/kampus berbasis **Next.js (App Router)**, **Tailwind CSS**, **Radix UI Primitives**, **Prisma ORM (SQL Database)**, dan **Voice Notifications (Web Speech API)** dalam bahasa Indonesia.

---

## 🌟 Arsitektur & Teknologi

1. **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components & Client Hooks)
2. **Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan Glassmorphism, Palet Warna Warm Appetizing & Animasi Interaktif
3. **Komponen UI**: [Radix UI Primitives](https://www.radix-ui.com/) (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`, `@radix-ui/react-switch`, `@radix-ui/react-dropdown-menu`)
4. **Database & ORM**: [Prisma ORM](https://www.prisma.io/) (SQLite / PostgreSQL) dengan relational models
5. **Fitur Suara**: **Web Speech API (`window.speechSynthesis`)** dengan pengucapan Bahasa Indonesia (`id-ID`) dan efek audio chime

---

## 🚀 9 Fitur Utama Pemesanan (PASTI78)

1. **Daftar Stan Kantin**: Pilihan stan/penjual makanan kantin dengan informasi jam operasional, kategori, dan rating.
2. **Katalog Makanan & Minuman**: Tampilan menu rapi berfoto, kategori (Makanan, Minuman, Snack), dan deskripsi lengkap.
3. **Harga Menu Transparan**: Label harga jelas dan kalkulasi total keranjang belanja otomatis real-time.
4. **Informasi Ketersediaan Menu**: Badge stok live (`Tersedia` / `Habis`) dan tombol pesan yang otomatis dinonaktifkan (disabled) jika stok habis.
5. **Sistem Pre-Order Terjadwal**: Opsi pengambilan makanan pada Jam Istirahat 1, Jam Istirahat 2, Jam Pulang, atau waktu kustom.
6. **Pembayaran Nontunai Digital**: Pilihan pembayaran QRIS Nasional, Kartu Pelajar (E-Money) dengan pengurangan saldo otomatis, dan E-Wallet.
7. **Kode / Nomor Pesanan Unik**: Generasi otomatis kode transaksi unik (e.g. `ORD-8492`), struk digital, dan barcode validasi.
8. **Informasi Status Pesanan & Voice TTS**: Live Progress Tracker 3 tahap (`Diterima` -> `Dimasak` -> `Siap Diambil`) dengan notifikasi suara otomatis saat pesanan siap diambil.
9. **Riwayat Transaksi**: Catatan seluruh transaksi yang pernah dilakukan beserta struk digital dan opsi pesan lagi (Re-order).

---

## 📁 Struktur Direktori

```
kantin-digital-nextjs/
├── app/
│   ├── layout.tsx                # Root layout, Google Fonts (Plus Jakarta Sans & Outfit)
│   ├── page.tsx                  # Beranda Canteen App (9 Sticker Features, Tracker, Katalog, Stan)
│   ├── globals.css               # Tailwind CSS & Radix UI custom animations
│   ├── login/
│   │   └── page.tsx              # Laman Login Multi-Role (Siswa vs Admin Stan) & Quick Demo
│   ├── history/
│   │   └── page.tsx              # Halaman Riwayat Transaksi & Struk Digital
│   ├── guide/
│   │   └── page.tsx              # Halaman Panduan Lengkap & Infografis 9 Fitur
│   ├── admin/
│   │   └── page.tsx              # Dashboard Admin Stan (Kelola Antrian & Toggle Stok)
│   └── api/
│       ├── orders/route.ts       # Endpoint CRUD Pesanan Prisma SQL
│       ├── menu/route.ts         # Endpoint Menu & Toggle Ketersediaan Stok
│       └── stalls/route.ts       # Endpoint Daftar Stan Kantin
├── components/
│   ├── Navbar.tsx                # Sticky navbar, user profile, saldo, voice toggle, cart trigger
│   ├── OnboardingModal.tsx       # Radix Dialog Tutorial 5 Langkah
│   ├── StallList.tsx             # Fitur 1: Daftar Stan
│   ├── MenuCatalog.tsx           # Fitur 2, 3, 4: Katalog Menu, Harga, Badge Stok
│   ├── CartDrawer.tsx            # Fitur 3, 5, 6: Keranjang, Pre-Order, Nontunai, Kalkulasi
│   ├── OrderTracker.tsx          # Fitur 8: Live Progress Tracker & Voice alerts
│   ├── DigitalReceiptModal.tsx   # Fitur 7: Struk & Barcode Kode Pesanan Unik
│   └── AdminOrderManager.tsx     # Fitur 4 & 8: Panel Kontrol Penjual Stan
├── hooks/
│   ├── useSpeech.ts              # Hook Web Speech API Text-to-Speech (id-ID)
│   └── useCart.ts                # Global Context State (Cart, Orders, Auth, Stock)
├── lib/
│   ├── prisma.ts                 # Prisma Client Singleton
│   ├── speech.ts                 # Web Speech API & Web Audio API Engine
│   └── mock-data.ts              # Initial dataset & Database seed source
├── prisma/
│   ├── schema.prisma             # Schema SQL Relasional (User, Stall, MenuItem, Order, OrderItem)
│   └── seed.ts                   # Script seeder database
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 🛠️ Cara Menjalankan Proyek

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Inisialisasi Database Prisma
```bash
npx prisma generate
npx prisma db push
```

*(Opsional: Menjalankan seed data awal)*
```bash
npx ts-node prisma/seed.ts
```

### 3. Menjalankan Server Development
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## 🎙️ Fitur Suara (Voice Notification)

Aplikasi mengintegrasikan Web Speech API secara otomatis:
- **Konfirmasi Pesanan Dibuat**: *"Pesanan Anda dengan kode ORD-8492 telah berhasil dibuat."*
- **Pemberitahuan Pesanan Siap**: *"Perhatian! Pesanan ORD-8492 siap diambil di Stan 01 Dapur Bu Siti."*
- **Kontrol Pengguna**: Tombol audio di Navbar memungkinkan pengguna mengaktifkan/menonaktifkan (Mute) suara kapan saja.
