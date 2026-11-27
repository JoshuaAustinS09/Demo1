/**
 * Sumber Data Menu Terpusat Maison Kitchen (Single Source of Truth)
 *
 * Featured Menu dan Full Menu membaca data dari array MENU_ITEMS yang sama
 * untuk mencegah perbedaan nama, harga, atau ketersediaan.
 * Seluruh harga adalah data fiktif demonstrasi dalam satuan Rupiah (angka).
 */

export const MENU_CATEGORIES = [
  "All Menu",
  "Appetizers",
  "Main Course",
  "Beverages",
  "Desserts",
];

export const MENU_ITEMS = [
  // --- APPETIZERS ---
  {
    id: "app-bruschetta",
    name: "Garlic Herb Bruschetta",
    category: "Appetizers",
    description:
      "Toasted artisan sourdough topped with vine-ripened tomatoes, fresh basil, and roasted garlic olive oil.",
    price: 26000,
    image: "./assets/images/garlic-herb-bruschetta.jfif",
    available: true,
    featured: false,
    label: null,
  },
  {
    id: "app-truffle-fries",
    name: "Crispy Truffle Fries",
    category: "Appetizers",
    description:
      "Golden hand-cut fries tossed with aromatic truffle oil, aged parmesan, and chopped parsley.",
    price: 28000,
    image: "./assets/images/crispy-truffle-fries.jfif",
    available: true,
    featured: false,
    label: null,
  },
  {
    id: "app-pumpkin-soup",
    name: "Roasted Pumpkin Soup",
    category: "Appetizers",
    description:
      "Velvety slow-roasted pumpkin soup finished with toasted pepitas and warm garlic crostini.",
    price: 30000,
    image: "./assets/images/roasted-pumpkin-soup.jfif",
    available: true,
    featured: false,
    label: null,
  },

  // --- MAIN COURSE ---
  {
    id: "main-mushroom-pasta",
    name: "Creamy Mushroom Pasta",
    category: "Main Course",
    description:
      "Al dente fettuccine folded into a rich sauteed mushroom cream sauce with parmesan and thyme.",
    price: 45000,
    image: "./assets/images/creamy-mushroom-pasta.jfif",
    available: true,
    featured: true,
    label: "Bestseller",
  },
  {
    id: "main-beef-burger",
    name: "Classic Beef Burger",
    category: "Main Course",
    description:
      "Juicy seared beef patty with melted cheddar, caramelized onions, crisp lettuce, and house sauce on brioche.",
    price: 38000,
    image: "./assets/images/classic-beef-burger.jfif",
    available: true,
    featured: true,
    label: "Recommended",
  },
  {
    id: "main-herb-chicken",
    name: "Herb Grilled Chicken",
    category: "Main Course",
    description:
      "Tender pan-seared chicken breast glazed with rosemary butter, served alongside roasted baby potatoes.",
    price: 48000,
    image: "./assets/images/herb-grilled-chicken.jfif",
    available: true,
    featured: false,
    label: null,
  },

  // --- BEVERAGES ---
  {
    id: "bev-caramel-latte",
    name: "Iced Caramel Latte",
    category: "Beverages",
    description:
      "Smooth double espresso poured over cold fresh milk and house-made salted caramel drizzle.",
    price: 28000,
    image: "./assets/images/iced-caramel-latte.jfif",
    available: true,
    featured: true,
    label: "Favorite",
  },
  {
    id: "bev-matcha-latte",
    name: "Artisan Matcha Latte",
    category: "Beverages",
    description:
      "Whisked ceremonial-style matcha green tea layered with silky steamed or iced milk.",
    price: 30000,
    image: "./assets/images/artisan-matcha-latte.jfif",
    available: true,
    featured: false,
    label: null,
  },
  {
    id: "bev-yuzu-sparkler",
    name: "Fresh Yuzu Sparkler",
    category: "Beverages",
    description:
      "Bright citrus yuzu infusion topped with sparkling soda water and fresh mint leaves.",
    price: 25000,
    image: "./assets/images/fresh-yuzu-sparkler.jfif",
    available: true,
    featured: false,
    label: null,
  },

  // --- DESSERTS ---
  {
    id: "des-lava-cake",
    name: "Chocolate Lava Cake",
    category: "Desserts",
    description:
      "Warm dark chocolate cake with a molten center, dusted with cocoa and paired with vanilla cream.",
    price: 32000,
    image: "./assets/images/chocolate-lava-cake.jfif",
    available: true,
    featured: true,
    label: "Sweet Treat",
  },
  {
    id: "des-tiramisu",
    name: "Classic Tiramisu",
    category: "Desserts",
    description:
      "Espresso-soaked ladyfingers layered with light mascarpone cream and rich cocoa powder.",
    price: 34000,
    image: "./assets/images/classic-tiramisu.jfif",
    available: true,
    featured: false,
    label: null,
  },
  {
    id: "des-croissant-pudding",
    name: "Warm Croissant Pudding",
    category: "Desserts",
    description:
      "Baked flaky butter croissant custard infused with vanilla bean and cinnamon sugar.",
    price: 29000,
    image: "./assets/images/butter-croissant-pudding.jfif",
    available: false,
    featured: false,
    label: null,
  },
];
