/**
 * Konfigurasi Bisnis Maison Kitchen (Single Source of Truth)
 *
 * CATATAN DEMO:
 * Seluruh data kontak, alamat, jam operasional, dan promo di file ini
 * adalah PLACEHOLDER DEMONSTRASI untuk portofolio Siteworthy.
 * Ganti nilai-nilai di bawah ini saat diadaptasi untuk klien nyata.
 */

export const SITE_CONFIG = {
  brand: {
    name: "Maison Kitchen",
    tagline: "A Taste Worth Remembering.",
    shortDescription:
      "Good food, thoughtful ingredients, and memorable moments.",
    demoBadge: "Demo Portfolio by Siteworthy",
  },

  contact: {
    // Format internasional tanpa '+', spasi, atau tanda baca (contoh: 6281234567890)
    whatsappNumber: "",
    whatsappDisplay: "+62 800-0000-0000 (Demo Placeholder)",
    isWhatsappPlaceholder: true,

    instagramHandle: "@maisonkitchen.demo",
    instagramUrl: "",
    isInstagramPlaceholder: true,

    email: "hello@maisonkitchen-demo.example",
    isEmailPlaceholder: true,
  },

  location: {
    address: "Jl. Contoh Kuliner No. 12, Semarang, Jawa Tengah (Demo Address)",
    googleMapsUrl: "",
    isLocationPlaceholder: true,
    openingHours: [
      { days: "Monday – Friday", hours: "10.00 – 21.00 WIB" },
      { days: "Saturday – Sunday", hours: "09.00 – 22.00 WIB" },
    ],
  },

  currency: {
    locale: "id-ID",
    prefix: "Rp",
  },

  promotion: {
    isDemoOffer: true,
    badge: "Demo Promotion",
    title: "Weekday Lunch Pairing",
    description:
      "Enjoy any Main Course paired with an Iced Caramel Latte or Fresh Yuzu Sparkler at a curated bundle price during weekday lunch hours.",
    note: "Illustrative promotional content for demonstration purposes.",
    image: "./assets/images/lunch-promo.jfif",
    imageAlt: "Maison Kitchen weekday lunch pairing with pasta and iced coffee",
  },
};

/**
 * Memformat angka menjadi string mata uang Rupiah (contoh: 45000 -> "Rp45.000").
 * @param {number} amount
 * @returns {string}
 */
export function formatRupiah(amount) {
  const numericValue = Number(amount) || 0;
  return `${SITE_CONFIG.currency.prefix}${numericValue.toLocaleString(
    SITE_CONFIG.currency.locale
  )}`;
}
