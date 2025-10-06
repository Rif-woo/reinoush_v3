# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Reinoush v3 is a perfume e-commerce website built with Next.js 15.3.4 using the App Router architecture. The project is an MVP for a hotel management SaaS and uses shadcn ui for the UI and charts. The site features geolocation-based pricing (FCFA for Africa, EUR for Europe) and a complete shopping cart system with email order processing.

## Development Commands

### Core Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Testing and Debugging
```bash
# Test email functionality (requires .env.local setup)
# Add items to cart, proceed to payment, fill form
# Check MANAGER_EMAIL for order confirmation

# Test geolocation pricing
# Use VPN or browser dev tools to test different locations
# Check browser console for geolocation detection logs
```

## Architecture and Code Structure

### Core Technologies
- **Next.js 15.3.4** with App Router
- **React 19** with Context API for state management
- **TailwindCSS 4** for styling with custom color palette
- **MongoDB** for data persistence
- **Resend** for email functionality
- **GSAP** for animations
- **Embla Carousel** for image carousels

### Context Architecture
The application uses a multi-context architecture for state management:

- **`PricingContext`**: Handles geolocation-based pricing with automatic detection via IP geolocation and timezone fallbacks
- **`CartContext`**: Manages shopping cart state with localStorage persistence and price calculations
- **`CartNotificationContext`**: Handles cart interaction notifications
- **`PromoContext`**: Manages promotional offers and discounts

### Key Components Structure
- **Page Components**: `heroSection`, `BestSellers`, `Categories`, `NoteOlfactive`, `APropos`, `AvisClients`, `Contact`
- **Commerce Components**: `Cart`, `CartIcon`, `PaymentModal` with geolocation integration
- **UI Components**: `NavBar`, `Footer`, `Carousel` using Embla

### Geolocation Pricing System
The pricing system automatically detects user location and displays appropriate currency:
- **Africa**: Prices in FCFA (50ml = 8000 Fcfa, 30ml = 5000 Fcfa)
- **Europe/International**: Prices in EUR (50ml = 30€, 30ml = 20€)
- Detection uses `ipapi.co` API with timezone fallback
- Completely transparent to users - no UI indicators of pricing changes

### Database Integration
- MongoDB connection via `lib/mongodb.js`
- Global connection singleton pattern to prevent connection pooling issues
- Requires `MONGODB_URI` environment variable

## Environment Configuration

### Required Environment Variables
```bash
# Database
MONGODB_URI=mongodb://...

# Email Service  
RESEND_API_KEY=re_...
MANAGER_EMAIL=manager@domain.com
```

### Email System Setup
1. Create account at [resend.com](https://resend.com)
2. Generate API key (starts with `re_`)
3. Configure domain (optional) for custom email addresses
4. Orders are automatically emailed to `MANAGER_EMAIL` with:
   - Customer details and geolocation (if permitted)
   - Complete order itemization
   - Total pricing in detected currency
   - Google Maps link for GPS coordinates

## Styling System

### TailwindCSS Custom Colors
```javascript
colors: {
  primaryBG: "#FCFAF5",    // Main background
  buttonBG: "#FFF8E6",     // Button background  
  accent: "#000000",       // Accent color
}
```

### Typography
- Primary font: Poppins (400, 700 weights)
- Font variable: `--font-anon`
- Custom font family configuration in `tailwind.config.js`

## Cart and Commerce Logic

### Cart State Management
- Persistent storage via localStorage with key `reinoush_cart`
- Automatic price recalculation based on detected currency
- Quantity management with automatic item removal at zero
- Real-time total calculation with currency formatting

### Order Processing Flow
1. User adds items to cart with automatic price detection
2. Proceeds to payment modal with comprehensive form
3. Optional geolocation request for delivery precision
4. Form validation and order compilation
5. Email dispatch to manager with all order details
6. Cart clearing and success confirmation

## Development Patterns

### Context Usage Pattern
```javascript
import { usePricing } from '@/contexts/PricingContext';
import { useCart } from '@/contexts/CartContext';

// Always check loading state for geolocation-dependent features
const { getPrice, currency, isLoading } = usePricing();
if (isLoading) return <LoadingSpinner />;
```

### Component File Organization
- Components in `/components/` as `.js` files
- Context providers in `/contexts/`
- Utilities and database connection in `/lib/`
- App Router structure in `/app/`

### Price Display Pattern
Always use `getPrice(volume)` from PricingContext rather than hardcoded prices to ensure currency detection works correctly across all components.

## Analytics and Performance

- **Vercel Analytics** integrated for performance monitoring
- **Turbopack** enabled for faster development builds
- **GSAP** for optimized animations
- **Font optimization** via next/font with Poppins

## Common Development Tasks

When adding new products:
1. Ensure price display uses `usePricing()` context
2. Add product images to `/public/` directory
3. Update cart logic if new product fields are required

When modifying pricing:
1. Update `PRICING` object in `PricingContext.js`
2. Test both FCFA and EUR price displays
3. Verify cart calculations handle new pricing

When adding new geographic regions:
1. Update `AFRICAN_COUNTRIES` array in `PricingContext.js`
2. Test geolocation detection with VPN
3. Verify email order format includes correct currency