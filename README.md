# Zaaika — Indian Restaurant Ordering App

A production-ready online ordering site for an Indian restaurant, built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build && npm start   # production
```

## Features

- **Browse & filter** — category tabs with a live animated indicator, real-time search
- **Add to order** — each card has a stepper that replaces "Add" once an item is in the cart, with no page navigation required
- **Cart drawer** — slides in from the right with spring physics; shows subtotal, delivery toggle, free-delivery progress
- **Checkout form** — name, contact, address (delivery) or collection details, special instructions
- **Order confirmation** — animated success screen with estimated time
- **Mobile sticky CTA** — floating bar at the bottom on phones showing live item count and total
- **Cart badge spring bounce** — the navbar badge bounces on every new addition
- **Popular dishes strip** — horizontal scroll on mobile, grid on desktop

## Palette (no gold)

| Token         | Hex       | Used for                              |
|---------------|-----------|---------------------------------------|
| `cream`       | `#fafaf7` | Page background                       |
| `charcoal`    | `#1c1917` | Primary text, dark surfaces           |
| `spice`       | `#e8793a` | Turmeric orange — buttons, accents    |
| `chili`       | `#c0342b` | Heat level badges, non-veg labels     |
| `veg`         | `#2e7d52` | Vegetarian badge, success state       |
| `muted`       | `#78706a` | Secondary text                        |

## Project structure

```
src/
  app/
    layout.tsx        Fonts, metadata, CartProvider
    page.tsx          Section order
    globals.css       Tailwind v4 theme tokens
  components/
    Navbar.tsx            Sticky nav with bouncing cart badge
    Hero.tsx              Full-screen food image + animated headline
    PopularStrip.tsx      Horizontal scroll of bestsellers
    MenuSection.tsx       Category tabs, search, animated grid
    MenuCard.tsx          3D-lite card with in-card quantity stepper
    CartDrawer.tsx        Slide-in drawer: cart → checkout → success
    FloatingCartButton.tsx Mobile sticky order bar
    About.tsx             Restaurant story + promise grid
    Footer.tsx            Contact, hours, newsletter
  store/
    cart.tsx          React Context cart with useReducer
  lib/
    data.ts           All menu items (edit here to change menu)
  types/
    index.ts          MenuItem, CartItem, Category types
```

## Customising the menu

All dishes live in `src/lib/data.ts`. Each item has:
- `name`, `description`, `price`, `category`
- `image` — any Unsplash URL (or your own hosted image)
- `veg` — boolean, controls the green/red badge
- `spice` — 0–3, renders flame icons and a label
- `popular` — shows an orange "Popular" badge and appears in the strip

## Connecting a real payment / backend

The checkout form submits to a fake timeout in `CartDrawer.tsx`. Replace the `setTimeout` in `handleCheckout` with a real API call to Stripe, Square, or your own backend.
