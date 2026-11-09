# BOL BRAND

A React single-page site built with Vite. It deploys to Cloudflare Pages as a static site; no server, paid hosting, or environment variables are required.

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

Vite writes the production site to `dist/`. The Cloudflare Pages configuration in `wrangler.toml` points to this directory.

## Deploy with GitHub and Cloudflare Pages

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

### 2. Create the Cloudflare Pages project

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and open **Workers & Pages**.
2. Select **Create application** → **Pages** → **Connect to Git**.
3. Authorize GitHub and select the repository you just pushed.
4. Configure the build:
   - **Production branch:** `main`
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
5. In **Environment variables**, add `NODE_VERSION` = `22` if the build environment does not pick it up from `.node-version`. No application environment variables are currently needed.
6. Select **Save and Deploy**.

Cloudflare builds and publishes the contents of `dist/`. The site will be available at a free `*.pages.dev` address. Later pushes to `main` trigger production deployments; other branches can be used for preview deployments.

### 3. Optional custom domain

In the Pages project, open **Custom domains** and follow the instructions to attach a domain you already own. Cloudflare Pages hosting is free on the Free plan; purchasing a domain or using paid account features may cost extra.

## Deployment and performance notes

- `public/_redirects` sends unknown paths to `index.html`, so the SPA still loads on a direct visit or refresh.
- Vite minifies and code-splits the production JavaScript and CSS. The Three.js hero scene is loaded after initial render and skipped on touch devices and when reduced motion is requested.
- Static build assets are output to `dist/`; there is no image-processing or compression service to configure. The current hero image is only 13 KB and the page does not load it.
- The contact form validates input and opens a prefilled email draft. The visitor must send it from their email app. Update the contact details in `src/data/siteData.js` before publishing.
- The site has no required `.env` values. `.env.example` documents this; never put private credentials into `VITE_*` variables because Vite embeds those values in public frontend assets.
- `wrangler.toml` configures the Pages project name and output directory. In the Git integration flow above, the build command is configured in the Cloudflare dashboard.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create the optimized production site in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
