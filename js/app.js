/**
 * ===================================================================
 * KRUSHIMITRA AGRO, BANSAROLA (TA. KAIJ, DIST. BEED)
 * High-End Agricultural Machinery Platform Controller
 * Inspired by Champion Implements Corporate Engineering Standards
 * Helpline: 9545169002
 * ===================================================================
 */

// Application State
const state = {
    cart: [], // items: [{ id, name, marathiName, price, qty, image, hpRequired }]
    activeCategory: 'all',
    activeFilter: 'all', // 'all', 'subsidy', 'in_stock'
    searchQuery: '',
    orderMode: 'delivery', // 'delivery' or 'pickup'
    discountRate: 0,
    appliedCoupon: null,
    activeTractorHP: 1 // index in TRACTOR_COMPATIBILITY_GUIDE (default: 40-48 HP)
};

// DOM Elements
const elements = {
    categoryTabs: document.getElementById('category-tabs'),
    categoriesShowcase: document.getElementById('categories-showcase-container'),
    foodGrid: document.getElementById('food-grid'),
    searchInput: document.getElementById('search-food'),
    filterBtns: document.querySelectorAll('.filter-pill'),
    cartBtn: document.getElementById('cart-btn'),
    cartBadge: document.getElementById('cart-badge'),
    cartDrawer: document.getElementById('cart-drawer'),
    cartOverlay: document.getElementById('cart-overlay'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartEmptyState: document.getElementById('cart-empty-state'),
    cartFooter: document.getElementById('cart-footer'),
    subtotalEl: document.getElementById('cart-subtotal'),
    deliveryFeeEl: document.getElementById('cart-delivery-fee'),
    taxEl: document.getElementById('cart-tax'),
    discountRow: document.getElementById('discount-row'),
    discountEl: document.getElementById('cart-discount'),
    totalEl: document.getElementById('cart-total'),
    checkoutBtn: document.getElementById('proceed-checkout-btn'),
    
    // Checkout Modal
    checkoutModal: document.getElementById('checkout-modal'),
    closeCheckoutBtn: document.getElementById('close-checkout-btn'),
    checkoutForm: document.getElementById('checkout-form'),
    whatsappOrderBtn: document.getElementById('whatsapp-order-btn'),
    addressGroup: document.getElementById('address-group'),
    
    // Order Receipt Modal
    receiptModal: document.getElementById('receipt-modal'),
    closeReceiptBtn: document.getElementById('close-receipt-btn'),
    receiptDetails: document.getElementById('receipt-details'),
    printReceiptBtn: document.getElementById('print-receipt-btn'),

    // Tech Specs Modal
    specModal: document.getElementById('spec-modal'),
    closeSpecModal: document.getElementById('close-spec-modal'),
    specModalTitle: document.getElementById('spec-modal-title'),
    specModalContent: document.getElementById('spec-modal-content'),

    // Tractor Guide
    tractorHPNav: document.getElementById('tractor-hp-nav'),
    tractorCompatDisplay: document.getElementById('tractor-compat-display'),

    // Lead Quotation Form
    leadForm: document.getElementById('lead-quotation-form'),

    // Toast Container
    toastContainer: document.getElementById('toast-container'),

    // Mobile Menu
    mobileToggle: document.getElementById('mobile-toggle'),
    mobileDrawer: document.getElementById('mobile-drawer'),
    closeMobileDrawer: document.getElementById('close-mobile-drawer')
};

// ===================================================================
// INITIALIZATION
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
    loadSavedCart();
    renderCategoriesShowcase();
    renderTractorCompatibility();
    renderCategoryTabs();
    renderFoodItems();
    updateCartUI();
    setupEventListeners();
});

// ===================================================================
// 1. PRODUCT CATEGORIES SHOWCASE GRID (CHAMPION FEATURE)
// ===================================================================
function renderCategoriesShowcase() {
    if (!elements.categoriesShowcase) return;

    // Filter out "all" category to show machine categories with photos
    const showcaseCats = MENU_CATEGORIES.filter(cat => cat.id !== 'all');

    elements.categoriesShowcase.innerHTML = showcaseCats.map(cat => `
        <div class="category-card-corporate" onclick="filterByCategoryAndScroll('${cat.id}')">
            <div class="category-card-media">
                <img src="${cat.image}" alt="${cat.name}" loading="lazy" />
                <span class="category-badge-chip"><i class="fa-solid ${cat.icon}"></i> ${cat.badge}</span>
            </div>
            <div class="category-card-body">
                <h3 class="category-card-title">${cat.name}</h3>
                <p class="category-card-desc">${cat.desc}</p>
                <div class="category-card-action">
                    <span>अवजारे पहा व किंमत तपासा</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function filterByCategoryAndScroll(categoryId) {
    state.activeCategory = categoryId;
    
    // Sync category tabs
    if (elements.categoryTabs) {
        elements.categoryTabs.querySelectorAll('.category-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === categoryId);
        });
    }

    renderFoodItems();

    // Smooth scroll to catalog
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===================================================================
// 2. TRACTOR COMPATIBILITY FINDER
// ===================================================================
function renderTractorCompatibility() {
    if (!elements.tractorHPNav || !elements.tractorCompatDisplay) return;

    // Render HP buttons
    elements.tractorHPNav.innerHTML = TRACTOR_COMPATIBILITY_GUIDE.map((guide, idx) => `
        <button class="tractor-hp-btn ${state.activeTractorHP === idx ? 'active' : ''}" onclick="selectTractorHP(${idx})">
            <i class="fa-solid fa-tractor"></i>
            <span>${guide.hpClass}</span>
        </button>
    `).join('');

    // Render active display
    const current = TRACTOR_COMPATIBILITY_GUIDE[state.activeTractorHP];
    elements.tractorCompatDisplay.innerHTML = `
        <div class="compatibility-display-card">
            <div class="compat-models-box">
                <span class="compat-tag">${current.tag}</span>
                <h3 class="compat-hp-heading">${current.hpClass} ट्रॅक्टर श्रेणी</h3>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 12px;">
                    या अश्वशक्तीच्या ट्रॅक्टरसाठी कृषिमित्र ॲग्रो, बंसारोळा कडून खालील अवजारे शिफारस केली जातात:
                </p>
                <div class="compat-examples-list">
                    <strong>उदा. ट्रॅक्टर मॉडेल्स:</strong><br>
                    ${current.examples}
                </div>
                <div style="margin-top: 18px;">
                    <a href="https://wa.me/919545169002?text=माझ्याकडे%20${encodeURIComponent(current.hpClass)}%20चा%20ट्रॅक्टर%20आहे,%20मला%20सुसंगत%20अवजारांचे%20कोटेशन%20हवे%20आहे." target="_blank" class="btn btn-whatsapp btn-sm" style="width: 100%;">
                        <i class="fa-brands fa-whatsapp"></i> या ट्रॅक्टरसाठी अवजारे विचारा
                    </a>
                </div>
            </div>

            <div class="compat-specs-grid">
                <div class="compat-spec-row">
                    <span class="spec-name"><i class="fa-solid fa-gear" style="color: var(--primary);"></i> रोटाव्हेटर साईझ:</span>
                    <span class="spec-val">${current.rotavator}</span>
                </div>
                <div class="compat-spec-row">
                    <span class="spec-name"><i class="fa-solid fa-seedling" style="color: var(--primary);"></i> नांगर व मशागत:</span>
                    <span class="spec-val">${current.plough}</span>
                </div>
                <div class="compat-spec-row">
                    <span class="spec-name"><i class="fa-solid fa-wheat-awn" style="color: var(--primary);"></i> पेरणी व टोकन यंत्र:</span>
                    <span class="spec-val">${current.sowing}</span>
                </div>
                <div class="compat-spec-row">
                    <span class="spec-name"><i class="fa-solid fa-faucet-drip" style="color: var(--primary);"></i> ट्रॅक्टर स्प्रेअर:</span>
                    <span class="spec-val">${current.sprayer}</span>
                </div>
                <div class="compat-spec-row">
                    <span class="spec-name"><i class="fa-solid fa-truck-pickup" style="color: var(--primary);"></i> ट्रॉली व वाहतूक:</span>
                    <span class="spec-val">${current.trolley}</span>
                </div>
            </div>
        </div>
    `;
}

function selectTractorHP(idx) {
    state.activeTractorHP = idx;
    renderTractorCompatibility();
}

// ===================================================================
// 3. CATEGORY TABS & EQUIPMENT RENDERING
// ===================================================================
function renderCategoryTabs() {
    if (!elements.categoryTabs) return;

    elements.categoryTabs.innerHTML = MENU_CATEGORIES.map(cat => `
        <button class="category-tab-btn ${state.activeCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
            <i class="fa-solid ${cat.icon}"></i>
            <span>${cat.name}</span>
        </button>
    `).join('');

    elements.categoryTabs.querySelectorAll('.category-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.activeCategory = btn.dataset.category;
            elements.categoryTabs.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFoodItems();
        });
    });
}

function renderFoodItems() {
    if (!elements.foodGrid) return;

    const currency = RESTAURANT_CONFIG.currency || '₹';

    let filtered = SAMPLE_FOOD_ITEMS.filter(item => {
        const matchCategory = state.activeCategory === 'all' || item.category === state.activeCategory;

        let matchFilter = true;
        if (state.activeFilter === 'subsidy') matchFilter = item.subsidyEligible === true;
        if (state.activeFilter === 'in_stock') matchFilter = item.isVeg === true;

        let matchSearch = true;
        if (state.searchQuery.trim() !== '') {
            const query = state.searchQuery.toLowerCase();
            matchSearch = item.name.toLowerCase().includes(query) ||
                          (item.marathiName && item.marathiName.toLowerCase().includes(query)) ||
                          item.description.toLowerCase().includes(query) ||
                          (item.hpRequired && item.hpRequired.toLowerCase().includes(query));
        }

        return matchCategory && matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
        elements.foodGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <i class="fa-solid fa-tractor" style="font-size: 3.5rem; color: var(--primary); margin-bottom: 16px;"></i>
                <h3 style="font-size: 1.4rem; color: var(--secondary); margin-bottom: 8px;">कोणतेही अवजार सापडले नाही (No Equipment Found)</h3>
                <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 20px auto;">
                    कृपया वेगळा शब्द शोधून पहा किंवा कृषिमित्र ॲग्रो हेल्पलाईन ९५४५१६९००२ वर थेट संपर्क करा.
                </p>
                <button class="btn btn-primary btn-sm" onclick="resetFilters()">
                    <i class="fa-solid fa-rotate-left"></i> सर्व अवजारे दाखवा
                </button>
            </div>
        `;
        return;
    }

    elements.foodGrid.innerHTML = filtered.map(item => {
        const cartItem = state.cart.find(ci => ci.id === item.id);
        const inCartQty = cartItem ? cartItem.qty : 0;
        const formattedPrice = item.price.toLocaleString('en-IN');

        return `
            <article class="equipment-card" data-id="${item.id}">
                <div class="equipment-card-media">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" />
                    <div class="card-top-badges">
                        ${item.subsidyEligible ? `
                            <span class="badge-subsidy-pill">
                                <i class="fa-solid fa-certificate"></i> महाडीबीटी पात्र
                            </span>
                        ` : `<span></span>`}
                        <span class="badge-hp-pill">
                            <i class="fa-solid fa-tractor"></i> ${item.hpRequired}
                        </span>
                    </div>
                </div>

                <div class="equipment-card-body">
                    <h3 class="equipment-model-en">${item.name}</h3>
                    <div class="equipment-model-mr">${item.marathiName || ''}</div>
                    <p class="equipment-desc">${item.description}</p>

                    <!-- Industrial Specifications Grid (Champion Format) -->
                    <div class="equipment-specs-grid">
                        <div class="spec-cell">
                            <span class="spec-cell-label"><i class="fa-solid fa-ruler"></i> कार्य रुंदी</span>
                            <span class="spec-cell-val">${item.workingWidth || 'प्रमाणित साईझ'}</span>
                        </div>
                        <div class="spec-cell">
                            <span class="spec-cell-label"><i class="fa-solid fa-gears"></i> गिअरबॉक्स</span>
                            <span class="spec-cell-val">${item.gearbox || 'Heavy Duty'}</span>
                        </div>
                        <div class="spec-cell">
                            <span class="spec-cell-label"><i class="fa-solid fa-screwdriver-wrench"></i> ब्लेड / स्पेसिफिकेशन</span>
                            <span class="spec-cell-val">${item.bladeType || 'Heavy Steel'}</span>
                        </div>
                        <div class="spec-cell">
                            <span class="spec-cell-label"><i class="fa-solid fa-shield-halved"></i> हमी (Warranty)</span>
                            <span class="spec-cell-val">${item.warranty || '१ वर्ष वॉरंटी'}</span>
                        </div>
                    </div>

                    <!-- Price & Subsidy Hint -->
                    <div class="equipment-price-row">
                        <div class="price-block">
                            <span class="price-label">किंमत (Ex-Showroom)</span>
                            <span class="price-val">${currency}${formattedPrice}</span>
                        </div>
                        <div style="text-align: right;">
                            <span class="subsidy-hint">${item.subsidyEligible ? '५०% पर्यंत अनुदान पात्र' : 'रास्त दर हमी'}</span>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="card-action-buttons">
                        <button class="btn-spec-view" onclick="openSpecModal('${item.id}')">
                            <i class="fa-solid fa-circle-info"></i> संपूर्ण तपशील
                        </button>

                        <div id="action-${item.id}">
                            ${inCartQty > 0 ? `
                                <div class="card-qty-control">
                                    <button class="card-qty-btn" onclick="updateItemQuantity('${item.id}', -1)">-</button>
                                    <span class="card-qty-num">${inCartQty}</span>
                                    <button class="card-qty-btn" onclick="updateItemQuantity('${item.id}', 1)">+</button>
                                </div>
                            ` : `
                                <button class="btn-add-quote" onclick="addItemToCart('${item.id}')">
                                    <i class="fa-solid fa-cart-plus"></i> कोटेशन जोडा
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function resetFilters() {
    state.activeCategory = 'all';
    state.activeFilter = 'all';
    state.searchQuery = '';
    if (elements.searchInput) elements.searchInput.value = '';

    if (elements.categoryTabs) {
        elements.categoryTabs.querySelectorAll('.category-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.category === 'all');
        });
    }

    elements.filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === 'all');
    });

    renderFoodItems();
}

// ===================================================================
// 4. TECHNICAL SPECIFICATIONS MODAL WINDOW
// ===================================================================
function openSpecModal(itemId) {
    const item = SAMPLE_FOOD_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const currency = RESTAURANT_CONFIG.currency || '₹';
    elements.specModalTitle.innerHTML = `<i class="fa-solid fa-screwdriver-wrench"></i> ${item.name} - तांत्रिक तपशील`;

    elements.specModalContent.innerHTML = `
        <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color); flex-wrap: wrap;">
            <img src="${item.image}" alt="${item.name}" style="width: 140px; height: 100px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-color);" />
            <div>
                <h4 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--secondary); font-weight: 800;">${item.name}</h4>
                <div style="color: var(--primary); font-weight: 700; font-size: 1rem; margin-bottom: 6px;">${item.marathiName}</div>
                <div style="font-size: 1.35rem; font-weight: 900; color: var(--secondary);">
                    किंमत: ${currency}${item.price.toLocaleString('en-IN')} <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">(GST समाविष्ट)</span>
                </div>
            </div>
        </div>

        <table class="spec-table-industrial">
            <tbody>
                <tr>
                    <th>ट्रॅक्टर अश्वशक्ती (HP Required)</th>
                    <td><strong>${item.hpRequired}</strong></td>
                </tr>
                <tr>
                    <th>कार्य रुंदी (Working Width)</th>
                    <td>${item.workingWidth || 'प्रमाणित रुंदी'}</td>
                </tr>
                <tr>
                    <th>ब्लेड / शॉव्हेल प्रकार (Blade/Tyne)</th>
                    <td>${item.bladeType || 'उच्च दर्जाचे बोरोन स्टील'}</td>
                </tr>
                <tr>
                    <th>गिअरबॉक्स व ट्रान्समिशन (Gearbox)</th>
                    <td>${item.gearbox || 'Heavy Duty Transmission'}</td>
                </tr>
                <tr>
                    <th>कार्य खोली (Working Depth)</th>
                    <td>${item.workingDepth || 'मशागत खोली'}</td>
                </tr>
                <tr>
                    <th>एकूण वजन (Implement Weight)</th>
                    <td>${item.weight || 'हेवी ड्युटी स्ट्रक्चरल फ्रेम'}</td>
                </tr>
                <tr>
                    <th>PTO गती (Input RPM)</th>
                    <td>${item.ptoRpm || '540 RPM Tractor PTO'}</td>
                </tr>
                <tr>
                    <th>जोडणी प्रकार (Hitch Linkage)</th>
                    <td>${item.hitchType || '3-Point Linkage'}</td>
                </tr>
                <tr>
                    <th>महाडीबीटी शासकीय अनुदान (Subsidy)</th>
                    <td><strong style="color: #0284c7;">${item.subsidyEligible ? item.subsidyAmount : 'बँक फायनान्स व सुलभ हप्ते उपलब्ध'}</strong></td>
                </tr>
                <tr>
                    <th>अधिकृत वॉरंटी व सर्व्हिस</th>
                    <td>${item.warranty} (बंसारोळा केंद्रावर स्पेअर्स व सर्व्हिसिंग उपलब्ध)</td>
                </tr>
            </tbody>
        </table>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px;">
            <a href="https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=मला%20${encodeURIComponent(item.name)}%20बद्दल%20तपशीलवार%20माहिती%20व%20कोटेशन%20हवे%20आहे." target="_blank" class="btn btn-whatsapp" style="flex-grow: 1;">
                <i class="fa-brands fa-whatsapp"></i> थेट व्हॉट्सॲपवर कोटेशन मागा
            </a>
            <button class="btn btn-primary" onclick="addItemToCart('${item.id}'); elements.specModal.classList.remove('active');">
                <i class="fa-solid fa-cart-plus"></i> कोटेशन यादीत जोडा
            </button>
        </div>
    `;

    elements.specModal.classList.add('active');
}

// ===================================================================
// 5. EQUIPMENT BASKET / CART LOGIC
// ===================================================================
function addItemToCart(itemId) {
    const item = SAMPLE_FOOD_ITEMS.find(f => f.id === itemId);
    if (!item) return;

    const existingIndex = state.cart.findIndex(ci => ci.id === itemId);
    if (existingIndex > -1) {
        state.cart[existingIndex].qty += 1;
    } else {
        state.cart.push({
            id: item.id,
            name: item.name,
            marathiName: item.marathiName,
            price: item.price,
            image: item.image,
            hpRequired: item.hpRequired,
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    renderFoodItems();
    triggerCartBump();
    showToast(`"${item.name}" कोटेशन यादीत जोडले गेले!`, "success");
}

function updateItemQuantity(itemId, delta) {
    const index = state.cart.findIndex(ci => ci.id === itemId);
    if (index === -1) return;

    state.cart[index].qty += delta;

    if (state.cart[index].qty <= 0) {
        const removedItem = state.cart.splice(index, 1)[0];
        showToast(`"${removedItem.name}" यादीतून काढले`);
    }

    saveCart();
    updateCartUI();
    renderFoodItems();
}

function removeItemFromCart(itemId) {
    const index = state.cart.findIndex(ci => ci.id === itemId);
    if (index !== -1) {
        const removed = state.cart.splice(index, 1)[0];
        saveCart();
        updateCartUI();
        renderFoodItems();
        showToast(`"${removed.name}" यादीतून काढले`);
    }
}

function updateCartUI() {
    const currency = RESTAURANT_CONFIG.currency || '₹';
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);

    if (elements.cartBadge) {
        elements.cartBadge.textContent = totalItems;
        elements.cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (state.cart.length === 0) {
        if (elements.cartEmptyState) elements.cartEmptyState.style.display = 'flex';
        if (elements.cartItemsContainer) elements.cartItemsContainer.style.display = 'none';
        if (elements.cartFooter) elements.cartFooter.style.display = 'none';
        return;
    }

    if (elements.cartEmptyState) elements.cartEmptyState.style.display = 'none';
    if (elements.cartItemsContainer) elements.cartItemsContainer.style.display = 'flex';
    if (elements.cartFooter) elements.cartFooter.style.display = 'block';

    elements.cartItemsContainer.innerHTML = state.cart.map(item => `
        <div class="cart-item-row">
            <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-hp"><i class="fa-solid fa-tractor"></i> ${item.hpRequired}</div>
                <div class="cart-item-price">${currency}${item.price.toLocaleString('en-IN')}</div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
                <div class="card-qty-control" style="border: 1px solid var(--border-color);">
                    <button class="card-qty-btn" style="width: 28px; height: 28px;" onclick="updateItemQuantity('${item.id}', -1)">-</button>
                    <span class="card-qty-num" style="padding: 0 8px; font-size: 0.85rem;">${item.qty}</span>
                    <button class="card-qty-btn" style="width: 28px; height: 28px;" onclick="updateItemQuantity('${item.id}', 1)">+</button>
                </div>
                <button onclick="removeItemFromCart('${item.id}')" style="color: #ef4444; font-size: 0.78rem; font-weight: 700;">
                    <i class="fa-regular fa-trash-can"></i> काढून टाका
                </button>
            </div>
        </div>
    `).join('');

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const deliveryFee = state.orderMode === 'delivery' && subtotal < RESTAURANT_CONFIG.freeDeliveryThreshold ? RESTAURANT_CONFIG.deliveryFee : 0;
    const discount = subtotal * state.discountRate;
    const grandTotal = Math.max(0, subtotal - discount) + deliveryFee;

    if (elements.subtotalEl) elements.subtotalEl.textContent = `${currency}${subtotal.toLocaleString('en-IN')}`;
    if (elements.deliveryFeeEl) elements.deliveryFeeEl.textContent = deliveryFee === 0 ? 'मोफत (FREE)' : `${currency}${deliveryFee.toLocaleString('en-IN')}`;
    if (elements.taxEl) elements.taxEl.textContent = `GST समाविष्ट (Included)`;
    if (elements.totalEl) elements.totalEl.textContent = `${currency}${grandTotal.toLocaleString('en-IN')}`;
}

function triggerCartBump() {
    if (!elements.cartBadge) return;
    elements.cartBadge.style.transform = 'scale(1.4)';
    setTimeout(() => elements.cartBadge.style.transform = 'scale(1)', 300);
}

function saveCart() {
    localStorage.setItem('krushimitra_cart', JSON.stringify(state.cart));
}

function loadSavedCart() {
    try {
        const saved = localStorage.getItem('krushimitra_cart');
        if (saved) state.cart = JSON.parse(saved);
    } catch (e) {
        console.error("Could not load cart from storage", e);
    }
}

function applyPromoCode() {
    const input = document.getElementById('promo-code-input');
    const msg = document.getElementById('promo-msg');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    if (code === 'KISAN5' || code === 'AGRO5') {
        state.discountRate = 0.05;
        state.appliedCoupon = code;
        if (msg) {
            msg.innerHTML = `<i class="fa-solid fa-check"></i> कोड "${code}" लागू झाला! (५% शेतकरी विशेष सूट)`;
            msg.style.display = 'block';
        }
        updateCartUI();
        showToast(`कूपन कोड ${code} लागू झाला! ५% सूट`, "success");
    } else {
        showToast("अमान्य कूपन कोड. 'KISAN5' वापरून पहा!");
    }
}

// ===================================================================
// 6. CHECKOUT & WHATSAPP DISPATCH
// ===================================================================
function openCheckoutModal() {
    if (state.cart.length === 0) {
        showToast("कोटेशन यादी रिकामी आहे! कृपया अवजार निवडा.");
        return;
    }
    closeCartDrawer();
    elements.checkoutModal.classList.add('active');
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    const orderData = getOrderFormData();
    if (!orderData) return;

    const orderId = 'KMA-' + Math.floor(100000 + Math.random() * 900000);
    renderReceipt(orderId, orderData);

    elements.checkoutModal.classList.remove('active');
    elements.receiptModal.classList.add('active');

    state.cart = [];
    saveCart();
    updateCartUI();
    renderFoodItems();
    showToast("अधिकृत बुकिंग कोटेशन पावती तयार झाली!", "success");
}

function sendOrderViaWhatsApp() {
    const orderData = getOrderFormData();
    if (!orderData) return;

    const currency = RESTAURANT_CONFIG.currency || '₹';
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discount = subtotal * state.discountRate;
    const deliveryFee = state.orderMode === 'delivery' && subtotal < RESTAURANT_CONFIG.freeDeliveryThreshold ? RESTAURANT_CONFIG.deliveryFee : 0;
    const total = Math.max(0, subtotal - discount) + deliveryFee;

    let message = `🚜 *नवीन अवजार बुकिंग व कोटेशन मागणी - कृषिमित्र ॲग्रो*\n`;
    message += `📍 बंसारोळा, ता. केज, जि. बीड (संपर्क: 9545169002)\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *शेतकऱ्याचे नाव:* ${orderData.name}\n`;
    message += `📞 *मोबाईल नंबर:* ${orderData.phone}\n`;
    message += `📍 *पत्ता / गाव:* ${orderData.address || 'बंसारोळा दुकान पिकअप'}\n`;
    message += `🚜 *ट्रॅक्टर मॉडेल व HP:* ${orderData.notes || 'माहिती दिलेली नाही'}\n`;
    message += `📦 *डिलिव्हरी:* ${orderData.mode === 'delivery' ? 'शेतात / गावात डिलिव्हरी' : 'बंसारोळा दालनातून पिकअप'}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📋 *निवडलेली अवजारे (Equipments):*\n`;
    state.cart.forEach((item, idx) => {
        message += `${idx + 1}. ${item.name} (${item.hpRequired}) x ${item.qty} = ${currency}${(item.price * item.qty).toLocaleString('en-IN')}\n`;
    });
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *एकूण अंदाजे रक्कम: ${currency}${total.toLocaleString('en-IN')}*\n`;
    message += `📄 *महाडीबीटी शासकीय अनुदान कोटेशन हवे आहे:* होय\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `कृपया उपलब्धता व अनुदान प्रक्रिया मार्गदर्शन पाठवावे. धन्यवाद!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');

    const orderId = 'WA-' + Math.floor(100000 + Math.random() * 900000);
    renderReceipt(orderId, orderData);
    elements.checkoutModal.classList.remove('active');
    elements.receiptModal.classList.add('active');

    state.cart = [];
    saveCart();
    updateCartUI();
    renderFoodItems();
}

function getOrderFormData() {
    const form = elements.checkoutForm;
    if (!form.checkValidity()) {
        form.reportValidity();
        return null;
    }

    return {
        name: document.getElementById('customer-name').value.trim(),
        phone: document.getElementById('customer-phone').value.trim(),
        address: document.getElementById('customer-address').value.trim(),
        notes: document.getElementById('order-notes').value.trim(),
        mode: document.querySelector('input[name="checkoutOrderMode"]:checked')?.value || 'delivery'
    };
}

function renderReceipt(orderId, orderData) {
    const currency = RESTAURANT_CONFIG.currency || '₹';
    const now = new Date();
    const formattedDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discount = subtotal * state.discountRate;
    const deliveryFee = state.orderMode === 'delivery' && subtotal < RESTAURANT_CONFIG.freeDeliveryThreshold ? RESTAURANT_CONFIG.deliveryFee : 0;
    const total = Math.max(0, subtotal - discount) + deliveryFee;

    elements.receiptDetails.innerHTML = `
        <div style="background: #f8fafc; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); padding: 20px; text-align: left; margin-top: 16px;">
            <div style="border-bottom: 2px solid var(--secondary); padding-bottom: 12px; margin-bottom: 14px;">
                <h4 style="font-size: 1.3rem; color: var(--secondary); font-weight: 800;">${RESTAURANT_CONFIG.marathiName} (${RESTAURANT_CONFIG.name})</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">${RESTAURANT_CONFIG.address}</p>
                <p style="font-size: 0.9rem; color: var(--primary); font-weight: 800;">📞 हेल्पलाईन: ९५४५१६९००२ (9545169002)</p>
                <div style="margin-top: 8px; font-weight: 800; color: #0284c7;">अधिकृत कोटेशन क्र: #${orderId} | दिनांक: ${formattedDate}</div>
            </div>

            <div style="margin-bottom: 14px; font-size: 0.88rem; line-height: 1.5;">
                <div><strong>शेतकऱ्याचे नाव:</strong> ${orderData.name} (${orderData.phone})</div>
                <div><strong>पत्ता / गाव:</strong> ${orderData.address || 'बंसारोळा शॉप पिकअप'}</div>
                ${orderData.notes ? `<div><strong>ट्रॅक्टर मॉडेल:</strong> ${orderData.notes}</div>` : ''}
            </div>

            <div style="border-top: 1px solid var(--border-color); padding-top: 10px; margin-bottom: 10px;">
                ${state.cart.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
                        <span>${item.name} &times; ${item.qty}</span>
                        <strong>${currency}${(item.price * item.qty).toLocaleString('en-IN')}</strong>
                    </div>
                `).join('')}
            </div>

            <div style="border-top: 1px dashed var(--border-color); padding-top: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px;">
                    <span>उपएकूण (Subtotal):</span>
                    <span>${currency}${subtotal.toLocaleString('en-IN')}</span>
                </div>
                ${discount > 0 ? `
                    <div style="display: flex; justify-content: space-between; color: var(--primary); font-weight: 700; margin-bottom: 4px;">
                        <span>शेतकरी विशेष सूट:</span>
                        <span>-${currency}${discount.toLocaleString('en-IN')}</span>
                    </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px;">
                    <span>वाहतूक खर्च (Transport):</span>
                    <span>${deliveryFee === 0 ? 'मोफत (FREE)' : `${currency}${deliveryFee.toLocaleString('en-IN')}`}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 900; color: var(--secondary); border-top: 2px solid var(--secondary); padding-top: 8px; margin-top: 8px;">
                    <span>एकूण रक्कम (Total):</span>
                    <span style="color: var(--primary);">${currency}${total.toLocaleString('en-IN')}</span>
                </div>
                <div style="margin-top: 10px; font-size: 0.8rem; color: #15803d; font-weight: 700;">
                    ✓ हे अधिकृत GST कोटेशन महाडीबीटी (MahaDBT) कृषी यांत्रिकीकरण उप-अभियान अनुदानासाठी १००% ग्राह्य आहे.
                </div>
            </div>
        </div>
    `;
}

// ===================================================================
// 7. LEAD QUOTATION FORM HANDLER (CHAMPION STYLE GENERATOR)
// ===================================================================
function setupLeadForm() {
    if (!elements.leadForm) return;

    elements.leadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('lead-name').value.trim();
        const phone = document.getElementById('lead-phone').value.trim();
        const village = document.getElementById('lead-village').value.trim();
        const tractor = document.getElementById('lead-tractor').value.trim();
        const equipment = document.getElementById('lead-equipment').value;
        const purpose = document.getElementById('lead-purpose').value;

        let message = `🚜 *त्वरित कोटेशन चौकशी - कृषिमित्र ॲग्रो बंसारोळा*\n`;
        message += `━━━━━━━━━━━━━━━━━━━━━\n`;
        message += `👤 *शेतकऱ्याचे नाव:* ${name}\n`;
        message += `📞 *मोबाईल / WhatsApp:* ${phone}\n`;
        message += `📍 *गाव व तालुका:* ${village}\n`;
        message += `🚜 *ट्रॅक्टर मॉडेल व HP:* ${tractor}\n`;
        message += `⚙️ *आवश्यक अवजार:* ${equipment}\n`;
        message += `📄 *खरेदीचे स्वरूप:* ${purpose}\n`;
        message += `━━━━━━━━━━━━━━━━━━━━━\n`;
        message += `कृपया या अवजाराचे अधिकृत कोटेशन, महाडीबीटी अनुदान माहिती व अंतिम किंमत त्वरित पाठवावी. धन्यवाद!`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');

        showToast(`धन्यवाद ${name}! तुमचे कोटेशन व्हॉट्सॲपवर पाठवले जात आहे.`, "success");
        elements.leadForm.reset();
    });
}

// ===================================================================
// 8. EVENT LISTENERS & DRAWER CONTROLS
// ===================================================================
function setupEventListeners() {
    setupLeadForm();

    // Search
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderFoodItems();
        });
    }

    // Filter Buttons
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            state.activeFilter = btn.dataset.filter;
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFoodItems();
        });
    });

    // Cart Drawer
    if (elements.cartBtn) elements.cartBtn.addEventListener('click', openCartDrawer);
    if (elements.closeCartBtn) elements.closeCartBtn.addEventListener('click', closeCartDrawer);
    if (elements.cartOverlay) elements.cartOverlay.addEventListener('click', closeCartDrawer);

    // Cart Mode Toggle
    document.querySelectorAll('.order-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.order-mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.orderMode = btn.dataset.mode;
            updateCartUI();
        });
    });

    // Checkout Modal
    if (elements.checkoutBtn) elements.checkoutBtn.addEventListener('click', openCheckoutModal);
    if (elements.closeCheckoutBtn) elements.closeCheckoutBtn.addEventListener('click', () => elements.checkoutModal.classList.remove('active'));
    if (elements.checkoutForm) elements.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    if (elements.whatsappOrderBtn) elements.whatsappOrderBtn.addEventListener('click', sendOrderViaWhatsApp);

    // Checkout Radio buttons
    document.querySelectorAll('.radio-pill input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const groupName = radio.name;
            document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
                r.closest('.radio-pill').classList.toggle('selected', r.checked);
            });
        });
    });

    // Spec Modal Close
    if (elements.closeSpecModal) {
        elements.closeSpecModal.addEventListener('click', () => elements.specModal.classList.remove('active'));
    }

    // Receipt Modal Close & Print
    if (elements.closeReceiptBtn) elements.closeReceiptBtn.addEventListener('click', () => elements.receiptModal.classList.remove('active'));
    if (elements.printReceiptBtn) elements.printReceiptBtn.addEventListener('click', () => window.print());

    // Mobile Menu
    if (elements.mobileToggle) {
        elements.mobileToggle.addEventListener('click', () => elements.mobileDrawer.classList.add('active'));
    }
    if (elements.closeMobileDrawer) {
        elements.closeMobileDrawer.addEventListener('click', () => elements.mobileDrawer.classList.remove('active'));
    }
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => elements.mobileDrawer.classList.remove('active'));
    });

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        }
    });

    // Close on backdrop click
    window.addEventListener('click', (e) => {
        if (e.target === elements.specModal) elements.specModal.classList.remove('active');
        if (e.target === elements.checkoutModal) elements.checkoutModal.classList.remove('active');
        if (e.target === elements.receiptModal) elements.receiptModal.classList.remove('active');
    });
}

function openCartDrawer() {
    if (elements.cartDrawer) elements.cartDrawer.classList.add('active');
    if (elements.cartOverlay) elements.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    if (elements.cartDrawer) elements.cartDrawer.classList.remove('active');
    if (elements.cartOverlay) elements.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function showToast(message, type = 'info') {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-bell';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px) scale(0.95)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}
