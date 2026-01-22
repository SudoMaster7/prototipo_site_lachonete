// ========================================
// CART MANAGEMENT
// Global cart state and operations
// ========================================

// Global cart state
const CartState = {
    items: [],
    customerInfo: {
        name: '',
        address: '',
        paymentMethod: ''
    }
};

// Add item to cart
function addToCart(product, quantity = 1, selectedOptions = [], observations = '') {
    // Calculate item price with options
    let itemPrice = product.price;
    if (selectedOptions.length > 0) {
        selectedOptions.forEach(option => {
            itemPrice += option.price;
        });
    }

    // Create unique item ID based on product and options
    const optionIds = selectedOptions.map(opt => opt.id).sort().join('-');
    const uniqueId = `${product.id}-${optionIds}`;

    // Check if item already exists in cart
    const existingItemIndex = CartState.items.findIndex(item => item.uniqueId === uniqueId);

    if (existingItemIndex !== -1) {
        // Update quantity
        CartState.items[existingItemIndex].quantity += quantity;
    } else {
        // Add new item
        CartState.items.push({
            uniqueId,
            productId: product.id,
            name: product.name,
            price: itemPrice,
            basePrice: product.price,
            quantity,
            selectedOptions,
            observations,
            image: product.image
        });
    }

    updateCart();
    showToast(`${product.name} adicionado ao carrinho! 🍔`, 'success');

    // Bounce animation on cart button
    const cartButton = document.getElementById('cartButton');
    cartButton.classList.add('bounce');
    setTimeout(() => cartButton.classList.remove('bounce'), 600);
}

// Remove item from cart
function removeFromCart(uniqueId) {
    const itemIndex = CartState.items.findIndex(item => item.uniqueId === uniqueId);
    if (itemIndex !== -1) {
        const itemName = CartState.items[itemIndex].name;
        CartState.items.splice(itemIndex, 1);
        updateCart();
        showToast(`${itemName} removido do carrinho`, 'success');
    }
}

// Update item quantity
function updateQuantity(uniqueId, newQuantity) {
    const item = CartState.items.find(item => item.uniqueId === uniqueId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(uniqueId);
        } else {
            item.quantity = newQuantity;
            updateCart();
        }
    }
}

// Clear cart
function clearCart() {
    CartState.items = [];
    CartState.customerInfo = {
        name: '',
        address: '',
        paymentMethod: ''
    };
    updateCart();
}

// Calculate cart totals
function calculateTotals() {
    const subtotal = CartState.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    const deliveryProgress = calculateDeliveryProgress(subtotal);
    const deliveryFee = deliveryProgress.isFree ? 0 : STORE_INFO.deliveryFee;
    const total = subtotal + deliveryFee;

    return {
        subtotal,
        deliveryFee,
        total,
        itemCount: CartState.items.reduce((sum, item) => sum + item.quantity, 0),
        deliveryProgress
    };
}

// Get items count
function getCartItemsCount() {
    return CartState.items.reduce((sum, item) => sum + item.quantity, 0);
}

// Update cart UI
function updateCart() {
    const totals = calculateTotals();

    // Update cart badge
    const cartBadge = document.getElementById('cartBadge');
    cartBadge.textContent = totals.itemCount;

    // Update cart items display
    updateCartItemsDisplay();

    // Update totals display
    updateTotalsDisplay(totals);

    // Update delivery progress
    updateDeliveryProgress(totals.deliveryProgress, totals.subtotal);

    // Update upsell widget
    updateUpsellWidget();

    // Show/hide checkout form and summary
    const checkoutForm = document.getElementById('checkoutForm');
    const cartSummary = document.getElementById('cartSummary');

    if (totals.itemCount > 0) {
        checkoutForm.style.display = 'block';
        cartSummary.style.display = 'block';
    } else {
        checkoutForm.style.display = 'none';
        cartSummary.style.display = 'none';
    }
}

// Update cart items display
function updateCartItemsDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');

    if (CartState.items.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9 2L6 6H3L5 18H19L21 6H18L15 2z"/>
                </svg>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = CartState.items.map(item => `
        <div class="cart-item">
            <div class="cart-item-header">
                <div class="cart-item-name">${item.name}</div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.uniqueId}')">
                    ✕ Remover
                </button>
            </div>
            ${item.selectedOptions.length > 0 ? `
                <div class="cart-item-options">
                    ${item.selectedOptions.map(opt => `+ ${opt.name}`).join(', ')}
                </div>
            ` : ''}
            ${item.observations ? `
                <div class="cart-item-options">Obs: ${item.observations}</div>
            ` : ''}
            <div class="cart-item-footer">
                <div class="cart-item-quantity">
                    Quantidade: ${item.quantity}x
                </div>
                <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
            </div>
        </div>
    `).join('');
}

// Update totals display
function updateTotalsDisplay(totals) {
    document.getElementById('subtotal').textContent = formatCurrency(totals.subtotal);
    document.getElementById('deliveryFee').textContent = totals.deliveryFee === 0 ? 'GRÁTIS' : formatCurrency(totals.deliveryFee);
    document.getElementById('total').textContent = formatCurrency(totals.total);
}

// Update delivery progress bar
function updateDeliveryProgress(progress, subtotal) {
    const progressContainer = document.getElementById('deliveryProgress');
    const progressMessage = document.getElementById('progressMessage');
    const progressFill = document.getElementById('progressFill');

    if (progress.isFree) {
        progressMessage.textContent = '🎉 Você ganhou frete grátis!';
        progressContainer.style.background = 'var(--success-light)';
        progressContainer.style.borderColor = 'rgba(34, 197, 94, 0.3)';
    } else {
        progressMessage.textContent = `Faltam ${formatCurrency(progress.remaining)} para frete grátis!`;
        progressContainer.style.background = 'var(--primary-light)';
        progressContainer.style.borderColor = 'rgba(var(--primary-rgb), 0.3)';
    }

    progressFill.style.width = `${progress.percentage}%`;
}

// Update upsell widget
function updateUpsellWidget() {
    const upsellWidget = document.getElementById('upsellWidget');
    const upsellItems = document.getElementById('upsellItems');

    // Only show upsell if there are items in cart
    if (CartState.items.length === 0) {
        upsellWidget.style.display = 'none';
        return;
    }

    // Get all suggested upsell products
    const suggestedIds = new Set();
    CartState.items.forEach(item => {
        const product = getProductById(item.productId);
        if (product && product.suggestedUpsell) {
            product.suggestedUpsell.forEach(id => suggestedIds.add(id));
        }
    });

    // Filter out products already in cart
    const cartProductIds = CartState.items.map(item => item.productId);
    const upsellProducts = Array.from(suggestedIds)
        .filter(id => !cartProductIds.includes(id))
        .map(id => getProductById(id))
        .filter(p => p);

    if (upsellProducts.length === 0) {
        upsellWidget.style.display = 'none';
        return;
    }

    upsellWidget.style.display = 'block';
    upsellItems.innerHTML = upsellProducts.map(product => `
        <div class="upsell-item" onclick="quickAddProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="upsell-item-image">
            <div class="upsell-item-info">
                <div class="upsell-item-name">${product.name}</div>
                <div class="upsell-item-price">${formatCurrency(product.price)}</div>
            </div>
        </div>
    `).join('');
}

// Quick add product (for simple items)
function quickAddProduct(productId) {
    const product = getProductById(productId);
    if (product) {
        addToCart(product, 1, [], '');
    }
}

// Save customer info
function saveCustomerInfo() {
    CartState.customerInfo = {
        name: document.getElementById('customerName').value,
        address: document.getElementById('customerAddress').value,
        paymentMethod: document.getElementById('paymentMethod').value
    };
}

// Validate and proceed to checkout
function proceedToCheckout() {
    saveCustomerInfo();

    // Validate cart
    if (CartState.items.length === 0) {
        showToast('Adicione itens ao carrinho primeiro', 'error');
        return;
    }

    // Validate customer info
    const validation = validateCheckoutForm(CartState.customerInfo);
    if (!validation.isValid) {
        showToast(validation.errors[0], 'error');
        return;
    }

    // Calculate totals
    const totals = calculateTotals();

    // Generate WhatsApp link
    const whatsappLink = generateWhatsAppLink(CartState.items, CartState.customerInfo, totals);

    // Open WhatsApp
    window.open(whatsappLink, '_blank');

    // Show success message
    showToast('Redirecionando para WhatsApp... 📱', 'success');
}
