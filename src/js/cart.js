/**
 * State Management Shopping Cart Maison Kitchen
 *
 * Aturan inti:
 * - Item yang tidak tersedia (available: false) tidak dapat ditambahkan.
 * - Item dengan ID yang sama digabungkan (menambah quantity, bukan baris duplikat).
 * - Kuantitas minimum adalah 1.
 */

const cartState = [];

/**
 * Mengembalikan salinan daftar item di dalam cart.
 * @returns {Array<{id: string, name: string, price: number, quantity: number}>}
 */
export function getCartItems() {
  return cartState.map((item) => ({ ...item }));
}

/**
 * Mengembalikan total seluruh kuantitas item di dalam cart.
 * @returns {number}
 */
export function getTotalQuantity() {
  return cartState.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Mengembalikan total subtotal harga seluruh item di dalam cart.
 * @returns {number}
 */
export function getCartSubtotal() {
  return cartState.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Menambahkan item menu ke dalam cart.
 * @param {object} menuItem
 * @returns {{ok: boolean, reason?: string}}
 */
export function addItemToCart(menuItem) {
  if (!menuItem || !menuItem.available) {
    return { ok: false, reason: "unavailable" };
  }

  const existing = cartState.find((entry) => entry.id === menuItem.id);
  if (existing) {
    existing.quantity += 1;
    return { ok: true };
  }

  cartState.push({
    id: menuItem.id,
    name: menuItem.name,
    price: Number(menuItem.price),
    quantity: 1,
  });

  return { ok: true };
}

/**
 * Menambah kuantitas item sebesar 1.
 * @param {string} id
 */
export function increaseItemQuantity(id) {
  const existing = cartState.find((entry) => entry.id === id);
  if (existing) {
    existing.quantity += 1;
  }
}

/**
 * Mengurangi kuantitas item sebesar 1 (minimum 1).
 * @param {string} id
 */
export function decreaseItemQuantity(id) {
  const existing = cartState.find((entry) => entry.id === id);
  if (existing && existing.quantity > 1) {
    existing.quantity -= 1;
  }
}

/**
 * Menghapus item dari cart berdasarkan ID.
 * @param {string} id
 */
export function removeItemFromCart(id) {
  const index = cartState.findIndex((entry) => entry.id === id);
  if (index !== -1) {
    cartState.splice(index, 1);
  }
}
