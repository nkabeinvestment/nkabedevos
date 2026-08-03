# Upwork Portfolio Sandbox

A live demo hub for showing client-facing work samples: a static portfolio site plus
runnable sample apps. Hosted free on GitHub Pages.

## What's in the box

| Path                     | What it is                                      | Runs where       |
| ------------------------ | ----------------------------------------------- | ---------------- |
| `index.html`             | Portfolio landing page (cards link to demos)    | Live site        |
| `stores/auto-shop/`      | Auto shop storefront (services + used cars + parts) | Live site    |
| `stores/apparel/`        | Apparel storefront (clothing, garments, jewelry) | Live site       |
| `stores/camping/`        | Camping gear storefront (tents, sleep, cooking)  | Live site       |
| `apps/vanilla-todo/`     | Todo app — pure HTML/CSS/JS + localStorage      | Live site        |
| `apps/react-counter/`    | React app (hooks) loaded via CDN, no build step | Live site        |
| `api-demo/`              | Node/Express API sample                         | Locally only     |

### Storefront features

All three storefronts (shared code in `assets/store.css`, `assets/store.js`,
`assets/store-auth.js`, `assets/store-checkout.js`) include:

- Product grids + a **working cart** (add/remove, saved to `localStorage`)
- **Customer accounts** — create account / sign in (browser demo)
- **Stripe-style demo checkout** — test card `4242 4242 4242 4242`, order confirmation
- **Per-user order history** via the account menu
- No backend — runs entirely on GitHub Pages

See `SUBMISSION.md` for Upwork portfolio text, demo credentials, and screenshots.

## Deploy to GitHub Pages (one-time setup)

1. **Create a repository.** Push this folder to a GitHub repo (see "Push to GitHub" below).

2. **Enable Pages via Actions:**
   - Go to your repo → **Settings → Pages**.
   - Under *Build and deployment*, set **Source** to **GitHub Actions**.
   - The included `.github/workflows/pages.yml` will deploy on every push to `main`.

3. **Wait ~1 minute** for the first build, then visit:
   `https://<your-username>.github.io/<repo-name>/`

> The site uses relative links, so it works from any subpath (`/<repo-name>/`) automatically.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio sandbox"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

If `git push` asks for credentials, create a Personal Access Token
(GitHub → Settings → Developer settings → Personal access tokens) and use it as your password.

## Run demos locally

Open `index.html` in any browser — no server needed for the two frontend demos.

For the API demo:

```bash
cd api-demo
npm.cmd install
npm.cmd start
# then open http://localhost:3000
```

## Customize

- Replace the hero name/tagline in `index.html` with your own.
- Add a project: create a folder under `apps/`, then add a card in `index.html`.
- Delete the `api-demo` folder if you don't want to include backend code.

## Tools required

- Git (to push)
- Node.js 18+ (only for the API demo)
