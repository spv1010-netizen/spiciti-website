const INFO_EMAIL = "Info@spiciti.in";
const STORAGE_KEYS = {
  catalog: "spiciti.catalog.v1",
  cart: "spiciti.cart.v1",
  reviews: "spiciti.reviews.v1",
  settings: "spiciti.settings.v1",
  pendingCheckout: "spiciti.pending-checkout.v1"
};

const DEFAULT_SETTINGS = {
  phone: "+91 90746 41652",
  whatsappPhone: "919074641652",
  upiId: "7736009054@upi",
  upiName: "Spiciti",
  facebookUrl: "",
  instagramUrl: "https://instagram.com/_spiciti",
  youtubeUrl: "",
  twitterUrl: ""
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

const PRODUCT_CATEGORY_OPTIONS = [
  "ALL",
  "SPICES",
  "HERBS",
  "DRY FRUITS & NUTS",
  "FLORAL & HERBAL TEA"
];

const PRODUCT_CATEGORY_MAP = {
  masalas: "SPICES",
  spices: "SPICES",
  "whole spices": "SPICES",
  millets: "SPICES",
  herbs: "HERBS",
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

const state = {
  searchTerm: "",
  activeCategory: "ALL",
  openProductId: "",
  selectedPurchases: {},
  reviewStart: 0,
  productImageIndexes: {},
  editingProductId: "",
  productFormImages: [],
  reviewFormImage: ""
};

function safeRead(key, fallbackValue) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

function saveValue(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0);
}

function getStatesForCountryCode(countryCode) {
  const country = COUNTRY_STATE_DATA[String(countryCode || "").toUpperCase()];
  return (country && Array.isArray(country.states)) ? country.states : [];
}

function populateCountrySelect(select, selectedCode) {
  if (!select) return;
  const value = String(selectedCode || "").toUpperCase();
  select.innerHTML = "<option value=\"\">Select country</option>" +
    COUNTRIES.map(function (c) {
      return (
        "<option value=\"" + c.code + "\"" + (c.code === value ? " selected" : "") + ">" +
        escapeHtml(c.name) +
        "</option>"
      );
    }).join("");
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
  select.innerHTML = "<option value=\">Select state</option>" +
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

  return "https://wa.me/" + phone + (message ? "?text=" + encodeURIComponent(message) : "");
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

  navToggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function normalizeStoreSettings(settings) {
  const raw = settings || {};

  return {
    phone: String(raw.phone || DEFAULT_SETTINGS.phone).trim(),
    whatsappPhone: String(raw.whatsappPhone || DEFAULT_SETTINGS.whatsappPhone).replace(/[^\d]/g, ""),
    upiId: String(raw.upiId || DEFAULT_SETTINGS.upiId).trim(),
    upiName: String(raw.upiName || DEFAULT_SETTINGS.upiName).trim(),
    facebookUrl: String(raw.facebookUrl || "").trim(),
    instagramUrl: String(raw.instagramUrl || DEFAULT_SETTINGS.instagramUrl).trim(),
    youtubeUrl: String(raw.youtubeUrl || "").trim(),
    twitterUrl: String(raw.twitterUrl || "").trim()
  };
}

function getStoreSettings() {
  return normalizeStoreSettings({
    ...DEFAULT_SETTINGS,
    ...safeRead(STORAGE_KEYS.settings, {})
  });
}

function saveStoreSettings(settings) {
  saveValue(STORAGE_KEYS.settings, normalizeStoreSettings(settings));
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
    price: options[0].price,
    unit: options[0].label
  };
}

function getCatalog() {
  const stored = safeRead(STORAGE_KEYS.catalog, null);
  const source = Array.isArray(stored) ? stored : DEFAULT_PRODUCTS;

  return source.map(normalizeProduct).filter(Boolean);
}

function saveCatalog(products) {
  saveValue(STORAGE_KEYS.catalog, products.map(normalizeProduct).filter(Boolean));
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
    image: image
  };
}

function getReviews() {
  const stored = safeRead(STORAGE_KEYS.reviews, null);
  const source = Array.isArray(stored) ? stored : DEFAULT_REVIEWS;

  return source.map(normalizeReview).filter(Boolean);
}

function saveReviews(reviews) {
  saveValue(STORAGE_KEYS.reviews, reviews.map(normalizeReview).filter(Boolean));
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
    image: getReviewById(reviewId).image // keep image
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

function getAddressState() {
  var form = document.querySelector("[data-customer-form]");
  if (!form) return "";

  var useShipping = form.elements.shippingSame && !form.elements.shippingSame.checked;
  var stateField = useShipping ? form.elements.shippingState : form.elements.billingState;

  return stateField ? String(stateField.value || "").trim().toLowerCase() : "";
}

function getCartTotals() {
  const items = getCartDetails();
  const itemCount = items.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);
  const subtotal = items.reduce(function (sum, item) {
    return sum + item.lineTotal;
  }, 0);

  // Total weight + 150g packaging
  const totalWeightKg = items.reduce(function (sum, item) {
    return sum + (item.weightKg || 0) * item.quantity;
  }, 0) + (items.length ? 0.15 : 0);

  var isKerala = getAddressState().includes("kerala");
  var shipping = 0;
  var shippingNote = "";

  if (subtotal === 0) {
    shipping = 0;
    shippingNote = "Add items to see shipping charges.";
  } else if (totalWeightKg > 2) {
    shipping = 0;
    shippingNote = "Total weight exceeds 2kg. Spiciti team will inform you of the courier charge before shipping.";
  } else {
    var weightGrams = totalWeightKg * 1000;
    var zoneLabel = isKerala ? "Kerala" : "Outside Kerala";

    if (weightGrams <= 500) {
      shipping = isKerala ? 50 : 120;
    } else if (weightGrams <= 1000) {
      shipping = isKerala ? 130 : 210;
    } else {
      // up to 2kg
      shipping = isKerala ? 200 : 350;
    }

    shippingNote = "Weight: " + totalWeightKg.toFixed(2) + " kg (incl. 150g packaging). " +
      "Shipping (" + zoneLabel + "): " + formatCurrency(shipping) + ".";
  }

  return {
    items: items,
    itemCount: itemCount,
    subtotal: subtotal,
    shipping: shipping,
    total: subtotal + shipping,
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
  clearPendingCheckout();
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
  const thumbnailMarkup = !interactive && images.length > 1
    ? '<div class="product-image-strip">' + images.map(function (image, index) {
      return createProductImageThumbMarkup(product, image, index, activeImageIndex);
    }).join("") + "</div>"
    : "";
  const visualMarkup = '<div class="' + visual.className + '"' + visual.styleAttribute + '><span class="product-badge">' + escapeHtml(product.badge || "Featured") + '</span><div class="product-visual-copy"><p>Spiciti</p><strong>' + escapeHtml(product.name) + '</strong></div></div>' + thumbnailMarkup;

  if (interactive) {
    return '<button class="product-card-trigger" type="button" data-open-product="' + escapeHtml(product.id) + '" aria-label="View ' + escapeHtml(product.name) + ' details">' + visualMarkup + "</button>";
  }

  return '<div class="product-card-trigger-static">' + visualMarkup + "</div>";
}

function createProductBodyMarkup(product) {
  const selected = getSelectedPurchase(product);
  const total = selected.option.price * selected.quantity;

  return '<div class="product-body"><div class="product-meta"><h3>' + escapeHtml(product.name) + '</h3><span class="product-price">' + formatCurrency(selected.option.price) + '</span></div><p class="product-description">' + escapeHtml(product.description) + '</p><div class="product-purchase"><label class="variant-picker"><span>Pack Size</span><select class="option-select" data-option-select="' + escapeHtml(product.id) + '">' + renderOptionMarkup(product, selected.option.id) + '</select></label><div class="quantity-picker"><span>No. of Packs</span><div class="quantity-control"><button type="button" data-change-selected-quantity="' + escapeHtml(product.id) + '" data-selected-quantity-amount="-1">-</button><span>' + escapeHtml(selected.quantity) + '</span><button type="button" data-change-selected-quantity="' + escapeHtml(product.id) + '" data-selected-quantity-amount="1">+</button></div></div><div class="selected-total"><span>Amount</span><strong>' + formatCurrency(total) + '</strong></div></div><div class="product-footer"><span class="product-unit">' + escapeHtml(selected.option.label) + ' selected</span><button class="button button-solid" type="button" data-add-to-cart="' + escapeHtml(product.id) + '">Add to Cart</button></div></div>';
}

function createProductCard(product) {
  return '<article class="product-card">' + createProductVisualMarkup(product, true) + createProductBodyMarkup(product) + "</article>";
}

function createProductModalMarkup(product) {
  return '<article class="product-card product-card-expanded">' + createProductVisualMarkup(product, false) + createProductBodyMarkup(product) + "</article>";
}

function renderFeaturedProducts() {
  const target = document.querySelector("[data-featured-products]");

  if (target) {
    target.innerHTML = getCatalog().slice(0, 4).map(createProductCard).join("");
  }
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

  const reviews = getReviews();
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
  const reviews = getReviews();
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
  const summaryShipping = document.querySelector("[data-summary-shipping]");
  const summaryTotal = document.querySelector("[data-summary-total]");
  const checkoutLink = document.querySelector("[data-start-checkout]");
  const summaryNote = document.querySelector(".summary-note");

  if (summaryCount) {
    summaryCount.textContent = totals.itemCount + (totals.itemCount === 1 ? " item" : " items");
  }

  if (summarySubtotal) {
    summarySubtotal.textContent = formatCurrency(totals.subtotal);
  }

  if (summaryShipping) {
    summaryShipping.textContent = formatCurrency(totals.shipping);
  }

  if (summaryTotal) {
    summaryTotal.textContent = formatCurrency(totals.total);
  }

  if (summaryNote) {
    summaryNote.textContent = totals.shippingNote;
  }

  if (checkoutLink) {
    checkoutLink.setAttribute("aria-disabled", String(!totals.items.length));
  }
}

function createInventoryCard(product) {
  const optionsSummary = product.quantityOptions.map(function (option) {
    return option.label + " - " + formatCurrency(option.price);
  }).join(" | ");
  const visual = getProductVisualAttributes(product, 0);
  const imageSummary = getProductImages(product).length ? getProductImages(product).length + " image(s)" : "Artwork theme";

  return '<article class="inventory-card"><div class="' + visual.className + '"' + visual.styleAttribute + '></div><div><h3>' + escapeHtml(product.name) + '</h3><p>' + escapeHtml(product.category) + " | " + escapeHtml(product.badge || "Featured") + '</p><span class="inventory-options">' + escapeHtml(optionsSummary) + '</span><span class="inventory-options">' + escapeHtml(imageSummary) + '</span><div class="inventory-actions"><button type="button" data-edit-product="' + escapeHtml(product.id) + '">Edit</button><button type="button" data-delete-product="' + escapeHtml(product.id) + '">Delete</button></div></div></article>';
}

function createReviewAdminCard(review) {
  return '<article class="review-admin-card"><div class="review-admin-top"><div class="reviewer">' + createReviewerPhotoMarkup(review, true) + '<div class="reviewer-meta"><strong>' + escapeHtml(review.name) + '</strong><div class="reviewer-details"><span class="review-stars" aria-label="' + escapeHtml(String(review.rating)) + ' out of 5 stars">' + createReviewStars(review.rating) + '</span><span class="review-location">' + escapeHtml(review.location) + '</span></div></div></div><div class="review-admin-actions"><button type="button" data-edit-review="' + escapeHtml(review.id) + '" style="margin-right: 10px;">Edit</button><button type="button" data-delete-review="' + escapeHtml(review.id) + '">Delete</button></div></div><h3>' + escapeHtml(review.title) + '</h3><p>' + escapeHtml(review.message) + "</p></article>";
}

function renderAdminPage() {
  const target = document.querySelector("[data-admin-products]");
  const reviewsTarget = document.querySelector("[data-admin-reviews]");
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
    pn: settings.upiName,
    am: checkout.total.toFixed(2),
    cu: "INR",
    tn: "Spiciti Order " + checkout.reference,
    tr: checkout.reference
  }).toString();
}

function buildCheckoutSummaryMarkup(checkout) {
  return '<div class="checkout-summary-list">' + checkout.items.map(function (item) {
    return '<div class="checkout-summary-item"><div><strong>' + escapeHtml(item.name) + '</strong><span>' + escapeHtml(item.optionLabel) + " x " + escapeHtml(item.quantity) + '</span></div><strong>' + formatCurrency(item.lineTotal) + '</strong></div>';
  }).join("") + '</div><div class="checkout-totals"><div class="summary-row"><span>Items</span><strong>' + escapeHtml(checkout.itemCount) + '</strong></div><div class="summary-row"><span>Subtotal</span><strong>' + formatCurrency(checkout.subtotal) + '</strong></div><div class="summary-row"><span>Delivery</span><strong>' + formatCurrency(checkout.shipping) + '</strong></div><div class="summary-row total"><span>Total</span><strong>' + formatCurrency(checkout.total) + "</strong></div></div>";
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
  const customer = safeRead("customerDetails", {});
  const billingLines = getCustomerAddressLines("Billing", customer, "billing");
  const shippingLines = getCustomerAddressLines("Shipping", customer, "shipping");
  const sameAddress = customer.shippingSame === true || customer.shippingDifferent === false || !customer.shippingDifferent;

  const lines = [
    "Hello Spiciti, I want to confirm this order.",
    "",
    "Order Ref: " + checkout.reference,
    "Payment Status: " + paymentStatus,
    "Amount: " + formatCurrency(checkout.total),
    "UPI ID: " + (settings.upiId || "Not configured"),
    ""
  ];

  if (billingLines.length) {
    lines.push("Customer details:");
    lines.push.apply(lines, billingLines);
  }

  if (shippingLines.length && !sameAddress) {
    lines.push("");
    lines.push.apply(lines, shippingLines);
  }

  lines.push("", "Items:");

  checkout.items.forEach(function (item) {
    lines.push("- " + item.name + " (" + item.optionLabel + ") x" + item.quantity + " = " + formatCurrency(item.lineTotal));
  });

  lines.push("", "Subtotal: " + formatCurrency(checkout.subtotal), "Delivery: " + formatCurrency(checkout.shipping), "Total: " + formatCurrency(checkout.total));
  return lines.join("\n");
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

  if (!summaryTarget) {
    return;
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

function handleSearch() {
  const searchField = document.querySelector("[data-product-search]");
  const searchPanel = document.querySelector("[data-product-search-panel]");

  if (!searchField) {
    return;
  }

  if ((searchPanel && !state.searchTerm && !window.location.hash) || state.searchTerm) {
    searchPanel.hidden = !state.searchTerm;
  }

  if (window.location.hash === "#product-search") {
    if (searchPanel) {
      searchPanel.hidden = false;
    }
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
    renderProductsPage();
  });
}

function toggleProductSearchPanel() {
  const panel = document.querySelector("[data-product-search-panel]");
  const searchField = document.querySelector("[data-product-search]");

  if (!panel) {
    return;
  }

  const shouldOpen = panel.hidden;
  panel.hidden = !shouldOpen;

  if (shouldOpen && searchField) {
    window.setTimeout(function () {
      searchField.focus();
      searchField.select();
    }, 0);
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
        images = await readFilesAsDataUrls(form.elements.images.files);
      } catch (error) {
        showToast("Unable to read one of the selected product images.");
        return;
      }
    }

    let id = editingId || slugify(formData.get("name"));

    if (!editingId && catalog.some(function (product) { return product.id === id; })) {
      id = id + "-" + Date.now();
    }

    const normalizedProduct = {
      id: id,
      name: formData.get("name"),
      category: formData.get("category"),
      description: formData.get("description"),
      badge: formData.get("badge") || "New",
      art: formData.get("art") || "art-spices",
      images: images,
      quantityOptions: quantityOptions
    };

    if (editingId) {
      saveCatalog(catalog.map(function (product) {
        return product.id === editingId ? normalizedProduct : product;
      }));
    } else {
      catalog.unshift(normalizedProduct);
      saveCatalog(catalog);
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
    saveStoreSettings({
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
    renderContactSection();
    renderCheckoutPage();
    showToast("Store settings saved.");
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

    if (!name || !location || !title || !message) {
      showToast("Please complete all review fields.");
      return;
    }

    if (form.elements.image.files && form.elements.image.files.length) {
      try {
        image = (await readFilesAsDataUrls(form.elements.image.files))[0] || "";
      } catch (error) {
        showToast("Unable to read the selected customer image.");
        return;
      }
    }

    const reviews = getReviews();
    reviews.unshift({
      id: slugify(name + "-" + Date.now()),
      name: name,
      location: location,
      title: title,
      message: message,
      rating: rating,
      image: image
    });

    saveReviews(reviews);
    state.reviewStart = 0;
    state.reviewFormImage = "";
    form.reset();
    form.elements.rating.value = "5";
    renderAdminPage();
    renderReviewsSection();
    renderReviewFormPreview();
    showToast("Review saved.");
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
      field.disabled = false;
    }
  });
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
      billingPincode: String(formData.get("billingPincode") || "").trim(),
      billingPhone: String(formData.get("billingPhone") || "").trim(),
      shippingSame: shippingSame,
      shippingName: String(formData.get("shippingName") || "").trim(),
      shippingAddress: String(formData.get("shippingAddress") || "").trim(),
      shippingAddress2: String(formData.get("shippingAddress2") || "").trim(),
      shippingCity: String(formData.get("shippingCity") || "").trim(),
      shippingDistrict: String(formData.get("shippingDistrict") || "").trim(),
      shippingState: String(formData.get("shippingState") || "").trim(),
      shippingCountry: String(formData.get("shippingCountry") || "").trim(),
      shippingPincode: String(formData.get("shippingPincode") || "").trim(),
      shippingPhone: String(formData.get("shippingPhone") || "").trim()
    };

    if (!details.billingName || !details.billingAddress || !details.billingCity || !details.billingDistrict || !details.billingCountry || !details.billingPincode || !details.billingPhone) {
      showToast("Please complete all billing address fields.");
      return;
    }

    if (form.elements.billingState && !form.elements.billingState.disabled && !details.billingState) {
      showToast("Please select a billing state.");
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

    saveValue("customerDetails", details);
    showToast("Customer details saved.");
  });
}

function renderCustomerForm() {
  const form = document.querySelector("[data-customer-form]");

  if (!form) {
    return;
  }

  const details = safeRead("customerDetails", {});
  form.elements.billingName.value = details.billingName || "";
  form.elements.billingAddress.value = details.billingAddress || "";
  form.elements.billingAddress2.value = details.billingAddress2 || "";
  form.elements.billingCity.value = details.billingCity || "";
  form.elements.billingDistrict.value = details.billingDistrict || "";
  form.elements.billingPincode.value = details.billingPincode || "";
  form.elements.billingPhone.value = details.billingPhone || "";

  populateCountrySelect(form.elements.billingCountry, details.billingCountry);
  populateStateSelect(form.elements.billingState, details.billingCountry, details.billingState);

  // Persisted data may have used shippingDifferent in earlier versions.
  const shippingSame = details.shippingSame === true || !details.shippingDifferent;
  form.elements.shippingSame.checked = shippingSame;

  form.elements.shippingName.value = details.shippingName || "";
  form.elements.shippingAddress.value = details.shippingAddress || "";
  form.elements.shippingAddress2.value = details.shippingAddress2 || "";
  form.elements.shippingCity.value = details.shippingCity || "";
  form.elements.shippingDistrict.value = details.shippingDistrict || "";
  form.elements.shippingPincode.value = details.shippingPincode || "";
  form.elements.shippingPhone.value = details.shippingPhone || "";

  populateCountrySelect(form.elements.shippingCountry, details.shippingCountry);
  populateStateSelect(form.elements.shippingState, details.shippingCountry, details.shippingState);

  const event = new Event("change");
  form.elements.shippingSame.dispatchEvent(event);
}

function handleDocumentChange(event) {
  const optionSelect = event.target.closest("[data-option-select]");
  const productImagesInput = event.target.closest("[data-product-images-input]");
  const reviewImageInput = event.target.closest("[data-review-image-input]");
  const shippingSameCheckbox = event.target.closest("[name=\"shippingSame\"]");
  const billingCountrySelect = event.target.closest("[name=\"billingCountry\"]");
  const shippingCountrySelect = event.target.closest("[name=\"shippingCountry\"]");

  if (optionSelect) {
    updateSelectedOption(optionSelect.getAttribute("data-option-select"), event.target.value);
  }
  if (productImagesInput) {
    readFilesAsDataUrls(productImagesInput.files).then(function (images) {
      state.productFormImages = images;
      renderProductFormPreview();
    }).catch(function () {
      showToast("Unable to preview the selected product images.");
    });
  }
  if (reviewImageInput) {
    readFilesAsDataUrls(reviewImageInput.files).then(function (images) {
      state.reviewFormImage = images[0] || "";
      renderReviewFormPreview();
    }).catch(function () {
      showToast("Unable to preview the selected customer image.");
    });
  }

  if (billingCountrySelect) {
    const form = document.querySelector("[data-customer-form]");
    if (form) {
      populateStateSelect(form.elements.billingState, billingCountrySelect.value);
      if (form.elements.shippingSame.checked) {
        // keep shipping in sync when using billing address
        populateCountrySelect(form.elements.shippingCountry, billingCountrySelect.value);
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

function openWhatsAppOrder(statusText) {
  const checkout = getPendingCheckout();
  const settings = getStoreSettings();

  if (!checkout) {
    showToast("No checkout details available yet.");
    return;
  }

  updatePendingCheckoutStatus(statusText);
  setPaymentStatusPill(statusText);
  window.open(buildWhatsAppUrl(settings.whatsappPhone, buildCheckoutMessage(checkout, statusText, settings)), "_blank");
}

function startCheckout(destination) {
  const checkout = buildPendingCheckout();

  if (!checkout) {
    showToast("Add items to the cart before checkout.");
    return;
  }

  savePendingCheckout(checkout);
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
  const editReviewButton = event.target.closest("[data-edit-review]");
  const saveInlineReviewButton = event.target.closest("[data-save-inline-review]");
  const cancelInlineReviewButton = event.target.closest("[data-cancel-inline-review]");
  const cancelProductEditButton = event.target.closest("[data-cancel-product-edit]");
  const clearCartButton = event.target.closest("[data-clear-cart]");
  const resetCatalogButton = event.target.closest("[data-reset-catalog]");
  const filterButton = event.target.closest("[data-filter-category]");
  const openProductButton = event.target.closest("[data-open-product]");
  const closeProductModalButton = event.target.closest("[data-close-product-modal]");
  const selectProductImageButton = event.target.closest("[data-select-product-image]");
  const productSearchToggle = event.target.closest("[data-product-search-toggle]");
  const categoryToggle = event.target.closest("[data-category-toggle]");
  const selectedQuantityButton = event.target.closest("[data-change-selected-quantity]");
  const startCheckoutLink = event.target.closest("[data-start-checkout]");
  const sendPaidOrderButton = event.target.closest("[data-send-paid-order]");
  const sendPendingOrderButton = event.target.closest("[data-send-pending-order]");
  const contactToggleButton = event.target.closest("[data-contact-toggle]");
  const reviewNavButton = event.target.closest("[data-review-nav]");

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
  if (editReviewButton) {
    const isAdmin = editReviewButton.closest('.review-admin-card');
    if (isAdmin) {
      startInlineReviewEdit(editReviewButton.getAttribute("data-edit-review"), editReviewButton.closest('article'));
    } else {
      startReviewEdit(editReviewButton.getAttribute("data-edit-review"));
    }
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
  if (resetCatalogButton) {
    resetCatalog();
    resetProductForm();
    renderAdminPage();
    renderProductsPage();
    renderFeaturedProducts();
    showToast("Catalog reset to default products.");
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
    startCheckout(startCheckoutLink.getAttribute("href"));
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
  if (cancelProductEditButton) {
    resetProductForm();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  setCurrentYear();
  initialiseNavigation();
  renderSettingsForm();
  renderContactSection();
  renderFeaturedProducts();
  renderReviewsSection();
  renderProductsPage();
  renderCartPage();
  renderAdminPage();
  renderCheckoutPage();
  handleSearch();
  handleProductForm();
  handleSettingsForm();
  handleReviewForm();
  handleCustomerForm();
  handleContactForm();
  renderCustomerForm();

  // Clear saved customer address data when leaving the cart page
  window.addEventListener("beforeunload", function () {
    localStorage.removeItem("customerDetails");
  });

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("change", handleDocumentChange);
  window.addEventListener("resize", function () {
    renderProductModal();
    renderReviewsSection();
  });
});
