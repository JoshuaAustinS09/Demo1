# AGENTS.md — Project-Level Instructions (Demo1 / Maison Kitchen)

Dokumen ini berisi instruksi khusus untuk AI coding agent yang bekerja pada workspace proyek **Demo1** (`Maison Kitchen — Restaurant & Cafe Website Demo`).

---

## 1. Integrasi dengan Global AI-Memory

- Sumber instruksi global berada di repositori Central AI-Memory: `E:\Coding\Freelance\AI-Memory\AI-MEMORY.md`.
- Sebelum memulai pekerjaan teknis substansial, pastikan telah membaca instruksi inti pada Central AI-Memory (`AI-MEMORY.md`, `GLOBAL_INSTRUCTIONS.md`, `DEVELOPMENT_STANDARDS.md`, dan `WORKFLOW_PREFERENCES.md`).
- **Jangan menyalin** isi Personal Memory ke dalam direktori proyek ini.
- Terapkan hierarki prioritas instruksi: Aturan Sistem/Platform → Global Personal Memory → Instruksi Proyek yang Disetujui (`PROJECT_BRIEF.md`, `DECISIONS.md`) → Instruksi Task Aktif (`TASKS.md`).

---

## 2. Dokumen Wajib Proyek

Sebelum menulis atau mengubah kode di proyek ini, periksa dokumen berikut:

1. `PROJECT_BRIEF.md` — Sumber kebenaran utama untuk requirement bisnis, desain, konten, dan batasan teknis.
2. `ARCHITECTURE.md` — Rancangan struktur folder, modul JavaScript, dan alur data.
3. `TASKS.md` — Daftar pekerjaan dan status progres terkini.
4. `DECISIONS.md` — Keputusan teknis yang sudah disepakati dan keputusan terbuka yang memerlukan konfirmasi.
5. `SESSION_HANDOFF.md` *(jika tersedia)* — Status terakhir jika pekerjaan dilanjutkan dari sesi sebelumnya.

---

## 3. Aturan Khusus Proyek Maison Kitchen

1. **Pertahankan Tech Stack yang Disetujui:**
   - Gunakan **HTML5, Tailwind CSS, Vanilla JavaScript, Lucide Icons, dan Google Fonts**.
   - **Dilarang** memigrasi proyek ke framework besar (seperti React, Vue, Next.js) atau menambahkan backend/database tanpa persetujuan eksplisit pengguna.

2. **Kompatibilitas Static Hosting (GitHub Pages):**
   - Seluruh aplikasi harus berjalan 100% di sisi klien (*client-side static site*).
   - Gunakan *relative path* untuk pemuatan CSS, JS, dan gambar agar kompatibel dengan GitHub Pages Project Site (`https://USERNAME.github.io/REPOSITORY-NAME/`).

3. **Integritas Brand Fiktif & Placeholder:**
   - **Maison Kitchen** adalah brand fiktif untuk demo portofolio **Siteworthy**.
   - Jangan mengarang testimoni nyata, sertifikasi (misal halal/organik), alamat asli, akun media sosial aktif, atau nomor telepon pihak nyata.
   - Tandai seluruh data kontak dan lokasi demonstrasi secara jelas di file konfigurasi (`config.js`).

4. **Single Source of Truth:**
   - Pisahkan data menu (`menu-data.js`) dan konfigurasi bisnis (`config.js`) dari kode rendering UI.
   - Featured Menu dan Full Menu harus mengambil data dari sumber yang sama.

5. **Standar Visual & Anti-AI Slop:**
   - Ikuti konsep **Warm & Elegant Editorial Design** beserta palet warna dan tipografi pada `PROJECT_BRIEF.md`.
   - Hindari gradient berlebihan, glassmorphism tanpa fungsi, emoji sebagai pengganti ikon, serta Lorem Ipsum pada hasil akhir.

6. **Bahasa:**
   - Komunikasi dan dokumentasi teknis dengan pengguna menggunakan **Bahasa Indonesia**.
   - Teks antarmuka (UI copy) website **Maison Kitchen** menggunakan **Bahasa Inggris** sesuai `PROJECT_BRIEF.md` Section 11, dengan format harga Rupiah (`Rp`).

---

## 4. Aturan Otonomi & Persetujuan

- Ikuti aturan **Balanced Autonomy** dari `GLOBAL_INSTRUCTIONS.md`.
- Perubahan besar pada arsitektur, tech stack, penghapusan file, atau deployment ke production **wajib meminta persetujuan eksplisit** pengguna terlebih dahulu.
- Jangan menganggap diamnya pengguna sebagai persetujuan.
- Selalu laporkan hasil pengujian secara jujur berdasarkan fakta yang benar-benar diverifikasi (*evidence-based*).
