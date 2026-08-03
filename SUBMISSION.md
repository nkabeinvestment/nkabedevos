# Upwork Portfolio Submission Guide

Everything you need to submit the three storefronts to your Upwork portfolio.

## Live links

| Store | Live URL | What to highlight |
| ----- | -------- | ----------------- |
| AutoCare Motors (Auto Shop) | `https://nkabeinvestment.github.io/nkabedevos/stores/auto-shop/` | Service catalog, used-car lot, parts storefront |
| Velvet & Vogue (Apparel) | `https://nkabeinvestment.github.io/nkabedevos/stores/apparel/` | Multi-collection catalog (women, men, jewelry) |
| Trailhead Outfitters (Camping) | `https://nkabeinvestment.github.io/nkabedevos/stores/camping/` | Category-based gear catalog, cart + checkout |

Each store is fully clickable: product grid, working cart, **account sign-up/sign-in**, and a
**Stripe-style demo checkout** (test card `4242 4242 4242 4242`).

## Demo credentials

Accounts are stored in the browser (demo only). Use either:

- **Demo one-click login** — every store has a "Continue as demo customer" button.
- Or create your own: any email + password (6+ characters).

No email verification, no real charges. Everything resets if the browser cache is cleared.

## Suggested Upwork portfolio text (copy/paste)

### Title
> Full-Stack Developer | AI Integration Expert | SaaS & Mobile Apps — E-commerce storefronts

### Description (edit for the specific store)
> Complete, responsive e-commerce storefront built with vanilla HTML/CSS/JS. Includes
> product catalog, category filtering, live cart with localStorage persistence, customer
> account creation and login, a Stripe-style checkout flow with demo test card
> (`4242 4242 4242 4242`), and per-user order history. Works on GitHub Pages with zero
> backend — ideal as a lightweight, low-cost storefront or an interactive client demo.

### Tags / skills
> E-commerce, Web Development, JavaScript, HTML, CSS, UI/UX, Responsive Design, Shopify-like storefront

## How to demo it on a call (2 minutes)

1. Open the store link in a private/incognito window.
2. Scroll the product grid, add 2–3 items to cart (cart badge updates live).
3. Click **Checkout** → prompted to sign in → click **Continue as demo customer**.
4. Click **Pay** → select **"Use test card 4242 4242 4242 4242"** → Pay.
5. Show the **order confirmation** with order number.
6. Click your name (top right) → **My Orders** → show the saved order.

## Upload to Upwork portfolio

1. Log in to Upwork → **My Jobs → Portfolio Projects**.
2. **Add a new project**.
3. Paste the link, choose the category (e.g. *Web Development*), and add the description above.
4. Add **2–3 screenshots** (see below) to make the listing visually strong.

## Taking screenshots

Open each store and capture (Windows: `Win + Shift + S`, or F12 → device toolbar):

1. **Hero + product grid** (desktop, 1440px wide).
2. **Cart open** with a few items and the total.
3. **Checkout with the test card** filled in.
4. **Order confirmation** screen.

## Notes for clients

- The stores run 100% on GitHub Pages (static) — no server, no subscription costs.
- Checkout is a **simulated demo**; real Stripe payments can be added when a backend is
  available (Express server + Stripe test keys), and a ready Express API sample ships in
  this repo under `api-demo/`.
- Product data lives in each store's HTML (JSON) — trivial for a client to swap out.
