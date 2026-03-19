/* ---------- Splash screen (shows once per session) ---------- */
(function () {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  // Skip if already shown this session
  if (sessionStorage.getItem('spiciti.splashShown')) {
    splash.classList.add('splash-hidden');
    return;
  }

  // Remove after CSS animation completes (3s display + 0.5s fade)
  splash.addEventListener('animationend', function handler() {
    splash.classList.add('splash-hidden');
    sessionStorage.setItem('spiciti.splashShown', '1');
    splash.removeEventListener('animationend', handler);
  });
}());
/* ------------------------------------------------------------ */

const INFO_EMAIL = "Info@spiciti.in";
const SITE_CONTENT_PATH = "data/site-content.json";
const STORAGE_KEYS = {
  catalog: "spiciti.catalog.v1",
  cart: "spiciti.cart.v1",
  reviews: "spiciti.reviews.v1",
  settings: "spiciti.settings.v1",
  about: "spiciti.about.v1",
  pendingCheckout: "spiciti.pending-checkout.v1",
  customerDetails: "customerDetails",
  posts: "spiciti.posts.v2",
  coupons: "spiciti.coupons.v1",
  appliedCouponCode: "spiciti.applied-coupon-code.v1",
  githubPublishSettings: "spiciti.github-publish-settings.v1"
};

let siteContentCache = null;
const GITHUB_PUBLISH_TOKEN_SESSION_KEY = "spiciti.github-publish-token.v1";
let autoPublishTimerId = 0;
let autoPublishInFlight = false;
let autoPublishSuspendCount = 0;

const COOKIE_CONSENT_KEY = "spiciti.cookieConsent.v1";
const COOKIE_CONSENT_DAYS = 365;
const DEFAULT_COOKIE_PREFERENCES = {
  essential: true,
  analytics: false,
  marketing: false
};

const DEFAULT_GITHUB_PUBLISH_SETTINGS = {
  owner: "spv1010-netizen",
  repo: "spiciti-website",
  branch: "main",
  autoPublish: false
};

const DEFAULT_COUPONS = [];

const DEFAULT_SETTINGS = {
  phone: "+91 90746 41652",
  whatsappPhone: "919074641652",
  upiId: "7736009054@upi",
  upiName: "Spiciti",
  facebookUrl: "",
  instagramUrl: "https://instagram.com/_spiciti",
  youtubeUrl: "",
  twitterUrl: "",
  showOfferTicker: true,
  offerTickerText: "Limited time offer: Flat 10% off above 1099. Use code WOMENSDAY10"
};

const DEFAULT_ABOUT_CONTENT = {
  storyLabel: "About Us",
  storyTitle: "Our Story",
  storyPara1: "Spiciti began with one simple belief: clean, honest food should be easy to bring home. What started as a personal pursuit for better everyday ingredients became a growing mission to serve families with spices and staples that feel real, fresh, and trustworthy.",
  purposeTitle: "Our Purpose",
  purposeIntro: "Every product we create is guided by purity, transparency, and wellbeing. We avoid unnecessary additives and focus on ingredients that deliver flavor naturally.",
  purposePara: "In a world full of heavily processed foods, we choose a slower, cleaner path. Our spices are selected, cleaned, and prepared with precision to preserve their true taste instead of masking it with artificial enhancers. Purity for us is more than a product promise — it shapes how we source, partner, and package. We actively support farmers and small suppliers who follow ethical and sustainable practices.",
  founderTitle: "Letter From Our Founder",
  founderLetter: "Spiciti was born from a very personal need in my own kitchen: ingredients I could trust without second-guessing. Over time, that need became a promise to serve families with food that is clean, honest, and full of natural flavour. Every product we bring you is selected with care, and every decision we make is guided by purity, transparency, and respect for the people who grow and prepare these ingredients.",
  founderName: "Shobana Balasubrahmanniyan",
  founderRole: "Founder, Spiciti",
  showFounderLetter: true,
  boldWords: "",
  textItalic: false,
  storyImage: "images/Rainbow Trail.jpg",
  purposeImage: "images/hero.jpeg",
  founderImage: "images/hero.jpeg"
};

const DEFAULT_PRODUCTS = [
  {
    id: "biriyani-masala",
    name: "Biriyani Masala",
    category: "Masalas",
    description: "Rich aroma spice blend for layered biriyani, pulao, and festive cooking.",
    badge: "Best Seller",
    art: "art-biryani",
    quantityOptions: [
      { id: "250g", label: "250g", price: 180 },
      { id: "500g", label: "500g", price: 340 },
      { id: "1kg", label: "1kg", price: 650 }
    ]
  },
  {
    id: "whole-spices",
    name: "Whole Spices",
    category: "Whole Spices",
    description: "Fresh farm sourced spices with balanced heat and deep kitchen fragrance.",
    badge: "Signature",
    art: "art-spices",
    quantityOptions: [
      { id: "100g", label: "100g", price: 140 },
      { id: "250g", label: "250g", price: 240 },
      { id: "500g", label: "500g", price: 460 }
    ]
  },
  {
    id: "dry-fruits-mix",
    name: "Dry Fruits Mix",
    category: "Dry Fruits",
    description: "Premium quality nuts and dried fruits for gifting, snacking, and festive trays.",
    badge: "Premium",
    art: "art-dryfruits",
    quantityOptions: [
      { id: "250g", label: "250g", price: 320 },
      { id: "500g", label: "500g", price: 620 },
      { id: "1kg", label: "1kg", price: 1200 }
    ]
  },
  {
    id: "millets-combo",
    name: "Millets Combo",
    category: "Millets",
    description: "Healthy traditional grains curated for everyday breakfast, porridge, and rotis.",
    badge: "Healthy Choice",
    art: "art-millets",
    quantityOptions: [
      { id: "500g", label: "500g", price: 210 },
      { id: "1kg", label: "1kg", price: 390 },
      { id: "2kg", label: "2kg", price: 740 }
    ]
  },
  {
    id: "kashmiri-chilli",
    name: "Kashmiri Chilli",
    category: "Masalas",
    description: "Bright color, mild heat, and clean finish for curries, gravies, and snacks.",
    badge: "Popular",
    art: "art-saffron",
    quantityOptions: [
      { id: "200g", label: "200g", price: 150 },
      { id: "500g", label: "500g", price: 320 },
      { id: "1kg", label: "1kg", price: 600 }
    ]
  },
  {
    id: "premium-cashews",
    name: "Premium Cashews",
    category: "Dry Fruits",
    description: "Creamy whole cashews selected for festive hampers and premium everyday use.",
    badge: "Festive Pick",
    art: "art-nuts",
    quantityOptions: [
      { id: "250g", label: "250g", price: 380 },
      { id: "500g", label: "500g", price: 720 },
      { id: "1kg", label: "1kg", price: 1380 }
    ]
  },
  {
    id: "stone-ground-turmeric",
    name: "Stone Ground Turmeric",
    category: "Masalas",
    description: "Golden turmeric powder with earthy depth and clean aroma for home cooking.",
    badge: "Kitchen Staple",
    art: "art-gold",
    quantityOptions: [
      { id: "200g", label: "200g", price: 140 },
      { id: "500g", label: "500g", price: 300 },
      { id: "1kg", label: "1kg", price: 560 }
    ]
  },
  {
    id: "ragi-flour",
    name: "Ragi Flour",
    category: "Millets",
    description: "Fine milled ragi flour for dosa, porridge, rotis, and healthy bakes.",
    badge: "Everyday Use",
    art: "art-ragi",
    quantityOptions: [
      { id: "500g", label: "500g", price: 120 },
      { id: "1kg", label: "1kg", price: 220 },
      { id: "2kg", label: "2kg", price: 410 }
    ]
  }
];

const DEFAULT_REVIEWS = [
  {
    id: "anjana-r",
    name: "Anjana R",
    location: "Kochi",
    title: "High Quality Products",
    message: "Fresh aroma, dependable quality, and clean packaging. The spice blends felt premium, and the order process was smooth from selection to doorstep delivery.",
    rating: 5
  },
  {
    id: "manoj-s",
    name: "Manoj S",
    location: "Bengaluru",
    title: "Fresh and well packed",
    message: "The whole spices arrived with excellent freshness and careful packaging. I also liked the simple order flow and quick confirmation without any confusion.",
    rating: 5
  },
  {
    id: "nisha-p",
    name: "Nisha P",
    location: "Chennai",
    title: "Great pack-size choices",
    message: "The dry fruits quality was excellent, and the pack-size options made it easy to order exactly what I needed for home use without overspending.",
    rating: 5
  }
];

const SOCIAL_LINKS = [
  { key: "facebookUrl", label: "Facebook" },
  { key: "instagramUrl", label: "Instagram" },
  { key: "youtubeUrl", label: "YouTube" },
  { key: "twitterUrl", label: "X" }
];

const DEFAULT_POSTS = [
  {
    id: "hyderabadi-biryani-recipe",
    title: "Authentic Hyderabadi Biryani at Home",
    category: "Recipe",
    date: "2026-03-10",
    excerpt: "Layer by layer perfection — make restaurant-style Hyderabadi biryani using Spiciti's fragrant Biryani Masala blend. Step-by-step guide inside.",
    body: "Hyderabadi Biryani is a celebration on a plate. With the right spice blend, perfectly marinated meat, and the traditional dum cooking method, you can recreate this iconic dish at home.\n\nIngredients:\n- 1 kg basmati rice\n- 750 g chicken (cut into pieces)\n- 3 tbsp Spiciti Biryani Masala\n- 1 cup yoghurt\n- 2 large onions, thinly sliced\n- Saffron soaked in warm milk\n- Ghee, mint leaves, and fried onions to garnish\n\nMethod:\n1. Marinate chicken with yoghurt and Spiciti Biryani Masala for at least 2 hours.\n2. Parboil basmati rice until 70% cooked. Drain and set aside.\n3. In a heavy-bottomed pot, layer half the rice, all the chicken, then the remaining rice.\n4. Drizzle saffron milk and ghee over the top layer.\n5. Seal the pot with dough or foil and cook on dum (low heat) for 25–30 minutes.\n6. Garnish with fried onions, mint, and serve with raita.",
    videoUrl: "",
    image: ""
  },
  {
    id: "5-ways-whole-spices",
    title: "5 Creative Ways to Use Whole Spices",
    category: "Tips & Tricks",
    date: "2026-03-05",
    excerpt: "Unlock the full potential of whole spices beyond curries — from infused oils and spice-smoked dishes to homemade chai masala.",
    body: "Whole spices are powerhouses of flavour that most home cooks only use in curries. Here are five creative ways to get much more out of them:\n\n1. Infused Cooking Oils\nGently heat whole cumin, mustard seeds, and dried chillies in oil for 1–2 minutes to create a flavour-packed base for any dish.\n\n2. Dhungar Smoking\nPlace a small piece of charcoal in your cooked dish, add a clove and drizzle ghee over it, then cover immediately. The aromatic smoke infuses the food in seconds.\n\n3. Spice-Crusted Meats\nToast and coarsely grind coriander seeds, peppercorns, and fennel seeds. Press onto chicken or fish before pan-searing.\n\n4. Homemade Chai Masala\nCrush cinnamon, cardamom, cloves, and ginger to make your own custom chai blend — far fresher than store-bought.\n\n5. Dessert Spicing\nAdd a pinch of ground cardamom or a cinnamon stick to rice pudding, custards, or fruit compotes for a warm, exotic depth.",
    videoUrl: "",
    image: ""
  },
  {
    id: "ragi-porridge-breakfast",
    title: "Healthy Ragi Porridge for a Strong Morning",
    category: "Recipe",
    date: "2026-02-28",
    excerpt: "A wholesome and delicious breakfast bowl made with Spiciti's stone-ground Ragi Flour, topped with dry fruits and a drizzle of honey.",
    body: "Ragi (finger millet) is one of the most nutritious grains in Indian cooking — rich in calcium, iron, and natural fibre. This porridge comes together in under 10 minutes.\n\nIngredients:\n- 4 tbsp Spiciti Ragi Flour\n- 1.5 cups water or milk\n- A pinch of salt\n- 1 tsp jaggery or honey\n- Toppings: almonds, raisins, cashews, banana slices\n\nMethod:\n1. Whisk ragi flour into ½ cup cold water to make a lump-free paste.\n2. Bring the remaining 1 cup of water (or milk) to a gentle boil.\n3. Pour in the ragi paste while stirring continuously.\n4. Cook on medium heat for 5–7 minutes, stirring, until thickened.\n5. Sweeten with jaggery or honey.\n6. Pour into a bowl and top with your favourite dry fruits and fresh banana slices.\n\nTip: For extra creaminess, use half water and half milk.",
    videoUrl: "",
    image: ""
  }
];

const PRODUCT_CATEGORY_OPTIONS = [
  "ALL",
  "SPICES",
  "MASALAS",
  "HERBS",
  "DRY FRUITS & NUTS",
  "DATES",
  "FLORAL & HERBAL TEA"
];

const PRODUCT_CATEGORY_MAP = {
  masala: "MASALAS",
  masalas: "MASALAS",
  spices: "SPICES",
  "whole spices": "SPICES",
  millets: "SPICES",
  herbs: "HERBS",
  date: "DATES",
  dates: "DATES",
  "dry fruits": "DRY FRUITS & NUTS",
  "dry fruits & nuts": "DRY FRUITS & NUTS",
  nuts: "DRY FRUITS & NUTS",
  tea: "FLORAL & HERBAL TEA",
  "floral & herbal tea": "FLORAL & HERBAL TEA"
};

const COUNTRY_STATE_DATA = {
  IN: {
    name: "India",
    states: [
      "Andhra Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Tamil Nadu",
      "Telangana",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal"
    ]
  },
  US: {
    name: "United States",
    states: [
      "California",
      "Texas",
      "Florida",
      "New York",
      "Illinois",
      "Pennsylvania",
      "Ohio"
    ]
  },
  GB: {
    name: "United Kingdom",
    states: ["England", "Scotland", "Wales", "Northern Ireland"]
  },
  AU: {
    name: "Australia",
    states: ["New South Wales", "Victoria", "Queensland", "Western Australia"]
  },
  OTHER: {
    name: "Other",
    states: []
  }
};

const COUNTRIES = Object.entries(COUNTRY_STATE_DATA).map(function (entry) {
  return { code: entry[0], name: entry[1].name };
});

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const IMAGE_COMPRESSION_PROFILES = {
  product: {
    maxDimension: 960,
    targetBytes: 170 * 1024,
    initialQuality: 0.74,
    minQuality: 0.46,
    qualityStep: 0.08,
    minDimension: 520,
    scaleStep: 0.86
  },
  review: {
    maxDimension: 560,
    targetBytes: 70 * 1024,
    initialQuality: 0.72,
    minQuality: 0.44,
    qualityStep: 0.08,
    minDimension: 240,
    scaleStep: 0.86
  },
  post: {
    maxDimension: 960,
    targetBytes: 170 * 1024,
    initialQuality: 0.74,
    minQuality: 0.46,
    qualityStep: 0.08,
    minDimension: 520,
    scaleStep: 0.86
  },
  about: {
    maxDimension: 1280,
    targetBytes: 260 * 1024,
    initialQuality: 0.8,
    minQuality: 0.52,
    qualityStep: 0.08,
    minDimension: 640,
    scaleStep: 0.9
  }
};

const state = {
  searchTerm: "",
  activeCategory: "ALL",
  activeBlogCategory: "ALL",
  openProductId: "",
  selectedPurchases: {},
  featuredStart: 0,
  reviewStart: 0,
  productImageIndexes: {},
  editingProductId: "",
  editingReviewId: "",
  editingPostId: "",
  productFormImages: [],
  reviewFormImage: "",
  appliedCouponCode: "",
  checkoutModal: {
    isOpen: false,
    upiUri: "",
    deviceType: "desktop",
    awaitingVisibilityReturn: false,
    sawHiddenAfterUpiLaunch: false,
    enableTimerId: 0,
    altWhatsAppEnableTimerId: 0,
    countdownIntervalId: 0,
    countdownSecondsLeft: 0,
    returnedFromUpi: false
  }
};

function safeRead(key, fallbackValue) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

function isStorageQuotaError(error) {
  if (!error) {
    return false;
  }

  const errorName = String(error.name || "");
  const errorMessage = String(error.message || "");
  const errorCode = Number(error.code || 0);

  return errorName === "QuotaExceededError"
    || errorName === "NS_ERROR_DOM_QUOTA_REACHED"
    || errorCode === 22
    || errorCode === 1014
    || /quota|storage/i.test(errorMessage);
}

function saveValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    if (isStorageQuotaError(error)) {
      const storageError = new Error("Browser storage is full.");
      storageError.name = "StorageQuotaError";
      throw storageError;
    }

    throw error;
  }
}

function getSiteContentValue(key) {
  if (!siteContentCache || typeof siteContentCache !== "object") {
    return null;
  }

  return Object.prototype.hasOwnProperty.call(siteContentCache, key)
    ? siteContentCache[key]
    : null;
}

function loadSiteContentFile() {
  if (typeof window.fetch !== "function") {
    return Promise.resolve(null);
  }

  return window.fetch(SITE_CONTENT_PATH + "?v=" + Date.now(), {
    cache: "no-store"
  }).then(function (response) {
    if (!response.ok) {
      throw new Error("Unable to load site content.");
    }

    return response.json();
  }).then(function (data) {
    siteContentCache = data && typeof data === "object" ? data : null;
    return siteContentCache;
  }).catch(function () {
    siteContentCache = null;
    return null;
  });
}

function normalizeGitHubPublishSettings(settings) {
  const raw = settings || {};

  return {
    owner: String(raw.owner || DEFAULT_GITHUB_PUBLISH_SETTINGS.owner).trim(),
    repo: String(raw.repo || DEFAULT_GITHUB_PUBLISH_SETTINGS.repo).trim(),
    branch: String(raw.branch || DEFAULT_GITHUB_PUBLISH_SETTINGS.branch).trim() || DEFAULT_GITHUB_PUBLISH_SETTINGS.branch,
    autoPublish: raw.autoPublish === true
  };
}

function getGitHubPublishSettings() {
  return normalizeGitHubPublishSettings(safeRead(STORAGE_KEYS.githubPublishSettings, {}));
}

function saveGitHubPublishSettings(settings) {
  saveValue(STORAGE_KEYS.githubPublishSettings, normalizeGitHubPublishSettings(settings));
}

function getGitHubPublishToken() {
  try {
    return String(window.sessionStorage.getItem(GITHUB_PUBLISH_TOKEN_SESSION_KEY) || "");
  } catch (error) {
    return "";
  }
}

function setGitHubPublishToken(token) {
  try {
    const normalized = String(token || "").trim();

    if (normalized) {
      window.sessionStorage.setItem(GITHUB_PUBLISH_TOKEN_SESSION_KEY, normalized);
    } else {
      window.sessionStorage.removeItem(GITHUB_PUBLISH_TOKEN_SESSION_KEY);
    }
  } catch (error) {
    return;
  }
}

function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0);
}

function normalizeCouponCode(value) {
  return String(value || "").trim().toUpperCase().replace(/\s+/g, "");
}

function normalizeCoupon(coupon, index) {
  const code = normalizeCouponCode(coupon && coupon.code);
  const discountPercent = Math.max(0, Math.min(100, Number(coupon && coupon.discountPercent) || 0));
  const minOrderAmount = Math.max(0, Number(coupon && coupon.minOrderAmount) || 0);

  if (!code || !discountPercent) {
    return null;
  }

  return {
    id: slugify((coupon && coupon.id) || (code + "-" + String(index + 1))),
    code: code,
    discountPercent: Number(discountPercent.toFixed(2)),
    minOrderAmount: Number(minOrderAmount.toFixed(2))
  };
}

function getCoupons() {
  const stored = safeRead(STORAGE_KEYS.coupons, null);
  const staticCoupons = getSiteContentValue("coupons");
  const source = Array.isArray(stored)
    ? stored
    : (Array.isArray(staticCoupons) ? staticCoupons : DEFAULT_COUPONS);

  return source.map(normalizeCoupon).filter(Boolean);
}

function saveCoupons(coupons) {
  saveValue(STORAGE_KEYS.coupons, (Array.isArray(coupons) ? coupons : []).map(normalizeCoupon).filter(Boolean));
  queueAutoPublish("Update coupons");
}

function getAppliedCouponCode() {
  const code = safeRead(STORAGE_KEYS.appliedCouponCode, "");
  return normalizeCouponCode(code);
}

function saveAppliedCouponCode(code) {
  const normalized = normalizeCouponCode(code);
  state.appliedCouponCode = normalized;
  saveValue(STORAGE_KEYS.appliedCouponCode, normalized);
}

function clearAppliedCouponCode() {
  saveAppliedCouponCode("");
}

function getCouponByCode(code) {
  const normalizedCode = normalizeCouponCode(code);

  if (!normalizedCode) {
    return null;
  }

  return getCoupons().find(function (coupon) {
    return coupon.code === normalizedCode;
  }) || null;
}

function getAppliedCoupon() {
  const code = state.appliedCouponCode || getAppliedCouponCode();

  if (!code) {
    return null;
  }

  const coupon = getCouponByCode(code);

  if (!coupon) {
    clearAppliedCouponCode();
    return null;
  }

  return coupon;
}

function setCookie(name, value, days) {
  const safeName = encodeURIComponent(String(name || "").trim());

  if (!safeName) {
    return;
  }

  const maxDays = Math.max(1, Number(days) || COOKIE_CONSENT_DAYS);
  const expires = new Date(Date.now() + (maxDays * 24 * 60 * 60 * 1000)).toUTCString();
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = safeName + "=" + encodeURIComponent(String(value || "")) + "; expires=" + expires + "; path=/; SameSite=Lax" + secure;
}

function getCookie(name) {
  const safeName = encodeURIComponent(String(name || "").trim());

  if (!safeName) {
    return "";
  }

  const prefix = safeName + "=";
  const cookieParts = document.cookie ? document.cookie.split(";") : [];

  for (let index = 0; index < cookieParts.length; index += 1) {
    const part = cookieParts[index].trim();

    if (part.indexOf(prefix) === 0) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }

  return "";
}

function eraseCookie(name) {
  const safeName = encodeURIComponent(String(name || "").trim());

  if (!safeName) {
    return;
  }

  document.cookie = safeName + "=; Max-Age=0; path=/; SameSite=Lax";
}

function normalizeCookiePreferences(preferences) {
  const raw = preferences || {};

  return {
    essential: true,
    analytics: raw.analytics === true,
    marketing: raw.marketing === true
  };
}

function saveCookiePreferences(preferences) {
  const normalized = normalizeCookiePreferences(preferences);
  setCookie(COOKIE_CONSENT_KEY, JSON.stringify(normalized), COOKIE_CONSENT_DAYS);
  return normalized;
}

function readCookiePreferences() {
  const raw = getCookie(COOKIE_CONSENT_KEY);

  if (!raw) {
    return null;
  }

  try {
    return normalizeCookiePreferences(JSON.parse(raw));
  } catch (error) {
    return null;
  }
}

function runConsentAwareAnalytics(preferences) {
  const normalized = normalizeCookiePreferences(preferences);

  if (!normalized.analytics) {
    return;
  }

  // Example 1: load any analytics script placeholders declared as data attributes.
  document.querySelectorAll("script[data-analytics-src]").forEach(function (placeholder) {
    const src = String(placeholder.getAttribute("data-analytics-src") || "").trim();

    if (!src || placeholder.getAttribute("data-analytics-loaded") === "true") {
      return;
    }

    const analyticsScript = document.createElement("script");
    analyticsScript.src = src;
    analyticsScript.async = true;

    const referrerPolicy = placeholder.getAttribute("data-referrerpolicy");
    if (referrerPolicy) {
      analyticsScript.referrerPolicy = referrerPolicy;
    }

    const integrity = placeholder.getAttribute("data-integrity");
    if (integrity) {
      analyticsScript.integrity = integrity;
      analyticsScript.crossOrigin = placeholder.getAttribute("data-crossorigin") || "anonymous";
    }

    document.head.appendChild(analyticsScript);
    placeholder.setAttribute("data-analytics-loaded", "true");
  });

  // Example 2: optional Google Analytics loader (set window.SPICITI_GA_MEASUREMENT_ID before script.js).
  const measurementId = String(window.SPICITI_GA_MEASUREMENT_ID || "").trim();

  if (!measurementId || window.__spicitiGaLoaded) {
    return;
  }

  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
  window.__spicitiGaLoaded = true;
}

function applyCookiePreferences(preferences) {
  const normalized = normalizeCookiePreferences(preferences);

  document.documentElement.setAttribute("data-analytics-consent", normalized.analytics ? "granted" : "denied");
  document.documentElement.setAttribute("data-marketing-consent", normalized.marketing ? "granted" : "denied");
  document.documentElement.setAttribute("data-essential-consent", "granted");

  runConsentAwareAnalytics(normalized);
  document.dispatchEvent(new CustomEvent("cookiePreferencesUpdated", { detail: normalized }));
}

function createCookieConsentUi() {
  if (document.querySelector("[data-cookie-banner]")) {
    return;
  }

  const shell = document.createElement("div");
  shell.className = "cookie-consent-shell";
  shell.innerHTML = '' +
    '<div class="cookie-consent-banner" data-cookie-banner hidden>' +
      '<p class="cookie-consent-text">This website uses cookies to improve your browsing experience and analyze site traffic.</p>' +
      '<div class="cookie-consent-actions">' +
        '<button type="button" class="cookie-btn cookie-btn-primary" data-cookie-action="accept-all">Accept All</button>' +
        '<button type="button" class="cookie-btn cookie-btn-muted" data-cookie-action="reject-non-essential">Reject Non-Essential</button>' +
        '<button type="button" class="cookie-btn cookie-btn-ghost" data-cookie-action="manage-preferences">Manage Preferences</button>' +
      '</div>' +
    '</div>' +
    '<div class="cookie-consent-modal" data-cookie-modal hidden>' +
      '<div class="cookie-consent-backdrop" data-cookie-close-modal></div>' +
      '<div class="cookie-consent-panel" role="dialog" aria-modal="true" aria-label="Cookie preferences">' +
        '<h2>Cookie Preferences</h2>' +
        '<p>Choose which cookies you allow. Essential cookies are required for core site functionality.</p>' +
        '<label class="cookie-pref-row cookie-pref-row-locked">' +
          '<span><strong>Essential Cookies</strong><small>Always active</small></span>' +
          '<input type="checkbox" checked disabled aria-label="Essential cookies always enabled">' +
        '</label>' +
        '<label class="cookie-pref-row">' +
          '<span><strong>Analytics Cookies</strong><small>Helps us understand site usage.</small></span>' +
          '<input type="checkbox" data-cookie-analytics>' +
        '</label>' +
        '<label class="cookie-pref-row">' +
          '<span><strong>Marketing Cookies</strong><small>Used to personalize promotions.</small></span>' +
          '<input type="checkbox" data-cookie-marketing>' +
        '</label>' +
        '<div class="cookie-pref-actions">' +
          '<button type="button" class="cookie-btn cookie-btn-muted" data-cookie-close-modal>Cancel</button>' +
          '<button type="button" class="cookie-btn cookie-btn-primary" data-cookie-action="save-preferences">Save Preferences</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.appendChild(shell);
}

function setCookieBannerVisibility(visible) {
  const banner = document.querySelector("[data-cookie-banner]");

  if (!banner) {
    return;
  }

  banner.hidden = !visible;
}

function setCookieModalVisibility(visible) {
  const modal = document.querySelector("[data-cookie-modal]");

  if (!modal) {
    return;
  }

  modal.hidden = !visible;
  document.body.classList.toggle("has-cookie-modal-open", visible);
}

function syncCookiePreferenceInputs(preferences) {
  const normalized = normalizeCookiePreferences(preferences);
  const analyticsInput = document.querySelector("[data-cookie-analytics]");
  const marketingInput = document.querySelector("[data-cookie-marketing]");

  if (analyticsInput) {
    analyticsInput.checked = normalized.analytics;
  }
  if (marketingInput) {
    marketingInput.checked = normalized.marketing;
  }
}

function handleCookieConsentAction(action) {
  if (action === "accept-all") {
    const saved = saveCookiePreferences({ essential: true, analytics: true, marketing: true });
    applyCookiePreferences(saved);
    setCookieModalVisibility(false);
    setCookieBannerVisibility(false);
    return;
  }

  if (action === "reject-non-essential") {
    const saved = saveCookiePreferences(DEFAULT_COOKIE_PREFERENCES);
    applyCookiePreferences(saved);
    setCookieModalVisibility(false);
    setCookieBannerVisibility(false);
    return;
  }

  if (action === "manage-preferences") {
    syncCookiePreferenceInputs(readCookiePreferences() || DEFAULT_COOKIE_PREFERENCES);
    setCookieModalVisibility(true);
    return;
  }

  if (action === "save-preferences") {
    const analyticsInput = document.querySelector("[data-cookie-analytics]");
    const marketingInput = document.querySelector("[data-cookie-marketing]");
    const saved = saveCookiePreferences({
      essential: true,
      analytics: Boolean(analyticsInput && analyticsInput.checked),
      marketing: Boolean(marketingInput && marketingInput.checked)
    });

    applyCookiePreferences(saved);
    setCookieModalVisibility(false);
    setCookieBannerVisibility(false);
  }
}

function initialiseCookieConsent() {
  const stored = readCookiePreferences();
  applyCookiePreferences(stored || DEFAULT_COOKIE_PREFERENCES);
}

function normalizePincode(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 6);
}

function normalizePhoneNumber(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 10);
}

function isValidIndianPhoneNumber(value) {
  return /^\d{10}$/.test(normalizePhoneNumber(value));
}

function getStatesForCountryCode(countryCode) {
  const country = COUNTRY_STATE_DATA[String(countryCode || "").toUpperCase()];
  return (country && Array.isArray(country.states)) ? country.states : [];
}

function populateCountrySelect(select, selectedCode, indiaOnly) {
  if (!select) return;

  var onlyIndia = indiaOnly === true;
  const value = String(selectedCode || "").toUpperCase();

  if (onlyIndia) {
    select.innerHTML = "<option value=\"IN\" selected>India</option>";
    select.value = "IN";
    return;
  }

  var optionsMarkup = COUNTRIES.map(function (c) {
    var isSelected = c.code === value;

    return (
      "<option value=\"" + c.code + "\"" + (isSelected ? " selected" : "") + ">" +
      escapeHtml(c.name) +
      "</option>"
    );
  }).join("");

  select.innerHTML = "<option value=\"\">Select country</option>" +
    optionsMarkup;
}

function populateStateSelect(select, countryCode, selectedState) {
  if (!select) return;

  const states = getStatesForCountryCode(countryCode);
  const value = String(selectedState || "");

  if (!states.length) {
    select.innerHTML = "<option value=\"\">N/A</option>";
    select.disabled = true;
    select.required = false;
    return;
  }

  select.disabled = false;
  select.required = true;
  select.innerHTML = "<option value=\"\">Select State</option>" +
    states.map(function (state) {
      return (
        "<option value=\"" + escapeHtml(state) + "\"" + (state === value ? " selected" : "") + ">" +
        escapeHtml(state) +
        "</option>"
      );
    }).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[character];
  });
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeImageList(images) {
  return Array.isArray(images)
    ? images.map(function (image) {
      return String(image || "").trim();
    }).filter(Boolean)
    : [];
}

function buildWhatsAppUrl(phoneNumber, message) {
  const phone = String(phoneNumber || "").replace(/[^\d]/g, "");

  if (!phone) {
    return "#";
  }

  return "https://api.whatsapp.com/send?phone=" + phone + (message ? "&text=" + encodeURIComponent(message) : "");
}

function renderFloatingWhatsAppButton() {
  const page = (document.body && document.body.getAttribute("data-page")) || "";

  if (String(page).toLowerCase() === "admin") {
    return;
  }

  const existing = document.querySelector("[data-floating-whatsapp]");
  if (existing) {
    existing.remove();
  }

  const chatUrl = buildWhatsAppUrl("919074641652", "Hi Spiciti Team, I need help.");
  if (!chatUrl || chatUrl === "#") {
    return;
  }

  const link = document.createElement("a");
  link.className = "floating-whatsapp-chat";
  link.setAttribute("data-floating-whatsapp", "true");
  link.setAttribute("href", chatUrl);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noreferrer");
  link.setAttribute("aria-label", "Chat with Spiciti Team on WhatsApp");
  link.innerHTML = '<span class="floating-whatsapp-icon" aria-hidden="true"></span>';

  document.body.appendChild(link);
}

function getDisplayCategory(rawCategory) {
  const normalized = String(rawCategory || "").trim().toLowerCase();

  return PRODUCT_CATEGORY_MAP[normalized] || String(rawCategory || "").trim().toUpperCase() || "SPICES";
}

function showToast(message) {
  let toast = document.querySelector("[data-toast]");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("data-toast", "true");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(function () {
    if (toast) {
      toast.remove();
    }
  }, 2600);
}

function setCurrentYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = year;
  });
}

function initialiseNavigation() {
  const navToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (!navToggle || !nav) {
    return;
  }

  function closeNavigationMenu() {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function isMobileMenuOpen() {
    return window.innerWidth <= 760 && nav.classList.contains("is-open");
  }

  function shouldIgnoreOutsideClose(target) {
    return !!(target && (target.closest("[data-nav]") || target.closest("[data-menu-toggle]")));
  }

  navToggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", function (event) {
    const navLink = event.target.closest("a");

    if (!navLink) {
      return;
    }

    closeNavigationMenu();
  });

  function closeOnOutsideInteraction(event) {
    if (!isMobileMenuOpen()) {
      return;
    }

    if (shouldIgnoreOutsideClose(event.target)) {
      return;
    }

    closeNavigationMenu();
  }

  document.addEventListener("pointerdown", closeOnOutsideInteraction);
  document.addEventListener("click", closeOnOutsideInteraction);
  document.addEventListener("touchstart", closeOnOutsideInteraction, { passive: true });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNavigationMenu();
    }
  });

  function closeNavigationOnScrollGesture() {
    if (isMobileMenuOpen()) {
      closeNavigationMenu();
    }
  }

  window.addEventListener("touchmove", closeNavigationOnScrollGesture, { passive: true });
  window.addEventListener("wheel", closeNavigationOnScrollGesture, { passive: true });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
      closeNavigationMenu();
    }
  });
}

function getSiteSearchItems() {
  const pageItems = [
    {
      title: "Home",
      description: "Main landing page, hero section, featured products, and reviews.",
      url: "index.html",
      keywords: "home featured reviews"
    },
    {
      title: "About Us",
      description: "Brand story, sourcing values, and company information.",
      url: "about.html",
      keywords: "about story quality sourcing"
    },
    {
      title: "Products",
      description: "Browse all spices, dry fruits, and wellness products.",
      url: "products.html",
      keywords: "catalog products spices dry fruits"
    },
    {
      title: "Contact Us",
      description: "Get in touch with Spiciti team.",
      url: "index.html#contact",
      keywords: "contact support phone email"
    }
  ];

  const productItems = getCatalog().map(function (product) {
    return {
      title: product.name,
      description: product.description,
      url: "products.html?search=" + encodeURIComponent(product.name) + "#product-search",
      keywords: [product.category, product.badge, (product.quantityOptions || []).map(function (option) {
        return option.label;
      }).join(" ")].join(" ")
    };
  });

  return pageItems.concat(productItems);
}

function initialiseGlobalSiteSearch() {
  const searchLink = document.querySelector(".site-header .search-link");
  const navShell = document.querySelector(".site-header .nav-shell");
  const navToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (!searchLink || !navShell) {
    return;
  }

  const panel = document.createElement("div");
  panel.className = "site-search-panel";
  panel.hidden = true;
  panel.innerHTML = '<label class="search-field site-search-field" for="site-global-search"><input id="site-global-search" type="search" placeholder="TEXT" data-site-global-search-input></label><div class="site-search-results" data-site-global-search-results hidden></div>';
  navShell.appendChild(panel);

  const input = panel.querySelector("[data-site-global-search-input]");
  const results = panel.querySelector("[data-site-global-search-results]");

  if (!input || !results) {
    return;
  }

  function setSearchMode(isOpen) {
    panel.hidden = !isOpen;
    panel.classList.toggle("is-open", isOpen);
    searchLink.setAttribute("aria-expanded", String(isOpen));

    if (navToggle) {
      navToggle.hidden = isOpen;
    }

    if (isOpen && nav && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
    }
  }

  function closeSearchIfEmpty(force) {
    if (!force && String(input.value || "").trim()) {
      return;
    }

    setSearchMode(false);
    results.hidden = true;
    results.innerHTML = "";
  }

  function renderResults(term) {
    const normalizedTerm = String(term || "").trim().toLowerCase();

    if (!normalizedTerm) {
      results.hidden = true;
      results.innerHTML = "";
      return;
    }

    const matches = getSiteSearchItems().filter(function (item) {
      const haystack = [item.title, item.description, item.keywords].join(" ").toLowerCase();
      return haystack.includes(normalizedTerm);
    }).slice(0, 8);

    if (!matches.length) {
      results.hidden = false;
      results.innerHTML = '<div class="site-search-empty">No results found.</div>';
      return;
    }

    results.hidden = false;
    results.innerHTML = matches.map(function (item) {
      return '<a class="site-search-result" href="' + escapeHtml(item.url) + '"><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.description) + '</span></a>';
    }).join("");
  }

  function applySearch(term) {
    const normalizedTerm = String(term || "").trim();

    if (!normalizedTerm) {
      return;
    }

    if (document.body.getAttribute("data-page") === "products") {
      const productSearchField = document.querySelector("[data-product-search]");
      const productSearchPanel = document.querySelector("[data-product-search-panel]");

      if (productSearchField) {
        state.searchTerm = normalizedTerm;
        productSearchField.value = normalizedTerm;

        if (productSearchPanel) {
          productSearchPanel.hidden = false;
          syncProductCatalogToolbar();
        }

        renderProductsPage();
        closeSearchIfEmpty(true);
        productSearchField.focus();
        productSearchField.select();
        return;
      }
    }

    window.location.href = "products.html?search=" + encodeURIComponent(normalizedTerm) + "#product-search";
  }

  searchLink.addEventListener("click", function (event) {
    event.preventDefault();

    const shouldOpen = panel.hidden;
    setSearchMode(shouldOpen);

    if (shouldOpen) {
      window.setTimeout(function () {
        input.focus();
      }, 0);
    } else {
      closeSearchIfEmpty(true);
    }
  });

  input.addEventListener("input", function () {
    renderResults(input.value);
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      applySearch(input.value);
      return;
    }

    if (event.key === "Escape") {
      closeSearchIfEmpty(true);
      return;
    }
  });

  results.addEventListener("click", function () {
    closeSearchIfEmpty(true);
  });

  function closeOnOutsideSearchInteraction(event) {
    if (panel.hidden) {
      return;
    }

    if (event.target.closest(".site-search-panel") || event.target.closest(".site-header .search-link")) {
      return;
    }

    closeSearchIfEmpty(false);
  }

  document.addEventListener("pointerdown", closeOnOutsideSearchInteraction);
  document.addEventListener("click", closeOnOutsideSearchInteraction);
  document.addEventListener("touchstart", closeOnOutsideSearchInteraction, { passive: true });

  function closeSearchOnScrollGesture() {
    closeSearchIfEmpty(false);
  }

  window.addEventListener("scroll", closeSearchOnScrollGesture, { passive: true });
  window.addEventListener("touchmove", closeSearchOnScrollGesture, { passive: true });
  window.addEventListener("wheel", closeSearchOnScrollGesture, { passive: true });
}

function normalizeStoreSettings(settings) {
  const raw = settings || {};
  const hasOfferToggle = typeof raw.showOfferTicker === "boolean";
  const hasOfferText = raw.offerTickerText !== undefined && raw.offerTickerText !== null;

  return {
    phone: String(raw.phone || DEFAULT_SETTINGS.phone).trim(),
    whatsappPhone: String(raw.whatsappPhone || DEFAULT_SETTINGS.whatsappPhone).replace(/[^\d]/g, ""),
    upiId: String(raw.upiId || DEFAULT_SETTINGS.upiId).trim(),
    upiName: String(raw.upiName || DEFAULT_SETTINGS.upiName).trim(),
    facebookUrl: String(raw.facebookUrl || "").trim(),
    instagramUrl: String(raw.instagramUrl || DEFAULT_SETTINGS.instagramUrl).trim(),
    youtubeUrl: String(raw.youtubeUrl || "").trim(),
    twitterUrl: String(raw.twitterUrl || "").trim(),
    showOfferTicker: hasOfferToggle ? raw.showOfferTicker : DEFAULT_SETTINGS.showOfferTicker,
    offerTickerText: String(hasOfferText ? raw.offerTickerText : DEFAULT_SETTINGS.offerTickerText).trim()
  };
}

function getStoreSettings() {
  return normalizeStoreSettings({
    ...DEFAULT_SETTINGS,
    ...(getSiteContentValue("settings") || {}),
    ...safeRead(STORAGE_KEYS.settings, {})
  });
}

function saveStoreSettings(settings) {
  saveValue(STORAGE_KEYS.settings, normalizeStoreSettings(settings));
  queueAutoPublish("Update store settings");
}

function normalizeAboutContent(content) {
  const raw = content || {};

  return {
    storyLabel: String(raw.storyLabel || DEFAULT_ABOUT_CONTENT.storyLabel).trim(),
    storyTitle: String(raw.storyTitle || DEFAULT_ABOUT_CONTENT.storyTitle).trim(),
    storyPara1: String(raw.storyPara1 || DEFAULT_ABOUT_CONTENT.storyPara1).trim(),
    purposeTitle: String(raw.purposeTitle || DEFAULT_ABOUT_CONTENT.purposeTitle).trim(),
    purposeIntro: String(raw.purposeIntro || DEFAULT_ABOUT_CONTENT.purposeIntro).trim(),
    purposePara: String(raw.purposePara || DEFAULT_ABOUT_CONTENT.purposePara).trim(),
    founderTitle: String(raw.founderTitle || DEFAULT_ABOUT_CONTENT.founderTitle).trim(),
    founderLetter: String(raw.founderLetter || DEFAULT_ABOUT_CONTENT.founderLetter).trim(),
    founderName: String(raw.founderName || DEFAULT_ABOUT_CONTENT.founderName).trim(),
    founderRole: String(raw.founderRole || DEFAULT_ABOUT_CONTENT.founderRole).trim(),
    showFounderLetter: raw.showFounderLetter !== false,
    boldWords: String(raw.boldWords || "").trim(),
    textItalic: raw.textItalic === true,
    storyImage: String(raw.storyImage || DEFAULT_ABOUT_CONTENT.storyImage).trim(),
    purposeImage: String(raw.purposeImage || DEFAULT_ABOUT_CONTENT.purposeImage).trim(),
    founderImage: String(raw.founderImage || DEFAULT_ABOUT_CONTENT.founderImage).trim()
  };
}

function getAboutContent() {
  return normalizeAboutContent({
    ...DEFAULT_ABOUT_CONTENT,
    ...(getSiteContentValue("about") || {}),
    ...safeRead(STORAGE_KEYS.about, {})
  });
}

function saveAboutContent(content) {
  saveValue(STORAGE_KEYS.about, normalizeAboutContent(content));
  queueAutoPublish("Update about content");
}

function resetAboutContent() {
  window.localStorage.removeItem(STORAGE_KEYS.about);
}

function setNodeText(selector, value) {
  const node = document.querySelector(selector);

  if (!node) {
    return;
  }

  node.textContent = String(value || "");
}

function setNodeImage(selector, src) {
  const node = document.querySelector(selector);

  if (!node || !src) {
    return;
  }

  node.setAttribute("src", String(src));
}

function estimateDataUrlBytes(dataUrl) {
  const normalized = String(dataUrl || "");
  const parts = normalized.split(",");

  if (parts.length < 2) {
    return normalized.length;
  }

  const base64 = parts[1];
  const padding = (base64.match(/=+$/) || [""])[0].length;

  return Math.max(0, Math.floor((base64.length * 3) / 4) - padding);
}

function normalizeCompressionOptions(options) {
  const source = typeof options === "number"
    ? { maxDimension: options }
    : (options && typeof options === "object" ? options : {});

  return {
    maxDimension: Math.max(240, Number(source.maxDimension) || 1200),
    targetBytes: Math.max(0, Number(source.targetBytes) || 0),
    initialQuality: Math.min(0.92, Math.max(0.4, Number(source.initialQuality) || 0.82)),
    minQuality: Math.min(0.88, Math.max(0.3, Number(source.minQuality) || 0.5)),
    qualityStep: Math.min(0.2, Math.max(0.02, Number(source.qualityStep) || 0.08)),
    minDimension: Math.max(180, Number(source.minDimension) || 320),
    scaleStep: Math.min(0.95, Math.max(0.6, Number(source.scaleStep) || 0.88))
  };
}

function scaleImageDimensions(width, height, maxDimension) {
  var w = Math.max(1, Number(width) || 1);
  var h = Math.max(1, Number(height) || 1);
  var max = Math.max(1, Number(maxDimension) || 1);

  if (w <= max && h <= max) {
    return { width: w, height: h };
  }

  if (w >= h) {
    return {
      width: max,
      height: Math.max(1, Math.round(h * max / w))
    };
  }

  return {
    width: Math.max(1, Math.round(w * max / h)),
    height: max
  };
}

function reduceImageDimensions(width, height, minDimension, scaleStep) {
  const longestSide = Math.max(width, height);

  if (longestSide <= minDimension) {
    return null;
  }

  const scale = Math.max(minDimension / longestSide, scaleStep);
  const nextWidth = Math.max(1, Math.round(width * scale));
  const nextHeight = Math.max(1, Math.round(height * scale));

  if (nextWidth === width && nextHeight === height) {
    return null;
  }

  return {
    width: nextWidth,
    height: nextHeight
  };
}

function compressImageDataUrl(dataUrl, options) {
  return new Promise(function (resolve) {
    if (!dataUrl || !/^data:image\//.test(dataUrl)) {
      resolve(dataUrl);
      return;
    }

    const settings = normalizeCompressionOptions(options);
    var img = new Image();

    img.onload = function () {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var dimensions = scaleImageDimensions(img.naturalWidth, img.naturalHeight, settings.maxDimension);

      function renderAt(quality) {
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, dimensions.width, dimensions.height);
        return canvas.toDataURL("image/jpeg", quality);
      }

      var compressed = renderAt(settings.initialQuality);

      if (!settings.targetBytes) {
        resolve(compressed);
        return;
      }

      for (var attempt = 0; attempt < 8; attempt += 1) {
        var quality = settings.initialQuality;
        var size = estimateDataUrlBytes(compressed);

        while (size > settings.targetBytes && quality > settings.minQuality) {
          quality = Math.max(settings.minQuality, Number((quality - settings.qualityStep).toFixed(2)));
          compressed = renderAt(quality);
          size = estimateDataUrlBytes(compressed);
        }

        if (size <= settings.targetBytes) {
          resolve(compressed);
          return;
        }

        var nextDimensions = reduceImageDimensions(dimensions.width, dimensions.height, settings.minDimension, settings.scaleStep);

        if (!nextDimensions) {
          break;
        }

        dimensions = nextDimensions;
        compressed = renderAt(settings.initialQuality);
      }

      resolve(compressed);
    };
    img.onerror = function () { resolve(dataUrl); };
    img.src = dataUrl;
  });
}

function compressImageList(images, maxDimension) {
  const safeImages = normalizeImageList(images);

  if (!safeImages.length) {
    return Promise.resolve([]);
  }

  return Promise.all(safeImages.map(function (image) {
    return compressImageDataUrl(image, maxDimension);
  }));
}

function readAndCompressImageFiles(fileList, maxDimension) {
  return readFilesAsDataUrls(fileList).then(function (images) {
    return compressImageList(images, maxDimension);
  });
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseBoldWords(rawValue) {
  return String(rawValue || "").split(",").map(function (word) {
    return word.trim();
  }).filter(Boolean).sort(function (a, b) {
    return b.length - a.length;
  });
}

function applyBoldWordsToText(text, boldWords) {
  let html = escapeHtml(String(text || ""));

  (boldWords || []).forEach(function (word) {
    const pattern = new RegExp("(^|[^a-zA-Z0-9])(" + escapeRegExp(escapeHtml(word)) + ")(?=$|[^a-zA-Z0-9])", "gi");
    html = html.replace(pattern, "$1<strong>$2</strong>");
  });

  return html;
}

function setNodeFormattedText(selector, text, boldWords) {
  const node = document.querySelector(selector);

  if (!node) {
    return;
  }

  node.innerHTML = applyBoldWordsToText(text, boldWords);
}

function applyAboutTextStyle(content) {
  const selectors = [
    "[data-about-story-label]",
    "[data-about-story-title]",
    "[data-about-story-para1]",
    "[data-about-purpose-title]",
    "[data-about-purpose-intro]",
    "[data-about-purpose-para]",
    "[data-about-founder-title]",
    "[data-about-founder-letter]",
    "[data-about-founder-name]",
    "[data-about-founder-role]"
  ];

  selectors.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.style.fontStyle = content.textItalic ? "italic" : "normal";
    });
  });
}

function renderAboutPageContent() {
  const content = getAboutContent();
  const boldWords = parseBoldWords(content.boldWords);
  const founderSection = document.querySelector("[data-about-founder-section]");

  setNodeFormattedText("[data-about-story-label]", content.storyLabel, boldWords);
  setNodeFormattedText("[data-about-story-title]", content.storyTitle, boldWords);
  setNodeFormattedText("[data-about-story-para1]", content.storyPara1, boldWords);
  setNodeFormattedText("[data-about-purpose-title]", content.purposeTitle, boldWords);
  setNodeFormattedText("[data-about-purpose-intro]", content.purposeIntro, boldWords);
  setNodeFormattedText("[data-about-purpose-para]", content.purposePara, boldWords);
  setNodeFormattedText("[data-about-founder-title]", content.founderTitle, boldWords);
  setNodeFormattedText("[data-about-founder-letter]", content.founderLetter, boldWords);
  setNodeFormattedText("[data-about-founder-name]", content.founderName, boldWords);
  setNodeFormattedText("[data-about-founder-role]", content.founderRole, boldWords);
  setNodeImage("[data-about-story-image]", content.storyImage);
  setNodeImage("[data-about-purpose-image]", content.purposeImage);
  setNodeImage("[data-about-founder-image]", content.founderImage);

  if (founderSection) {
    founderSection.hidden = !content.showFounderLetter;
  }

  applyAboutTextStyle(content);
}

function renderAboutForm() {
  const form = document.querySelector("[data-about-form]");
  const content = getAboutContent();

  if (!form) {
    return;
  }

  form.elements.storyLabel.value = content.storyLabel;
  form.elements.storyTitle.value = content.storyTitle;
  form.elements.storyPara1.value = content.storyPara1;
  form.elements.purposeTitle.value = content.purposeTitle;
  form.elements.purposeIntro.value = content.purposeIntro;
  form.elements.purposePara.value = content.purposePara;
  form.elements.founderTitle.value = content.founderTitle;
  form.elements.founderLetter.value = content.founderLetter;
  form.elements.founderName.value = content.founderName;
  form.elements.founderRole.value = content.founderRole;
  form.elements.showFounderLetter.checked = Boolean(content.showFounderLetter);
  form.elements.boldWords.value = content.boldWords || "";
  form.elements.textItalic.checked = Boolean(content.textItalic);
  if (form.elements.storyImage) {
    form.elements.storyImage.value = "";
  }
  if (form.elements.purposeImage) {
    form.elements.purposeImage.value = "";
  }
  if (form.elements.founderImage) {
    form.elements.founderImage.value = "";
  }

  renderImagePreview(document.querySelector("[data-about-story-image-preview]"), content.storyImage ? [content.storyImage] : [], "Story image", false);
  renderImagePreview(document.querySelector("[data-about-purpose-image-preview]"), content.purposeImage ? [content.purposeImage] : [], "Purpose image", false);
  renderImagePreview(document.querySelector("[data-about-founder-image-preview]"), content.founderImage ? [content.founderImage] : [], "Founder image", false);
}

function handleAboutForm() {
  const form = document.querySelector("[data-about-form]");
  const storyImageInput = form ? form.querySelector("[data-about-story-image-input]") : null;
  const purposeImageInput = form ? form.querySelector("[data-about-purpose-image-input]") : null;
  const founderImageInput = form ? form.querySelector("[data-about-founder-image-input]") : null;
  const storyImagePreview = document.querySelector("[data-about-story-image-preview]");
  const purposeImagePreview = document.querySelector("[data-about-purpose-image-preview]");
  const founderImagePreview = document.querySelector("[data-about-founder-image-preview]");

  if (!form) {
    return;
  }

  if (storyImageInput && storyImagePreview) {
    storyImageInput.addEventListener("change", function () {
      if (storyImageInput.files && storyImageInput.files.length) {
        readFilesAsDataUrls(storyImageInput.files).then(function (images) {
          renderImagePreview(storyImagePreview, images.slice(0, 1), "Story image", false);
        }).catch(function () {
          showToast("Unable to read the selected story image.");
        });
      } else {
        const content = getAboutContent();
        renderImagePreview(storyImagePreview, content.storyImage ? [content.storyImage] : [], "Story image", false);
      }
    });
  }

  if (purposeImageInput && purposeImagePreview) {
    purposeImageInput.addEventListener("change", function () {
      if (purposeImageInput.files && purposeImageInput.files.length) {
        readFilesAsDataUrls(purposeImageInput.files).then(function (images) {
          renderImagePreview(purposeImagePreview, images.slice(0, 1), "Purpose image", false);
        }).catch(function () {
          showToast("Unable to read the selected purpose image.");
        });
      } else {
        const content = getAboutContent();
        renderImagePreview(purposeImagePreview, content.purposeImage ? [content.purposeImage] : [], "Purpose image", false);
      }
    });
  }

  if (founderImageInput && founderImagePreview) {
    founderImageInput.addEventListener("change", function () {
      if (founderImageInput.files && founderImageInput.files.length) {
        readFilesAsDataUrls(founderImageInput.files).then(function (images) {
          renderImagePreview(founderImagePreview, images.slice(0, 1), "Founder image", false);
        }).catch(function () {
          showToast("Unable to read the selected founder image.");
        });
      } else {
        const content = getAboutContent();
        renderImagePreview(founderImagePreview, content.founderImage ? [content.founderImage] : [], "Founder image", false);
      }
    });
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const current = getAboutContent();
    let storyImage = current.storyImage;
    let purposeImage = current.purposeImage;
    let founderImage = current.founderImage;

    if (storyImageInput && storyImageInput.files && storyImageInput.files.length) {
      try {
        var rawStory = (await readFilesAsDataUrls(storyImageInput.files))[0] || storyImage;
        storyImage = await compressImageDataUrl(rawStory, IMAGE_COMPRESSION_PROFILES.about);
      } catch (error) {
        showToast("Unable to read the selected story image.");
        return;
      }
    }

    if (purposeImageInput && purposeImageInput.files && purposeImageInput.files.length) {
      try {
        var rawPurpose = (await readFilesAsDataUrls(purposeImageInput.files))[0] || purposeImage;
        purposeImage = await compressImageDataUrl(rawPurpose, IMAGE_COMPRESSION_PROFILES.about);
      } catch (error) {
        showToast("Unable to read the selected purpose image.");
        return;
      }
    }

    if (founderImageInput && founderImageInput.files && founderImageInput.files.length) {
      try {
        var rawFounder = (await readFilesAsDataUrls(founderImageInput.files))[0] || founderImage;
        founderImage = await compressImageDataUrl(rawFounder, IMAGE_COMPRESSION_PROFILES.about);
      } catch (error) {
        showToast("Unable to read the selected founder image.");
        return;
      }
    }

    try {
      saveAboutContent({
        storyLabel: form.elements.storyLabel.value,
        storyTitle: form.elements.storyTitle.value,
        storyPara1: form.elements.storyPara1.value,
        purposeTitle: form.elements.purposeTitle.value,
        purposeIntro: form.elements.purposeIntro.value,
        purposePara: form.elements.purposePara.value,
        founderTitle: form.elements.founderTitle.value,
        founderLetter: form.elements.founderLetter.value,
        founderName: form.elements.founderName.value,
        founderRole: form.elements.founderRole.value,
        showFounderLetter: form.elements.showFounderLetter.checked,
        boldWords: form.elements.boldWords.value,
        textItalic: form.elements.textItalic.checked,
        storyImage: storyImage,
        purposeImage: purposeImage,
        founderImage: founderImage
      });
    } catch (error) {
      showToast("Save failed: storage is full. Try a smaller image or clear browser data.");
      return;
    }

    renderAboutForm();
    renderAboutPageContent();
    showToast("About page content saved.");
  });
}

function createSocialIcon(key) {
  const icons = {
    facebookUrl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.45 20v-6.78h2.28l.34-2.65h-2.62V8.88c0-.77.22-1.29 1.33-1.29H16.1V5.2c-.24-.03-1.05-.1-1.98-.1-1.96 0-3.3 1.2-3.3 3.42v2.05H8.6v2.65h2.22V20z"/></svg>',
    instagramUrl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7zm4.5 2.2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4zm5.05-.95a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/></svg>',
    youtubeUrl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 7.36a2.7 2.7 0 0 0-1.9-1.9C16.97 5 12 5 12 5s-4.97 0-6.62.46a2.7 2.7 0 0 0-1.9 1.9A28.4 28.4 0 0 0 3 12a28.4 28.4 0 0 0 .48 4.64 2.7 2.7 0 0 0 1.9 1.9C7.03 19 12 19 12 19s4.97 0 6.62-.46a2.7 2.7 0 0 0 1.9-1.9A28.4 28.4 0 0 0 21 12a28.4 28.4 0 0 0-.48-4.64zM10 15.14V8.86L15.5 12z"/></svg>',
    twitterUrl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.66 3H21l-5.12 5.85L22 21h-4.8l-3.76-7.39L6.98 21H4.63l5.47-6.26L2 3h4.92l3.39 6.7zm-1.67 16.09h1.3L6.2 4.8H4.86z"/></svg>'
  };

  return icons[key] || "";
}

function buildSocialItems(settings) {
  return SOCIAL_LINKS.map(function (platform) {
    const href = settings[platform.key];
    const icon = createSocialIcon(platform.key);

    if (!icon) {
      return "";
    }

    if (!href || href === "#") {
      return '<span class="social-icon is-disabled" aria-label="' + escapeHtml(platform.label) + '">' + icon + "</span>";
    }

    return '<a class="social-icon" href="' + escapeHtml(href) + '" target="_blank" rel="noreferrer" aria-label="' + escapeHtml(platform.label) + '">' + icon + "</a>";
  }).join("");
}

function renderContactSection() {
  const settings = getStoreSettings();
  const phoneHref = "tel:" + String(settings.phone || "").replace(/[^\d+]/g, "");

  document.querySelectorAll("[data-contact-phone]").forEach(function (node) {
    node.textContent = settings.phone;
  });

  document.querySelectorAll("[data-contact-phone-link]").forEach(function (node) {
    node.setAttribute("href", phoneHref || "#");
  });

  document.querySelectorAll("[data-social-links]").forEach(function (node) {
    node.innerHTML = buildSocialItems(settings);
  });

  document.querySelectorAll("[data-contact-whatsapp]").forEach(function (node) {
    node.setAttribute("href", buildWhatsAppUrl(settings.whatsappPhone, "Hello Spiciti, I want to get in touch."));
  });
}

function renderOfferTicker() {
  const page = (document.body && document.body.getAttribute("data-page")) || "";
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const existing = header.querySelector("[data-offer-ticker]");
  if (existing) {
    existing.remove();
  }

  if (String(page).toLowerCase() === "admin") {
    return;
  }

  const settings = getStoreSettings();
  const offerText = String(settings.offerTickerText || "").trim();

  if (!settings.showOfferTicker || !offerText) {
    return;
  }

  const ticker = document.createElement("div");
  ticker.className = "offer-ticker";
  ticker.setAttribute("data-offer-ticker", "true");

  const track = document.createElement("div");
  track.className = "offer-ticker-track";

  for (let index = 0; index < 6; index += 1) {
    const item = document.createElement("span");
    item.className = "offer-ticker-item";
    item.textContent = offerText;
    track.appendChild(item);
  }

  ticker.appendChild(track);
  header.prepend(ticker);
}

function renderSettingsForm() {
  const form = document.querySelector("[data-settings-form]");
  const settings = getStoreSettings();

  if (!form) {
    return;
  }

  form.elements.phone.value = settings.phone;
  form.elements.whatsappPhone.value = settings.whatsappPhone;
  form.elements.upiId.value = settings.upiId;
  form.elements.upiName.value = settings.upiName;
  form.elements.facebookUrl.value = settings.facebookUrl;
  form.elements.instagramUrl.value = settings.instagramUrl;
  form.elements.youtubeUrl.value = settings.youtubeUrl;
  form.elements.twitterUrl.value = settings.twitterUrl;
}

function renderOfferSettingsForm() {
  const form = document.querySelector("[data-offer-settings-form]");
  const settings = getStoreSettings();

  if (!form) {
    return;
  }

  form.elements.showOfferTicker.checked = Boolean(settings.showOfferTicker);
  form.elements.offerTickerText.value = settings.offerTickerText;
}

function normalizeQuantityOption(option, product, index) {
  const label = String(option && option.label ? option.label : product.unit || "Standard pack").trim();
  const rawId = option && option.id ? option.id : label + "-" + (index + 1);
  const price = Number(option && option.price ? option.price : product.price);

  return label && price ? { id: slugify(rawId), label: label, price: price } : null;
}

function normalizeProduct(product, index) {
  const defaultTemplate = DEFAULT_PRODUCTS.find(function (entry) {
    return entry.id === product.id;
  });
  const sourceOptions = Array.isArray(product.quantityOptions) && product.quantityOptions.length
    ? product.quantityOptions
    : defaultTemplate && defaultTemplate.quantityOptions
      ? defaultTemplate.quantityOptions
      : null;
  const options = (sourceOptions ? sourceOptions : [{}])
    .map(function (option, optionIndex) {
      return normalizeQuantityOption(option, product, optionIndex);
    })
    .filter(Boolean);

  if (!options.length) {
    return null;
  }

  return {
    id: String(product.id || slugify(product.name || "product-" + (index + 1))).trim(),
    name: String(product.name || "Unnamed Product").trim(),
    category: String(product.category || "General").trim(),
    description: String(product.description || "").trim(),
    badge: String(product.badge || "Featured").trim(),
    art: String(product.art || "art-spices").trim(),
    images: normalizeImageList(product.images),
    quantityOptions: options,
    featured: typeof product.featured === "boolean" ? product.featured : index < 6,
    inStock: typeof product.inStock === "boolean" ? product.inStock : true,
    price: options[0].price,
    unit: options[0].label
  };
}

function getCatalog() {
  const stored = safeRead(STORAGE_KEYS.catalog, null);
  const staticCatalog = getSiteContentValue("catalog");
  const source = Array.isArray(stored)
    ? stored
    : (Array.isArray(staticCatalog) ? staticCatalog : DEFAULT_PRODUCTS);

  return source.map(normalizeProduct).filter(Boolean);
}

function saveCatalog(products) {
  saveValue(STORAGE_KEYS.catalog, products.map(normalizeProduct).filter(Boolean));
  queueAutoPublish("Update catalog");
}

function resetCatalog() {
  window.localStorage.removeItem(STORAGE_KEYS.catalog);
}

function normalizeReview(review, index) {
  const name = String(review && review.name ? review.name : "Anonymous").trim();
  const location = String(review && review.location ? review.location : "").trim();
  const title = String(review && review.title ? review.title : "Customer Review").trim();
  const message = String(review && review.message ? review.message : "").trim();
  const rating = Math.max(1, Math.min(5, Number(review && review.rating ? review.rating : 5) || 5));
  const rawId = review && review.id ? review.id : name + "-" + (index + 1);
  const image = String(review && review.image ? review.image : "").trim();

  if (!name || !location || !title || !message) {
    return null;
  }

  return {
    id: slugify(rawId),
    name: name,
    location: location,
    title: title,
    message: message,
    rating: rating,
    image: image,
    visible: typeof review.visible === "boolean" ? review.visible : true
  };
}

function getReviews() {
  const stored = safeRead(STORAGE_KEYS.reviews, null);
  const staticReviews = getSiteContentValue("reviews");
  const source = Array.isArray(stored)
    ? stored
    : (Array.isArray(staticReviews) ? staticReviews : DEFAULT_REVIEWS);

  return source.map(normalizeReview).filter(Boolean);
}

function getReviewById(reviewId) {
  return getReviews().find(function (review) {
    return review.id === reviewId;
  }) || null;
}

function saveReviews(reviews) {
  saveValue(STORAGE_KEYS.reviews, reviews.map(normalizeReview).filter(Boolean));
  queueAutoPublish("Update reviews");
}

function normalizePost(post) {
  const title = String(post && post.title ? post.title : "").trim();
  const category = String(post && post.category ? post.category : "Recipe").trim();
  const date = String(post && post.date ? post.date : "").trim();
  const excerpt = String(post && post.excerpt ? post.excerpt : "").trim();
  const videoUrl = String(post && post.videoUrl ? post.videoUrl : "").trim();
  const image = String(post && post.image ? post.image : "").trim();
  const id = String(post && post.id ? post.id : "").trim();
  const body = String(post && post.body ? post.body : "").trim();

  if (!title || !excerpt) {
    return null;
  }

  return {
    id: id || slugify(title),
    title: title,
    category: category,
    date: date,
    excerpt: excerpt,
    body: body,
    videoUrl: videoUrl,
    image: image,
    visible: typeof post.visible === 'boolean' ? post.visible : true
  };
}

function getPosts() {
  const stored = safeRead(STORAGE_KEYS.posts, null);
  const staticPosts = getSiteContentValue("posts");
  const source = Array.isArray(stored)
    ? stored
    : (Array.isArray(staticPosts) ? staticPosts : DEFAULT_POSTS);
  return source.map(normalizePost).filter(Boolean);
}

function savePosts(posts) {
  saveValue(STORAGE_KEYS.posts, posts.map(normalizePost).filter(Boolean));
  queueAutoPublish("Update recipes and blog posts");
}

function getYouTubeId(videoUrl) {
  if (!videoUrl) return "";
  var str = String(videoUrl).trim();
  // embed URL: youtube.com/embed/ID
  var m = str.match(/youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  // watch URL: ?v=ID or &v=ID
  m = str.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  // short URL: youtu.be/ID
  m = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  // Shorts: youtube.com/shorts/ID
  m = str.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  // Live: youtube.com/live/ID
  m = str.match(/youtube\.com\/live\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  // old /v/ format: youtube.com/v/ID
  m = str.match(/youtube\.com\/v\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  return "";
}

function sanitizeVideoUrl(url) {
  var id = getYouTubeId(url);
  return id ? "https://www.youtube.com/embed/" + id : "";
}

function createBlogCard(post) {
  var ytId = getYouTubeId(post.videoUrl);
  const hasVideo = Boolean(ytId);
  const hasImage = !hasVideo && Boolean(post.image) && /^data:image\//.test(post.image);

  var formattedDate = "";
  if (post.date) {
    try {
      formattedDate = new Date(post.date + "T00:00:00").toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (e) {
      formattedDate = post.date;
    }
  }

  var mediaHtml;
  if (hasVideo) {
    var thumbUrl = "https://img.youtube.com/vi/" + ytId + "/hqdefault.jpg";
    mediaHtml = (
      '<div class="blog-card-media has-video-thumb">' +
        '<img class="video-thumb-img" src="' + escapeHtml(thumbUrl) + '" alt="' + escapeHtml(post.title) + '" loading="lazy">' +
        '<span class="video-play-btn" aria-hidden="true"></span>' +
        '<span class="blog-card-category">' + escapeHtml(post.category) + '</span>' +
      '</div>'
    );
  } else {
    var bgStyle = hasImage
      ? ' style="background-image: url(\'' + escapeHtml(post.image) + '\'); background-size: cover; background-position: center;"'
      : "";
    mediaHtml = (
      '<div class="blog-card-media"' + bgStyle + '>' +
        '<span class="blog-card-category">' + escapeHtml(post.category) + '</span>' +
      '</div>'
    );
  }

  return (
    '<article class="blog-card">' +
      mediaHtml +
      '<div class="blog-card-body">' +
        (formattedDate ? '<time class="blog-card-date">' + escapeHtml(formattedDate) + '</time>' : "") +
        '<h2 class="blog-card-title">' + escapeHtml(post.title) + '</h2>' +
        '<p class="blog-card-excerpt">' + escapeHtml(post.excerpt) + '</p>' +
        '<a class="blog-card-link" href="post.html?id=' + encodeURIComponent(post.id) + '">Read more</a>' +
      '</div>' +
    '</article>'
  );
}

function createPostAdminCard(post) {
  var isVisible = post.visible !== false;
  return (
    '<article class="post-admin-card' + (isVisible ? '' : ' post-admin-card-hidden') + '">' +
      '<div>' +
        '<strong>' + escapeHtml(post.title) + '</strong>' +
        '<span>' + escapeHtml(post.category) + (post.date ? ' &mdash; ' + escapeHtml(post.date) : '') + (isVisible ? '' : ' &mdash; <em>Hidden</em>') + '</span>' +
        '<p>' + escapeHtml(post.excerpt) + '</p>' +
      '</div>' +
      '<div class="post-admin-card-actions">' +
        '<button type="button" class="post-admin-btn" data-edit-post="' + escapeHtml(post.id) + '">Edit</button>' +
        '<button type="button" class="post-admin-btn post-admin-btn-toggle" data-toggle-post-visibility="' + escapeHtml(post.id) + '">' + (isVisible ? 'Hide' : 'Show') + '</button>' +
        '<button type="button" class="post-admin-btn post-admin-btn-delete" data-delete-post="' + escapeHtml(post.id) + '">Delete</button>' +
      '</div>' +
    '</article>'
  );
}

function renderRecipesPage() {
  var grid = document.querySelector("[data-blog-grid]");
  var empty = document.querySelector("[data-blog-empty]");

  if (!grid) {
    return;
  }

  var posts = getPosts().filter(function (p) { return p.visible !== false; });
  var activeFilter = state.activeBlogCategory || "ALL";
  var filtered = activeFilter === "ALL"
    ? posts
    : posts.filter(function (p) { return p.category === activeFilter; });

  var buttons = document.querySelectorAll("[data-blog-filter]");
  buttons.forEach(function (btn) {
    btn.classList.toggle("is-active", btn.getAttribute("data-blog-filter") === activeFilter);
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (empty) {
      empty.removeAttribute("hidden");
    }
    return;
  }

  if (empty) {
    empty.setAttribute("hidden", "");
  }
  grid.innerHTML = filtered.map(createBlogCard).join("");
}

function resetPostForm() {
  var form = document.querySelector("[data-post-form]");
  if (!form) return;
  state.editingPostId = "";
  form.reset();
  if (form.elements.postId) form.elements.postId.value = "";
  var formTitle = form.querySelector("[data-post-form-title]");
  var submitBtn = form.querySelector("[data-post-submit]");
  var cancelBtn = form.querySelector("[data-cancel-post-edit]");
  if (formTitle) formTitle.textContent = "Add a Recipe / Blog Post";
  if (submitBtn) submitBtn.textContent = "Publish Post";
  if (cancelBtn) cancelBtn.setAttribute("hidden", "");
  var previewContainer = document.querySelector("[data-post-image-preview]");
  if (previewContainer) previewContainer.innerHTML = "";
}

function startPostEdit(postId) {
  var form = document.querySelector("[data-post-form]");
  var post = getPosts().find(function (p) { return p.id === postId; });
  if (!form || !post) return;
  state.editingPostId = post.id;
  if (form.elements.postId) form.elements.postId.value = post.id;
  form.elements.title.value = post.title;
  form.elements.category.value = post.category;
  form.elements.date.value = post.date;
  form.elements.excerpt.value = post.excerpt;
  form.elements.body.value = post.body;
  if (form.elements.videoUrl) form.elements.videoUrl.value = post.videoUrl || "";
  var formTitle = form.querySelector("[data-post-form-title]");
  var submitBtn = form.querySelector("[data-post-submit]");
  var cancelBtn = form.querySelector("[data-cancel-post-edit]");
  if (formTitle) formTitle.textContent = "Edit Post";
  if (submitBtn) submitBtn.textContent = "Update Post";
  if (cancelBtn) cancelBtn.removeAttribute("hidden");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handlePostForm() {
  var form = document.querySelector("[data-post-form]");

  if (!form) {
    return;
  }

  var previewContainer = document.querySelector("[data-post-image-preview]");
  var imageInput = form.querySelector("[data-post-image-input]");
  var categorySelect = form.querySelector("[data-post-category]");
  var videoUrlRow = form.querySelector("[data-video-url-row]");
  var videoUrlInput = form.querySelector("[data-post-video-url]");
  var videoPreviewBox = form.querySelector("[data-video-url-preview]");
  var videoThumbImg = form.querySelector("[data-video-thumb-img]");

  function updateVideoRowVisibility() {
    if (!categorySelect || !videoUrlRow) return;
    var isVideo = categorySelect.value === "Video";
    if (isVideo) {
      videoUrlRow.removeAttribute("hidden");
      if (videoUrlInput) videoUrlInput.setAttribute("required", "");
    } else {
      videoUrlRow.setAttribute("hidden", "");
      if (videoUrlInput) {
        videoUrlInput.removeAttribute("required");
        videoUrlInput.value = "";
      }
      if (videoPreviewBox) videoPreviewBox.setAttribute("hidden", "");
    }
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", updateVideoRowVisibility);
    updateVideoRowVisibility();
  }

  if (videoUrlInput && videoPreviewBox && videoThumbImg) {
    function refreshVideoPreview() {
      var ytId = getYouTubeId(videoUrlInput.value);
      if (ytId) {
        videoThumbImg.src = "https://img.youtube.com/vi/" + ytId + "/hqdefault.jpg";
        videoPreviewBox.removeAttribute("hidden");
      } else {
        videoPreviewBox.setAttribute("hidden", "");
        videoThumbImg.src = "";
      }
    }
    videoUrlInput.addEventListener("input", refreshVideoPreview);
    videoUrlInput.addEventListener("paste", function () {
      setTimeout(refreshVideoPreview, 50);
    });
    videoUrlInput.addEventListener("change", refreshVideoPreview);
  }

  if (imageInput && previewContainer) {
    imageInput.addEventListener("change", function () {
      if (imageInput.files && imageInput.files.length) {
        readFilesAsDataUrls(imageInput.files).then(function (images) {
          renderImagePreview(previewContainer, images, "No image selected", true);
        });
      } else {
        renderImagePreview(previewContainer, [], "No image selected", true);
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var title = String(form.elements.title.value || "").trim();
    var category = String(form.elements.category.value || "Recipe").trim();
    var rawDate = String(form.elements.date.value || "").trim();
    var date = rawDate || new Date().toISOString().slice(0, 10);
    var excerpt = String(form.elements.excerpt.value || "").trim();
    var body = String(form.elements.body.value || "").trim();
    var videoUrl = String(form.elements.videoUrl.value || "").trim();

    if (!title || !excerpt) {
      showToast("Please fill in the title and excerpt.");
      return;
    }

    var fileInput = form.querySelector("[data-post-image-input]");

    function finishSave(image) {
      var posts = getPosts();
      var editId = (form.elements.postId ? String(form.elements.postId.value || "").trim() : "") || state.editingPostId;
      try {
        if (editId) {
          posts = posts.map(function (p) {
            if (p.id === editId) {
              return Object.assign({}, p, {
                title: title,
                category: category,
                date: date,
                excerpt: excerpt,
                body: body,
                videoUrl: videoUrl,
                image: image || p.image
              });
            }
            return p;
          });
          savePosts(posts);
          resetPostForm();
          renderAdminPage();
          renderRecipesPage();
          showToast("Post updated.");
        } else {
          posts.unshift({
            id: slugify(title + "-" + Date.now()),
            title: title,
            category: category,
            date: date,
            excerpt: excerpt,
            body: body,
            videoUrl: videoUrl,
            image: image
          });
          savePosts(posts);
          form.reset();
          if (previewContainer) {
            previewContainer.innerHTML = "";
          }
          renderAdminPage();
          renderRecipesPage();
          showToast("Post published.");
        }
      } catch (error) {
        if (isStorageQuotaError(error)) {
          showToast("Save failed: browser storage is full. Try smaller images or clear old content.");
          return;
        }

        console.error(error);
        showToast("Could not save the post right now.");
      }
    }

    if (fileInput && fileInput.files && fileInput.files.length) {
      readAndCompressImageFiles(fileInput.files, IMAGE_COMPRESSION_PROFILES.post).then(function (images) {
        finishSave(images[0] || "");
      }).catch(function () {
        showToast("Unable to read the selected image.");
      });
    } else {
      finishSave("");
    }
  });
}

function formatQuantityOptionsForForm(product) {
  return product.quantityOptions.map(function (option) {
    return option.label + ":" + option.price;
  }).join(", ");
}

function renderImagePreview(target, images, emptyText, circlePreview) {
  if (!target) {
    return;
  }

  const safeImages = normalizeImageList(images);

  if (!safeImages.length) {
    target.innerHTML = '<div class="image-placeholder' + (circlePreview ? " image-placeholder-circle" : "") + '">' + escapeHtml(emptyText) + "</div>";
    return;
  }

  target.innerHTML = safeImages.map(function (image) {
    return '<span class="image-preview-thumb' + (circlePreview ? " image-preview-thumb-circle" : "") + '" style="background-image:url(\'' + escapeHtml(image) + '\');"></span>';
  }).join("");
}

function renderProductFormPreview() {
  renderImagePreview(document.querySelector("[data-product-image-preview]"), state.productFormImages, "No product images selected", false);
}

function renderReviewFormPreview() {
  renderImagePreview(document.querySelector("[data-review-image-preview]"), state.reviewFormImage ? [state.reviewFormImage] : [], "Customer photo", true);
}

function resetProductForm() {
  const form = document.querySelector("[data-product-form]");

  if (!form) {
    return;
  }

  state.editingProductId = "";
  state.productFormImages = [];
  form.reset();
  if (form.elements.productId) {
    form.elements.productId.value = "";
  }
  if (form.elements.art) {
    form.elements.art.value = "art-biryani";
  }
  const title = form.querySelector("[data-product-form-title]");
  const submit = form.querySelector("[data-product-submit]");
  const cancel = form.querySelector("[data-cancel-product-edit]");

  if (title) {
    title.textContent = "Add a Product";
  }
  if (submit) {
    submit.textContent = "Save Product";
  }
  if (cancel) {
    cancel.hidden = true;
  }

  renderProductFormPreview();
}

function startProductEdit(productId) {
  const form = document.querySelector("[data-product-form]");
  const product = getProductById(productId);

  if (!form || !product) {
    return;
  }

  state.editingProductId = product.id;
  state.productFormImages = getProductImages(product);
  form.elements.productId.value = product.id;
  form.elements.name.value = product.name;
  form.elements.category.value = product.category;
  form.elements.quantityOptions.value = formatQuantityOptionsForForm(product);
  form.elements.description.value = product.description;
  form.elements.badge.value = product.badge || "";
  form.elements.art.value = product.art || "art-spices";
  form.elements.images.value = "";

  const title = form.querySelector("[data-product-form-title]");
  const submit = form.querySelector("[data-product-submit]");
  const cancel = form.querySelector("[data-cancel-product-edit]");

  if (title) {
    title.textContent = "Edit Product";
  }
  if (submit) {
    submit.textContent = "Update Product";
  }
  if (cancel) {
    cancel.hidden = false;
  }

  renderProductFormPreview();
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startReviewEdit(reviewId) {
  const form = document.querySelector("[data-review-form]");
  const review = getReviewById(reviewId);

  if (!form) {
    showToast("Review form not found. Please navigate to the reviews section to edit.");
    return;
  }

  if (!review) {
    showToast("Review not found.");
    return;
  }

  state.editingReviewId = review.id;
  state.reviewFormImage = review.image || "";
  form.elements.name.value = review.name;
  form.elements.location.value = review.location;
  form.elements.title.value = review.title;
  form.elements.message.value = review.message;
  form.elements.rating.value = review.rating;
  form.elements.image.value = "";
  const formTitle = form.querySelector("h2");
  const submitButton = form.querySelector('button[type="submit"]');

  if (formTitle) {
    formTitle.textContent = "Edit Review";
  }
  if (submitButton) {
    submitButton.textContent = "Update Review";
  }

  renderReviewFormPreview();
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startInlineReviewEdit(reviewId, cardElement) {
  const review = getReviewById(reviewId);

  if (!review || !cardElement) {
    return;
  }

  cardElement.innerHTML = '<div class="review-admin-top"><div class="reviewer">' + createReviewerPhotoMarkup(review, true) + '<div class="reviewer-meta"><input type="text" value="' + escapeHtml(review.name) + '" placeholder="Name"><div class="reviewer-details"><select><option value="1" ' + (review.rating == 1 ? 'selected' : '') + '>1</option><option value="2" ' + (review.rating == 2 ? 'selected' : '') + '>2</option><option value="3" ' + (review.rating == 3 ? 'selected' : '') + '>3</option><option value="4" ' + (review.rating == 4 ? 'selected' : '') + '>4</option><option value="5" ' + (review.rating == 5 ? 'selected' : '') + '>5</option></select><input type="text" value="' + escapeHtml(review.location) + '" placeholder="Location"></div></div></div><div class="review-admin-actions"><button type="button" data-save-inline-review="' + escapeHtml(review.id) + '">Save</button><button type="button" data-cancel-inline-review>Cancel</button></div></div><input type="text" value="' + escapeHtml(review.title) + '" placeholder="Title"><textarea>' + escapeHtml(review.message) + '</textarea>';
}

function saveInlineReview(button) {
  const reviewId = button.getAttribute("data-save-inline-review");
  const card = button.closest('article');
  const inputs = card.querySelectorAll('input, select, textarea');
  const name = inputs[0].value.trim();
  const rating = Number(inputs[1].value);
  const location = inputs[2].value.trim();
  const title = inputs[3].value.trim();
  const message = inputs[4].value.trim();

  if (!name || !location || !title || !message) {
    showToast("Please complete all review fields.");
    return;
  }

  const reviews = getReviews();
  const updatedReview = {
    id: reviewId,
    name: name,
    location: location,
    title: title,
    message: message,
    rating: rating,
    image: getReviewById(reviewId).image,
    visible: getReviewById(reviewId).visible !== false
  };

  saveReviews(reviews.map(function (review) {
    return review.id === reviewId ? updatedReview : review;
  }));

  renderAdminPage();
  renderReviewsSection();
  showToast("Review updated.");
}

function getProductImages(product) {
  return normalizeImageList(product && product.images);
}

function getProductImageAt(product, index) {
  const images = getProductImages(product);
  const safeIndex = Math.max(0, Math.min(images.length - 1, Number(index) || 0));

  return images[safeIndex] || images[0] || "";
}

function getActiveProductImageIndex(product) {
  const images = getProductImages(product);

  if (!images.length) {
    return 0;
  }

  return Math.max(0, Math.min(images.length - 1, Number(state.productImageIndexes[product.id]) || 0));
}

function setActiveProductImageIndex(productId, index) {
  const product = getProductById(productId);

  if (!product) {
    return;
  }

  const images = getProductImages(product);
  const safeIndex = Math.max(0, Math.min(images.length - 1, Number(index) || 0));
  state.productImageIndexes[productId] = safeIndex;
}

function readFilesAsDataUrls(fileList) {
  const files = Array.prototype.slice.call(fileList || []).filter(function (file) {
    return file && /^image\//.test(file.type || "");
  });

  return Promise.all(files.map(function (file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(String(reader.result || ""));
      };
      reader.onerror = function () {
        reject(new Error("Unable to read image."));
      };
      reader.readAsDataURL(file);
    });
  }));
}

function getProductById(productId) {
  return getCatalog().find(function (product) {
    return product.id === productId;
  });
}

function updateProductFeatured(productId, isFeatured) {
  const catalog = getCatalog();
  const updatedCatalog = catalog.map(function (product) {
    return product.id === productId
      ? { ...product, featured: Boolean(isFeatured) }
      : product;
  });

  saveCatalog(updatedCatalog);
  renderAdminPage();
  renderFeaturedProducts();
}

function updateProductStockStatus(productId, isInStock) {
  const catalog = getCatalog();
  const updatedCatalog = catalog.map(function (product) {
    return product.id === productId
      ? { ...product, inStock: Boolean(isInStock) }
      : product;
  });

  saveCatalog(updatedCatalog);
  renderAdminPage();
  renderProductsPage();
  renderFeaturedProducts();

  if (state.openProductId === productId && !isInStock) {
    closeProductModal();
  }
}

function getOptionById(product, optionId) {
  return product.quantityOptions.find(function (option) {
    return option.id === optionId;
  }) || product.quantityOptions[0];
}

function getSelectedPurchase(productOrId) {
  const product = typeof productOrId === "string" ? getProductById(productOrId) : productOrId;

  if (!product) {
    return null;
  }

  const saved = state.selectedPurchases[product.id] || {};

  return {
    option: getOptionById(product, String(saved.optionId || "")),
    quantity: Math.max(1, Number(saved.quantity) || 1)
  };
}

function setSelectedPurchase(productId, updates) {
  const current = getSelectedPurchase(productId);

  if (!current) {
    return;
  }

  state.selectedPurchases[productId] = {
    optionId: updates.optionId || current.option.id,
    quantity: typeof updates.quantity === "number" ? Math.max(1, updates.quantity) : current.quantity
  };
}

function updateSelectedOption(productId, optionId) {
  setSelectedPurchase(productId, { optionId: optionId });
  renderFeaturedProducts();
  renderProductsPage();
  renderProductModal();
}

function updateSelectedQuantity(productId, changeAmount) {
  const current = getSelectedPurchase(productId);

  if (!current) {
    return;
  }

  setSelectedPurchase(productId, {
    optionId: current.option.id,
    quantity: current.quantity + changeAmount
  });
  renderFeaturedProducts();
  renderProductsPage();
  renderProductModal();
}

function createCartKey(productId, optionId) {
  return productId + "__" + optionId;
}

function normalizeCartItems(items) {
  const catalog = getCatalog();
  const merged = [];

  (Array.isArray(items) ? items : []).forEach(function (item) {
    const productId = String(item && (item.productId || item.id) ? item.productId || item.id : "").trim();
    const product = catalog.find(function (entry) {
      return entry.id === productId;
    });

    if (!product) {
      return;
    }

    const option = getOptionById(product, String(item.optionId || item.variantId || ""));
    const normalized = {
      productId: product.id,
      optionId: option.id,
      quantity: Math.max(1, Number(item.quantity) || 1)
    };
    const existing = merged.find(function (entry) {
      return createCartKey(entry.productId, entry.optionId) === createCartKey(normalized.productId, normalized.optionId);
    });

    if (existing) {
      existing.quantity += normalized.quantity;
    } else {
      merged.push(normalized);
    }
  });

  return merged;
}

function getCart() {
  return normalizeCartItems(safeRead(STORAGE_KEYS.cart, []));
}

function saveCart(items) {
  saveValue(STORAGE_KEYS.cart, normalizeCartItems(items));
  updateCartCount();
}

function clearPendingCheckout() {
  window.localStorage.removeItem(STORAGE_KEYS.pendingCheckout);
}

function clearCustomerDetails(resetForm) {
  window.localStorage.removeItem(STORAGE_KEYS.customerDetails);

  if (resetForm === false) {
    return;
  }

  var form = document.querySelector("[data-customer-form]");
  if (!form) {
    return;
  }

  form.reset();
  renderCustomerForm();
}

function updateCartCount() {
  const total = getCart().reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  document.querySelectorAll("[data-cart-count]").forEach(function (node) {
    if (total > 0) {
      node.textContent = total;
      node.style.display = "inline-grid";
    } else {
      node.textContent = "";
      node.style.display = "none";
    }
  });
}

function parseWeightKg(optionId) {
  // Option IDs can be like "250g", "250 g", "250gm", "1kg", etc.
  // Fall back to 0 if we can't parse it.
  var match = String(optionId).trim().toLowerCase().match(/^(\d+(?:\.\d+)?)(?:\s*)(kg|k?g|gm|g)$/);
  if (!match) {
    return 0;
  }

  var value = parseFloat(match[1]);
  var unit = match[2];

  return unit.includes("kg") ? value : value / 1000;
}

function getCartDetails() {
  const catalog = getCatalog();

  return getCart().map(function (item) {
    const product = catalog.find(function (entry) {
      return entry.id === item.productId;
    });

    if (!product) {
      return null;
    }

    const option = getOptionById(product, item.optionId);

    // Some cart data may store the weight in option label, so fall back to it when needed.
    var weightKg = parseWeightKg(option.id);
    if (!weightKg) {
      weightKg = parseWeightKg(option.label);
    }

    return {
      ...product,
      productId: product.id,
      optionId: option.id,
      optionLabel: option.label,
      unitPrice: option.price,
      quantity: item.quantity,
      lineTotal: option.price * item.quantity,
      weightKg: weightKg
    };
  }).filter(Boolean);
}

const COURIER_RATE_TABLE = {
  kerala: { base: 50, extra: 20 },
  south: { base: 70, extra: 30 },
  west: { base: 90, extra: 35 },
  north: { base: 110, extra: 45 },
  east: { base: 120, extra: 45 },
  northeast: { base: 140, extra: 50 },
  // Fallback for unmapped prefixes.
  national: { base: 120, extra: 45 }
};

function isValidIndianPincode(pincode) {
  return /^\d{6}$/.test(String(pincode || "").trim());
}

function getDeliveryPincode() {
  var form = document.querySelector("[data-customer-form]");
  if (!form) return "";

  var useShipping = form.elements.shippingSame && !form.elements.shippingSame.checked;
  var pincodeField = useShipping ? form.elements.shippingPincode : form.elements.billingPincode;

  return pincodeField ? String(pincodeField.value || "").trim() : "";
}

function isServiceable(pincode) {
  if (!isValidIndianPincode(pincode)) {
    return false;
  }

  var firstDigit = Number(String(pincode).charAt(0));
  return firstDigit >= 1 && firstDigit <= 8;
}

function getZoneFromPincode(pincode) {
  if (!isValidIndianPincode(pincode)) {
    return "national";
  }

  var prefix = Number(String(pincode).slice(0, 2));

  // Check NorthEast first because 78-79 is within East (70-85).
  if (prefix >= 78 && prefix <= 79) {
    return "northeast";
  }

  if (prefix >= 67 && prefix <= 69) {
    return "kerala";
  }

  if (prefix >= 50 && prefix <= 66) {
    return "south";
  }

  if (prefix >= 36 && prefix <= 49) {
    return "west";
  }

  if (prefix >= 11 && prefix <= 35) {
    return "north";
  }

  if (prefix >= 70 && prefix <= 85) {
    return "east";
  }

  return "national";
}

function calculateShipping(weight, zone) {
  var totalWeight = Number(weight);

  if (!Number.isFinite(totalWeight) || totalWeight <= 0) {
    return 0;
  }

  var slabs = Math.ceil(totalWeight / 0.5);
  var selectedZone = String(zone || "national").toLowerCase();
  var rate = COURIER_RATE_TABLE[selectedZone] || COURIER_RATE_TABLE.national;

  var shipping =
    rate.base +
    ((slabs - 1) * rate.extra * 1.3) +
    12;

  return Math.round(shipping);
}

function calculateFinalShipping(pincode, weight) {
  var cleanPincode = String(pincode || "").trim();
  var totalWeight = Number(weight);

  if (!isValidIndianPincode(cleanPincode)) {
    return {
      success: false,
      message: "Please enter a valid pincode"
    };
  }

  if (!isServiceable(cleanPincode)) {
    return {
      success: false,
      message: "Delivery not available to this location"
    };
  }

  if (!Number.isFinite(totalWeight) || totalWeight <= 0) {
    return {
      success: false,
      message: "Please enter a valid weight"
    };
  }

  var zone = getZoneFromPincode(cleanPincode);
  var shipping = calculateShipping(totalWeight, zone);

  return {
    success: true,
    message: "Delivery Available",
    zone: zone,
    slabs: Math.ceil(totalWeight / 0.5),
    shipping: shipping
  };
}

function getCartTotals() {
  const items = getCartDetails();
  const itemCount = items.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);
  const subtotal = items.reduce(function (sum, item) {
    return sum + item.lineTotal;
  }, 0);

  // Total cart weight in kg.
  const totalWeightKg = items.reduce(function (sum, item) {
    return sum + (item.weightKg || 0) * item.quantity;
  }, 0);

  const appliedCoupon = getAppliedCoupon();
  const couponValid = appliedCoupon && (appliedCoupon.minOrderAmount <= 0 || subtotal >= appliedCoupon.minOrderAmount);
  const discount = couponValid
    ? Math.round((subtotal * appliedCoupon.discountPercent) / 100)
    : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);

  var deliveryPincode = getDeliveryPincode();
  var shipping = 0;
  var shippingNote = "";

  if (discountedSubtotal === 0) {
    shipping = 0;
    shippingNote = "Add items to see shipping charges.";
  } else {
    var result = calculateFinalShipping(deliveryPincode, totalWeightKg);

    if (!result.success) {
      shipping = 0;
      shippingNote = result.message;
    } else {
      shipping = result.shipping;
      shippingNote = "Delivery Available | Shipping Charge: " + formatCurrency(shipping);
    }
  }

  return {
    items: items,
    itemCount: itemCount,
    subtotal: subtotal,
    discount: discount,
    discountedSubtotal: discountedSubtotal,
    appliedCoupon: appliedCoupon,
    shipping: shipping,
    total: discountedSubtotal + shipping,
    shippingNote: shippingNote,
    totalWeightKg: totalWeightKg
  };
}

function addToCart(productId) {
  const product = getProductById(productId);
  const selected = getSelectedPurchase(productId);

  if (!product || !selected) {
    return;
  }

  if (product.inStock === false) {
    showToast("This product is sold out right now.");
    return;
  }

  const cart = getCart();
  const existing = cart.find(function (item) {
    return createCartKey(item.productId, item.optionId) === createCartKey(product.id, selected.option.id);
  });

  if (existing) {
    existing.quantity += selected.quantity;
  } else {
    cart.push({
      productId: product.id,
      optionId: selected.option.id,
      quantity: selected.quantity
    });
  }

  saveCart(cart);
  clearPendingCheckout();
  showToast(selected.quantity + " x " + product.name + " (" + selected.option.label + ") added to cart.");
  renderCartPage();

  if (state.openProductId === product.id) {
    closeProductModal();
  }
}

function updateCartQuantity(productId, optionId, changeAmount) {
  saveCart(getCart().map(function (item) {
    return createCartKey(item.productId, item.optionId) === createCartKey(productId, optionId)
      ? { productId: item.productId, optionId: item.optionId, quantity: item.quantity + changeAmount }
      : item;
  }).filter(function (item) {
    return item.quantity > 0;
  }));
  clearPendingCheckout();
  renderCartPage();
}

function removeFromCart(productId, optionId) {
  saveCart(getCart().filter(function (item) {
    return createCartKey(item.productId, item.optionId) !== createCartKey(productId, optionId);
  }));
  clearPendingCheckout();
  renderCartPage();
}

function clearCart() {
  saveCart([]);
  clearAppliedCouponCode();
  clearPendingCheckout();
  clearCustomerDetails();
  renderCartPage();
  showToast("Cart cleared.");
}

function renderOptionMarkup(product, selectedOptionId) {
  return product.quantityOptions.map(function (option) {
    return '<option value="' + escapeHtml(option.id) + '"' + (option.id === selectedOptionId ? ' selected="selected"' : "") + ">" + escapeHtml(option.label) + "</option>";
  }).join("");
}

function getProductVisualAttributes(product, imageIndex) {
  const image = getProductImageAt(product, imageIndex);

  if (image) {
    return {
      className: "product-visual product-visual-uploaded",
      styleAttribute: ' style="background-image:url(\'' + escapeHtml(image) + '\');"'
    };
  }

  return {
    className: "product-visual " + escapeHtml(product.art),
    styleAttribute: ""
  };
}

function createProductImageThumbMarkup(product, image, index, activeIndex) {
  return '<button class="product-image-thumb' + (index === activeIndex ? " is-active" : "") + '" type="button" data-select-product-image="' + escapeHtml(product.id) + '" data-product-image-index="' + escapeHtml(String(index)) + '" aria-label="Show image ' + escapeHtml(String(index + 1)) + '" style="background-image:url(\'' + escapeHtml(image) + '\');"></button>';
}

function createProductVisualMarkup(product, interactive) {
  const activeImageIndex = interactive ? 0 : getActiveProductImageIndex(product);
  const visual = getProductVisualAttributes(product, activeImageIndex);
  const images = getProductImages(product);
  const stockBadgeMarkup = product.inStock === false
    ? '<span class="product-stock-badge">Sold Out</span>'
    : "";
  const thumbnailMarkup = !interactive && images.length > 1
    ? '<div class="product-image-strip">' + images.map(function (image, index) {
      return createProductImageThumbMarkup(product, image, index, activeImageIndex);
    }).join("") + "</div>"
    : "";
  const visualMarkup = '<div class="' + visual.className + '"' + visual.styleAttribute + '><span class="product-badge">' + escapeHtml(product.badge || "Featured") + '</span>' + stockBadgeMarkup + '<div class="product-visual-copy"><p>Spiciti</p><strong>' + escapeHtml(product.name) + '</strong></div></div>' + thumbnailMarkup;

  if (interactive) {
    return '<button class="product-card-trigger" type="button" data-open-product="' + escapeHtml(product.id) + '" aria-label="View ' + escapeHtml(product.name) + ' details">' + visualMarkup + "</button>";
  }

  return '<div class="product-card-trigger-static">' + visualMarkup + "</div>";
}

function createProductBodyMarkup(product) {
  const selected = getSelectedPurchase(product);
  const total = selected.option.price * selected.quantity;
  const isSoldOut = product.inStock === false;
  const priceMarkup = isSoldOut
    ? '<span class="product-price product-price-sold-out">Sold Out</span>'
    : '<span class="product-price">' + formatCurrency(selected.option.price) + '</span>';
  const purchaseMarkup = isSoldOut
    ? '<div class="product-purchase product-purchase-sold-out"><p class="product-stock-note">Currently unavailable. Please check again later.</p></div>'
    : '<div class="product-purchase"><label class="variant-picker"><span>Quantity</span><select class="option-select" data-option-select="' + escapeHtml(product.id) + '">' + renderOptionMarkup(product, selected.option.id) + '</select></label><div class="quantity-picker"><span>Quantity</span><div class="quantity-control"><button type="button" data-change-selected-quantity="' + escapeHtml(product.id) + '" data-selected-quantity-amount="-1">-</button><span>' + escapeHtml(selected.quantity) + '</span><button type="button" data-change-selected-quantity="' + escapeHtml(product.id) + '" data-selected-quantity-amount="1">+</button></div></div><div class="selected-total"><span>Amount</span><strong>' + formatCurrency(total) + '</strong></div></div>';
  const footerMarkup = isSoldOut
    ? '<div class="product-footer product-footer-sold-out"><span class="product-unit">Currently unavailable</span><button class="button button-solid button-sold-out" type="button" disabled>Sold Out</button></div>'
    : '<div class="product-footer"><span class="product-unit">' + escapeHtml(selected.option.label) + ' selected</span><button class="button button-solid" type="button" data-add-to-cart="' + escapeHtml(product.id) + '">Add to Cart</button></div>';

  return '<div class="product-body"><div class="product-meta"><h3>' + escapeHtml(product.name) + '</h3>' + priceMarkup + '</div><p class="product-description">' + escapeHtml(product.description) + '</p>' + purchaseMarkup + footerMarkup + '</div>';
}

function createProductCard(product) {
  return '<article class="product-card' + (product.inStock === false ? ' product-card-sold-out' : '') + '">' + createProductVisualMarkup(product, true) + createProductBodyMarkup(product) + "</article>";
}

function createProductModalMarkup(product) {
  return '<article class="product-card product-card-expanded' + (product.inStock === false ? ' product-card-sold-out' : '') + '">' + createProductVisualMarkup(product, false) + createProductBodyMarkup(product) + "</article>";
}

function renderFeaturedProducts() {
  const target = document.querySelector("[data-featured-products]");
  const previousButton = document.querySelector("[data-featured-nav='prev']");
  const nextButton = document.querySelector("[data-featured-nav='next']");

  if (!target) {
    return;
  }

  const featuredProducts = getCatalog().filter(function (product) {
    return product.featured && product.inStock !== false;
  }).slice(0, 6);
  const perView = getFeaturedProductsPerView();
  const maxStart = Math.max(0, featuredProducts.length - perView);
  const showCarousel = featuredProducts.length > perView;

  state.featuredStart = Math.max(0, Math.min(state.featuredStart, maxStart));

  if (previousButton) {
    previousButton.hidden = !showCarousel;
  }
  if (nextButton) {
    nextButton.hidden = !showCarousel;
  }

  if (!featuredProducts.length) {
    target.innerHTML = '<div class="empty-state">No featured products selected. Use the admin page to mark products as featured.</div>';
    return;
  }

  const visibleProducts = showCarousel
    ? featuredProducts.slice(state.featuredStart, state.featuredStart + perView)
    : featuredProducts;

  target.innerHTML = visibleProducts.map(createProductCard).join("");
}

function getFeaturedProductsPerView() {
  if (window.innerWidth <= 760) {
    return 1;
  }
  return 3;
}

function moveFeaturedProducts(direction) {
  const featuredProducts = getCatalog().filter(function (product) {
    return product.featured && product.inStock !== false;
  }).slice(0, 6);
  const perView = getFeaturedProductsPerView();

  if (featuredProducts.length <= perView) {
    return;
  }

  const maxStart = Math.max(0, featuredProducts.length - perView);

  if (direction === "next") {
    state.featuredStart = state.featuredStart >= maxStart ? 0 : state.featuredStart + 1;
  } else {
    state.featuredStart = state.featuredStart <= 0 ? maxStart : state.featuredStart - 1;
  }

  renderFeaturedProducts();
}

function getReviewInitials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);

  return parts.slice(0, 2).map(function (part) {
    return part.charAt(0).toUpperCase();
  }).join("") || "SP";
}

function getReviewAvatarStyle(name) {
  const palettes = [
    ["#786658", "#4b3c34"],
    ["#8a6c55", "#4f4136"],
    ["#7c5e4f", "#43362d"],
    ["#6d6253", "#3f362d"],
    ["#8a7a65", "#544438"]
  ];
  const hash = String(name || "").split("").reduce(function (sum, character) {
    return sum + character.charCodeAt(0);
  }, 0);
  const palette = palettes[hash % palettes.length];

  return "background: linear-gradient(135deg, " + palette[0] + ", " + palette[1] + ");";
}

function createReviewStars(rating) {
  return new Array(Math.max(1, Math.min(5, Number(rating) || 5)) + 1).join("&#9733;");
}

function createReviewerPhotoMarkup(review, small) {
  const classes = ["reviewer-photo"];

  if (small) {
    classes.push("reviewer-photo-small");
  }

  if (review.image) {
    classes.push("has-photo");
    return '<span class="' + classes.join(" ") + '" style="background-image:url(\'' + escapeHtml(review.image) + '\');" aria-hidden="true"></span>';
  }

  return '<span class="' + classes.join(" ") + '" style="' + escapeHtml(getReviewAvatarStyle(review.name)) + '" aria-hidden="true">' + escapeHtml(getReviewInitials(review.name)) + "</span>";
}

function getReviewsPerView() {
  if (window.innerWidth <= 680) {
    return 1;
  }
  if (window.innerWidth <= 1080) {
    return 2;
  }
  return 3;
}

function createReviewCard(review) {
  return '<article class="review-card"><div class="reviewer">' + createReviewerPhotoMarkup(review, false) + '<div class="reviewer-meta"><strong>' + escapeHtml(review.name) + '</strong><div class="reviewer-details"><span class="review-stars" aria-label="' + escapeHtml(String(review.rating)) + ' out of 5 stars">' + createReviewStars(review.rating) + '</span><span class="review-location">' + escapeHtml(review.location) + '</span></div></div></div><h3 class="review-title">' + escapeHtml(review.title) + '</h3><p class="review-copy">' + escapeHtml(review.message) + "</p></article>";
}

function renderReviewsSection() {
  const grid = document.querySelector("[data-reviews-grid]");
  const previousButton = document.querySelector("[data-review-nav='prev']");
  const nextButton = document.querySelector("[data-review-nav='next']");

  if (!grid) {
    return;
  }

  const reviews = getReviews().filter(function (review) { return review.visible !== false; });
  const showCarousel = reviews.length > 3;
  const perView = getReviewsPerView();
  const maxStart = Math.max(0, reviews.length - perView);

  state.reviewStart = Math.min(maxStart, Math.max(0, state.reviewStart));

  if (previousButton) {
    previousButton.hidden = !showCarousel;
  }
  if (nextButton) {
    nextButton.hidden = !showCarousel;
  }

  if (!reviews.length) {
    grid.innerHTML = '<div class="empty-state">No reviews available yet. Add a few from the admin page.</div>';
    return;
  }

  const visibleReviews = showCarousel
    ? reviews.slice(state.reviewStart, state.reviewStart + perView)
    : reviews;

  grid.innerHTML = visibleReviews.map(createReviewCard).join("");
}

function moveReviews(direction) {
  const reviews = getReviews().filter(function (review) { return review.visible !== false; });
  const perView = getReviewsPerView();

  if (reviews.length <= 3) {
    return;
  }

  const maxStart = Math.max(0, reviews.length - perView);

  if (direction === "next") {
    state.reviewStart = state.reviewStart >= maxStart ? 0 : state.reviewStart + 1;
  } else {
    state.reviewStart = state.reviewStart <= 0 ? maxStart : state.reviewStart - 1;
  }

  renderReviewsSection();
}

function renderCategoryFilters() {
  const target = document.querySelector("[data-category-filters]");

  if (!target) {
    return;
  }

  target.innerHTML = PRODUCT_CATEGORY_OPTIONS.map(function (category) {
    return '<button class="filter-pill' + (state.activeCategory === category ? " is-active" : "") + '" type="button" data-filter-category="' + escapeHtml(category) + '">' + escapeHtml(category) + "</button>";
  }).join("");
}

function renderProductsPage() {
  const target = document.querySelector("[data-products-grid]");

  if (!target) {
    return;
  }

  const catalog = getCatalog();
  renderCategoryFilters();

  const searchTerm = state.searchTerm.trim().toLowerCase();
  const filtered = catalog.filter(function (product) {
    const productCategory = getDisplayCategory(product.category);
    const haystack = [product.name, product.category, productCategory, product.description, product.quantityOptions.map(function (option) {
      return option.label;
    }).join(" ")].join(" ").toLowerCase();

    return (state.activeCategory === "ALL" || productCategory === state.activeCategory) && (!searchTerm || haystack.includes(searchTerm));
  });

  target.innerHTML = filtered.length
    ? filtered.map(createProductCard).join("")
    : '<div class="empty-state">No products matched your search. Try another keyword or category.</div>';
}

function closeProductModal() {
  const modal = document.querySelector("[data-product-modal]");

  state.openProductId = "";

  if (modal) {
    modal.hidden = true;
  }

  document.body.classList.remove("has-modal-open");
}

function renderProductModal() {
  const modal = document.querySelector("[data-product-modal]");
  const content = document.querySelector("[data-product-modal-content]");

  if (!modal || !content) {
    return;
  }

  if (!state.openProductId) {
    modal.hidden = true;
    document.body.classList.remove("has-modal-open");
    return;
  }

  const product = getProductById(state.openProductId);

  if (!product) {
    closeProductModal();
    return;
  }

  content.innerHTML = createProductModalMarkup(product);
  modal.hidden = false;
  document.body.classList.add("has-modal-open");
}

function createCartItem(item) {
  const visual = getProductVisualAttributes(item, 0);

  return '<article class="cart-item"><div class="' + visual.className + '"' + visual.styleAttribute + '></div><div class="cart-item-body"><div class="cart-item-top"><div><h3>' + escapeHtml(item.name) + '</h3></div><strong class="product-price">' + formatCurrency(item.lineTotal) + '</strong></div><span class="product-unit">Quantity: ' + escapeHtml(item.optionLabel) + '</span><div class="cart-controls"><div class="quantity-control"><button type="button" data-change-product="' + escapeHtml(item.productId) + '" data-change-option="' + escapeHtml(item.optionId) + '" data-change-amount="-1">-</button><span>' + escapeHtml(item.quantity) + '</span><button type="button" data-change-product="' + escapeHtml(item.productId) + '" data-change-option="' + escapeHtml(item.optionId) + '" data-change-amount="1">+</button></div><button type="button" class="cart-remove" data-remove-product="' + escapeHtml(item.productId) + '" data-remove-option="' + escapeHtml(item.optionId) + '" aria-label="Remove ' + escapeHtml(item.name) + ' from cart">🗑</button></div></div></article>';
}

function isCustomerDetailsComplete(form) {
  if (!form) {
    return false;
  }

  function hasValidValue(fieldName) {
    var field = form.elements[fieldName];
    if (!field) {
      return false;
    }

    var value = String(field.value || "").trim();
    if (!value) {
      return false;
    }

    if (fieldName === "billingPhone" || fieldName === "shippingPhone") {
      return isValidIndianPhoneNumber(value);
    }

    if (fieldName === "billingPincode" || fieldName === "shippingPincode") {
      return isValidIndianPincode(value);
    }

    return true;
  }

  var requiredBillingFields = [
    "billingName",
    "billingAddress",
    "billingCity",
    "billingDistrict",
    "billingState",
    "billingCountry",
    "billingPincode",
    "billingPhone"
  ];

  var requiredShippingFields = [
    "shippingName",
    "shippingAddress",
    "shippingCity",
    "shippingDistrict",
    "shippingState",
    "shippingCountry",
    "shippingPincode",
    "shippingPhone"
  ];

  var billingComplete = requiredBillingFields.every(function (fieldName) {
    return hasValidValue(fieldName);
  });

  if (!billingComplete) {
    return false;
  }

  var shippingSame = !!(form.elements.shippingSame && form.elements.shippingSame.checked);
  if (shippingSame) {
    return true;
  }

  return requiredShippingFields.every(function (fieldName) {
    return hasValidValue(fieldName);
  });
}

function renderCartPage() {
  const target = document.querySelector("[data-cart-items]");

  if (!target) {
    return;
  }

  const totals = getCartTotals();
  target.innerHTML = totals.items.length
    ? totals.items.map(createCartItem).join("")
    : '<div class="empty-state">Your cart is empty. Add products from the catalog to start an order.</div>';

  const summaryCount = document.querySelector("[data-summary-count]");
  const summarySubtotal = document.querySelector("[data-summary-subtotal]");
  const summaryDiscount = document.querySelector("[data-summary-discount]");
  const summaryDiscountRow = document.querySelector("[data-summary-discount-row]");
  const summaryShipping = document.querySelector("[data-summary-shipping]");
  const summaryTotal = document.querySelector("[data-summary-total]");
  const checkoutLink = document.querySelector("[data-start-checkout]");
  const summaryNote = document.querySelector(".summary-note");
  const customerForm = document.querySelector("[data-customer-form]");
  const couponInput = document.querySelector("[data-coupon-code-input]");
  const couponFeedback = document.querySelector("[data-coupon-feedback]");
  const removeCouponButton = document.querySelector("[data-remove-coupon]");
  const isCustomerReady = isCustomerDetailsComplete(customerForm);
  const canCheckout = totals.items.length > 0 && isCustomerReady;

  if (summaryCount) {
    summaryCount.textContent = totals.itemCount + (totals.itemCount === 1 ? " item" : " items");
  }

  if (summarySubtotal) {
    summarySubtotal.textContent = formatCurrency(totals.subtotal);
  }

  if (summaryDiscount && summaryDiscountRow) {
    summaryDiscount.textContent = "- " + formatCurrency(totals.discount || 0);
    summaryDiscountRow.hidden = !(totals.appliedCoupon && totals.discount > 0);
  }

  if (summaryShipping) {
    summaryShipping.textContent = formatCurrency(totals.shipping);
  }

  if (summaryTotal) {
    summaryTotal.textContent = formatCurrency(totals.total);
  }

  if (couponInput) {
    couponInput.value = totals.appliedCoupon ? totals.appliedCoupon.code : "";
  }

  if (couponFeedback) {
    couponFeedback.textContent = totals.appliedCoupon
      ? "Applied " + totals.appliedCoupon.code + " (" + totals.appliedCoupon.discountPercent + "% off)."
      : "";
  }

  if (removeCouponButton) {
    removeCouponButton.hidden = !totals.appliedCoupon;
  }

  if (summaryNote) {
    summaryNote.textContent = totals.shippingNote;
  }

  if (checkoutLink) {
    checkoutLink.setAttribute("aria-disabled", String(!canCheckout));
    checkoutLink.classList.toggle("is-disabled", !canCheckout);
  }
}

function createInventoryCard(product) {
  const optionsSummary = product.quantityOptions.map(function (option) {
    return option.label + " - " + formatCurrency(option.price);
  }).join(" | ");
  const visual = getProductVisualAttributes(product, 0);
  const imageSummary = getProductImages(product).length ? getProductImages(product).length + " image(s)" : "Artwork theme";

  return '<article class="inventory-card"><div class="' + visual.className + '"' + visual.styleAttribute + '></div><div><h3>' + escapeHtml(product.name) + '</h3><p>' + escapeHtml(product.category) + " | " + escapeHtml(product.badge || "Featured") + '</p><span class="inventory-options">' + escapeHtml(optionsSummary) + '</span><span class="inventory-options">' + escapeHtml(imageSummary) + '</span><label class="featured-toggle"><input type="checkbox" data-featured-toggle="' + escapeHtml(product.id) + '"' + (product.featured ? ' checked' : '') + '> Featured on home page</label><label class="featured-toggle"><input type="checkbox" data-stock-toggle="' + escapeHtml(product.id) + '"' + (product.inStock === false ? ' checked' : '') + '> Out of stock (show Sold Out on product page)</label><div class="inventory-actions"><button type="button" data-edit-product="' + escapeHtml(product.id) + '">Edit</button><button type="button" data-delete-product="' + escapeHtml(product.id) + '">Delete</button></div></div></article>';
}

function createReviewAdminCard(review) {
  var isVisible = review.visible !== false;
  return '<article class="review-admin-card' + (isVisible ? '' : ' review-admin-card-hidden') + '"><div class="review-admin-top"><div class="reviewer">' + createReviewerPhotoMarkup(review, true) + '<div class="reviewer-meta"><strong>' + escapeHtml(review.name) + '</strong><div class="reviewer-details"><span class="review-stars" aria-label="' + escapeHtml(String(review.rating)) + ' out of 5 stars">' + createReviewStars(review.rating) + '</span><span class="review-location">' + escapeHtml(review.location) + '</span></div></div></div><div class="review-admin-actions"><button type="button" class="review-admin-btn" data-edit-review="' + escapeHtml(review.id) + '">Edit</button><button type="button" class="review-admin-btn review-admin-btn-delete" data-delete-review="' + escapeHtml(review.id) + '">Delete</button><label class="review-visibility-toggle"><input type="checkbox" data-toggle-review-visibility="' + escapeHtml(review.id) + '"' + (isVisible ? ' checked' : '') + '> Show on page</label></div></div><h3>' + escapeHtml(review.title) + '</h3><p>' + escapeHtml(review.message) + "</p></article>";
}

function createCouponAdminCard(coupon) {
  const minOrderText = coupon.minOrderAmount > 0
    ? ' | Min. order: ' + formatCurrency(coupon.minOrderAmount)
    : '';
  return '<article class="coupon-admin-card"><div><strong>' + escapeHtml(coupon.code) + '</strong><p>' + escapeHtml(String(coupon.discountPercent)) + '% reduction' + escapeHtml(minOrderText) + '</p></div><button type="button" class="review-admin-btn review-admin-btn-delete" data-delete-coupon="' + escapeHtml(coupon.id) + '">Delete</button></article>';
}

function renderAdminPage() {
  const target = document.querySelector("[data-admin-products]");
  const reviewsTarget = document.querySelector("[data-admin-reviews]");
  const postsTarget = document.querySelector("[data-admin-posts]");
  const couponsTarget = document.querySelector("[data-admin-coupons]");
  const editingProductStillExists = state.editingProductId && getCatalog().some(function (product) {
    return product.id === state.editingProductId;
  });

  if (state.editingProductId && !editingProductStillExists) {
    resetProductForm();
  }

  if (target) {
    target.innerHTML = getCatalog().length
      ? getCatalog().map(createInventoryCard).join("")
      : '<div class="empty-state">No products available. Add a product to get started.</div>';
  }

  if (reviewsTarget) {
    reviewsTarget.innerHTML = getReviews().length
      ? getReviews().map(createReviewAdminCard).join("")
      : '<div class="empty-state">No reviews available. Add a review to show testimonials on the home page.</div>';
  }

  if (postsTarget) {
    postsTarget.innerHTML = getPosts().length
      ? getPosts().map(createPostAdminCard).join("")
      : '<div class="empty-state">No posts yet. Add a recipe or blog post above.</div>';
  }

  if (couponsTarget) {
    couponsTarget.innerHTML = getCoupons().length
      ? getCoupons().map(createCouponAdminCard).join("")
      : '<div class="empty-state">No coupons created yet. Add one from Coupon Settings.</div>';
  }
}

function createOrderReference() {
  const now = new Date();

  return "SPI-" + now.getFullYear() + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0") + "-" + String(Math.floor(Math.random() * 9000) + 1000);
}

function buildPendingCheckout() {
  const totals = getCartTotals();

  if (!totals.items.length) {
    return null;
  }

  return {
    reference: createOrderReference(),
    createdAt: new Date().toISOString(),
    paymentStatus: "Awaiting Payment",
    itemCount: totals.itemCount,
    subtotal: totals.subtotal,
    discount: totals.discount || 0,
    appliedCouponCode: totals.appliedCoupon ? totals.appliedCoupon.code : "",
    shipping: totals.shipping,
    total: totals.total,
    items: totals.items.map(function (item) {
      return {
        name: item.name,
        optionLabel: item.optionLabel,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: item.lineTotal
      };
    })
  };
}

function getPendingCheckout() {
  const checkout = safeRead(STORAGE_KEYS.pendingCheckout, null);

  return checkout && Array.isArray(checkout.items) && checkout.items.length ? checkout : null;
}

function savePendingCheckout(checkout) {
  saveValue(STORAGE_KEYS.pendingCheckout, checkout);
}

function ensurePendingCheckout() {
  const existing = getPendingCheckout();

  if (existing) {
    return existing;
  }

  const created = buildPendingCheckout();

  if (created) {
    savePendingCheckout(created);
  }

  return created;
}

function updatePendingCheckoutStatus(status) {
  const checkout = getPendingCheckout();

  if (!checkout) {
    return null;
  }

  checkout.paymentStatus = status;
  savePendingCheckout(checkout);
  return checkout;
}

function buildUpiUri(settings, checkout) {
  return "upi://pay?" + new URLSearchParams({
    pa: settings.upiId,
    pn: "Spiciti",
    am: checkout.total.toFixed(2),
    tn: "Spiciti Order " + checkout.reference
  }).toString();
}

function getUpiQrImageUrl(upiUri) {
  return "https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=" + encodeURIComponent(upiUri);
}

function buildCheckoutSummaryMarkup(checkout) {
  var discount = Number(checkout.discount) || 0;
  var discountRow = discount > 0
    ? '<div class="summary-row"><span>Discount' + (checkout.appliedCouponCode ? ' (' + escapeHtml(checkout.appliedCouponCode) + ')' : '') + '</span><strong>- ' + formatCurrency(discount) + '</strong></div>'
    : "";

  return '<div class="checkout-summary-list">' + checkout.items.map(function (item) {
    return '<div class="checkout-summary-item"><div><strong>' + escapeHtml(item.name) + '</strong><span>' + escapeHtml(item.optionLabel) + " x " + escapeHtml(item.quantity) + '</span></div><strong>' + formatCurrency(item.lineTotal) + '</strong></div>';
  }).join("") + '</div><div class="checkout-totals"><div class="summary-row"><span>Items</span><strong>' + escapeHtml(checkout.itemCount) + '</strong></div><div class="summary-row"><span>Subtotal</span><strong>' + formatCurrency(checkout.subtotal) + '</strong></div>' + discountRow + '<div class="summary-row"><span>Delivery</span><strong>' + formatCurrency(checkout.shipping) + '</strong></div><div class="summary-row total"><span>Total</span><strong>' + formatCurrency(checkout.total) + "</strong></div></div>";
}

function getCustomerAddressLines(title, customer, prefix) {
  if (!customer || typeof customer !== "object") {
    return [];
  }

  const name = String(customer[prefix + "Name"] || "").trim();
  const address = String(customer[prefix + "Address"] || "").trim();
  const address2 = String(customer[prefix + "Address2"] || "").trim();
  const city = String(customer[prefix + "City"] || "").trim();
  const district = String(customer[prefix + "District"] || "").trim();
  const state = String(customer[prefix + "State"] || "").trim();
  const country = String(customer[prefix + "Country"] || "").trim();
  const pincode = String(customer[prefix + "Pincode"] || "").trim();
  const phone = String(customer[prefix + "Phone"] || "").trim();

  if (!name && !address && !city && !district && !state && !country && !pincode && !phone) {
    return [];
  }

  const lines = [title + " Address:"];
  if (name) {
    lines.push(name);
  }
  if (address) {
    lines.push(address + (address2 ? " " + address2 : ""));
  }

  const cityParts = [];
  if (city) {
    cityParts.push(city);
  }
  if (district) {
    cityParts.push(district);
  }
  if (cityParts.length) {
    lines.push(cityParts.join(", "));
  }

  const stateParts = [];
  if (state) {
    stateParts.push(state);
  }
  if (pincode) {
    stateParts.push(pincode);
  }
  if (stateParts.length) {
    lines.push(stateParts.join(" - "));
  }

  if (country) {
    lines.push(country);
  }
  if (phone) {
    lines.push("Phone: " + phone);
  }

  return lines;
}

function buildCheckoutMessage(checkout, paymentStatus, settings) {
  const customer = safeRead(STORAGE_KEYS.customerDetails, {});
  const shippingSame = customer.shippingSame === true || customer.shippingDifferent === false || !customer.shippingDifferent;
  const name = String(shippingSame ? customer.billingName : customer.shippingName || customer.billingName || "").trim();
  const addressLine1 = String(shippingSame ? customer.billingAddress : customer.shippingAddress || customer.billingAddress || "").trim();
  const addressLine2 = String(shippingSame ? customer.billingAddress2 : customer.shippingAddress2 || customer.billingAddress2 || "").trim();
  const city = String(shippingSame ? customer.billingCity : customer.shippingCity || customer.billingCity || "").trim();
  const district = String(shippingSame ? customer.billingDistrict : customer.shippingDistrict || customer.billingDistrict || "").trim();
  const stateName = String(shippingSame ? customer.billingState : customer.shippingState || customer.billingState || "").trim();
  const pincode = String(shippingSame ? customer.billingPincode : customer.shippingPincode || customer.billingPincode || "").trim();
  const country = String(shippingSame ? customer.billingCountry : customer.shippingCountry || customer.billingCountry || "").trim();

  const addressParts = [addressLine1, addressLine2, city, district, stateName, pincode, country].filter(Boolean);
  const lines = [
    "Hello Spiciti,",
    "",
    "I have completed the payment.",
    "",
    "Order ID: " + checkout.reference,
    "Amount Paid: " + formatCurrency(checkout.total),
    "",
    "Items:"
  ];

  checkout.items.forEach(function (item) {
    lines.push("- " + item.name + " (" + item.optionLabel + ") x" + item.quantity + " = " + formatCurrency(item.lineTotal));
  });

  lines.push(
    "",
    "Please attach the payment screenshot.",
    "",
    "Name: " + (name || ""),
    "Delivery Address: " + addressParts.join(", "),
    "",
    "Payment Status: " + paymentStatus,
    "UPI ID: " + (settings.upiId || "Not configured")
  );

  return lines.join("\n");
}

function captureCustomerDetailsFromForm() {
  var form = document.querySelector("[data-customer-form]");

  if (!form) {
    return null;
  }

  var formData = new FormData(form);
  var shippingSame = !!(form.elements.shippingSame && form.elements.shippingSame.checked);
  var details = {
    billingName: String(formData.get("billingName") || "").trim(),
    billingAddress: String(formData.get("billingAddress") || "").trim(),
    billingAddress2: String(formData.get("billingAddress2") || "").trim(),
    billingCity: String(formData.get("billingCity") || "").trim(),
    billingDistrict: String(formData.get("billingDistrict") || "").trim(),
    billingState: String(formData.get("billingState") || "").trim(),
    billingCountry: String(formData.get("billingCountry") || "").trim(),
    billingPincode: normalizePincode(formData.get("billingPincode")),
    billingPhone: normalizePhoneNumber(formData.get("billingPhone")),
    shippingSame: shippingSame,
    shippingName: String(formData.get("shippingName") || "").trim(),
    shippingAddress: String(formData.get("shippingAddress") || "").trim(),
    shippingAddress2: String(formData.get("shippingAddress2") || "").trim(),
    shippingCity: String(formData.get("shippingCity") || "").trim(),
    shippingDistrict: String(formData.get("shippingDistrict") || "").trim(),
    shippingState: String(formData.get("shippingState") || "").trim(),
    shippingCountry: String(formData.get("shippingCountry") || "").trim(),
    shippingPincode: normalizePincode(formData.get("shippingPincode")),
    shippingPhone: normalizePhoneNumber(formData.get("shippingPhone"))
  };

  if (shippingSame) {
    details.shippingName = details.billingName;
    details.shippingAddress = details.billingAddress;
    details.shippingAddress2 = details.billingAddress2;
    details.shippingCity = details.billingCity;
    details.shippingDistrict = details.billingDistrict;
    details.shippingState = details.billingState;
    details.shippingCountry = details.billingCountry;
    details.shippingPincode = details.billingPincode;
    details.shippingPhone = details.billingPhone;
  }

  saveValue(STORAGE_KEYS.customerDetails, details);
  return details;
}

function getCheckoutDeviceType() {
  var userAgent = navigator.userAgent || "";
  var touchPoints = navigator.maxTouchPoints || 0;
  var isTabletUserAgent = /(ipad|tablet|(android(?!.*mobile)))/i.test(userAgent);
  var isMobileUserAgent = /iphone|ipod|android.*mobile|windows phone/i.test(userAgent);
  var isTouchDesktop = /macintosh/i.test(userAgent) && touchPoints > 1;

  if (isTabletUserAgent || isTouchDesktop) {
    return "tablet";
  }

  if (isMobileUserAgent) {
    return "mobile";
  }

  return "desktop";
}

function clearCheckoutCountdownTimers() {
  if (state.checkoutModal.enableTimerId) {
    clearTimeout(state.checkoutModal.enableTimerId);
    state.checkoutModal.enableTimerId = 0;
  }

  if (state.checkoutModal.altWhatsAppEnableTimerId) {
    clearTimeout(state.checkoutModal.altWhatsAppEnableTimerId);
    state.checkoutModal.altWhatsAppEnableTimerId = 0;
  }

  if (state.checkoutModal.countdownIntervalId) {
    clearInterval(state.checkoutModal.countdownIntervalId);
    state.checkoutModal.countdownIntervalId = 0;
  }

  state.checkoutModal.countdownSecondsLeft = 0;
}

function setCheckoutPaymentStatusLabel(message) {
  var statusNode = document.querySelector("[data-modal-payment-status]");

  if (!statusNode) {
    return;
  }

  statusNode.textContent = message;
}

function setCheckoutCountdownMessage(message) {
  var countdownNode = document.querySelector("[data-modal-countdown]");

  if (!countdownNode) {
    return;
  }

  countdownNode.textContent = message;
}

function setCheckoutModalSendActionLabels(secondsLeft) {
  var sendButton = document.querySelector("[data-modal-send-whatsapp]");
  var altButton = document.querySelector("[data-modal-send-whatsapp-alt]");
  var deviceType = state.checkoutModal.deviceType || getCheckoutDeviceType();
  var isDesktop = deviceType === "desktop";
  var remaining = Math.max(0, Number(secondsLeft) || 0);
  var primaryLabel = isDesktop ? "Send Order via Email" : "Send Order on WhatsApp";

  if (sendButton) {
    sendButton.textContent = remaining > 0
      ? primaryLabel + " (" + remaining + "s)"
      : primaryLabel;
  }

  if (altButton && !altButton.hidden) {
    altButton.textContent = remaining > 0
      ? "Send Order via WhatsApp (" + remaining + "s)"
      : "Send Order via WhatsApp";
  }
}

function setCheckoutModalWhatsAppEnabled(enabled, noteText) {
  var sendButton = document.querySelector("[data-modal-send-whatsapp]");
  var altButton = document.querySelector("[data-modal-send-whatsapp-alt]");

  if (sendButton) {
    sendButton.disabled = !enabled;
    sendButton.setAttribute("aria-disabled", String(!enabled));
  }

  if (altButton && !altButton.hidden) {
    altButton.disabled = !enabled;
    altButton.setAttribute("aria-disabled", String(!enabled));
  }

  setCheckoutModalSendActionLabels(enabled ? 0 : state.checkoutModal.countdownSecondsLeft);

  if (noteText) {
    setCheckoutCountdownMessage(noteText);
  }
}

function startCheckoutConfirmationCountdown(seconds) {
  clearCheckoutCountdownTimers();

  state.checkoutModal.countdownSecondsLeft = Math.max(0, Number(seconds) || 0);
  setCheckoutModalWhatsAppEnabled(false, "You can confirm your order in " + state.checkoutModal.countdownSecondsLeft + " seconds");
  setCheckoutPaymentStatusLabel("Payment Status: Waiting for payment");

  if (!state.checkoutModal.countdownSecondsLeft) {
    setCheckoutModalWhatsAppEnabled(true, "You can confirm your order now.");
    setCheckoutPaymentStatusLabel("Payment Status: Ready to confirm order");
    return;
  }

  state.checkoutModal.countdownIntervalId = window.setInterval(function () {
    state.checkoutModal.countdownSecondsLeft -= 1;

    if (state.checkoutModal.countdownSecondsLeft <= 0) {
      clearCheckoutCountdownTimers();
      setCheckoutModalWhatsAppEnabled(true, "You can confirm your order now.");
      setCheckoutPaymentStatusLabel("Payment Status: Ready to confirm order");
      return;
    }

    setCheckoutModalSendActionLabels(state.checkoutModal.countdownSecondsLeft);
    setCheckoutCountdownMessage("You can confirm your order in " + state.checkoutModal.countdownSecondsLeft + " seconds");
  }, 1000);
}

function buildCheckoutEmailFallbackUrl(checkout, paymentStatus, settings) {
  var subject = "Spiciti Order " + checkout.reference;
  var body = buildCheckoutMessage(checkout, paymentStatus, settings);

  return "mailto:info@spiciti.in?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}

function closeCheckoutPaymentModal() {
  var modal = document.querySelector("[data-payment-modal]");

  clearCheckoutCountdownTimers();

  state.checkoutModal.isOpen = false;
  state.checkoutModal.upiUri = "";
  state.checkoutModal.deviceType = "desktop";
  state.checkoutModal.awaitingVisibilityReturn = false;
  state.checkoutModal.sawHiddenAfterUpiLaunch = false;
  state.checkoutModal.returnedFromUpi = false;

  if (modal) {
    modal.hidden = true;
  }

  document.body.classList.remove("has-payment-modal-open");
}

function openCheckoutPaymentModal(checkout) {
  var modal = document.querySelector("[data-payment-modal]");
  var settings = getStoreSettings();

  if (!modal) {
    return false;
  }

  var orderIdNode = document.querySelector("[data-modal-order-id]");
  var amountNode = document.querySelector("[data-modal-amount]");
  var upiIdNode = document.querySelector("[data-modal-upi-id]");
  var qrImage = document.querySelector("[data-modal-upi-qr]");
  var payButton = document.querySelector("[data-modal-pay-upi]");
  var sendButton = document.querySelector("[data-modal-send-whatsapp]");
  var sendSeparator = document.querySelector("[data-modal-send-separator]");
  var sendWhatsAppAltButton = document.querySelector("[data-modal-send-whatsapp-alt]");
  var noticeNode = document.querySelector("[data-modal-payment-notice]");
  var upiUri = settings.upiId ? buildUpiUri(settings, checkout) : "";
  var deviceType = getCheckoutDeviceType();
  var isPhone = deviceType === "mobile";
  var showExtraWhatsAppOption = deviceType === "desktop" || deviceType === "tablet";
  var initialCountdown = isPhone ? 12 : 20;

  clearCheckoutCountdownTimers();

  if (orderIdNode) {
    orderIdNode.textContent = checkout.reference;
  }
  if (amountNode) {
    amountNode.textContent = formatCurrency(checkout.total);
  }
  if (upiIdNode) {
    upiIdNode.textContent = settings.upiId || "Not configured";
  }
  if (qrImage) {
    qrImage.setAttribute("src", upiUri ? getUpiQrImageUrl(upiUri) : "");
    qrImage.setAttribute("alt", "UPI payment QR code for order " + checkout.reference);
  }
  if (payButton) {
    payButton.disabled = !upiUri;
    payButton.setAttribute("aria-disabled", String(!upiUri));
    payButton.textContent = isPhone ? "Open UPI App" : "Scan via UPI";
  }
  if (sendButton) {
    sendButton.textContent = deviceType === "desktop"
      ? "Send Order via Email"
      : "Send Order on WhatsApp";
  }
  if (sendSeparator) {
    sendSeparator.hidden = !showExtraWhatsAppOption;
  }
  if (sendWhatsAppAltButton) {
    sendWhatsAppAltButton.hidden = !showExtraWhatsAppOption;
    sendWhatsAppAltButton.disabled = false;
    sendWhatsAppAltButton.setAttribute("aria-disabled", "false");
    sendWhatsAppAltButton.textContent = "Send Order via WhatsApp";
  }
  if (noticeNode) {
    noticeNode.textContent = "Select the correct option to send order to us after payment confirmation.";
  }

  if (!upiUri) {
    setCheckoutModalWhatsAppEnabled(false, "UPI ID is not configured. Add it in admin settings to enable payment.");
    setCheckoutPaymentStatusLabel("Payment Status: Waiting for payment");
  } else if (isPhone) {
    setCheckoutModalWhatsAppEnabled(false, "Open your UPI app to complete payment.");
    setCheckoutPaymentStatusLabel("Payment Status: Waiting for payment");
  } else {
    startCheckoutConfirmationCountdown(initialCountdown);
  }

  state.checkoutModal.isOpen = true;
  state.checkoutModal.upiUri = upiUri;
  state.checkoutModal.deviceType = deviceType;
  state.checkoutModal.awaitingVisibilityReturn = false;
  state.checkoutModal.sawHiddenAfterUpiLaunch = false;
  state.checkoutModal.returnedFromUpi = false;

  modal.hidden = false;
  document.body.classList.add("has-payment-modal-open");

  return true;
}

function markCheckoutPaymentConfirmed(source) {
  var label = source || "Payment confirmed.";
  setCheckoutModalWhatsAppEnabled(true, label + " You can confirm your order now.");
  setCheckoutPaymentStatusLabel("Payment Status: Ready to confirm order");
}

function launchUpiAppFromModal() {
  if (!state.checkoutModal.upiUri) {
    showToast("UPI payment is not available right now.");
    return;
  }

  if (state.checkoutModal.deviceType !== "mobile") {
    setCheckoutModalWhatsAppEnabled(false, "Scan the QR with your phone, then confirm when the timer completes.");
    return;
  }

  state.checkoutModal.awaitingVisibilityReturn = true;
  state.checkoutModal.sawHiddenAfterUpiLaunch = false;
  state.checkoutModal.returnedFromUpi = false;
  setCheckoutModalWhatsAppEnabled(false, "Waiting for you to return from the UPI app...");
  window.location.href = state.checkoutModal.upiUri;
}

function handlePaymentVisibilityChange() {
  if (!state.checkoutModal.isOpen || !state.checkoutModal.awaitingVisibilityReturn) {
    return;
  }

  if (document.hidden) {
    state.checkoutModal.sawHiddenAfterUpiLaunch = true;
    return;
  }

  if (!state.checkoutModal.sawHiddenAfterUpiLaunch) {
    return;
  }

  state.checkoutModal.awaitingVisibilityReturn = false;
  state.checkoutModal.returnedFromUpi = true;
  startCheckoutConfirmationCountdown(12);
}

function openOrderConfirmationWithFallback(checkout, paymentStatus, settings) {
  var message = buildCheckoutMessage(checkout, paymentStatus, settings);
  var whatsappUrl = buildWhatsAppUrl(settings.whatsappPhone, message);
  var fallbackEmailUrl = buildCheckoutEmailFallbackUrl(checkout, paymentStatus, settings);
  var deviceType = state.checkoutModal.deviceType || getCheckoutDeviceType();
  var appSwitchDetected = false;
  var popup = null;

  if (deviceType === "desktop") {
    window.location.href = fallbackEmailUrl;
    return;
  }

  if (!whatsappUrl || whatsappUrl === "#") {
    window.location.href = fallbackEmailUrl;
    return;
  }

  if (deviceType === "tablet") {
    var onBlur = function () {
      appSwitchDetected = true;
    };
    var onVisibilityChange = function () {
      if (document.hidden) {
        appSwitchDetected = true;
      }
    };

    window.addEventListener("blur", onBlur, { once: true });
    document.addEventListener("visibilitychange", onVisibilityChange, { once: true });

    popup = window.open(whatsappUrl, "_blank");

    window.setTimeout(function () {
      if (!appSwitchDetected && document.hasFocus() && !document.hidden) {
        window.location.href = fallbackEmailUrl;
      }
    }, 1200);

    if (!popup) {
      window.location.href = fallbackEmailUrl;
    }
    return;
  }

  window.open(whatsappUrl, "_blank");
}

function sendCheckoutOrderOnWhatsApp() {
  var checkout = getPendingCheckout();
  var settings = getStoreSettings();
  var sendButton = document.querySelector("[data-modal-send-whatsapp]");

  if (!checkout) {
    showToast("No checkout details available yet.");
    return;
  }

  if (sendButton && sendButton.disabled) {
    showToast("Please wait for the payment timer to complete.");
    return;
  }

  updatePendingCheckoutStatus("Paid - customer confirmed");
  openOrderConfirmationWithFallback(checkout, "Paid", settings);
}

function sendCheckoutOrderViaWhatsAppDirect() {
  var checkout = getPendingCheckout();
  var settings = getStoreSettings();
  var altButton = document.querySelector("[data-modal-send-whatsapp-alt]");

  if (!checkout) {
    showToast("No checkout details available yet.");
    return;
  }

  if (altButton && altButton.disabled) {
    showToast("Please wait for the payment timer to complete.");
    return;
  }

  updatePendingCheckoutStatus("Paid - customer confirmed");
  window.open(buildWhatsAppUrl(settings.whatsappPhone, buildCheckoutMessage(checkout, "Paid", settings)), "_blank");
}

function setPaymentStatusPill(statusText) {
  const pill = document.querySelector("[data-payment-status]");

  if (!pill) {
    return;
  }

  pill.textContent = statusText;
  pill.classList.toggle("is-paid", statusText.toLowerCase().includes("paid"));
}

function renderCheckoutPage() {
  const summaryTarget = document.querySelector("[data-checkout-summary]");
  const sendPaidOrderButton = document.querySelector("[data-send-paid-order]");
  const sendPendingOrderButton = document.querySelector("[data-send-pending-order]");
  const deviceType = getCheckoutDeviceType();

  if (!summaryTarget) {
    return;
  }

  if (sendPaidOrderButton) {
    sendPaidOrderButton.textContent = deviceType === "desktop"
      ? "Send Paid Order via Email"
      : "Send Paid Order on WhatsApp";
  }

  if (sendPendingOrderButton) {
    sendPendingOrderButton.textContent = deviceType === "desktop"
      ? "Send Pending Order via Email"
      : "Send Pending Order on WhatsApp";
  }

  const checkout = ensurePendingCheckout();
  const settings = getStoreSettings();
  const upiQrImage = document.querySelector("[data-upi-qr]");
  const qrCard = upiQrImage ? upiQrImage.parentElement : null;
  const upiLink = document.querySelector("[data-upi-link]");

  if (!checkout) {
    summaryTarget.innerHTML = '<div class="empty-state">No order is ready for checkout yet. Add products to the cart first.</div>';
    if (qrCard) {
      qrCard.innerHTML = '<div class="empty-state">No checkout details available yet.</div>';
    }
    if (upiLink) {
      upiLink.setAttribute("href", "#");
      upiLink.setAttribute("aria-disabled", "true");
    }
    setPaymentStatusPill("Awaiting Payment");
    return;
  }

  const referenceNode = document.querySelector("[data-order-reference]");
  const upiIdNode = document.querySelector("[data-upi-id]");
  const upiNameNode = document.querySelector("[data-upi-name]");
  const upiAmountNode = document.querySelector("[data-upi-amount]");

  if (referenceNode) {
    referenceNode.textContent = "Order Ref: " + checkout.reference;
  }
  if (upiIdNode) {
    upiIdNode.textContent = settings.upiId || "Not configured";
  }
  if (upiNameNode) {
    upiNameNode.textContent = settings.upiName || "Not configured";
  }
  if (upiAmountNode) {
    upiAmountNode.textContent = formatCurrency(checkout.total);
  }

  setPaymentStatusPill(checkout.paymentStatus || "Awaiting Payment");
  summaryTarget.innerHTML = buildCheckoutSummaryMarkup(checkout);

  if (!settings.upiId) {
    if (qrCard) {
      qrCard.innerHTML = '<div class="empty-state">Add a UPI ID in the admin settings to enable QR checkout.</div>';
    }
    if (upiLink) {
      upiLink.setAttribute("href", "#");
      upiLink.setAttribute("aria-disabled", "true");
    }
    return;
  }

  const upiUri = buildUpiUri(settings, checkout);

  if (upiQrImage) {
    upiQrImage.setAttribute("src", "https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=" + encodeURIComponent(upiUri));
  }
  if (upiLink) {
    upiLink.setAttribute("href", upiUri);
    upiLink.setAttribute("aria-disabled", "false");
  }
}

function parseQuantityOptions(inputValue) {
  return String(inputValue).split(/\r?\n|,/).map(function (entry) {
    return entry.trim();
  }).filter(Boolean).map(function (entry, index) {
    const separatorIndex = entry.lastIndexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    const label = entry.slice(0, separatorIndex).trim();
    const price = Number(entry.slice(separatorIndex + 1).replace(/[^0-9.]/g, ""));

    return label && price ? { id: slugify(label + "-" + (index + 1)), label: label, price: price } : null;
  }).filter(Boolean);
}

function normalizeImportHeader(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeImportRowKeys(rawRow) {
  const normalized = {};

  Object.keys(rawRow || {}).forEach(function (key) {
    const normalizedKey = normalizeImportHeader(key);

    if (normalizedKey && !Object.prototype.hasOwnProperty.call(normalized, normalizedKey)) {
      normalized[normalizedKey] = rawRow[key];
    }
  });

  return normalized;
}

function getImportRowValue(row, aliases) {
  const source = row || {};

  for (let index = 0; index < aliases.length; index += 1) {
    const key = normalizeImportHeader(aliases[index]);
    if (!Object.prototype.hasOwnProperty.call(source, key)) {
      continue;
    }

    const value = String(source[key] == null ? "" : source[key]).trim();
    if (value) {
      return value;
    }
  }

  return "";
}

function parseImportedFeatured(value) {
  const normalized = String(value || "").trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  if (["1", "true", "yes", "y", "featured"].includes(normalized)) {
    return true;
  }

  if (["0", "false", "no", "n", "notfeatured"].includes(normalized)) {
    return false;
  }

  return null;
}

function isImportRowEmpty(row) {
  return !Object.keys(row || {}).some(function (key) {
    return String(row[key] == null ? "" : row[key]).trim();
  });
}

function parseCatalogImportRows(rows) {
  const importedProducts = [];
  const errors = [];

  rows.forEach(function (rawRow, rowIndex) {
    const excelRowNumber = rowIndex + 2;
    const row = normalizeImportRowKeys(rawRow);

    if (isImportRowEmpty(row)) {
      return;
    }

    const name = getImportRowValue(row, ["name", "product name", "product", "item name", "title"]);
    const category = getImportRowValue(row, ["category", "product category"]);
    const description = getImportRowValue(row, ["description", "short description", "details"]);
    const badge = getImportRowValue(row, ["badge", "label", "tag"]);
    const art = getImportRowValue(row, ["art", "artwork theme", "theme", "style"]);
    const explicitId = getImportRowValue(row, ["id", "product id", "sku"]);
    const featuredRaw = getImportRowValue(row, ["featured", "is featured"]);

    let quantityRaw = getImportRowValue(row, ["quantity options", "quantity option", "pack options", "quantityoptions", "options", "sizes"]);

    if (!quantityRaw) {
      const unit = getImportRowValue(row, ["unit", "size", "pack", "quantity"]);
      const price = getImportRowValue(row, ["price", "amount", "rate"]);

      if (unit && price) {
        quantityRaw = unit + ":" + price;
      }
    }

    const quantityOptions = parseQuantityOptions(quantityRaw);

    if (!name || !category || !description || !quantityOptions.length) {
      errors.push("Row " + excelRowNumber + " skipped: Name, Category, Description, and valid Quantity Options are required.");
      return;
    }

    importedProducts.push({
      id: explicitId ? slugify(explicitId) : slugify(name),
      name: name,
      category: category,
      description: description,
      badge: badge || "New",
      art: art || "art-spices",
      quantityOptions: quantityOptions,
      featured: parseImportedFeatured(featuredRaw)
    });
  });

  return {
    products: importedProducts,
    errors: errors
  };
}

function mergeImportedCatalog(importedProducts) {
  const catalog = getCatalog();
  const indexMap = {};

  catalog.forEach(function (product, index) {
    indexMap[product.id] = index;
  });

  importedProducts.forEach(function (importedProduct) {
    const existingIndex = Object.prototype.hasOwnProperty.call(indexMap, importedProduct.id)
      ? indexMap[importedProduct.id]
      : -1;

    if (existingIndex === -1) {
      catalog.unshift({
        ...importedProduct,
        images: [],
        featured: importedProduct.featured === null ? false : importedProduct.featured
      });
      return;
    }

    const existing = catalog[existingIndex];
    catalog[existingIndex] = {
      ...existing,
      ...importedProduct,
      images: Array.isArray(existing.images) ? existing.images : [],
      featured: importedProduct.featured === null ? Boolean(existing.featured) : importedProduct.featured
    };
  });

  saveCatalog(catalog);
  return catalog;
}

function buildSiteBackupPayload() {
  return {
    catalog: getCatalog(),
    reviews: getReviews(),
    settings: getStoreSettings(),
    about: getAboutContent(),
    posts: getPosts(),
    coupons: getCoupons()
  };
}

function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType || "text/plain;charset=utf-8;" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

function downloadSiteBackup() {
  const payload = JSON.stringify(buildSiteBackupPayload(), null, 2);

  downloadTextFile("site-content.json", payload, "application/json;charset=utf-8;");
}

function normalizeBackupPayload(rawBackup) {
  const source = rawBackup && typeof rawBackup === "object" ? rawBackup : {};
  const data = source.data && typeof source.data === "object" ? source.data : source;

  if (!data || typeof data !== "object") {
    throw new Error("Invalid backup structure.");
  }

  return {
    catalog: Array.isArray(data.catalog) ? data.catalog.map(normalizeProduct).filter(Boolean) : getCatalog(),
    reviews: Array.isArray(data.reviews) ? data.reviews.map(normalizeReview).filter(Boolean) : getReviews(),
    settings: normalizeStoreSettings(data.settings || getStoreSettings()),
    about: normalizeAboutContent(data.about || getAboutContent()),
    posts: Array.isArray(data.posts) ? data.posts.map(normalizePost).filter(Boolean) : getPosts(),
    coupons: Array.isArray(data.coupons) ? data.coupons.map(normalizeCoupon).filter(Boolean) : getCoupons()
  };
}

function applySiteBackup(rawBackup) {
  const backup = normalizeBackupPayload(rawBackup);
  runWithoutAutoPublish(function () {
    saveCatalog(backup.catalog);
    saveReviews(backup.reviews);
    saveStoreSettings(backup.settings);
    saveAboutContent(backup.about);
    savePosts(backup.posts);
    saveCoupons(backup.coupons);
  });

  saveCart([]);
  clearAppliedCouponCode();
  clearPendingCheckout();
  clearCustomerDetails();

  state.openProductId = "";
  state.reviewStart = 0;
  state.featuredStart = 0;
  resetProductForm();
  closeProductModal();

  renderSettingsForm();
  renderOfferSettingsForm();
  renderAboutForm();
  renderAboutPageContent();
  renderContactSection();
  renderOfferTicker();
  renderFloatingWhatsAppButton();
  renderFeaturedProducts();
  renderReviewsSection();
  renderProductsPage();
  renderCartPage();
  renderAdminPage();
  renderCheckoutPage();
  renderRecipesPage();
  updateCartCount();
}

function renderGitHubPublishForm() {
  const form = document.querySelector("[data-github-publish-form]");

  if (!form) {
    return;
  }

  const settings = getGitHubPublishSettings();

  form.elements.owner.value = settings.owner;
  form.elements.repo.value = settings.repo;
  form.elements.branch.value = settings.branch;
  form.elements.autoPublish.checked = settings.autoPublish;
  form.elements.token.value = getGitHubPublishToken();

  if (!String(form.elements.commitMessage.value || "").trim()) {
    form.elements.commitMessage.value = "Update site content";
  }
}

function hashString(value) {
  let hash = 5381;
  const text = String(value || "");

  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) + hash) ^ text.charCodeAt(index);
  }

  return (hash >>> 0).toString(16);
}

function parseImageDataUrl(dataUrl) {
  const match = String(dataUrl || "").match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

  if (!match) {
    return null;
  }

  return {
    mime: String(match[1] || "").toLowerCase(),
    base64: String(match[2] || "")
  };
}

function getImageExtensionFromMime(mime) {
  switch (String(mime || "").toLowerCase()) {
    case "image/jpeg":
    case "image/jpg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    default:
      return "jpg";
  }
}

function prepareSiteContentForGitHub(rawContent) {
  const content = JSON.parse(JSON.stringify(rawContent || {}));
  const files = [];
  const seenImages = {};

  function resolveImagePath(imageValue, scope, itemId, suffix) {
    const raw = String(imageValue || "").trim();

    if (!/^data:image\//.test(raw)) {
      return raw;
    }

    if (seenImages[raw]) {
      return seenImages[raw];
    }

    const parsed = parseImageDataUrl(raw);

    if (!parsed) {
      return raw;
    }

    const safeScope = slugify(scope) || "assets";
    const safeId = slugify(itemId || scope) || "image";
    const safeSuffix = suffix ? "-" + slugify(String(suffix)) : "";
    const path = "images/uploads/" + safeScope + "/" + safeId + safeSuffix + "-" + hashString(raw).slice(0, 10) + "." + getImageExtensionFromMime(parsed.mime);

    files.push({
      path: path,
      contentBase64: parsed.base64
    });
    seenImages[raw] = path;

    return path;
  }

  content.catalog = (Array.isArray(content.catalog) ? content.catalog : []).map(function (product) {
    return {
      ...product,
      images: normalizeImageList(product.images).map(function (image, index) {
        return resolveImagePath(image, "products", product.id || product.name, String(index + 1));
      })
    };
  });

  content.reviews = (Array.isArray(content.reviews) ? content.reviews : []).map(function (review) {
    return {
      ...review,
      image: resolveImagePath(review.image, "reviews", review.id || review.name, "avatar")
    };
  });

  content.posts = (Array.isArray(content.posts) ? content.posts : []).map(function (post) {
    return {
      ...post,
      image: resolveImagePath(post.image, "posts", post.id || post.title, "cover")
    };
  });

  content.about = {
    ...(content.about || {})
  };
  content.about.storyImage = resolveImagePath(content.about.storyImage, "about", "story", "image");
  content.about.purposeImage = resolveImagePath(content.about.purposeImage, "about", "purpose", "image");
  content.about.founderImage = resolveImagePath(content.about.founderImage, "about", "founder", "image");

  return {
    content: content,
    files: files
  };
}

function encodeUtf8ToBase64(text) {
  const bytes = new TextEncoder().encode(String(text || ""));
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode.apply(null, Array.prototype.slice.call(bytes, index, index + chunkSize));
  }

  return window.btoa(binary);
}

function buildGitHubRefPath(branch) {
  return String(branch || "main").split("/").map(function (segment) {
    return encodeURIComponent(segment);
  }).join("/");
}

function githubApiRequest(owner, repo, token, endpoint, options) {
  const requestOptions = options || {};

  return window.fetch("https://api.github.com/repos/" + encodeURIComponent(owner) + "/" + encodeURIComponent(repo) + endpoint, {
    method: requestOptions.method || "GET",
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": "Bearer " + token,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json"
    },
    body: requestOptions.body ? JSON.stringify(requestOptions.body) : undefined
  }).then(function (response) {
    return response.text().then(function (text) {
      let payload = null;

      if (text) {
        try {
          payload = JSON.parse(text);
        } catch (error) {
          payload = text;
        }
      }

      if (!response.ok) {
        const message = payload && payload.message ? payload.message : "GitHub request failed.";
        throw new Error(message);
      }

      return payload;
    });
  });
}

function isGitHubFastForwardError(error) {
  const message = String(error && error.message ? error.message : "").toLowerCase();

  return message.includes("not a fast forward")
    || message.includes("update is not a fast forward")
    || message.includes("fast-forward");
}

function syncPublishedContentLocally(content) {
  siteContentCache = content;
  runWithoutAutoPublish(function () {
    saveCatalog(content.catalog || []);
    saveReviews(content.reviews || []);
    saveStoreSettings(content.settings || {});
    saveAboutContent(content.about || {});
    savePosts(content.posts || []);
    saveCoupons(content.coupons || []);
  });
  renderSettingsForm();
  renderOfferSettingsForm();
  renderAboutForm();
  renderAboutPageContent();
  renderContactSection();
  renderOfferTicker();
  renderFloatingWhatsAppButton();
  renderFeaturedProducts();
  renderReviewsSection();
  renderProductsPage();
  renderCartPage();
  renderAdminPage();
  renderCheckoutPage();
  renderRecipesPage();
  updateCartCount();
}

function runWithoutAutoPublish(callback) {
  autoPublishSuspendCount += 1;

  try {
    return callback();
  } finally {
    autoPublishSuspendCount = Math.max(0, autoPublishSuspendCount - 1);
  }
}

function queueAutoPublish(commitMessage) {
  const settings = getGitHubPublishSettings();
  const token = getGitHubPublishToken();

  if (autoPublishSuspendCount > 0 || !settings.autoPublish || !settings.owner || !settings.repo || !token) {
    return;
  }

  window.clearTimeout(autoPublishTimerId);
  autoPublishTimerId = window.setTimeout(function () {
    if (autoPublishInFlight) {
      queueAutoPublish(commitMessage);
      return;
    }

    autoPublishInFlight = true;
    publishSiteContentToGitHub({
      owner: settings.owner,
      repo: settings.repo,
      branch: settings.branch,
      token: token,
      commitMessage: commitMessage || "Auto publish site content"
    }).then(function (publishedContent) {
      runWithoutAutoPublish(function () {
        syncPublishedContentLocally(publishedContent);
      });
      showToast("Changes published to GitHub.");
    }).catch(function (error) {
      console.error(error);
      showToast(error && error.message ? error.message : "Auto publish to GitHub failed.");
    }).finally(function () {
      autoPublishInFlight = false;
    });
  }, 900);
}

function publishSiteContentToGitHub(config) {
  const owner = String(config.owner || "").trim();
  const repo = String(config.repo || "").trim();
  const branch = String(config.branch || "main").trim() || "main";
  const token = String(config.token || "").trim();
  const commitMessage = String(config.commitMessage || "").trim() || "Update site content";
  const prepared = prepareSiteContentForGitHub(buildSiteBackupPayload());
  const refPath = buildGitHubRefPath(branch);

  if (!owner || !repo || !token) {
    return Promise.reject(new Error("GitHub owner, repository, and token are required."));
  }

  function attemptPublish(remainingRetries) {
    return githubApiRequest(owner, repo, token, "/git/ref/heads/" + refPath).then(function (refData) {
      const latestCommitSha = refData && refData.object ? refData.object.sha : "";

      if (!latestCommitSha) {
        throw new Error("Could not find the selected GitHub branch.");
      }

      return githubApiRequest(owner, repo, token, "/git/commits/" + latestCommitSha).then(function (commitData) {
        const baseTreeSha = commitData && commitData.tree ? commitData.tree.sha : "";

        if (!baseTreeSha) {
          throw new Error("Could not read the current repository tree.");
        }

        return Promise.all(prepared.files.map(function (file) {
          return githubApiRequest(owner, repo, token, "/git/blobs", {
            method: "POST",
            body: {
              content: file.contentBase64,
              encoding: "base64"
            }
          }).then(function (blobData) {
            return {
              path: file.path,
              mode: "100644",
              type: "blob",
              sha: blobData.sha
            };
          });
        })).then(function (imageTreeEntries) {
          return githubApiRequest(owner, repo, token, "/git/blobs", {
            method: "POST",
            body: {
              content: encodeUtf8ToBase64(JSON.stringify(prepared.content, null, 2) + "\n"),
              encoding: "base64"
            }
          }).then(function (jsonBlobData) {
            const treeEntries = imageTreeEntries.concat([{
              path: SITE_CONTENT_PATH,
              mode: "100644",
              type: "blob",
              sha: jsonBlobData.sha
            }]);

            return githubApiRequest(owner, repo, token, "/git/trees", {
              method: "POST",
              body: {
                base_tree: baseTreeSha,
                tree: treeEntries
              }
            }).then(function (treeData) {
              return githubApiRequest(owner, repo, token, "/git/commits", {
                method: "POST",
                body: {
                  message: commitMessage,
                  tree: treeData.sha,
                  parents: [latestCommitSha]
                }
              }).then(function (newCommitData) {
                return githubApiRequest(owner, repo, token, "/git/refs/heads/" + refPath, {
                  method: "PATCH",
                  body: {
                    sha: newCommitData.sha,
                    force: false
                  }
                }).then(function () {
                  return prepared.content;
                });
              });
            });
          });
        });
      });
    }).catch(function (error) {
      if (remainingRetries > 0 && isGitHubFastForwardError(error)) {
        return attemptPublish(remainingRetries - 1);
      }

      throw error;
    });
  }

  return attemptPublish(2);
}

function downloadProductImportTemplate() {
  const header = [
    "Name",
    "Category",
    "Description",
    "Quantity Options",
    "Badge",
    "Artwork Theme",
    "Featured",
    "Product ID"
  ];
  const rows = [
    [
      "Premium Biryani Masala",
      "Masalas",
      "Warm, layered spice blend for biryani and curries.",
      "250g:180, 500g:340, 1kg:650",
      "Best Seller",
      "art-biryani",
      "yes",
      "premium-biryani-masala"
    ],
    [
      "Stone Ground Turmeric",
      "Masalas",
      "Golden turmeric powder with earthy depth.",
      "200g:140, 500g:300, 1kg:560",
      "Kitchen Staple",
      "art-gold",
      "no",
      "stone-ground-turmeric"
    ]
  ];

  const csvEscape = function (value) {
    const text = String(value == null ? "" : value);
    return '"' + text.replace(/"/g, '""') + '"';
  };
  const csvContent = [header].concat(rows).map(function (row) {
    return row.map(csvEscape).join(",");
  }).join("\r\n");

  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = "spiciti-product-import-template.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

function handleProductImportForm() {
  const form = document.querySelector("[data-product-import-form]");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = form.elements.catalogFile;
    const selectedFile = fileInput && fileInput.files ? fileInput.files[0] : null;

    if (!selectedFile) {
      showToast("Select a CSV/XLS/XLSX file to import products.");
      return;
    }

    if (typeof window.XLSX === "undefined") {
      showToast("Import parser failed to load. Refresh and try again.");
      return;
    }

    selectedFile.arrayBuffer().then(function (arrayBuffer) {
      const workbook = window.XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];

      if (!sheetName) {
        showToast("The uploaded file has no sheets to import.");
        return;
      }

      const rows = window.XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        defval: "",
        raw: false
      });

      if (!rows.length) {
        showToast("No product rows found. Add header + data rows and try again.");
        return;
      }

      const parsed = parseCatalogImportRows(rows);

      if (!parsed.products.length) {
        showToast(parsed.errors[0] || "No valid products were found in the uploaded file.");
        return;
      }

      mergeImportedCatalog(parsed.products);
      resetProductForm();
      renderAdminPage();
      renderProductsPage();
      renderFeaturedProducts();
      renderProductModal();
      form.reset();

      const importedCount = parsed.products.length;
      const skippedCount = parsed.errors.length;
      const statusText = importedCount + " product" + (importedCount === 1 ? "" : "s") + " imported" + (skippedCount ? ". " + skippedCount + " row" + (skippedCount === 1 ? "" : "s") + " skipped." : ".");
      showToast(statusText);
      if (skippedCount) {
        console.warn("Catalog import skipped rows:\n" + parsed.errors.join("\n"));
      }
    }).catch(function () {
      showToast("Could not read this file. Please upload a valid CSV/XLS/XLSX file.");
    });
  });
}

function handleBackupForm() {
  const form = document.querySelector("[data-backup-form]");
  const exportButton = document.querySelector("[data-export-backup]");

  if (exportButton) {
    exportButton.addEventListener("click", function () {
      downloadSiteBackup();
      showToast("site-content.json downloaded.");
    });
  }

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = form.elements.backupFile;
    const selectedFile = fileInput && fileInput.files ? fileInput.files[0] : null;

    if (!selectedFile) {
      showToast("Select a backup JSON file to restore.");
      return;
    }

    selectedFile.text().then(function (text) {
      let parsed;

      try {
        parsed = JSON.parse(text);
      } catch (error) {
        showToast("The selected file is not a valid JSON backup.");
        return;
      }

      try {
        applySiteBackup(parsed);
      } catch (error) {
        if (isStorageQuotaError(error)) {
          showToast("Restore failed: browser storage is full for this backup.");
          return;
        }

        console.error(error);
        showToast("Could not restore this backup file.");
        return;
      }

      form.reset();
      showToast("Content file restored.");
    }).catch(function () {
      showToast("Could not read the selected backup file.");
    });
  });
}

function handleGitHubPublishForm() {
  const form = document.querySelector("[data-github-publish-form]");

  if (!form) {
    return;
  }

  renderGitHubPublishForm();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const owner = String(form.elements.owner.value || "").trim();
    const repo = String(form.elements.repo.value || "").trim();
    const branch = String(form.elements.branch.value || "main").trim() || "main";
    const autoPublish = form.elements.autoPublish.checked;
    const token = String(form.elements.token.value || "").trim();
    const commitMessage = String(form.elements.commitMessage.value || "").trim() || "Update site content";
    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton ? submitButton.textContent : "";

    if (!owner || !repo || !token) {
      showToast("Enter the GitHub owner, repository, and token to publish.");
      return;
    }

    if (autoPublishInFlight) {
      showToast("A publish is already in progress. Please wait a moment.");
      return;
    }

    saveGitHubPublishSettings({
      owner: owner,
      repo: repo,
      branch: branch,
      autoPublish: autoPublish
    });
    setGitHubPublishToken(token);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Publishing...";
    }

    window.clearTimeout(autoPublishTimerId);
    autoPublishInFlight = true;

    publishSiteContentToGitHub({
      owner: owner,
      repo: repo,
      branch: branch,
      token: token,
      commitMessage: commitMessage
    }).then(function (publishedContent) {
      runWithoutAutoPublish(function () {
        syncPublishedContentLocally(publishedContent);
      });
      showToast("Published to GitHub. GitHub Pages may take a minute to refresh.");
    }).catch(function (error) {
      console.error(error);
      showToast(error && error.message ? error.message : "Could not publish to GitHub.");
    }).finally(function () {
      autoPublishInFlight = false;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel || "Publish to GitHub";
      }
    });
  });
}

function handleSearch() {
  const searchField = document.querySelector("[data-product-search]");
  const searchPanel = document.querySelector("[data-product-search-panel]");

  if (!searchField) {
    return;
  }

  const urlSearchValue = new URLSearchParams(window.location.search).get("search");

  if (!state.searchTerm && urlSearchValue) {
    state.searchTerm = String(urlSearchValue).trim();
    searchField.value = state.searchTerm;
  }

  if ((searchPanel && !state.searchTerm && !window.location.hash) || state.searchTerm) {
    searchPanel.hidden = !state.searchTerm;
  }

  if (window.location.hash === "#product-search") {
    if (searchPanel) {
      searchPanel.hidden = false;
    }
    syncProductCatalogToolbar();
    window.setTimeout(function () {
      searchField.focus();
      searchField.select();
    }, 0);
  }

  searchField.addEventListener("input", function (event) {
    state.searchTerm = event.target.value;
    if (searchPanel) {
      searchPanel.hidden = false;
    }
    syncProductCatalogToolbar();
    renderProductsPage();
  });

  handleProductSearchDismissInteractions();
  syncProductCatalogToolbar();
}

function toggleProductSearchPanel() {
  const panel = document.querySelector("[data-product-search-panel]");
  const searchField = document.querySelector("[data-product-search]");

  if (!panel) {
    return;
  }

  const shouldOpen = panel.hidden;
  panel.hidden = !shouldOpen;
  syncProductCatalogToolbar();

  if (shouldOpen && searchField) {
    window.setTimeout(function () {
      searchField.focus();
      searchField.select();
    }, 0);
  }
}

function closeProductSearchPanelIfEmpty() {
  const panel = document.querySelector("[data-product-search-panel]");
  const searchField = document.querySelector("[data-product-search]");

  if (!panel || panel.hidden || !searchField) {
    return;
  }

  if (String(searchField.value || "").trim() || String(state.searchTerm || "").trim()) {
    return;
  }

  panel.hidden = true;
  syncProductCatalogToolbar();
}

function handleProductSearchDismissInteractions() {
  const searchField = document.querySelector("[data-product-search]");

  if (!searchField) {
    return;
  }

  document.addEventListener("pointerdown", function (event) {
    if (window.innerWidth > 760) {
      return;
    }

    const panel = document.querySelector("[data-product-search-panel]");

    if (!panel || panel.hidden) {
      return;
    }

    if (event.target.closest("[data-product-search-panel]") || event.target.closest("[data-product-search-toggle]")) {
      return;
    }

    closeProductSearchPanelIfEmpty();
  });

  searchField.addEventListener("blur", function () {
    if (window.innerWidth > 760) {
      return;
    }

    window.setTimeout(function () {
      const activeElement = document.activeElement;
      if (activeElement && (activeElement.closest("[data-product-search-panel]") || activeElement.closest("[data-product-search-toggle]"))) {
        return;
      }
      closeProductSearchPanelIfEmpty();
    }, 0);
  });

  window.addEventListener("scroll", function () {
    if (window.innerWidth > 760) {
      return;
    }

    closeProductSearchPanelIfEmpty();
  }, { passive: true });
}

function syncProductCatalogToolbar() {
  const searchPanel = document.querySelector("[data-product-search-panel]");
  const categoryPanel = document.querySelector("[data-category-panel]");

  if (!categoryPanel) {
    return;
  }

  if (window.innerWidth <= 760) {
    categoryPanel.hidden = Boolean(searchPanel && !searchPanel.hidden);
  } else {
    categoryPanel.hidden = false;
  }
}

function toggleCategoryPanel() {
  const panel = document.querySelector("[data-category-panel]");
  const toggle = document.querySelector("[data-category-toggle]");

  if (!panel || !toggle) {
    return;
  }

  const shouldOpen = !panel.classList.contains("is-open");
  panel.classList.toggle("is-open", shouldOpen);
  toggle.setAttribute("aria-expanded", String(shouldOpen));
}

function handleProductForm() {
  const form = document.querySelector("[data-product-form]");

  if (!form) {
    return;
  }

  renderProductFormPreview();

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const quantityOptions = parseQuantityOptions(formData.get("quantityOptions"));

    if (!String(formData.get("name") || "").trim() || !String(formData.get("category") || "").trim() || !String(formData.get("description") || "").trim() || !quantityOptions.length) {
      showToast("Please complete all required fields and add valid quantity options.");
      return;
    }

    const catalog = getCatalog();
    const editingId = String(form.elements.productId.value || state.editingProductId || "").trim();
    let images = state.productFormImages.slice();

    if (form.elements.images.files && form.elements.images.files.length) {
      try {
        images = await readAndCompressImageFiles(form.elements.images.files, IMAGE_COMPRESSION_PROFILES.product);
      } catch (error) {
        showToast("Unable to read one of the selected product images.");
        return;
      }
    }

    let id = editingId || slugify(formData.get("name"));

    if (!editingId && catalog.some(function (product) { return product.id === id; })) {
      id = id + "-" + Date.now();
    }

    const existingProduct = editingId
      ? (catalog.find(function (product) { return product.id === editingId; }) || null)
      : null;

    const normalizedProduct = {
      id: id,
      name: formData.get("name"),
      category: formData.get("category"),
      description: formData.get("description"),
      badge: formData.get("badge") || "New",
      art: formData.get("art") || "art-spices",
      images: images,
      featured: existingProduct ? Boolean(existingProduct.featured) : false,
      inStock: existingProduct ? existingProduct.inStock !== false : true,
      quantityOptions: quantityOptions
    };

    try {
      if (editingId) {
        saveCatalog(catalog.map(function (product) {
          return product.id === editingId ? normalizedProduct : product;
        }));
      } else {
        catalog.unshift(normalizedProduct);
        saveCatalog(catalog);
      }
    } catch (error) {
      if (isStorageQuotaError(error)) {
        showToast("Save failed: browser storage is full. Try fewer or smaller product images.");
        return;
      }

      console.error(error);
      showToast("Could not save the product right now.");
      return;
    }

    resetProductForm();
    renderAdminPage();
    renderProductsPage();
    renderFeaturedProducts();
    renderProductModal();
    showToast(editingId ? "Product updated." : "Product saved with custom pack options.");
  });
}

function handleSettingsForm() {
  const form = document.querySelector("[data-settings-form]");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const current = getStoreSettings();

    saveStoreSettings({
      ...current,
      phone: form.elements.phone.value,
      whatsappPhone: form.elements.whatsappPhone.value,
      upiId: form.elements.upiId.value,
      upiName: form.elements.upiName.value,
      facebookUrl: form.elements.facebookUrl.value,
      instagramUrl: form.elements.instagramUrl.value,
      youtubeUrl: form.elements.youtubeUrl.value,
      twitterUrl: form.elements.twitterUrl.value
    });
    renderSettingsForm();
    renderOfferSettingsForm();
    renderContactSection();
    renderOfferTicker();
    renderCheckoutPage();
    showToast("Store settings saved.");
  });
}

function handleOfferSettingsForm() {
  const form = document.querySelector("[data-offer-settings-form]");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const current = getStoreSettings();

    saveStoreSettings({
      ...current,
      showOfferTicker: form.elements.showOfferTicker.checked,
      offerTickerText: form.elements.offerTickerText.value
    });

    renderOfferSettingsForm();
    renderOfferTicker();
    showToast("Offer settings saved.");
  });
}

function handleCouponForm() {
  const form = document.querySelector("[data-coupon-form]");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const code = normalizeCouponCode(form.elements.couponCode.value);
    const discountPercent = Math.max(0, Math.min(100, Number(form.elements.couponDiscount.value) || 0));
    const minOrderAmount = Math.max(0, Number(form.elements.couponMinOrder.value) || 0);

    if (!code) {
      showToast("Please enter a coupon name.");
      return;
    }

    if (!discountPercent) {
      showToast("Please enter a valid discount percentage.");
      return;
    }

    const coupons = getCoupons();
    const existing = coupons.find(function (coupon) {
      return coupon.code === code;
    });

    const nextCoupons = existing
      ? coupons.map(function (coupon) {
        return coupon.code === code
          ? { ...coupon, discountPercent: Number(discountPercent.toFixed(2)), minOrderAmount: Number(minOrderAmount.toFixed(2)) }
          : coupon;
      })
      : coupons.concat([{
        id: slugify(code + "-" + Date.now()),
        code: code,
        discountPercent: Number(discountPercent.toFixed(2)),
        minOrderAmount: Number(minOrderAmount.toFixed(2))
      }]);

    saveCoupons(nextCoupons);
    form.reset();
    renderAdminPage();
    renderCartPage();
    clearPendingCheckout();
    showToast(existing ? "Coupon updated." : "Coupon added.");
  });
}

function handleReviewForm() {
  const form = document.querySelector("[data-review-form]");

  if (!form) {
    return;
  }

  renderReviewFormPreview();

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = String(form.elements.name.value || "").trim();
    const location = String(form.elements.location.value || "").trim();
    const title = String(form.elements.title.value || "").trim();
    const message = String(form.elements.message.value || "").trim();
    const rating = Number(form.elements.rating.value || 5);
    let image = state.reviewFormImage;
    const editingReviewId = String(state.editingReviewId || "").trim();

    if (!name || !location || !title || !message) {
      showToast("Please complete all review fields.");
      return;
    }

    if (form.elements.image.files && form.elements.image.files.length) {
      try {
        image = (await readAndCompressImageFiles(form.elements.image.files, IMAGE_COMPRESSION_PROFILES.review))[0] || "";
      } catch (error) {
        showToast("Unable to read the selected customer image.");
        return;
      }
    }

    const reviews = getReviews();

    if (editingReviewId) {
      reviews.forEach(function (review) {
        if (review.id === editingReviewId) {
          review.name = name;
          review.location = location;
          review.title = title;
          review.message = message;
          review.rating = rating;
          review.image = image;
        }
      });
    } else {
      reviews.unshift({
        id: slugify(name + "-" + Date.now()),
        name: name,
        location: location,
        title: title,
        message: message,
        rating: rating,
        image: image,
        visible: true
      });
    }

    try {
      saveReviews(reviews);
    } catch (error) {
      if (isStorageQuotaError(error)) {
        showToast("Save failed: browser storage is full. Try a smaller customer image or clear old data.");
        return;
      }

      console.error(error);
      showToast("Could not save the review right now.");
      return;
    }

    state.reviewStart = 0;
    state.editingReviewId = "";
    state.reviewFormImage = "";
    const formTitle = form.querySelector("h2");
    const submitButton = form.querySelector('button[type="submit"]');
    if (formTitle) {
      formTitle.textContent = "Add a Review";
    }
    if (submitButton) {
      submitButton.textContent = "Save Review";
    }
    form.reset();
    form.elements.rating.value = "5";
    renderAdminPage();
    renderReviewsSection();
    renderReviewFormPreview();
    showToast(editingReviewId ? "Review updated." : "Review saved.");
  });
}

function handleContactForm() {
  const form = document.querySelector("[data-contact-form]");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = String(form.elements.name.value || "").trim();
    const replyTo = String(form.elements.replyTo.value || "").trim();
    const message = String(form.elements.message.value || "").trim();

    if (!name || !replyTo || !message) {
      showToast("Please complete the enquiry form.");
      return;
    }

    const subject = "Spiciti enquiry from " + name;
    const body = ["Name: " + name, "Contact: " + replyTo, "", "Enquiry:", message].join("\n");
    window.location.href = "mailto:" + INFO_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    showToast("Your email app is opening with the enquiry details.");
    form.reset();
  });
}

function syncShippingWithBilling(form, useBilling) {
  const shippingFields = form.querySelectorAll(
    "[name=\"shippingName\"], [name=\"shippingAddress\"], [name=\"shippingAddress2\"], [name=\"shippingCity\"], [name=\"shippingDistrict\"], [name=\"shippingState\"], [name=\"shippingCountry\"], [name=\"shippingPincode\"], [name=\"shippingPhone\"]"
  );

  const billingValues = {
    name: form.elements.billingName.value,
    address: form.elements.billingAddress.value,
    address2: form.elements.billingAddress2 ? form.elements.billingAddress2.value : "",
    city: form.elements.billingCity ? form.elements.billingCity.value : "",
    district: form.elements.billingDistrict ? form.elements.billingDistrict.value : "",
    state: form.elements.billingState ? form.elements.billingState.value : "",
    country: form.elements.billingCountry ? form.elements.billingCountry.value : "",
    pincode: form.elements.billingPincode.value,
    phone: form.elements.billingPhone.value
  };

  shippingFields.forEach(function (field) {
    if (useBilling) {
      const key = field.name.replace("shipping", "");
      const valueKey = key.charAt(0).toLowerCase() + key.slice(1);
      field.value = billingValues[valueKey] || "";
      field.disabled = true;
    } else {
      // When shipping is different, keep the section blank for fresh user input.
      field.value = "";
      field.disabled = false;
    }
  });

  if (!useBilling) {
    if (form.elements.shippingCountry) {
      populateCountrySelect(form.elements.shippingCountry, "IN", true);
    }

    if (form.elements.shippingState) {
      populateStateSelect(form.elements.shippingState, form.elements.shippingCountry ? form.elements.shippingCountry.value : "IN", "");
    }
  }
}

function handleCustomerForm() {
  const form = document.querySelector("[data-customer-form]");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const shippingSame = form.elements.shippingSame.checked;
    const formData = new FormData(form);
    const details = {
      billingName: String(formData.get("billingName") || "").trim(),
      billingAddress: String(formData.get("billingAddress") || "").trim(),
      billingAddress2: String(formData.get("billingAddress2") || "").trim(),
      billingCity: String(formData.get("billingCity") || "").trim(),
      billingDistrict: String(formData.get("billingDistrict") || "").trim(),
      billingState: String(formData.get("billingState") || "").trim(),
      billingCountry: String(formData.get("billingCountry") || "").trim(),
      billingPincode: normalizePincode(formData.get("billingPincode")),
      billingPhone: normalizePhoneNumber(formData.get("billingPhone")),
      shippingSame: shippingSame,
      shippingName: String(formData.get("shippingName") || "").trim(),
      shippingAddress: String(formData.get("shippingAddress") || "").trim(),
      shippingAddress2: String(formData.get("shippingAddress2") || "").trim(),
      shippingCity: String(formData.get("shippingCity") || "").trim(),
      shippingDistrict: String(formData.get("shippingDistrict") || "").trim(),
      shippingState: String(formData.get("shippingState") || "").trim(),
      shippingCountry: String(formData.get("shippingCountry") || "").trim(),
      shippingPincode: normalizePincode(formData.get("shippingPincode")),
      shippingPhone: normalizePhoneNumber(formData.get("shippingPhone"))
    };

    if (!details.billingName || !details.billingAddress || !details.billingCity || !details.billingDistrict || !details.billingCountry || !details.billingPincode || !details.billingPhone) {
      showToast("Please complete all billing address fields.");
      return;
    }

    if (form.elements.billingState && !form.elements.billingState.disabled && !details.billingState) {
      showToast("Please select a billing state.");
      return;
    }

    if (!isValidIndianPincode(details.billingPincode)) {
      showToast("Billing pincode must be exactly 6 digits.");
      return;
    }

    if (!isValidIndianPhoneNumber(details.billingPhone)) {
      showToast("Billing phone number must be exactly 10 digits.");
      return;
    }

    if (!shippingSame && (!details.shippingName || !details.shippingAddress || !details.shippingCity || !details.shippingDistrict || !details.shippingCountry || !details.shippingPincode || !details.shippingPhone)) {
      showToast("Please complete all shipping address fields.");
      return;
    }

    if (!shippingSame && form.elements.shippingState && !form.elements.shippingState.disabled && !details.shippingState) {
      showToast("Please select a shipping state.");
      return;
    }

    if (!shippingSame && !isValidIndianPincode(details.shippingPincode)) {
      showToast("Shipping pincode must be exactly 6 digits.");
      return;
    }

    if (!shippingSame && !isValidIndianPhoneNumber(details.shippingPhone)) {
      showToast("Shipping phone number must be exactly 10 digits.");
      return;
    }

    if (shippingSame) {
      details.shippingName = details.billingName;
      details.shippingAddress = details.billingAddress;
      details.shippingAddress2 = details.billingAddress2;
      details.shippingCity = details.billingCity;
      details.shippingDistrict = details.billingDistrict;
      details.shippingState = details.billingState;
      details.shippingCountry = details.billingCountry;
      details.shippingPincode = details.billingPincode;
      details.shippingPhone = details.billingPhone;
    }

    saveValue(STORAGE_KEYS.customerDetails, details);
    renderCartPage();
    showToast("Customer details saved.");
  });
}

function renderCustomerForm() {
  const form = document.querySelector("[data-customer-form]");

  if (!form) {
    return;
  }

  const details = safeRead(STORAGE_KEYS.customerDetails, {});
  form.elements.billingName.value = details.billingName || "";
  form.elements.billingAddress.value = details.billingAddress || "";
  form.elements.billingAddress2.value = details.billingAddress2 || "";
  form.elements.billingCity.value = details.billingCity || "";
  form.elements.billingDistrict.value = details.billingDistrict || "";
  form.elements.billingPincode.value = normalizePincode(details.billingPincode);
  form.elements.billingPhone.value = normalizePhoneNumber(details.billingPhone);

  populateCountrySelect(form.elements.billingCountry, details.billingCountry, true);
  populateStateSelect(form.elements.billingState, form.elements.billingCountry.value, details.billingState);

  // Persisted data may have used shippingDifferent in earlier versions.
  const shippingSame = details.shippingSame === true || !details.shippingDifferent;
  form.elements.shippingSame.checked = shippingSame;

  form.elements.shippingName.value = details.shippingName || "";
  form.elements.shippingAddress.value = details.shippingAddress || "";
  form.elements.shippingAddress2.value = details.shippingAddress2 || "";
  form.elements.shippingCity.value = details.shippingCity || "";
  form.elements.shippingDistrict.value = details.shippingDistrict || "";
  form.elements.shippingPincode.value = normalizePincode(details.shippingPincode);
  form.elements.shippingPhone.value = normalizePhoneNumber(details.shippingPhone);

  populateCountrySelect(form.elements.shippingCountry, details.shippingCountry, true);
  populateStateSelect(form.elements.shippingState, form.elements.shippingCountry.value, details.shippingState);

  const event = new Event("change");
  form.elements.shippingSame.dispatchEvent(event);
}

function handleDocumentChange(event) {
  const optionSelect = event.target.closest("[data-option-select]");
  const productImagesInput = event.target.closest("[data-product-images-input]");
  const reviewImageInput = event.target.closest("[data-review-image-input]");
  const featuredToggle = event.target.closest("[data-featured-toggle]");
  const stockToggle = event.target.closest("[data-stock-toggle]");
  const shippingSameCheckbox = event.target.closest("[name=\"shippingSame\"]");
  const billingCountrySelect = event.target.closest("[name=\"billingCountry\"]");
  const shippingCountrySelect = event.target.closest("[name=\"shippingCountry\"]");

  if (optionSelect) {
    updateSelectedOption(optionSelect.getAttribute("data-option-select"), event.target.value);
  }
  if (productImagesInput) {
    readAndCompressImageFiles(productImagesInput.files, IMAGE_COMPRESSION_PROFILES.product).then(function (images) {
      state.productFormImages = images;
      renderProductFormPreview();
    }).catch(function () {
      showToast("Unable to preview the selected product images.");
    });
  }
  if (reviewImageInput) {
    readAndCompressImageFiles(reviewImageInput.files, IMAGE_COMPRESSION_PROFILES.review).then(function (images) {
      state.reviewFormImage = images[0] || "";
      renderReviewFormPreview();
    }).catch(function () {
      showToast("Unable to preview the selected customer image.");
    });
  }

  if (featuredToggle) {
    updateProductFeatured(featuredToggle.getAttribute("data-featured-toggle"), featuredToggle.checked);
  }
  if (stockToggle) {
    updateProductStockStatus(stockToggle.getAttribute("data-stock-toggle"), !stockToggle.checked);
  }

  if (billingCountrySelect) {
    const form = document.querySelector("[data-customer-form]");
    if (form) {
      populateStateSelect(form.elements.billingState, billingCountrySelect.value);
      if (form.elements.shippingSame.checked) {
        // keep shipping in sync when using billing address
        populateCountrySelect(form.elements.shippingCountry, billingCountrySelect.value, true);
        populateStateSelect(form.elements.shippingState, billingCountrySelect.value);
        syncShippingWithBilling(form, true);
      }
    }
  }

  if (shippingCountrySelect) {
    const form = document.querySelector("[data-customer-form]");
    if (form) {
      populateStateSelect(form.elements.shippingState, shippingCountrySelect.value);
    }
  }

  if (shippingSameCheckbox) {
    const shippingFields = document.querySelector("[data-shipping-fields]");
    if (shippingFields) {
      shippingFields.hidden = shippingSameCheckbox.checked;
    }

    const form = document.querySelector("[data-customer-form]");
    if (form) {
      syncShippingWithBilling(form, shippingSameCheckbox.checked);
    }

    renderCartPage();
  }

  const billingField = event.target.closest(
    "[name=\"billingName\"], [name=\"billingAddress\"], [name=\"billingAddress2\"], [name=\"billingCity\"], [name=\"billingDistrict\"], [name=\"billingState\"], [name=\"billingCountry\"], [name=\"billingPincode\"], [name=\"billingPhone\"]"
  );
  if (billingField) {
    const form = document.querySelector("[data-customer-form]");
    if (form && form.elements.shippingSame.checked) {
      syncShippingWithBilling(form, true);
    }
    renderCartPage();
  }

  // When shipping fields change we need to recalc shipping for the cart totals
  const shippingField = event.target.closest(
    "[name=\"shippingName\"], [name=\"shippingAddress\"], [name=\"shippingAddress2\"], [name=\"shippingCity\"], [name=\"shippingDistrict\"], [name=\"shippingState\"], [name=\"shippingCountry\"], [name=\"shippingPincode\"], [name=\"shippingPhone\"]"
  );

  if (shippingField) {
    renderCartPage();
  }
}

function handleDocumentInput(event) {
  var pincodeField = event.target.closest("[name=\"billingPincode\"], [name=\"shippingPincode\"]");
  if (pincodeField) {
    var normalizedPincode = normalizePincode(pincodeField.value);
    if (pincodeField.value !== normalizedPincode) {
      pincodeField.value = normalizedPincode;
    }
  }

  var phoneField = event.target.closest("[name=\"billingPhone\"], [name=\"shippingPhone\"]");
  if (phoneField) {
    var normalizedPhone = normalizePhoneNumber(phoneField.value);
    if (phoneField.value !== normalizedPhone) {
      phoneField.value = normalizedPhone;
    }
  }

  const addressField = event.target.closest(
    "[name=\"billingName\"], [name=\"billingAddress\"], [name=\"billingAddress2\"], [name=\"billingCity\"], [name=\"billingDistrict\"], [name=\"billingState\"], [name=\"billingCountry\"], [name=\"billingPincode\"], [name=\"billingPhone\"], [name=\"shippingName\"], [name=\"shippingAddress\"], [name=\"shippingAddress2\"], [name=\"shippingCity\"], [name=\"shippingDistrict\"], [name=\"shippingState\"], [name=\"shippingCountry\"], [name=\"shippingPincode\"], [name=\"shippingPhone\"], [name=\"shippingSame\"]"
  );

  if (addressField) {
    renderCartPage();
  }
}

function openWhatsAppOrder(statusText) {
  const checkout = getPendingCheckout();
  const settings = getStoreSettings();

  if (!checkout) {
    showToast("No checkout details available yet.");
    return;
  }

  updatePendingCheckoutStatus(statusText);
  setPaymentStatusPill(statusText);
  openOrderConfirmationWithFallback(checkout, statusText, settings);
}

function startCheckout(destination) {
  const checkout = buildPendingCheckout();

  if (!checkout) {
    showToast("Add items to the cart before checkout.");
    return;
  }

  captureCustomerDetailsFromForm();
  savePendingCheckout(checkout);

  if (openCheckoutPaymentModal(checkout)) {
    return;
  }

  window.location.href = destination || "checkout.html";
}

function toggleContactPanel(toggleButton) {
  const panel = document.querySelector("[data-contact-panel]");

  if (!panel || !toggleButton) {
    return;
  }

  const shouldOpen = panel.hidden;
  panel.hidden = !shouldOpen;
  toggleButton.setAttribute("aria-expanded", String(shouldOpen));
}

function handleDocumentClick(event) {
  const addButton = event.target.closest("[data-add-to-cart]");
  const cartQuantityButton = event.target.closest("[data-change-product]");
  const removeButton = event.target.closest("[data-remove-product]");
  const editProductButton = event.target.closest("[data-edit-product]");
  const deleteProductButton = event.target.closest("[data-delete-product]");
  const deleteReviewButton = event.target.closest("[data-delete-review]");
  const toggleReviewVisibilityButton = event.target.closest("[data-toggle-review-visibility]");
  const deletePostButton = event.target.closest("[data-delete-post]");
  const editPostButton = event.target.closest("[data-edit-post]");
  const togglePostVisibilityButton = event.target.closest("[data-toggle-post-visibility]");
  const cancelPostEditButton = event.target.closest("[data-cancel-post-edit]");
  const blogFilterButton = event.target.closest("[data-blog-filter]");
  const editReviewButton = event.target.closest("[data-edit-review]");
  const saveInlineReviewButton = event.target.closest("[data-save-inline-review]");
  const cancelInlineReviewButton = event.target.closest("[data-cancel-inline-review]");
  const cancelProductEditButton = event.target.closest("[data-cancel-product-edit]");
  const resetAboutContentButton = event.target.closest("[data-reset-about-content]");
  const clearCartButton = event.target.closest("[data-clear-cart]");
  const applyCouponButton = event.target.closest("[data-apply-coupon]");
  const removeCouponButton = event.target.closest("[data-remove-coupon]");
  const deleteCouponButton = event.target.closest("[data-delete-coupon]");
  const resetCatalogButton = event.target.closest("[data-reset-catalog]");
  const downloadTemplateButton = event.target.closest("[data-download-product-template]");
  const filterButton = event.target.closest("[data-filter-category]");
  const openProductButton = event.target.closest("[data-open-product]");
  const closeProductModalButton = event.target.closest("[data-close-product-modal]");
  const selectProductImageButton = event.target.closest("[data-select-product-image]");
  const productSearchToggle = event.target.closest("[data-product-search-toggle]");
  const categoryToggle = event.target.closest("[data-category-toggle]");
  const selectedQuantityButton = event.target.closest("[data-change-selected-quantity]");
  const startCheckoutLink = event.target.closest("[data-start-checkout]");
  const closeCheckoutModalButton = event.target.closest("[data-close-payment-modal]");
  const checkoutModalBackdrop = event.target.closest("[data-payment-modal-backdrop]");
  const payUsingUpiButton = event.target.closest("[data-modal-pay-upi]");
  const sendOrderOnWhatsAppButton = event.target.closest("[data-modal-send-whatsapp]");
  const sendOrderOnWhatsAppAltButton = event.target.closest("[data-modal-send-whatsapp-alt]");
  const sendPaidOrderButton = event.target.closest("[data-send-paid-order]");
  const sendPendingOrderButton = event.target.closest("[data-send-pending-order]");
  const contactToggleButton = event.target.closest("[data-contact-toggle]");
  const reviewNavButton = event.target.closest("[data-review-nav]");
  const featuredNavButton = event.target.closest("[data-featured-nav]");

  if (addButton) {
    addToCart(addButton.getAttribute("data-add-to-cart"));
  }
  if (cartQuantityButton) {
    updateCartQuantity(cartQuantityButton.getAttribute("data-change-product"), cartQuantityButton.getAttribute("data-change-option"), Number(cartQuantityButton.getAttribute("data-change-amount")));
  }
  if (editProductButton) {
    startProductEdit(editProductButton.getAttribute("data-edit-product"));
  }
  if (removeButton) {
    removeFromCart(removeButton.getAttribute("data-remove-product"), removeButton.getAttribute("data-remove-option"));
    showToast("Item removed from cart.");
  }
  if (deleteProductButton) {
    saveCatalog(getCatalog().filter(function (product) {
      return product.id !== deleteProductButton.getAttribute("data-delete-product");
    }));
    renderAdminPage();
    renderProductsPage();
    renderFeaturedProducts();
    showToast("Product removed from local catalog.");
  }
  if (deleteReviewButton) {
    saveReviews(getReviews().filter(function (review) {
      return review.id !== deleteReviewButton.getAttribute("data-delete-review");
    }));
    renderAdminPage();
    renderReviewsSection();
    showToast("Review removed.");
  }
  if (toggleReviewVisibilityButton) {
    var reviewIdToToggle = toggleReviewVisibilityButton.getAttribute("data-toggle-review-visibility");
    var shouldBeVisible = !!toggleReviewVisibilityButton.checked;
    saveReviews(getReviews().map(function (review) {
      return review.id === reviewIdToToggle
        ? Object.assign({}, review, { visible: shouldBeVisible })
        : review;
    }));
    renderAdminPage();
    renderReviewsSection();
    showToast(shouldBeVisible ? "Review is now visible." : "Review is now hidden.");
  }
  if (deletePostButton) {
    savePosts(getPosts().filter(function (post) {
      return post.id !== deletePostButton.getAttribute("data-delete-post");
    }));
    renderAdminPage();
    renderRecipesPage();
    showToast("Post removed.");
  }
  if (editPostButton) {
    startPostEdit(editPostButton.getAttribute("data-edit-post"));
  }
  if (togglePostVisibilityButton) {
    var toggleId = togglePostVisibilityButton.getAttribute("data-toggle-post-visibility");
    var updatedPosts = getPosts().map(function (p) {
      if (p.id === toggleId) {
        return Object.assign({}, p, { visible: p.visible === false });
      }
      return p;
    });
    savePosts(updatedPosts);
    renderAdminPage();
    renderRecipesPage();
    var toggled = updatedPosts.find(function (p) { return p.id === toggleId; });
    showToast(toggled && toggled.visible !== false ? "Post is now visible." : "Post is now hidden.");
  }
  if (cancelPostEditButton) {
    resetPostForm();
  }
  if (blogFilterButton) {
    state.activeBlogCategory = blogFilterButton.getAttribute("data-blog-filter");
    renderRecipesPage();
  }
  if (editReviewButton) {
    startReviewEdit(editReviewButton.getAttribute("data-edit-review"));
  }
  if (saveInlineReviewButton) {
    saveInlineReview(saveInlineReviewButton);
  }
  if (cancelInlineReviewButton) {
    renderAdminPage();
  }
  if (clearCartButton) {
    clearCart();
  }
  if (applyCouponButton) {
    const couponInput = document.querySelector("[data-coupon-code-input]");
    const code = normalizeCouponCode(couponInput ? couponInput.value : "");

    if (!code) {
      showToast("Please enter a coupon code.");
      return;
    }

    const coupon = getCouponByCode(code);

    if (!coupon) {
      showToast("Coupon code is not valid.");
      return;
    }

    if (coupon.minOrderAmount > 0) {
      const totals = getCartTotals();
      if (totals.subtotal < coupon.minOrderAmount) {
        showToast("This coupon requires a minimum order of " + formatCurrency(coupon.minOrderAmount) + ".");
        return;
      }
    }

    saveAppliedCouponCode(coupon.code);
    clearPendingCheckout();
    renderCartPage();
    showToast("Coupon " + coupon.code + " applied.");
  }
  if (removeCouponButton) {
    clearAppliedCouponCode();
    clearPendingCheckout();
    renderCartPage();
    showToast("Coupon removed.");
  }
  if (deleteCouponButton) {
    const couponId = deleteCouponButton.getAttribute("data-delete-coupon");
    const couponToDelete = getCoupons().find(function (coupon) {
      return coupon.id === couponId;
    });

    saveCoupons(getCoupons().filter(function (coupon) {
      return coupon.id !== couponId;
    }));

    if (couponToDelete && normalizeCouponCode(couponToDelete.code) === normalizeCouponCode(getAppliedCouponCode())) {
      clearAppliedCouponCode();
      clearPendingCheckout();
      renderCartPage();
    }

    renderAdminPage();
    showToast("Coupon deleted.");
  }
  if (resetCatalogButton) {
    resetCatalog();
    resetProductForm();
    renderAdminPage();
    renderProductsPage();
    renderFeaturedProducts();
    showToast("Catalog reset to default products.");
  }
  if (downloadTemplateButton) {
    downloadProductImportTemplate();
    showToast("Sample CSV downloaded.");
  }
  if (openProductButton && document.querySelector("[data-product-modal]")) {
    state.openProductId = openProductButton.getAttribute("data-open-product");
    renderProductModal();
  }
  if (closeProductModalButton) {
    closeProductModal();
  }
  if (selectProductImageButton) {
    setActiveProductImageIndex(selectProductImageButton.getAttribute("data-select-product-image"), Number(selectProductImageButton.getAttribute("data-product-image-index")));
    renderProductModal();
  }
  if (filterButton) {
    state.activeCategory = filterButton.getAttribute("data-filter-category");
    if (window.innerWidth <= 760) {
      const categoryPanel = document.querySelector("[data-category-panel]");
      const categoryToggleButton = document.querySelector("[data-category-toggle]");

      if (categoryPanel) {
        categoryPanel.classList.remove("is-open");
      }
      if (categoryToggleButton) {
        categoryToggleButton.setAttribute("aria-expanded", "false");
      }
    }
    renderProductsPage();
  }
  if (productSearchToggle) {
    toggleProductSearchPanel();
  }
  if (categoryToggle) {
    toggleCategoryPanel();
  }
  if (selectedQuantityButton) {
    updateSelectedQuantity(selectedQuantityButton.getAttribute("data-change-selected-quantity"), Number(selectedQuantityButton.getAttribute("data-selected-quantity-amount")));
  }
  if (startCheckoutLink) {
    event.preventDefault();

    const customerForm = document.querySelector("[data-customer-form]");
    if (!isCustomerDetailsComplete(customerForm)) {
      showToast("Please complete all required billing and shipping fields.");
      return;
    }

    startCheckout(startCheckoutLink.getAttribute("href"));
  }
  if (closeCheckoutModalButton || checkoutModalBackdrop) {
    closeCheckoutPaymentModal();
  }
  if (payUsingUpiButton) {
    launchUpiAppFromModal();
  }
  if (sendOrderOnWhatsAppButton) {
    sendCheckoutOrderOnWhatsApp();
  }
  if (sendOrderOnWhatsAppAltButton) {
    sendCheckoutOrderViaWhatsAppDirect();
  }
  if (sendPaidOrderButton) {
    openWhatsAppOrder("Paid - customer marked paid");
  }
  if (sendPendingOrderButton) {
    openWhatsAppOrder("Payment pending");
  }
  if (contactToggleButton) {
    toggleContactPanel(contactToggleButton);
  }
  if (reviewNavButton) {
    moveReviews(reviewNavButton.getAttribute("data-review-nav"));
  }
  if (featuredNavButton) {
    moveFeaturedProducts(featuredNavButton.getAttribute("data-featured-nav"));
  }
  if (cancelProductEditButton) {
    resetProductForm();
  }
  if (resetAboutContentButton) {
    resetAboutContent();
    renderAboutForm();
    renderAboutPageContent();
    showToast("About page content reset to default.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadSiteContentFile().finally(function () {
    initialiseCookieConsent();
    state.appliedCouponCode = getAppliedCouponCode();
    updateCartCount();
    setCurrentYear();
    initialiseNavigation();
    initialiseGlobalSiteSearch();
    renderSettingsForm();
    renderOfferSettingsForm();
    renderAboutForm();
    renderAboutPageContent();
    renderContactSection();
    renderOfferTicker();
    renderFloatingWhatsAppButton();
    renderFeaturedProducts();
    renderReviewsSection();
    renderProductsPage();
    renderCartPage();
    renderAdminPage();
    renderCheckoutPage();
    renderRecipesPage();
    renderGitHubPublishForm();
    handleSearch();
    handleProductForm();
    handleProductImportForm();
    handleBackupForm();
    handleGitHubPublishForm();
    handleSettingsForm();
    handleOfferSettingsForm();
    handleCouponForm();
    handleAboutForm();
    handleReviewForm();
    handlePostForm();
    handleCustomerForm();
    handleContactForm();
    renderCustomerForm();
    renderCartPage();

    // Clear saved customer address data when leaving the cart page
    window.addEventListener("beforeunload", function () {
      clearCustomerDetails(false);
    });

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("change", handleDocumentChange);
    document.addEventListener("input", handleDocumentInput);
    document.addEventListener("visibilitychange", handlePaymentVisibilityChange);
    window.addEventListener("resize", function () {
      renderFeaturedProducts();
      renderProductModal();
      renderReviewsSection();
      syncProductCatalogToolbar();
    });
  });
});
