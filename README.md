# BOL BRAND

A React single-page site built with Vite. The primary deployment is Cloudflare Pages, available at `https://bol-brand-website.pages.dev`. No paid hosting or application environment variables are required.

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

Vite writes the production site to `dist/`. The `pages_build_output_dir` setting in `wrangler.toml` tells Cloudflare Pages to publish this directory. Pages serves the SPA for direct visits to unknown paths.

## Deploy with GitHub and Cloudflare Pages

### 1. Connect the GitHub repository

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and open **Workers & Pages**.
2. Select **Create application** → **Pages** → **Connect to Git** (or **Import an existing Git repository**).
3. Authorize GitHub if prompted and select `pranavmane01/bol-brand-website`.
4. Configure the Pages project:
   - **Project name:** `bol-brand-website`
   - **Production branch:** `main`
   - **Framework preset:** `React (Vite)`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
5. Use Node.js 22 (the repository includes `.node-version`). No application environment variables are required.
6. Select **Save and Deploy**.

Cloudflare Pages publishes the site at `https://bol-brand-website.pages.dev`. Pushes to `main` trigger production deployments; other branches can be used for preview deployments. **Do not set a deploy command such as `npx wrangler deploy` in Pages build settings**; Pages handles deployment after `npm run build`.

### 3. Optional custom domain

In the Pages project, open **Custom domains** and follow the instructions to attach a domain you already own. Cloudflare Pages hosting is available on the Free plan; purchasing a domain or using paid account features may cost extra.

## Deployment and performance notes

- Cloudflare Pages automatically serves the SPA entry point for unknown paths, so direct visits and refreshes do not produce 404 errors. `wrangler.toml` must keep `pages_build_output_dir = "./dist"` so Pages recognizes it as a Pages config.
- Vite minifies and code-splits the production JavaScript and CSS. The Three.js hero scene is loaded after initial render and skipped on touch devices and when reduced motion is requested.
- Static build assets are output to `dist/`; there is no image-processing or compression service to configure. The current hero image is only 13 KB and the page does not load it.
- The contact form validates input and opens a prefilled email draft. The visitor must send it from their email app. Update the contact details in `src/data/siteData.js` before publishing.
- The site has no required `.env` values. `.env.example` documents this; never put private credentials into `VITE_*` variables because Vite embeds those values in public frontend assets.
- Cloudflare Pages Git integration runs the build and deploys the output automatically; do not set a separate `npx wrangler deploy` command for this Pages project.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create the optimized production site in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
