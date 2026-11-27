# ARCHITECTURE — Maison Kitchen Website Demo

Dokumen ini menjelaskan rancangan arsitektur teknis untuk website **Maison Kitchen**, disusun secara proporsional sesuai skala aplikasi static single-page website.

---

## 1. Gambaran Umum Arsitektur

- **Tipe Aplikasi:** Static Single-Page Website (Client-Side Only)
- **Backend & Database:** Tidak ada (seluruh data demonstrasi disimpan sebagai konfigurasi/data lokal di sisi klien)
- **Target Hosting:** GitHub Pages (Project Site)

Pendekatan ini dipilih agar aplikasi ringan, bebas biaya server, mudah diadaptasi untuk klien UMKM, dan bebas dari kompleksitas yang tidak diperlukan.

---

## 2. Struktur Folder yang Direncanakan

```text
Demo1/
├── index.html
├── package.json             # Script build Tailwind CLI & devDependency
├── assets/
│   ├── images/              # Foto makanan, hero, dan suasana restoran
│   └── icons/               # Favicon & ikon statis jika diperlukan
├── src/
│   ├── css/
│   │   ├── input.css        # Source Tailwind CSS & custom utilities/tokens
│   │   └── styles.css       # Output CSS statis hasil compile Tailwind CLI
│   └── js/
│       ├── config.js        # Konfigurasi bisnis (kontak, alamat, jam buka)
│       ├── menu-data.js     # Katalog menu terpusat (Featured & Full Menu)
│       ├── cart.js          # Logika & state shopping cart
│       ├── whatsapp.js      # Pembuat format pesan & URL WhatsApp Click to Chat
│       └── main.js          # Render UI, filter kategori, navbar, event listeners
├── PROJECT_BRIEF.md
├── ARCHITECTURE.md
├── TASKS.md
├── DECISIONS.md
├── AGENTS.md
└── README.md
```

---

## 3. Pemisahan Tanggung Jawab Modul (Separation of Concerns)

### A. Data & Configuration Layer
1. **`src/js/config.js`**
   - Menyimpan identitas brand, tagline, deskripsi singkat, placeholder nomor WhatsApp (format internasional), alamat demo, jam operasional, link Google Maps, dan link Instagram.
   - Bertujuan agar seluruh informasi bisnis hanya perlu diubah di satu file.

2. **`src/js/menu-data.js`**
   - Menyimpan array objek menu sebagai *Single Source of Truth*.
   - Skema tiap item:
     - `id` (string unik)
     - `name` (string)
     - `category` (`"Appetizers"` | `"Main Course"` | `"Beverages"` | `"Desserts"`)
     - `description` (string)
     - `price` (number — tanpa format teks agar akurat dihitung)
     - `image` (relative path ke `assets/images/...`)
     - `available` (boolean)
     - `featured` (boolean)
     - `label` (string opsional, misal `"Bestseller"`, `"Recommended"`)

### B. Business Logic Layer
3. **`src/js/cart.js`**
   - Mengelola array state keranjang belanja (`id`, `name`, `price`, `quantity`).
   - Aturan validasi inti:
     - Menolak item dengan `available: false`.
     - Menggabungkan item dengan `id` yang sama (menambah `quantity`, bukan membuat baris duplikat).
     - Menjaga `quantity` minimal `1` (pengurangan di bawah 1 menghapus item atau dinonaktifkan sesuai kontrol UI).
     - Menghitung subtotal per item (`price * quantity`) dan total keseluruhan.

4. **`src/js/whatsapp.js`**
   - Menerima state cart dan `config.js`.
   - Menyusun teks pesanan dinamis (nama brand, daftar item, qty, harga satuan, subtotal item, dan total subtotal dalam format Rupiah).
   - Meng-encode pesan menggunakan `encodeURIComponent` ke format `https://wa.me/<PHONE>?text=<ENCODED_MESSAGE>`.
   - Menyediakan pengaman jika nomor WhatsApp masih berupa placeholder agar tidak mengarahkan ke nomor nyata yang salah.

### C. Presentation & Interaction Layer
5. **`index.html` & `src/css/styles.css`**
   - Menyusun 8 section berurutan: Navbar → Hero → Featured Menu → Full Menu → About Us → Special Promotion → Location & Opening Hours → Footer, ditambah Cart Drawer/Panel.
   - Menggunakan semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) dan `scroll-margin-top` agar heading section tidak tertutup sticky navbar.

6. **`src/js/main.js`**
   - Menginisialisasi konten dinamis dari `config.js` dan `menu-data.js`.
   - Menangani filter kategori menu secara instan tanpa reload halaman beserta *empty state*.
   - Mengelola buka/tutup mobile navigation menu dan cart drawer (termasuk aksesibilitas keyboard).
   - Menampilkan feedback visual ringan (toast/inline feedback) saat item ditambahkan atau diubah.
   - Menginisialisasi Lucide Icons.

---

## 4. Alur Data Pemesanan

```text
[menu-data.js] ──► Render Featured & Full Menu (main.js)
                         │
                         ▼ (Klik "Add to Cart" pada item available)
                     [cart.js] ──► Update State & Hitung Subtotal/Total
                         │
                         ▼ (Update Badge & Cart Drawer UI)
                         │
                         ▼ (Klik "Checkout via WhatsApp")
                   [whatsapp.js] + [config.js]
                         │
                         ▼
         Generate URL https://wa.me/PHONE?text=...
                         │
                         ▼
      Pelanggan meninjau & mengirim pesan secara manual di WhatsApp
```

---

## 5. Design Tokens & Visual Direction

Menggunakan konsep **Warm & Elegant Editorial Design** dari `PROJECT_BRIEF.md`:

- **Palet Warna:**
  - `Espresso` (`#29251F`): Heading, teks utama, navbar/footer
  - `Warm Cream` (`#F6F0E7`): Background utama
  - `Terracotta` (`#B86B45`): CTA utama & aksen penting
  - `Sage Green` (`#78816A`): Aksen sekunder & label
  - `Pure White` (`#FFFFFF`): Card & area konten tertentu
- **Tipografi:**
  - Heading: `Playfair Display` (dengan fallback serif)
  - Body & UI: `DM Sans` (dengan fallback sans-serif)

---

## 6. Kesiapan Deployment, Aksesibilitas, & Performa

- **Relative Pathing:** Seluruh aset menggunakan relative path agar berfungsi baik saat dibuka lokal maupun di GitHub Pages Project Site.
- **Responsive Targets:** Diuji pada minimum viewport `375px` (Mobile), `768px` (Tablet), dan `1440px` (Desktop) tanpa horizontal overflow.
- **Accessibility:** Keyboard navigation untuk menu mobile dan cart drawer, alt text deskriptif pada foto makanan, focus state jelas, dan dukungan `@media (prefers-reduced-motion: reduce)`.
- **Performance:** Lazy loading untuk gambar di luar viewport awal, ukuran gambar teroptimasi, dan tidak ada dependency JavaScript berat.
