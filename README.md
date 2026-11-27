# Maison Kitchen — Restaurant & Cafe Website Demo

Demo website restoran dan kafe satu halaman (*Single Page Website*) yang dibangun sebagai portofolio **Siteworthy** untuk menjangkau calon klien UMKM kuliner di Semarang, Indonesia.

> [!NOTE]
> **Status Proyek:** Initial Development  
> Saat ini baru tersedia dokumentasi proyek. Implementasi kode aplikasi belum dimulai dan menunggu persetujuan rencana teknis.

---

## Tujuan Aplikasi

1. Memperkenalkan identitas dan karakter brand demo **Maison Kitchen** dengan pendekatan *Warm & Elegant Editorial Design*.
2. Menampilkan menu makanan dan minuman secara terstruktur dengan fitur filter kategori tanpa reload halaman.
3. Memudahkan pengunjung melihat harga (format IDR/Rupiah) dan menambahkan item ke *shopping cart*.
4. Menyediakan alur pemesanan praktis melalui **Shopping Cart + WhatsApp Click to Chat** tanpa memerlukan sistem backend atau database.
5. Menjadi contoh nyata bagi pemilik kafe, restoran, dan UMKM kuliner mengenai website bisnis yang modern, responsif, dan siap pakai.

---

## Teknologi Utama

Berdasarkan [PROJECT_BRIEF.md](PROJECT_BRIEF.md):

- **Struktur:** HTML5 (Semantic HTML)
- **Styling:** Tailwind CSS (Tailwind CLI Build → CSS statis)
- **Interaktivitas:** Vanilla JavaScript (ES Modules / modular scripts)
- **Ikon:** Lucide Icons
- **Tipografi:** Google Fonts (`Playfair Display` untuk heading, `DM Sans` untuk body & UI)
- **Pemesanan:** WhatsApp Click to Chat (`https://wa.me/...`)
- **Lokasi:** Google Maps link / embed
- **Hosting:** GitHub Pages (Static Website — Project Site)

---

## Struktur Folder yang Direncanakan

Struktur berikut merupakan rencana awal yang merujuk pada `PROJECT_BRIEF.md` dan dapat disesuaikan setelah tahap perencanaan disetujui:

```text
Demo1/
├── index.html
├── assets/
│   ├── images/
│   └── icons/
├── src/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── config.js        # Konfigurasi bisnis & placeholder kontak
│       ├── menu-data.js     # Sumber data menu terpusat
│       ├── cart.js          # Logika & state shopping cart
│       ├── whatsapp.js      # Generator pesan & URL WhatsApp Click to Chat
│       └── main.js          # Inisialisasi UI, filter kategori, navigasi
├── PROJECT_BRIEF.md         # Dokumen spesifikasi lengkap proyek
├── ARCHITECTURE.md          # Rancangan arsitektur teknis
├── TASKS.md                 # Daftar & status pengerjaan task
├── DECISIONS.md             # Catatan keputusan teknis & arsitektur
├── AGENTS.md                # Instruksi kerja AI coding agent khusus proyek
└── README.md                # Dokumentasi utama proyek
```

---

## Cara Menjalankan Secara Lokal

1. Install dependency development (cukup sekali):
   ```bash
   npm install
   ```
2. Build CSS statis (atau jalankan mode watch saat mengembangkan):
   ```bash
   npm run build
   # atau: npm run dev
   ```
3. Jalankan folder proyek melalui local HTTP server (karena JS menggunakan ES Modules), misalnya dengan Live Server di IDE atau:
   ```bash
   npx serve .
   ```

---

## Deployment

Website dirancang untuk di-deploy sebagai **GitHub Pages (Project Site)** dengan format URL rencana:

`https://USERNAME.github.io/REPOSITORY-NAME/`

> [!IMPORTANT]
> Sebelum deployment final:
> - Konfirmasi `USERNAME` dan `REPOSITORY-NAME` GitHub.
> - Pastikan seluruh path aset menggunakan *relative path* agar tidak rusak pada Project Site.
> - Tidak ada API key, credential, atau data sensitif di dalam repository.

---

## Dokumentasi Proyek

- [PROJECT_BRIEF.md](PROJECT_BRIEF.md) — Spesifikasi bisnis, desain, konten, dan kebutuhan fungsional lengkap.
- [ARCHITECTURE.md](ARCHITECTURE.md) — Desain arsitektur modul, alur data, dan standar teknis.
- [TASKS.md](TASKS.md) — Daftar task bertahap dan status progres.
- [DECISIONS.md](DECISIONS.md) — Catatan keputusan teknis beserta pertimbangannya.
- [AGENTS.md](AGENTS.md) — Panduan operasional AI coding agent untuk proyek ini.
