// ========================================
// MAIN APPLICATION
// Application initialization and startup
// ========================================

// Application state
const App = {
    initialized: false,
    version: '1.0.0'
};

// Initialize application
function initializeApp() {
    console.log('🍔 SUDO Delivery System v' + App.version);
    console.log('Initializing application...');

    try {
        // Initialize product grids
        initializeProductGrids();
        console.log('✓ Product grids rendered');

        // Initialize event listeners
        initializeEventListeners();
        console.log('✓ Event listeners attached');

        // Initialize cart
        updateCart();
        console.log('✓ Cart initialized');

        // Add animations to elements
        observeElements('.product-card', (element) => {
            element.classList.add('animate-in');
        });
        console.log('✓ Animations initialized');

        // Check store status
        updateStoreStatus();
        console.log('✓ Store status updated');

        App.initialized = true;
        console.log('✓ Application ready!');

        // Show welcome toast
        setTimeout(() => {
            showToast('Bem-vindo ao SUDO Burger! 🍔', 'success');
        }, 500);

    } catch (error) {
        console.error('Error initializing application:', error);
        showToast('Erro ao inicializar aplicação', 'error');
    }
}

// Update store status
function updateStoreStatus() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');

    if (STORE_INFO.isOpen) {
        statusDot.style.background = 'var(--success)';
        statusText.textContent = 'Aberto agora';
    } else {
        statusDot.style.background = 'var(--error)';
        statusText.textContent = 'Fechado';
    }
}

// Handle page visibility change (for future enhancements)
function handleVisibilityChange() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
        // Refresh data if needed
    }
}

// Performance monitoring (optional)
function logPerformanceMetrics() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
}

// Error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // In production, you might want to send this to an error tracking service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // In production, you might want to send this to an error tracking service
});

// Page visibility change handler
document.addEventListener('visibilitychange', handleVisibilityChange);

// Service Worker registration (for future PWA support)
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('Service Worker registered:', registration))
        //     .catch(error => console.log('Service Worker registration failed:', error));
    }
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initializeApp();

    // Log performance metrics after load
    window.addEventListener('load', () => {
        logPerformanceMetrics();
    });
});

// Prevent form submission (if any forms are added later)
document.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submission prevented');
});

// Console welcome message
console.log(`
    ╔═══════════════════════════════════════╗
    ║                                       ║
    ║         🍔 SUDO BURGER SYSTEM         ║
    ║     Professional Delivery Platform    ║
    ║                                       ║
    ║           Version ${App.version}              ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
`);

// Export for debugging (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.DEBUG = {
        CartState,
        ModalState,
        STORE_INFO,
        PRODUCTS,
        addToCart,
        removeFromCart,
        openProductModal,
        closeProductModal,
        openCartDrawer,
        closeCartDrawer,
        showToast
    };
    console.log('Debug mode enabled. Access window.DEBUG for debugging tools.');
}
