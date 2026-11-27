import { SITE_CONFIG, formatRupiah } from "./config.js";
import { MENU_CATEGORIES, MENU_ITEMS } from "./menu-data.js";
import {
  addItemToCart,
  decreaseItemQuantity,
  getCartItems,
  getCartSubtotal,
  getTotalQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from "./cart.js";
import { buildWhatsAppCheckout } from "./whatsapp.js";

let activeCategory = "All Menu";
let lastFocusedBeforeCart = null;

/**
 * Menginisialisasi ikon Lucide jika library sudah dimuat.
 */
function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

/**
 * Mengelola buka/tutup menu navigasi mobile beserta aksesibilitas keyboard.
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("mobile-menu-icon-open");
  const iconClose = document.getElementById("mobile-menu-icon-close");
  const mobileLinks = document.querySelectorAll("[data-mobile-nav-link]");

  if (!toggleBtn || !mobileMenu) return;

  function setMenuState(isOpen) {
    mobileMenu.classList.toggle("hidden", !isOpen);
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", isOpen);
      iconClose.classList.toggle("hidden", !isOpen);
    }
  }

  toggleBtn.addEventListener("click", () => {
    const isCurrentlyOpen = toggleBtn.getAttribute("aria-expanded") === "true";
    setMenuState(!isCurrentlyOpen);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggleBtn.getAttribute("aria-expanded") === "true"
    ) {
      setMenuState(false);
      toggleBtn.focus();
    }
  });
}

/**
 * Menandai link navigasi desktop yang aktif sesuai section yang sedang terlihat.
 */
function initActiveNavObserver() {
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = document.querySelectorAll("main section[id]");

  if (!navLinks.length || !sections.length || !("IntersectionObserver" in window)) {
    return;
  }

  function setActiveLink(activeId) {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("text-terracotta", isMatch);
      link.classList.toggle("font-semibold", isMatch);
      link.classList.toggle("text-espresso/80", !isMatch);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Menangani tombol sekunder WhatsApp di Hero section.
 */
function initHeroActions() {
  const heroWhatsappBtn = document.getElementById("hero-whatsapp-btn");
  if (!heroWhatsappBtn) return;

  heroWhatsappBtn.addEventListener("click", () => {
    const menuSection = document.getElementById("menu");
    if (
      !SITE_CONFIG.contact.isWhatsappPlaceholder &&
      SITE_CONFIG.contact.whatsappNumber
    ) {
      const text = encodeURIComponent(
        `Halo ${SITE_CONFIG.brand.name}! Saya ingin bertanya mengenai menu dan melakukan pemesanan.`
      );
      window.open(
        `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${text}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/**
 * Membuat elemen card menu (dipakai bersama oleh Featured Menu dan Full Menu).
 * @param {object} item
 * @returns {HTMLElement}
 */
function createMenuCard(item) {
  const card = document.createElement("article");
  card.className =
    "flex h-full flex-col overflow-hidden rounded-lg border border-espresso/10 bg-white transition-shadow hover:shadow-md";

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "relative overflow-hidden bg-cream";

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  img.loading = "lazy";
  img.className = "aspect-[4/3] w-full object-cover";
  imageWrapper.appendChild(img);

  if (item.label && item.available) {
    const badge = document.createElement("span");
    badge.className =
      "absolute top-3 left-3 rounded-full bg-sage px-2.5 py-0.5 text-xs font-medium text-white";
    badge.textContent = item.label;
    imageWrapper.appendChild(badge);
  }

  if (!item.available) {
    const unavailableBadge = document.createElement("span");
    unavailableBadge.className =
      "absolute top-3 left-3 rounded-full bg-espresso/85 px-2.5 py-0.5 text-xs font-medium text-cream";
    unavailableBadge.textContent = "Unavailable";
    imageWrapper.appendChild(unavailableBadge);
  }

  const body = document.createElement("div");
  body.className = "flex flex-1 flex-col p-5";

  const title = document.createElement("h3");
  title.className = "font-sans text-lg font-semibold text-espresso";
  title.textContent = item.name;

  const description = document.createElement("p");
  description.className = "mt-1.5 flex-1 text-sm leading-relaxed text-espresso/75";
  description.textContent = item.description;

  const footer = document.createElement("div");
  footer.className = "mt-5 flex items-center justify-between gap-3 border-t border-espresso/10 pt-4";

  const price = document.createElement("span");
  price.className = "font-sans text-base font-semibold text-espresso";
  price.textContent = formatRupiah(item.price);

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.dataset.addToCart = item.id;
  addButton.disabled = !item.available;

  if (item.available) {
    addButton.className =
      "inline-flex items-center gap-1.5 rounded-md bg-terracotta px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-terracotta/90 sm:text-sm";
    addButton.innerHTML = `<i data-lucide="plus" class="h-3.5 w-3.5"></i><span>Add to Cart</span>`;
  } else {
    addButton.className =
      "inline-flex cursor-not-allowed items-center rounded-md border border-espresso/15 bg-cream px-3.5 py-2 text-xs font-medium text-espresso/50 sm:text-sm";
    addButton.textContent = "Unavailable";
  }

  footer.append(price, addButton);
  body.append(title, description, footer);
  card.append(imageWrapper, body);

  return card;
}

/**
 * Merender 3-4 menu unggulan dari sumber data yang sama.
 */
function renderFeaturedMenu() {
  const container = document.getElementById("featured-menu-grid");
  if (!container) return;

  const featuredItems = MENU_ITEMS.filter((item) => item.featured);
  container.replaceChildren(...featuredItems.map((item) => createMenuCard(item)));
}

/**
 * Merender tab filter kategori dan grid Full Menu.
 */
function renderCategoryTabs() {
  const tabsContainer = document.getElementById("menu-filter-tabs");
  if (!tabsContainer) return;

  const buttons = MENU_CATEGORIES.map((category) => {
    const isActive = category === activeCategory;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.role = "tab";
    btn.setAttribute("aria-selected", String(isActive));
    btn.textContent = category;
    btn.className = isActive
      ? "rounded-md bg-espresso px-4 py-2 text-sm font-medium text-cream transition-colors"
      : "rounded-md border border-espresso/15 bg-cream/60 px-4 py-2 text-sm font-medium text-espresso transition-colors hover:border-espresso/30 hover:bg-cream";

    btn.addEventListener("click", () => {
      activeCategory = category;
      renderCategoryTabs();
      renderFullMenu();
      initIcons();
    });

    return btn;
  });

  tabsContainer.replaceChildren(...buttons);
}

/**
 * Merender daftar menu sesuai kategori yang aktif tanpa reload halaman.
 */
function renderFullMenu() {
  const grid = document.getElementById("full-menu-grid");
  const emptyState = document.getElementById("menu-empty-state");
  if (!grid || !emptyState) return;

  const filtered =
    activeCategory === "All Menu"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  if (filtered.length === 0) {
    grid.replaceChildren();
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  grid.replaceChildren(...filtered.map((item) => createMenuCard(item)));
}

/**
 * Mengisi informasi Special Promotion, Location & Opening Hours, dan Footer dari SITE_CONFIG.
 */
function renderBusinessInfo() {
  const { brand, contact, location, promotion } = SITE_CONFIG;

  // Special Promotion
  const promoBadge = document.getElementById("promo-badge");
  const promoTitle = document.getElementById("promotion-heading");
  const promoDesc = document.getElementById("promo-description");
  const promoNote = document.getElementById("promo-note");
  const promoImg = document.getElementById("promo-image");

  if (promoBadge) promoBadge.textContent = promotion.badge;
  if (promoTitle) promoTitle.textContent = promotion.title;
  if (promoDesc) promoDesc.textContent = promotion.description;
  if (promoNote) promoNote.textContent = promotion.note;
  if (promoImg) {
    promoImg.src = promotion.image;
    promoImg.alt = promotion.imageAlt;
  }

  // Location & Opening Hours
  const locationAddress = document.getElementById("location-address");
  const locationWhatsapp = document.getElementById("location-whatsapp");
  const mapsWrapper = document.getElementById("location-maps-wrapper");
  const hoursList = document.getElementById("opening-hours-list");

  if (locationAddress) locationAddress.textContent = location.address;
  if (locationWhatsapp) {
    if (!contact.isWhatsappPlaceholder && contact.whatsappNumber) {
      locationWhatsapp.innerHTML = `<a href="https://wa.me/${contact.whatsappNumber}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-espresso hover:text-terracotta transition-colors"><i data-lucide="message-circle" class="h-4 w-4 text-sage"></i><span>${contact.whatsappDisplay}</span></a>`;
    } else {
      locationWhatsapp.textContent = contact.whatsappDisplay;
    }
  }

  if (mapsWrapper) {
    if (!location.isLocationPlaceholder && location.googleMapsUrl) {
      mapsWrapper.innerHTML = `<a href="${location.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:underline"><i data-lucide="external-link" class="h-4 w-4"></i><span>Open in Google Maps</span></a>`;
    } else {
      mapsWrapper.innerHTML = `<span class="inline-flex items-center gap-1.5 text-xs text-espresso/60"><i data-lucide="info" class="h-3.5 w-3.5"></i><span>Google Maps link will appear once a verified location is configured.</span></span>`;
    }
  }

  if (hoursList) {
    hoursList.replaceChildren(
      ...location.openingHours.map((entry) => {
        const row = document.createElement("div");
        row.className = "flex items-center justify-between gap-4 border-b border-espresso/10 pb-2 last:border-b-0 last:pb-0";

        const dt = document.createElement("dt");
        dt.className = "font-medium text-espresso";
        dt.textContent = entry.days;

        const dd = document.createElement("dd");
        dd.className = "text-espresso/75";
        dd.textContent = entry.hours;

        row.append(dt, dd);
        return row;
      })
    );
  }

  // Footer
  const footerBrandName = document.getElementById("footer-brand-name");
  const footerBrandDesc = document.getElementById("footer-brand-desc");
  const footerContactList = document.getElementById("footer-contact-list");
  const footerAddress = document.getElementById("footer-address");
  const footerHours = document.getElementById("footer-hours");
  const footerDemoBadge = document.getElementById("footer-demo-badge");

  if (footerBrandName) footerBrandName.textContent = brand.name;
  if (footerBrandDesc) footerBrandDesc.textContent = brand.shortDescription;
  if (footerAddress) footerAddress.textContent = location.address;
  if (footerDemoBadge) footerDemoBadge.textContent = brand.demoBadge;

  if (footerHours) {
    footerHours.replaceChildren(
      ...location.openingHours.map((entry) => {
        const p = document.createElement("p");
        p.textContent = `${entry.days}: ${entry.hours}`;
        return p;
      })
    );
  }

  if (footerContactList) {
    const items = [];

    const waLi = document.createElement("li");
    if (!contact.isWhatsappPlaceholder && contact.whatsappNumber) {
      waLi.innerHTML = `<a href="https://wa.me/${contact.whatsappNumber}" target="_blank" rel="noopener noreferrer" class="hover:text-terracotta transition-colors">WhatsApp: ${contact.whatsappDisplay}</a>`;
    } else {
      waLi.textContent = `WhatsApp: ${contact.whatsappDisplay}`;
    }
    items.push(waLi);

    const igLi = document.createElement("li");
    if (!contact.isInstagramPlaceholder && contact.instagramUrl) {
      igLi.innerHTML = `<a href="${contact.instagramUrl}" target="_blank" rel="noopener noreferrer" class="hover:text-terracotta transition-colors">Instagram: ${contact.instagramHandle}</a>`;
    } else {
      igLi.textContent = `Instagram: ${contact.instagramHandle} (Demo)`;
    }
    items.push(igLi);

    footerContactList.replaceChildren(...items);
  }
}

/**
 * Menampilkan notifikasi toast ringan untuk feedback aksi pengguna.
 * @param {string} message
 */
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className =
    "rounded-md bg-espresso px-4 py-2.5 text-sm font-medium text-cream shadow-lg transition-opacity duration-200";
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.remove(), 220);
  }, 2200);
}

/**
 * Memperbarui tampilan badge, daftar item, subtotal, dan status checkout di Cart Drawer.
 */
function renderCart() {
  const items = getCartItems();
  const totalQty = getTotalQuantity();
  const subtotal = getCartSubtotal();

  const desktopBadge = document.getElementById("cart-count-badge");
  const mobileBadge = document.getElementById("mobile-cart-count-badge");
  const subtitle = document.getElementById("cart-drawer-subtitle");
  const emptyState = document.getElementById("cart-empty-state");
  const listEl = document.getElementById("cart-items-list");
  const totalEl = document.getElementById("cart-total-price");
  const checkoutBtn = document.getElementById("cart-checkout-btn");
  const demoNotice = document.getElementById("cart-demo-notice");

  if (desktopBadge) desktopBadge.textContent = String(totalQty);
  if (mobileBadge) mobileBadge.textContent = String(totalQty);
  if (subtitle) {
    subtitle.textContent = `${totalQty} ${totalQty === 1 ? "item" : "items"} selected`;
  }
  if (totalEl) totalEl.textContent = formatRupiah(subtotal);

  if (!emptyState || !listEl || !checkoutBtn) return;

  if (items.length === 0) {
    emptyState.classList.remove("hidden");
    listEl.classList.add("hidden");
    listEl.replaceChildren();
    checkoutBtn.disabled = true;
    checkoutBtn.setAttribute("aria-disabled", "true");
    if (demoNotice) demoNotice.classList.add("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  listEl.classList.remove("hidden");
  checkoutBtn.disabled = false;
  checkoutBtn.setAttribute("aria-disabled", "false");

  const rows = items.map((item) => {
    const li = document.createElement("li");
    li.className = "rounded-lg border border-espresso/10 bg-white p-4";

    const topRow = document.createElement("div");
    topRow.className = "flex items-start justify-between gap-3";

    const info = document.createElement("div");
    const nameEl = document.createElement("p");
    nameEl.className = "font-sans text-sm font-semibold text-espresso";
    nameEl.textContent = item.name;

    const unitPriceEl = document.createElement("p");
    unitPriceEl.className = "mt-0.5 text-xs text-espresso/65";
    unitPriceEl.textContent = `${formatRupiah(item.price)} each`;

    info.append(nameEl, unitPriceEl);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.ariaLabel = `Remove ${item.name} from cart`;
    removeBtn.className =
      "rounded p-1 text-espresso/50 transition-colors hover:bg-cream hover:text-espresso";
    removeBtn.innerHTML = `<i data-lucide="trash-2" class="h-4 w-4"></i>`;
    removeBtn.addEventListener("click", () => {
      removeItemFromCart(item.id);
      renderCart();
      initIcons();
      showToast(`${item.name} removed from cart.`);
    });

    topRow.append(info, removeBtn);

    const bottomRow = document.createElement("div");
    bottomRow.className = "mt-3 flex items-center justify-between gap-3";

    const qtyControls = document.createElement("div");
    qtyControls.className =
      "inline-flex items-center rounded-md border border-espresso/15 bg-cream/50";

    const decBtn = document.createElement("button");
    decBtn.type = "button";
    decBtn.ariaLabel = `Decrease quantity of ${item.name}`;
    decBtn.disabled = item.quantity <= 1;
    decBtn.className =
      "px-2.5 py-1 text-sm font-medium text-espresso transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40";
    decBtn.textContent = "−";
    decBtn.addEventListener("click", () => {
      decreaseItemQuantity(item.id);
      renderCart();
      initIcons();
    });

    const qtyValue = document.createElement("span");
    qtyValue.className = "min-w-8 text-center text-sm font-medium text-espresso";
    qtyValue.textContent = String(item.quantity);

    const incBtn = document.createElement("button");
    incBtn.type = "button";
    incBtn.ariaLabel = `Increase quantity of ${item.name}`;
    incBtn.className =
      "px-2.5 py-1 text-sm font-medium text-espresso transition-colors hover:bg-cream";
    incBtn.textContent = "+";
    incBtn.addEventListener("click", () => {
      increaseItemQuantity(item.id);
      renderCart();
      initIcons();
    });

    qtyControls.append(decBtn, qtyValue, incBtn);

    const itemSubtotalEl = document.createElement("span");
    itemSubtotalEl.className = "text-sm font-semibold text-espresso";
    itemSubtotalEl.textContent = formatRupiah(item.price * item.quantity);

    bottomRow.append(qtyControls, itemSubtotalEl);
    li.append(topRow, bottomRow);
    return li;
  });

  listEl.replaceChildren(...rows);
}

/**
 * Mengelola buka/tutup Cart Drawer, Add to Cart, dan Checkout via WhatsApp.
 */
function initCartSystem() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  const openBtn = document.getElementById("cart-open-btn");
  const mobileOpenBtn = document.getElementById("mobile-cart-open-btn");
  const closeBtn = document.getElementById("cart-close-btn");
  const browseBtn = document.getElementById("cart-browse-btn");
  const checkoutBtn = document.getElementById("cart-checkout-btn");
  const demoNotice = document.getElementById("cart-demo-notice");
  const demoPreview = document.getElementById("cart-demo-message-preview");

  if (!drawer || !backdrop) return;

  function openCart() {
    lastFocusedBeforeCart = document.activeElement;
    backdrop.classList.remove("hidden");
    drawer.classList.remove("translate-x-full");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
    if (closeBtn) closeBtn.focus();
  }

  function closeCart() {
    drawer.classList.add("translate-x-full");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    if (lastFocusedBeforeCart && typeof lastFocusedBeforeCart.focus === "function") {
      lastFocusedBeforeCart.focus();
    }
  }

  if (openBtn) openBtn.addEventListener("click", openCart);
  if (mobileOpenBtn) mobileOpenBtn.addEventListener("click", openCart);
  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (browseBtn) browseBtn.addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      drawer.getAttribute("aria-hidden") === "false"
    ) {
      closeCart();
    }
  });

  // Event delegation untuk tombol Add to Cart pada Featured Menu dan Full Menu
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-add-to-cart]");
    if (!btn) return;

    const itemId = btn.dataset.addToCart;
    const menuItem = MENU_ITEMS.find((entry) => entry.id === itemId);
    if (!menuItem) return;

    const result = addItemToCart(menuItem);
    if (!result.ok) {
      showToast(`${menuItem.name} is currently unavailable.`);
      return;
    }

    renderCart();
    initIcons();
    showToast(`${menuItem.name} added to cart.`);
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const items = getCartItems();
      if (items.length === 0) return;

      const subtotal = getCartSubtotal();
      const checkout = buildWhatsAppCheckout(items, subtotal);

      if (!checkout.isPlaceholder && checkout.url) {
        if (demoNotice) demoNotice.classList.add("hidden");
        window.open(checkout.url, "_blank", "noopener,noreferrer");
        return;
      }

      if (demoNotice && demoPreview) {
        demoPreview.textContent = checkout.message;
        demoNotice.classList.remove("hidden");
      }
      showToast("Demo mode: WhatsApp message preview generated.");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedMenu();
  renderCategoryTabs();
  renderFullMenu();
  renderBusinessInfo();
  renderCart();
  initIcons();
  initMobileNavigation();
  initActiveNavObserver();
  initHeroActions();
  initCartSystem();
});
