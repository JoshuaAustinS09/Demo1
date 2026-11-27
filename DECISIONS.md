# DECISIONS — Maison Kitchen Website Demo

Dokumen ini mencatat keputusan arsitektur dan teknis penting pada proyek **Maison Kitchen** beserta alasan dan trade-off-nya.

---

## Keputusan yang Sudah Disepakati (dari `PROJECT_BRIEF.md`)

### `DEC-001` — Pemilihan Tech Stack: HTML5 + Tailwind CSS + Vanilla JavaScript
- **Status:** `APPROVED`
- **Konteks:** Website ini adalah landing/single-page portfolio demo untuk restoran dan kafe UMKM.
- **Keputusan:** Menggunakan HTML5, Tailwind CSS, Vanilla JavaScript, dan Lucide Icons tanpa framework SPA seperti React atau Vue.
- **Alasan:**
  - Sesuai dengan kebutuhan static website sederhana.
  - Menghindari *overengineering*, ukuran bundle besar, dan kompleksitas build yang tidak diperlukan.
  - Mudah dipelihara dan diadaptasi untuk klien UMKM.
- **Trade-off:** Manipulasi DOM dilakukan secara manual dengan JS modular, sehingga perlu menjaga kerapian fungsi render agar tetap mudah dibaca.

---

### `DEC-002` — Sistem Pemesanan: Client-Side Shopping Cart + WhatsApp Click to Chat
- **Status:** `APPROVED`
- **Konteks:** Target klien UMKM membutuhkan alur pemesanan yang praktis tanpa biaya server atau maintenance backend.
- **Keputusan:** Menggunakan shopping cart berbasis memori/state di browser yang menghasilkan pesan terformat ke URL resmi WhatsApp (`https://wa.me/PHONE?text=...`).
- **Alasan:**
  - Gratis (tidak membutuhkan server, database, atau payment gateway).
  - Familiar bagi pemilik usaha kuliner dan pelanggan di Indonesia.
- **Batasan yang Diterima:** Tidak ada penyimpanan riwayat transaksi, tidak ada manajemen stok real-time, dan konfirmasi pesanan dilakukan manual oleh pelanggan/admin melalui WhatsApp.

---

### `DEC-003` — Hosting: GitHub Pages (Project Site) dengan Relative Asset Paths
- **Status:** `APPROVED`
- **Konteks:** Proyek membutuhkan hosting static website gratis dan stabil untuk demo portofolio.
- **Keputusan:** Menggunakan GitHub Pages dengan tipe Project Site (`https://USERNAME.github.io/REPOSITORY-NAME/`).
- **Konsekuensi Teknis:** Seluruh pemanggilan gambar, CSS, dan JS wajib menggunakan *relative path* (misalnya `./assets/images/...` atau `src/js/...`), bukan root-absolute path (`/assets/...`) yang berisiko gagal dimuat di sub-path repository.

---

### `DEC-004` — Pemisahan Data Menu dan Konfigurasi Bisnis dari UI
- **Status:** `APPROVED`
- **Konteks:** Demo ini akan digunakan Siteworthy sebagai acuan yang mudah diadaptasi untuk berbagai klien UMKM.
- **Keputusan:** Memisahkan informasi kontak/bisnis ke `src/js/config.js` dan daftar menu ke `src/js/menu-data.js`.
- **Alasan:** Perubahan harga, menu, atau nomor WhatsApp klien dapat dilakukan di satu tempat tanpa menyentuh struktur HTML/UI. Featured Menu dan Full Menu membaca sumber data yang sama untuk mencegah inkonsistensi.

---

### `DEC-005` — Bahasa Antarmuka Inggris dengan Format Mata Uang Rupiah (IDR)
- **Status:** `APPROVED`
- **Konteks:** Menjaga keselarasan visual editorial *Maison Kitchen* sekaligus relevansi pasar lokal Semarang.
- **Keputusan:** Copywriting UI menggunakan Bahasa Inggris natural, sedangkan harga disimpan sebagai angka dan ditampilkan dalam format Rupiah (`Rp`). Konten disusun agar mudah diadaptasi ke Bahasa Indonesia bila dibutuhkan klien.

---

## Keputusan Terbuka (Menunggu Konfirmasi Pengguna)

### `DEC-006` — Pendekatan Integrasi Tailwind CSS: Tailwind CLI Build
- **Status:** `APPROVED`
- **Konteks:** `PROJECT_BRIEF.md` Section 8 mengizinkan penggunaan Tailwind CSS melalui CDN atau pendekatan build CLI yang kompatibel dengan GitHub Pages.
- **Keputusan:** Menggunakan **Tailwind CLI Build** (compile CSS statis saat development/sebelum deploy).
- **Alasan & Konsekuensi:**
  - Ukuran CSS hasil akhir jauh lebih kecil (hanya class yang dipakai) dan optimal untuk performa mobile.
  - Tidak bergantung pada runtime script CDN eksternal saat website dibuka pengunjung.
  - Membutuhkan Node.js (`npm`) saat development dan menjalankan script build (`npm run build`) sebelum commit/deploy, lalu file CSS hasil compile ikut disajikan sebagai static asset di GitHub Pages.

---

### `DEC-007` — Nama Repository & Username GitHub untuk Konfigurasi Final
- **Status:** `APPROVED`
- **Keputusan:**
  - **Username GitHub:** `JoshuaAustinS09`
  - **Nama Repository:** `Demo1`
  - **URL Repository:** `https://github.com/JoshuaAustinS09/Demo1`
  - **URL GitHub Pages (Project Site):** `https://joshuaaustins09.github.io/Demo1/`
