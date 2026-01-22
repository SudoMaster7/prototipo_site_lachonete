// ========================================
// UI INTERACTIONS
// Handle modals, drawers, and user interactions
// ========================================

// Modal state
const ModalState = {
    isOpen: false,
    currentProduct: null,
    selectedOptions: [],
    quantity: 1,
    observations: ''
};

// Open product modal
function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Reset modal state
    ModalState.currentProduct = product;
    ModalState.selectedOptions = [];
    ModalState.quantity = 1;
    ModalState.observations = '';

    // Build modal content
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-product-image">
        <div class="modal-body">
            <h2 class="modal-product-name">${product.name}</h2>
            <p class="modal-product-description">${product.description}</p>
            <div class="modal-product-price">${formatCurrency(product.price)}</div>
            
            ${product.hasOptions && product.options ? `
                <div class="options-section">
                    <h3 class="options-title">Adicionais</h3>
                    ${product.options.map(option => `
                        <div class="option-item" onclick="toggleOption('${option.id}', '${option.name}', ${option.price})">
                            <label class="option-label">
                                <input type="checkbox" id="option-${option.id}" />
                                <span>${option.name}</span>
                            </label>
                            <span class="option-price">+ ${formatCurrency(option.price)}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="observations-section">
                <h3 class="options-title">Observações</h3>
                <textarea 
                    class="observations-input" 
                    id="modalObservations" 
                    placeholder="Ex: Sem cebola, bem passado..."
                    oninput="updateObservations(this.value)"
                ></textarea>
            </div>
            
            <div class="quantity-section">
                <h3 class="options-title">Quantidade</h3>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="decreaseQuantity()">−</button>
                    <span class="quantity-value" id="modalQuantity">1</span>
                    <button class="quantity-btn" onclick="increaseQuantity()">+</button>
                </div>
            </div>
            
            <button class="btn-add-to-cart" onclick="addCurrentProductToCart()">
                Adicionar ao Pedido <span id="modalTotalPrice">${formatCurrency(product.price)}</span>
            </button>
        </div>
    `;

    // Show modal
    const modal = document.getElementById('productModal');
    modal.classList.add('active');
    ModalState.isOpen = true;
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    ModalState.isOpen = false;
    document.body.style.overflow = '';
}

// Toggle option selection
function toggleOption(optionId, optionName, optionPrice) {
    const checkbox = document.getElementById(`option-${optionId}`);
    const isChecked = checkbox.checked;

    if (isChecked) {
        // Remove option
        ModalState.selectedOptions = ModalState.selectedOptions.filter(opt => opt.id !== optionId);
    } else {
        // Add option
        ModalState.selectedOptions.push({
            id: optionId,
            name: optionName,
            price: optionPrice
        });
    }

    checkbox.checked = !isChecked;
    updateModalPrice();
}

// Update observations
function updateObservations(value) {
    ModalState.observations = value;
}

// Increase quantity
function increaseQuantity() {
    ModalState.quantity++;
    document.getElementById('modalQuantity').textContent = ModalState.quantity;
    updateModalPrice();
}

// Decrease quantity
function decreaseQuantity() {
    if (ModalState.quantity > 1) {
        ModalState.quantity--;
        document.getElementById('modalQuantity').textContent = ModalState.quantity;
        updateModalPrice();
    }
}

// Update modal total price
function updateModalPrice() {
    if (!ModalState.currentProduct) return;

    let totalPrice = ModalState.currentProduct.price;

    // Add options prices
    ModalState.selectedOptions.forEach(option => {
        totalPrice += option.price;
    });

    // Multiply by quantity
    totalPrice *= ModalState.quantity;

    const priceElement = document.getElementById('modalTotalPrice');
    if (priceElement) {
        priceElement.textContent = formatCurrency(totalPrice);
    }
}

// Add current product from modal to cart
function addCurrentProductToCart() {
    if (!ModalState.currentProduct) return;

    addToCart(
        ModalState.currentProduct,
        ModalState.quantity,
        ModalState.selectedOptions,
        ModalState.observations
    );

    closeProductModal();
}

// Open cart drawer
function openCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart drawer
function closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle category navigation
function navigateToCategory(categoryId) {
    // Update active pill
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    event.target.classList.add('active');

    // Scroll to category section
    smoothScrollTo(categoryId);
}

// Update active category on scroll
function updateActiveCategoryOnScroll() {
    const sections = document.querySelectorAll('.menu-section');
    const categoryPills = document.querySelectorAll('.category-pill');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    categoryPills.forEach(pill => {
        pill.classList.remove('active');
        if (pill.getAttribute('data-category') === currentSection) {
            pill.classList.add('active');
        }
    });
}

// Add glassmorphism effect to header on scroll
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Render product cards for a category
function renderProductCards(categoryId, containerId) {
    const products = getProductsByCategory(categoryId);
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = products.map(product => {
        let badgeHtml = '';
        if (product.isPopular) {
            badgeHtml = '<div class="product-badge">Mais Vendido</div>';
        } else if (product.isNew) {
            badgeHtml = '<div class="product-badge new">Novidade</div>';
        } else if (product.isSpicy) {
            badgeHtml = '<div class="product-badge spicy">🌶️ Picante</div>';
        }

        return `
            <div class="product-card" onclick="${product.quickAdd ? `quickAddProduct(${product.id})` : `openProductModal(${product.id})`}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    ${badgeHtml}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatCurrency(product.price)}</span>
                        <button class="btn-add" onclick="event.stopPropagation(); ${product.quickAdd ? `quickAddProduct(${product.id})` : `openProductModal(${product.id})`}">
                            ${product.quickAdd ? '+' : 'Adicionar'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize all product grids
function initializeProductGrids() {
    renderProductCards('lanches', 'lanchesGrid');
    renderProductCards('porcoes', 'porcoesGrid');
    renderProductCards('bebidas', 'bebidasGrid');
    renderProductCards('sobremesas', 'sobremesasGrid');
}

// Handle window resize
function handleResize() {
    // Close drawers and modals on larger screens if open
    if (window.innerWidth > 768) {
        // Optional: You can add auto-close logic here
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Cart button
    document.getElementById('cartButton').addEventListener('click', openCartDrawer);

    // Cart close button
    document.getElementById('cartClose').addEventListener('click', closeCartDrawer);

    // Modal close button
    document.getElementById('modalClose').addEventListener('click', closeProductModal);

    // Modal overlay click (close on backdrop click)
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target.id === 'productModal') {
            closeProductModal();
        }
    });

    // Cart drawer overlay click
    const cartDrawer = document.getElementById('cartDrawer');
    cartDrawer.addEventListener('click', (e) => {
        if (e.target === cartDrawer) {
            closeCartDrawer();
        }
    });

    // Category pills
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const category = pill.getAttribute('data-category');
            navigateToCategory(category);
        });
    });

    // Checkout button
    document.getElementById('btnCheckout').addEventListener('click', proceedToCheckout);

    // Scroll event for header and category
    window.addEventListener('scroll', debounce(() => {
        handleHeaderScroll();
        updateActiveCategoryOnScroll();
    }, 10));

    // Resize event
    window.addEventListener('resize', debounce(handleResize, 250));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (ModalState.isOpen) {
                closeProductModal();
            }
            const drawer = document.getElementById('cartDrawer');
            if (drawer.classList.contains('active')) {
                closeCartDrawer();
            }
        }
    });
}
