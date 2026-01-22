// ========================================
// UTILITY FUNCTIONS
// Helper functions for formatting and WhatsApp integration
// ========================================

// Format currency to Brazilian Real
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Generate a random order ID
function generateOrderId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '#';
    for (let i = 0; i < 4; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

// Format WhatsApp message from cart data
function formatWhatsAppMessage(cartItems, customerInfo, totals) {
    const orderId = generateOrderId();
    let message = `Olá! Gostaria de fazer um pedido 🍔\n\n`;
    message += `*Novo Pedido via SUDO* 🚀\n`;
    message += `*Pedido ${orderId}*\n\n`;

    // Items
    message += `*ITENS:*\n`;
    cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.quantity}x ${item.name} (${formatCurrency(item.price * item.quantity)})\n`;

        // Add selected options
        if (item.selectedOptions && item.selectedOptions.length > 0) {
            item.selectedOptions.forEach(option => {
                message += `   + ${option.name}\n`;
            });
        }

        // Add observations
        if (item.observations) {
            message += `   Obs: ${item.observations}\n`;
        }
        message += `\n`;
    });

    // Totals
    message += `*VALORES:*\n`;
    message += `Subtotal: ${formatCurrency(totals.subtotal)}\n`;
    message += `Taxa de Entrega: ${formatCurrency(totals.deliveryFee)}\n`;
    message += `*TOTAL: ${formatCurrency(totals.total)}*\n\n`;

    // Customer Info
    message += `*DADOS DO CLIENTE:*\n`;
    message += `Nome: ${customerInfo.name}\n`;
    message += `Endereço: ${customerInfo.address}\n`;
    message += `Pagamento: ${customerInfo.paymentMethod}\n\n`;

    message += `Aguardo confirmação! 😊`;

    return message;
}

// Generate WhatsApp link
function generateWhatsAppLink(cartItems, customerInfo, totals) {
    const message = formatWhatsAppMessage(cartItems, customerInfo, totals);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${STORE_INFO.phone}?text=${encodedMessage}`;
}

// Show toast notification
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.2s ease-out';
        setTimeout(() => {
            container.removeChild(toast);
        }, 200);
    }, 3000);
}

// Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerOffset = 140; // Header + category nav height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Calculate free delivery progress
function calculateDeliveryProgress(subtotal) {
    const threshold = STORE_INFO.freeDeliveryThreshold;
    const remaining = threshold - subtotal;
    const percentage = Math.min((subtotal / threshold) * 100, 100);

    return {
        percentage,
        remaining: Math.max(remaining, 0),
        isFree: subtotal >= threshold
    };
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add fade-in animation when element enters viewport
function observeElements(selector, callback) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll(selector).forEach(element => {
        observer.observe(element);
    });
}

// Validate form data
function validateCheckoutForm(customerInfo) {
    const errors = [];

    if (!customerInfo.name || customerInfo.name.trim().length < 3) {
        errors.push('Por favor, informe seu nome completo');
    }

    if (!customerInfo.address || customerInfo.address.trim().length < 10) {
        errors.push('Por favor, informe um endereço completo');
    }

    if (!customerInfo.paymentMethod) {
        errors.push('Por favor, selecione uma forma de pagamento');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Format phone number (optional for future use)
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Add loading state to button
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = '<span class="spinner"></span> Processando...';
        button.disabled = true;
    } else {
        button.innerHTML = button.dataset.originalText;
        button.disabled = false;
    }
}
