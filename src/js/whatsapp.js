import { SITE_CONFIG, formatRupiah } from "./config.js";

/**
 * Membentuk pesan ringkasan pesanan dinamis untuk WhatsApp Click to Chat.
 * @param {Array<{id: string, name: string, price: number, quantity: number}>} cartItems
 * @param {number} totalSubtotal
 * @returns {string}
 */
export function buildWhatsAppOrderMessage(cartItems, totalSubtotal) {
  const lines = [
    `Halo ${SITE_CONFIG.brand.name}!`,
    "",
    "Saya ingin melakukan pemesanan:",
    "",
  ];

  cartItems.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    lines.push(
      `${index + 1}. ${item.name} — Qty: ${item.quantity}, Harga: ${formatRupiah(
        item.price
      )}, Subtotal: ${formatRupiah(itemSubtotal)}`
    );
  });

  lines.push("");
  lines.push(`Total Subtotal: ${formatRupiah(totalSubtotal)}`);
  lines.push("");
  lines.push("Mohon informasi lebih lanjut mengenai pesanan saya. Terima kasih!");

  return lines.join("\n");
}

/**
 * Menghasilkan URL WhatsApp Click to Chat jika nomor valid sudah dikonfigurasi.
 * Mengembalikan null apabila nomor masih berupa placeholder demonstrasi.
 * @param {Array<{id: string, name: string, price: number, quantity: number}>} cartItems
 * @param {number} totalSubtotal
 * @returns {{url: string | null, message: string, isPlaceholder: boolean}}
 */
export function buildWhatsAppCheckout(cartItems, totalSubtotal) {
  const message = buildWhatsAppOrderMessage(cartItems, totalSubtotal);
  const rawNumber = String(SITE_CONFIG.contact.whatsappNumber || "").replace(
    /\D/g,
    ""
  );
  const isPlaceholder =
    SITE_CONFIG.contact.isWhatsappPlaceholder || rawNumber.length < 8;

  if (isPlaceholder) {
    return { url: null, message, isPlaceholder: true };
  }

  const url = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  return { url, message, isPlaceholder: false };
}
