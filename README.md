# Verdant Specialty Tea & Loose Leaf Blend Atelier

Production-ready, ultra-professional web template for a high-end specialty tea atelier, built strictly with **HTML5, CSS3, Vanilla JavaScript, and Tailwind CSS**. Optimized for instant deployment to [Vercel](https://vercel.com).

---

## Architecture & Tech Stack

- **Markup & Layout**: Clean, semantic HTML5 with microdata and accessibility ARIA attributes.
- **Styling**: Tailwind CSS (via CDN) paired with `css/custom.css`.
- **Aesthetic Philosophy**: High-contrast, sharp flat modern design. **Strictly zero color gradients, zero glassmorphism, and zero neumorphism**.
- **Unified Typography & Heading Colors**: Enforced global heading color rule across all `H1`–`H6` tags in both Light (`#0A1910`) and Dark (`#F8FAF7`) modes.
- **Interactivity**: 100% Vanilla JavaScript modularized into clean ES6 scripts (`js/main.js`, `js/products.js`, `js/brewing.js`, `js/contact.js`).
- **Deployment**: Configured for zero-config static hosting or custom deployment via `vercel.json`.

---

## Page Inventory & Structural Containers

| Page File | Page Name | Sections / Containers | Core Features |
| :--- | :--- | :---: | :--- |
| `index.html` | **Home - Signature Blends** | Exactly 8 | Hero with high-contrast overlay, 4 Philosophy Pillars, 4 Flagship Blends with Quick View/Cart, Aroma Architecture Wheel, 4-Stage Blender Craft, Teaware Collections, Sommelier Voices, VIP Reserve Circle. |
| `home-origins.html` | **Home - Tea Origins** | Exactly 8 | Terroirs Hero, 4-Region Terroir Map (Uji, Wuyi, Darjeeling, Nuwara Eliya), Elevation & Climate Matrix, Heritage Harvesters, Ancient Tree Gu Shu Vault, Living Soils & Permaculture, Solar Harvest Almanac, Terroir Passport Subscription. |
| `products.html` | **Products** | Exactly 6 | Hero, Category Filter Bar (All, Green, Black, Oolong, Herbal, White/Pu-erh) + Live Sort, 12 Dynamic Product Cards with Quick View Modal & Cart triggers, Curated Tasting Flights, Sourcing Transparency Oath, Hospitality & Wholesale Program. |
| `brewing-guide.html` | **Brewing Guide** | Exactly 6 | Extraction Ritual Hero, Interactive Steeping Calculator + Live Digital Timer with Web Audio API Bell Chime, Vessel Anatomy (Gaiwan, Kyusu, Yixing, Glass), Water Science (TDS/pH & 3 Boil Stages), Gongfu vs. Western Comparison Table, 12-Hour Mizudashi Cold Brew. |
| `contact.html` | **Contact** | Exactly 6 | Concierge Hero, Strict Validation Contact Form (blocks numbers in Name, blocks letters in Phone, strict regex Email), Flagship Salons with **Real Google Maps Embed** & realistic addresses, Private Salon Tasting Flights, Wholesale Inquiries, Interactive FAQ Accordion. |

---

## Critical Functional Directives Verified

1. **Heading Colors Uniformity**: Every heading (`H1`–`H6`) across the entire project is bound to identical high-contrast color tokens (`#0A1910` in light mode, `#F8FAF7` in dark mode).
2. **1024px Responsiveness**: Strict flex and grid scaling tested at 1024px and below (`lg:` and `md:` breakpoints). Zero horizontal scrollbars.
3. **Mobile Hamburger Menu (<1024px)**: Contains **100% of all navbar elements** (All 5 links, the Double Arrow RTL toggle, the Dark/Light toggle, and the "Shop Blends" CTA button). Layered with `z-[999]` above all hero overlays.
4. **RTL/LTR Toggle**: Features an SVG Double Arrow (`⇄`) that toggles `dir="rtl"` / `dir="ltr"` on `<html>` and persists in `localStorage`.
5. **Dark/Light Theme**: Instant, persistent class toggling on `document.documentElement` with SVG sun/moon synchronization.
6. **Strict Form Validation (`contact.html`)**:
   - **Name field**: Blocks and strips numbers (`0-9`) on `keydown`, `input`, and `paste`.
   - **Phone field**: Blocks and strips alphabet letters (`a-zA-Z`) on `keydown`, `input`, and `paste`.
   - **Email field**: Strict regex validation before allowing submission.
   - **Modal Feedback**: Interactive confirmation dialog displaying reference dossier details.
7. **Image Uniqueness**: All 51 image URLs are unique and verified high-resolution photographs from Unsplash with zero duplicates.

---

## Local Development & Deployment

### Run Locally (VS Code / Standard Browser)
Simply serve the root directory using any local web server, for example:

```bash
# Using Python
python -m http.server 3000

# Using Node.js npx serve
npx serve .

# Using VS Code Live Server
# Right click `index.html` -> "Open with Live Server"
```

### Deploy to Vercel

```bash
# Using Vercel CLI
npm i -g vercel
vercel

# Or push to GitHub and import repository in Vercel Dashboard
```
