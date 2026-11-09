# BOL BRAND

A React single-page site built with Vite. It deploys to Cloudflare as static assets; no paid hosting or application environment variables are required.

## Requirements

- Node.js 22 or newer
- npm
- A GitHub account
- A free Cloudflare account

## Run locally

```bash
npm ci
npm run dev
```

Create and check the production build locally:

```bash
npm run build
npm run preview
```

Vite writes the production site to `dist/`. The Wrangler configuration points to this directory and enables SPA fallback for unknown paths.

## Deploy with GitHub and Cloudflare Workers Builds

### 1. Push the project to GitHub

Create an empty GitHub repository, then from this project directory run:

```bash
git init
git add .
git commit -m "Prepare BOL BRAND for deployment"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY>.git
git push -u origin main
```

Replace the repository URL with your own. Do not commit `.env` files, API keys, or credentials.

### 2. Connect the GitHub repository to Cloudflare

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and open **Workers & Pages**.
2. Select **Create application** → **Workers** → **Import a repository**.
3. Authorize GitHub and select the repository you just pushed.
4. Configure the build:
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** `/`
5. Add `NODE_VERSION` = `22` if the build environment does not pick it up from `.node-version`. No application environment variables are required.
6. Select **Save and Deploy**.

Wrangler reads `wrangler.toml` and deploys `dist/` as static assets, with SPA fallback enabled. The site will be available at a free `*.workers.dev` address. Later pushes to `main` trigger deployments.

> **Important:** This repository is configured for Workers Builds, whose deploy command is `npx wrangler deploy`. Do not use the Pages deploy command for this setup. If you choose Cloudflare Pages instead, create a Pages project with build command `npm run build` and output directory `dist`; Pages performs the deploy itself, so no `npx wrangler deploy` command should be configured.

### 3. Optional custom domain

In your Cloudflare project, open **Custom domains** and follow the instructions to attach a domain you already own. Cloudflare static hosting is available on the Free plan; purchasing a domain or using paid account features may cost extra.

## Deployment and performance notes

- Wrangler's `not_found_handling = "single-page-application"` setting serves `index.html` for unknown paths, so the SPA still loads on a direct visit or refresh.
- Vite minifies and code-splits the production JavaScript and CSS. The Three.js hero scene is loaded after initial render and skipped on touch devices and when reduced motion is requested.
- Static build assets are output to `dist/`; there is no image-processing or compression service to configure. The current hero image is only 13 KB and the page does not load it.
- The contact form validates input and opens a prefilled email draft. The visitor must send it from their email app. Update the contact details in `src/data/siteData.js` before publishing.
- The site has no required `.env` values. `.env.example` documents this; never put private credentials into `VITE_*` variables because Vite embeds those values in public frontend assets.
- `wrangler.toml` configures the Worker name, static output directory, and SPA fallback. The build and deploy commands are configured in the Cloudflare dashboard.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create the optimized production site in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
