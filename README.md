# khrum

Streetfood café landing — pizza, sushi, burgers, delivery in 30 min.
Portfolio case built end-to-end from wireframes to a deployable Next.js site.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind v4
- next-intl — UA default, EN via `/en`
- Zustand — cart, persisted to localStorage
- React Hook Form + Zod — checkout validation
- Sonner — toasts
- Phosphor icons

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

`/` home · `/menu` full menu with filters · `/delivery` · `/about`
`/contacts` · `/app` · `/cart` · `/checkout` · `/booking`

## Features

- Two locales with `as-needed` prefix, language switcher in header + mobile drawer
- Cart with product options: pizza sizes (30/35/40 cm), roll sauces, burger extras
- Each configured product is a separate cart line keyed by variant + add-ons
- Search overlay (⌘K / Ctrl+K) — adds results straight to cart
- Mobile bottom order bar that appears when the cart is non-empty
- Checkout form with inline validation on submit only
- Static sitemap + robots + per-route OG metadata with hreflang alternates

## Contact

Oleh Chernov · [oleh.chernov.fs@gmail.com](mailto:oleh.chernov.fs@gmail.com)
