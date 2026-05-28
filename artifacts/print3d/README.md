# Print3d — 3D Printing Product Showcase & Store

A professional, fully static single-page website for showcasing and selling 3D printed products through direct contact via WhatsApp and email.

## Purpose

Print3d lets customers browse a catalog of 3D printed products, add items to a cart, and generate a ready-to-send order message via WhatsApp or email — without any payment integration or backend.

## Tech Stack

- **React 18** — UI library
- **Vite** — build tool and dev server
- **TypeScript** — type-safe codebase
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icon library
- **React Icons** — brand icons (LinkedIn, TikTok, WhatsApp)

## Features

- **Product catalog** with 8 products across 6 categories
- **Category filters** — All, Figures, Gadgets, Car Parts, Decorations, Prototypes, Custom
- **Cart drawer** — add/remove/update quantities, persisted in localStorage
- **WhatsApp order generation** — generates a pre-filled message from cart contents
- **Email order generation** — generates a mailto link with cart summary
- **"Ask about item" button** — generates a product-specific WhatsApp inquiry
- **Bilingual (EN / PT-BR)** — full English and Brazilian Portuguese support with a visible toggle
- **Responsive design** — mobile-first, works on all screen sizes
- **Industrial dark theme** — graphite background, orange accents, cyan highlights

## Bilingual Support

All user-facing text is available in English and Brazilian Portuguese. The language toggle is in the header. The generated WhatsApp and email messages also respect the selected language.

Translation strings are stored in `src/i18n.ts`. To add a new language, add a new key to the `translations` object and update the `Lang` type.

## Static Cart

The cart is managed entirely in React state (via `CartContext`) and persisted to `localStorage`. No server communication happens. The cart generates human-readable order messages that are sent via WhatsApp or email.

## Configuration

All contact and social links are stored in `src/config.ts`:

```ts
export const WHATSAPP_PHONE = '5511999999999';  // wa.me phone number (no spaces/dashes)
export const CONTACT_EMAIL = 'your.email@example.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/yourprofile';
export const TIKTOK_URL = 'https://www.tiktok.com/@yourprofile';
```

Replace these values before deploying.

## Product Data

Products are stored in `src/data/products.ts` as a static array. Each product has bilingual fields (`nameEn`/`namePt`, `descriptionEn`/`descriptionPt`, etc.), pricing, delivery time, material, and tags.

## How to Run Locally

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

The dev server starts on the port defined by the `PORT` environment variable (default: auto-assigned by Replit).

## How to Build

```bash
pnpm build
```

Output is in `dist/public/`.

## How to Deploy to GitHub Pages

1. Update `vite.config.ts` to set the correct base path for GitHub Pages:
   ```ts
   base: '/your-repo-name/',
   ```
   (Or use `'/'` if deploying to a custom domain or user/org page.)

2. Build the project:
   ```bash
   pnpm build
   ```

3. Deploy the `dist/public/` folder to the `gh-pages` branch using your preferred method, for example with the `gh-pages` npm package:
   ```bash
   npx gh-pages -d dist/public
   ```

4. In your GitHub repository settings, set the Pages source to the `gh-pages` branch, root folder.

## Disclaimer

**Placeholder contact information:** The WhatsApp number (`+55 11 99999-9999`), email (`your.email@example.com`), LinkedIn, and TikTok URLs in this project are placeholders. Replace them in `src/config.ts` before deploying.

**Informal brand:** Print3d is an informal project/portfolio brand name used for this prototype. It is not presented as a legally registered company or trademark.
