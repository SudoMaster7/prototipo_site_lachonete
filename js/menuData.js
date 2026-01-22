// ========================================
// MENU DATA - SUDO Burger
// Complete product catalog with categories
// ========================================

const STORE_INFO = {
    name: "SUDO Burger",
    phone: "5521983388872", // WhatsApp number (without + or spaces)
    deliveryFee: 5.00,
    freeDeliveryThreshold: 40.00,
    estimatedTime: "25-35 min",
    isOpen: true
};

const CATEGORIES = [
    { id: "lanches", label: "Lanches", icon: "🍔" },
    { id: "porcoes", label: "Porções", icon: "🍟" },
    { id: "bebidas", label: "Bebidas", icon: "🥤" },
    { id: "sobremesas", label: "Sobremesas", icon: "🍰" }
];

const PRODUCTS = [
    // ======== LANCHES ========
    {
        id: 1,
        category: "lanches",
        name: "X-SUDO Clássico",
        description: "Hambúrguer artesanal 180g, queijo cheddar, alface, tomate, cebola roxa e molho especial",
        price: 28.00,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
        isPopular: true,
        hasOptions: true,
        options: [
            { id: "bacon", name: "Bacon Extra", price: 3.00 },
            { id: "queijo", name: "Queijo Extra", price: 2.50 },
            { id: "ovo", name: "Ovo", price: 2.00 },
            { id: "cheddar", name: "Cheddar Extra", price: 3.50 }
        ],
        suggestedUpsell: [7, 8] // IDs of suggested items
    },
    {
        id: 2,
        category: "lanches",
        name: "X-SUDO Bacon",
        description: "Hambúrguer artesanal 180g, bacon crocante, queijo cheddar, cebola caramelizada e barbecue",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop",
        isPopular: true,
        hasOptions: true,
        options: [
            { id: "bacon2x", name: "Bacon em Dobro", price: 5.00 },
            { id: "queijo", name: "Queijo Extra", price: 2.50 },
            { id: "onion-rings", name: "Onion Rings", price: 4.00 }
        ],
        suggestedUpsell: [5, 9]
    },
    {
        id: 3,
        category: "lanches",
        name: "X-SUDO Picante",
        description: "Hambúrguer artesanal 180g, pimenta jalapeño, queijo pepper jack, molho chipotle",
        price: 32.00,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop",
        isNew: true,
        isSpicy: true,
        hasOptions: true,
        options: [
            { id: "jalapeno", name: "Jalapeño Extra", price: 2.00 },
            { id: "queijo", name: "Queijo Extra", price: 2.50 }
        ],
        suggestedUpsell: [8, 10]
    },
    {
        id: 4,
        category: "lanches",
        name: "X-SUDO Vegetariano",
        description: "Hambúrguer de grão-de-bico e beterraba, queijo, rúcula, tomate seco e maionese verde",
        price: 26.00,
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=400&fit=crop",
        hasOptions: true,
        options: [
            { id: "queijo", name: "Queijo Extra", price: 2.50 },
            { id: "cogumelos", name: "Cogumelos Salteados", price: 4.00 }
        ],
        suggestedUpsell: [6, 9]
    },

    // ======== PORÇÕES ========
    {
        id: 5,
        category: "porcoes",
        name: "Batata Frita",
        description: "Batatas fritas crocantes com sal especial (serve 2 pessoas)",
        price: 15.00,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop",
        isPopular: true,
        hasOptions: false,
        suggestedUpsell: [] // Porções não sugerem upsell
    },
    {
        id: 6,
        category: "porcoes",
        name: "Onion Rings",
        description: "Anéis de cebola empanados e fritos até ficarem dourados (serve 2 pessoas)",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=400&fit=crop",
        hasOptions: false,
        suggestedUpsell: []
    },

    // ======== BEBIDAS ========
    {
        id: 7,
        category: "bebidas",
        name: "Coca-Cola Lata",
        description: "Coca-Cola lata 350ml gelada",
        price: 6.00,
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop",
        hasOptions: false,
        quickAdd: true, // Enables quick add button (no modal)
        suggestedUpsell: []
    },
    {
        id: 8,
        category: "bebidas",
        name: "Guaraná Antarctica Lata",
        description: "Guaraná Antarctica lata 350ml gelado",
        price: 6.00,
        image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=400&fit=crop",
        hasOptions: false,
        quickAdd: true,
        suggestedUpsell: []
    },
    {
        id: 9,
        category: "bebidas",
        name: "Suco Natural Laranja",
        description: "Suco de laranja natural 500ml",
        price: 10.00,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
        hasOptions: false,
        quickAdd: true,
        suggestedUpsell: []
    },
    {
        id: 10,
        category: "bebidas",
        name: "Água Mineral",
        description: "Água mineral sem gás 500ml",
        price: 4.00,
        image: "https://images.unsplash.com/photo-1559839914-17aae19ea6d1?w=400&h=400&fit=crop",
        hasOptions: false,
        quickAdd: true,
        suggestedUpsell: []
    },

    // ======== SOBREMESAS ========
    {
        id: 11,
        category: "sobremesas",
        name: "Brownie de Chocolate",
        description: "Brownie de chocolate belga com nozes, servido quente",
        price: 14.00,
        image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=400&fit=crop",
        isPopular: true,
        hasOptions: true,
        options: [
            { id: "ice-cream", name: "Sorvete de Baunilha", price: 5.00 }
        ],
        suggestedUpsell: []
    },
    {
        id: 12,
        category: "sobremesas",
        name: "Milkshake de Morango",
        description: "Milkshake cremoso de morango com chantilly",
        price: 16.00,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop",
        hasOptions: false,
        suggestedUpsell: []
    }
];

// Helper function to get products by category
function getProductsByCategory(categoryId) {
    return PRODUCTS.filter(product => product.category === categoryId);
}

// Helper function to get product by ID
function getProductById(productId) {
    return PRODUCTS.find(product => product.id === productId);
}

// Helper function to get upsell products
function getUpsellProducts(productIds) {
    return PRODUCTS.filter(product => productIds.includes(product.id));
}
