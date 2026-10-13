# Salt and Pepper

One-page website for **Salt and Pepper**, a home-cooked food delivery and weekly meal prep service in Dublin, run by Manar Eddib and Hajar Anouar.

The page has a hero with an animated paella drawn on `<canvas>`, the menu, a meal prep section, an order form that sends orders by email, contact details and photo credits.

## Features

- **No dependencies and no build step.** Plain HTML, CSS and JavaScript.
- **Works offline from disk.** Double-click `index.html` and it runs. It also works on any static host (GitHub Pages, Netlify…).
- **Data-driven menu.** The menu cards, order form rows, photo credits and dish counter are all generated from one list in `js/dishes.js`.
- **Canvas fallback art.** If a dish photo fails to load, a hand-drawn canvas illustration of that dish is shown instead.
- **Order form.** Supports single orders and weekly meal prep with delivery days. It validates input, shows accessible error messages and submits through [FormSubmit](https://formsubmit.co). There is also a "copy order" option.
- **Light and dark mode**, responsive layout (breakpoints at 900px and 640px), and accessibility work (labels, `aria-live` announcements, AA contrast).

## Run locally

```bash
git clone <repo-url>
cd restaurant-web
# Option 1: open index.html in your browser
# Option 2: serve it statically
npx serve .        # or: python -m http.server
```

## Project structure

```
├── index.html              # Markup + SEO / Open Graph meta
├── css/styles.css          # Design tokens → base → sections → responsive
├── js/
│   ├── config.js           # Order endpoint, max portions, delivery days
│   ├── dishes.js           # Menu data (name, description, tags, photo, credit)
│   ├── canvas/
│   │   ├── utils.js        # Drawing helpers (rng, blobs, grains, shadows)
│   │   ├── ingredients.js  # Prawns, mussels, lemon, chicken, peas, plates…
│   │   ├── paella.js       # Animated hero paella
│   │   └── dishes-art.js   # Fallback illustration per dish
│   ├── menu.js             # Menu cards and photo credits
│   ├── order.js            # Order form logic
│   └── main.js             # Entry point
└── assets/img/             # Dish photos (800×600 WebP) and og-image.jpg
```

The scripts are classic `defer` scripts, not ES modules, so the site works over `file://`. They share global scope, so **the order of `<script>` tags in `index.html` matters**.

## Customising

| To change… | Edit |
|---|---|
| Where orders are emailed | `ORDER_ENDPOINT` in `js/config.js` |
| Max portions per dish / available days | `MAX_PORTIONS`, `DELIVERY_DAYS` in `js/config.js` |
| Add or edit a dish | `js/dishes.js` (optionally add a fallback drawing in `js/canvas/dishes-art.js` with the same `id`) |
| Colours / dark mode | Custom properties in `:root` in `css/styles.css` |

**Photos** go in `assets/img/` as 800×600 WebP images cropped to 4:3. If a photo is licensed CC BY or BY-SA, fill in its `credit` field in `js/dishes.js` and it will be listed in the footer. Use `credit: null` for your own photos.

> **FormSubmit:** the first order triggers an activation email to the configured address. Orders are only delivered after you confirm it.

## Photo credits

The current dish photos come from [Wikimedia Commons](https://commons.wikimedia.org) under their respective licences (CC0, CC BY, CC BY-SA). Each photo's author and licence is listed in `js/dishes.js` and in the site footer.
