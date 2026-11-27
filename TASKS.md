# TASKS — Maison Kitchen Website Demo

Pusat pengelolaan pekerjaan untuk proyek **Maison Kitchen** (Demo Portfolio Siteworthy).

**Status yang digunakan:** `TODO` | `IN_PROGRESS` | `REVIEW` | `BLOCKED` | `DONE`

---

## Phase 0: Project Setup & Documentation

### `TASK-001` — Penyusunan Dokumentasi Awal Proyek
- **Status:** `DONE`
- **Tujuan:** Menyediakan fondasi dokumentasi proyek yang selaras dengan `PROJECT_BRIEF.md` dan Global AI-Memory.
- **Deskripsi:** Membuat `README.md`, `TASKS.md`, `AGENTS.md`, `DECISIONS.md`, dan `ARCHITECTURE.md`.
- **Acceptance Criteria:**
  - Kelima file dokumentasi tersedia di root proyek.
  - Seluruh isi konsisten dengan `PROJECT_BRIEF.md` tanpa mengarang informasi fiktif sebagai fakta.

---

## Phase 1: Project Analysis & Technical Confirmation

### `TASK-002` — Konfirmasi Keputusan Teknis Terbuka
- **Status:** `DONE`
- **Tujuan:** Menyelesaikan pertanyaan teknis sebelum menulis kode implementasi.
- **Deskripsi:** Menentukan pendekatan Tailwind CSS (disepakati: **Tailwind CLI Build**). Konfirmasi username/repo GitHub (`DEC-007`) dijadwalkan pada tahap persiapan deployment (`TASK-014`).
- **Acceptance Criteria:**
  - Keputusan `DEC-006` dicatat sebagai `APPROVED` di `DECISIONS.md`.

### `TASK-003` — Penyiapan Struktur Folder, Tailwind CLI, & Aset Visual
- **Status:** `DONE`
- **Tujuan:** Menyiapkan direktori kerja, setup Tailwind CLI Build, dan kebutuhan gambar makanan/restoran yang relevan.
- **Deskripsi:** Membuat struktur folder (`assets/images/`, `src/css/`, `src/js/`), menginisialisasi `package.json` serta konfigurasi Tailwind CLI (`input.css` → `styles.css`), dan mengidentifikasi/menyiapkan foto makanan yang sesuai dengan item menu demo.
- **Acceptance Criteria:**
  - Struktur folder sesuai dengan rancangan pada `ARCHITECTURE.md`.
  - Script build Tailwind CLI berjalan tanpa error dan menghasilkan CSS statis.
  - Seluruh gambar memiliki nama file deskriptif, ukuran teroptimasi, dan tidak rusak.

---

## Phase 2: Data & Configuration Layer

### `TASK-004` — Implementasi Konfigurasi Bisnis (`src/js/config.js`)
- **Status:** `DONE`
- **Tujuan:** Memusatkan seluruh data bisnis agar mudah diganti untuk kebutuhan klien nyata.
- **Deskripsi:** Menyimpan nama brand, tagline, placeholder nomor WhatsApp (format internasional tanpa `+`/spasi), placeholder alamat, jam operasional, link media sosial, dan locale mata uang.
- **Acceptance Criteria:**
  - Tidak ada informasi bisnis yang di-hardcode tersebar di file UI.
  - Placeholder ditandai secara jelas sebagai data demonstrasi.

### `TASK-005` — Implementasi Sumber Data Menu (`src/js/menu-data.js`)
- **Status:** `DONE`
- **Tujuan:** Menyediakan single source of truth untuk Featured Menu dan Full Menu.
- **Deskripsi:** Menyusun daftar menu lengkap (Appetizers, Main Course, Beverages, Desserts) dengan field wajib: `id`, `name`, `category`, `description`, `price` (angka), `image`, `available`, dan `label` opsional (termasuk flag/penanda menu unggulan).
- **Acceptance Criteria:**
  - Harga disimpan sebagai tipe `number` dan diformat ke Rupiah saat render.
  - Minimal terdapat item dengan status `available: false` untuk menguji validasi cart.

---

## Phase 3: UI & Page Sections

### `TASK-006` — Fondasi HTML, SEO Metadata, & Design Tokens
- **Status:** `DONE`
- **Tujuan:** Membangun kerangka `index.html` yang semantic, accessible, dan siap SEO dasar.
- **Deskripsi:** Menyiapkan struktur HTML5, Google Fonts (`Playfair Display` & `DM Sans`), palet warna (`Espresso`, `Warm Cream`, `Terracotta`, `Sage Green`, `Pure White`), favicon, meta description, Open Graph, serta dukungan `prefers-reduced-motion`.
- **Acceptance Criteria:**
  - Struktur heading berurutan (`h1` tunggal di Hero).
  - Kontras warna memenuhi standar keterbacaan.

### `TASK-007` — Implementasi Navbar & Mobile Navigation
- **Status:** `DONE`
- **Tujuan:** Menyediakan navigasi yang nyaman pada desktop dan mobile.
- **Deskripsi:** Sticky navbar dengan wordmark Maison Kitchen, link section, tombol Cart dengan badge jumlah item, CTA "Order Now", serta hamburger menu mobile yang dapat diakses keyboard dan pointer.
- **Acceptance Criteria:**
  - Smooth scrolling berfungsi dengan offset yang tepat agar heading tidak tertutup navbar.
  - Mobile menu dapat dibuka/tutup dengan tombol Escape, klik, maupun keyboard Tab.

### `TASK-008` — Implementasi Hero Section
- **Status:** `DONE`
- **Tujuan:** Memberikan kesan pertama editorial yang kuat dan jelas.
- **Deskripsi:** Headline *"A Taste Worth Remembering."*, supporting text, CTA utama (*Explore Our Menu*), CTA sekunder (*Order via WhatsApp*), dan foto makanan berkualitas tinggi.
- **Acceptance Criteria:**
  - Headline dan CTA mudah ditemukan di mobile (375px) maupun desktop (1440px).
  - Tidak menggunakan carousel yang tidak diperlukan.

### `TASK-009` — Implementasi Featured Menu & Full Menu + Category Filter
- **Status:** `DONE`
- **Tujuan:** Menampilkan menu unggulan dan katalog menu lengkap yang mudah dijelajahi.
- **Deskripsi:** Render 3–4 menu unggulan dari `menu-data.js`, tab filter kategori (*All Menu*, *Appetizers*, *Main Course*, *Beverages*, *Desserts*) tanpa reload, empty state jika filter kosong, dan tombol *Add to Cart* (dinonaktifkan untuk item unavailable).
- **Acceptance Criteria:**
  - Data Featured Menu dan Full Menu sinkron dari sumber yang sama.
  - Perubahan kategori berlangsung mulus tanpa page reload.

### `TASK-010` — Implementasi About Us, Special Promotion, Location & Hours, dan Footer
- **Status:** `DONE`
- **Tujuan:** Melengkapi narasi brand, penawaran demo, informasi lokasi, dan penutup halaman.
- **Deskripsi:** Section editorial About Us (*"More Than Just a Meal."*), Special Promotion (diberi label demo tanpa countdown palsu), Location & Opening Hours (placeholder jelas), dan Footer yang terhubung dengan `config.js`.
- **Acceptance Criteria:**
  - Tidak ada Lorem Ipsum, klaim sertifikasi palsu, atau kontak nyata yang tidak terverifikasi.
  - Layout bervariasi antar-section (tidak monoton card grid semua).

---

## Phase 4: Ordering System

### `TASK-011` — Implementasi Shopping Cart (`src/js/cart.js` & Cart Drawer UI)
- **Status:** `DONE`
- **Tujuan:** Memungkinkan pengunjung mengelola pesanan sebelum dikirim ke WhatsApp.
- **Deskripsi:** Panel/drawer cart responsif dengan fitur: Add to Cart (menggabungkan item yang sama), tambah/kurang kuantitas (minimum 1), hapus item, hitung subtotal per item dan total keseluruhan, empty cart state, serta feedback visual (toast/inline).
- **Acceptance Criteria:**
  - Item unavailable tidak dapat masuk ke cart.
  - Tombol checkout dinonaktifkan/disembunyikan saat cart kosong.

### `TASK-012` — Integrasi WhatsApp Click to Chat (`src/js/whatsapp.js`)
- **Status:** `DONE`
- **Tujuan:** Menghasilkan ringkasan pesanan dinamis ke WhatsApp.
- **Deskripsi:** Membentuk teks pesanan terstruktur berisi nama brand, daftar item (nama, qty, harga satuan, subtotal), dan total subtotal, lalu meng-encode ke URL `https://wa.me/PHONE?text=...`.
- **Acceptance Criteria:**
  - Nomor WhatsApp diambil dari `config.js`.
  - Jika nomor masih placeholder, sistem menangani dengan aman tanpa mengarahkan ke nomor pihak ketiga acak.

---

## Phase 5: Testing, Review & Deployment

### `TASK-013` — Pengujian Fungsional, Responsivitas, & Aksesibilitas
- **Status:** `DONE`
- **Tujuan:** Memverifikasi seluruh fitur dan tampilan sebelum dianggap selesai.
- **Deskripsi:** Menguji pada viewport 375px (mobile), 768px (tablet), dan 1440px (desktop); mengecek console error, broken image/link, keyboard navigation, filter, perhitungan cart, dan format pesan WhatsApp.
- **Acceptance Criteria:**
  - Seluruh checklist pada `PROJECT_BRIEF.md` Section 15 terpenuhi dan dibuktikan.

### `TASK-014` — Final Review & Deployment ke GitHub Pages
- **Status:** `TODO`
- **Tujuan:** Mempublikasikan website demo ke GitHub Pages setelah mendapatkan persetujuan pengguna.
- **Deskripsi:** Verifikasi final path aset, commit ke branch yang sesuai, dan deployment GitHub Pages (Project Site).
- **Acceptance Criteria:**
  - Mendapat persetujuan eksplisit pengguna sebelum deployment.
  - URL production berhasil diakses dan diverifikasi tanpa error.
