SUDO Delivery Prototype - Ultimate Implementation Plan
Version: 2.0 (High Conversion Edition) Description: A modern, dark-themed, mobile-first Single Page Application designed to demonstrate superior UX/UI, speed, and conversion psychology. Built to be the ultimate sales tool for SUDO.

1. Project Infrastructure
[UPDATE] package.json:

React + Vite.

tailwindcss, lucide-react.

NEW: framer-motion (for native-app-like animations and modal transitions).

NEW: sonner or react-hot-toast (for elegant success notifications).

NEW: clsx and tailwind-merge (for cleaner dynamic class logic).

[UPDATE] tailwind.config.js:

Define colors using CSS Variables (var(--primary), var(--secondary)) instead of hardcoded hex codes. This allows for instant "Theming" demos during sales calls.

[NEW] src/styles/theme.css:

Global CSS file defining the root variables.

Start with "Burger Orange" theme: --primary: 249 115 22; --bg-dark: 20 20 20.

2. Data Layer (The Brain)
src/data/menuData.js:

Store Info (Name, Logo, Phone, Free Delivery Threshold).

Categories (id, label, icon).

Products:

Basic info (id, price, description, image).

NEW: Badges (isPopular, isNew, isSpicy) to trigger psychological triggers.

NEW: Suggested Upsell (IDs of items that pair well, e.g., Fries with Burger).

3. Core Application & State
[NEW] src/context/CartContext.jsx:

Move logic out of App.jsx. Manage global cart state here.

Functions: addToCart, removeFromCart, updateQuantity, clearCart.

Computed Values: cartTotal, itemsCount, deliveryFee (dynamic calculation based on total).

src/App.jsx:

Focus purely on Layout structure (Header -> Hero -> Nav -> List -> Floating Actions).

Implement AnimatePresence from framer-motion for smooth route/modal changes.

4. UI Components (The "Wow" Factor)
Header & Hero
src/components/Header.jsx:

Glassmorphism effect (blur background) when scrolling.

src/components/Hero.jsx:

NEW: "Social Proof" pill (e.g., "⭐ 4.9 (1.2k avaliações)") to build trust instantly.

Navigation & Menu
src/components/CategoryNav.jsx:

Sticky positioning: Sticks to the top below the header when scrolling.

Active state indicator (pill highlights automatically as user scrolls through sections).

src/components/ProductCard.jsx:

NEW: Skeleton Loading state (gray boxes pulsing) while images load.

NEW: "Quick Add" button (+) for simple items (drinks) vs "Customize" for complex items (burgers).

The Conversion Engine (Modal & Cart)
src/components/ProductModal.jsx (Bottom Sheet):

Use framer-motion to slide up from the bottom (iOS style).

Psychology: High-quality expanded image.

Logic: Required modifiers (Radio buttons) vs Optional (Checkboxes).

src/components/CartDrawer.jsx:

NEW: "Free Delivery Progress Bar": "Faltam R$ 8,00 para entrega grátis!". Gamification to increase ticket size.

NEW: "Upsell Widget": "Vai bem com..." (Small horizontal scroll of beverages/desserts right before checkout).

Input fields with auto-format (phone masks).

5. WhatsApp Integration (The Killer Feature)
src/utils/whatsappFormatter.js:

Formatting: Use bolding (*text*) and emojis judiciously.

Structure:

Header: "Novo Pedido via SUDO 🚀" (Creates brand authority).

Order ID: Short hash (e.g., #92A1).

Items: List with indentation for extras.

Financial: Subtotal, Delivery Fee, Total.

Customer: Name, Address (Link to Google Maps optional), Payment Method.

Footer: "Aguardo confirmação!"

6. Verification & Demo Plan
Automated Tests:

npm run dev.

Responsiveness check (iPhone SE to iPhone 14 Pro Max sizes).

Manual Verification (The "Sales Script" Rehearsal):

The "Hook": Open the app. Does the Hero image make you hungry?

The "Flow": Click a burger -> Add Bacon -> Add to Cart. Did the toast appear instantly?

The "Upsell": Open Cart. Does it tell me to spend more for free delivery? Add a Coke. Did the bar fill up?

The "Close": Click "Enviar Pedido". Does WhatsApp open with a receipt that looks professional?