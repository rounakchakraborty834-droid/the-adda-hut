# Build and run guide

## Requirements

- Node.js 20 or later.
- No npm packages are needed; the server uses Node built-in modules.
- Internet access for remote Pexels imagery, Google Fonts and GSAP/ScrollTrigger enhancements.

## Local use

From the project root:

```bash
npm run check
npm run dev
```

Open `http://127.0.0.1:4173`. `npm start` is an alias for the same static server. The server binds to `127.0.0.1` by default and uses the `PORT` environment variable if set. Stop with `Ctrl+C`.

## Checks

```bash
node --check src/app.js
node --check src/business-config.js
node --check server.mjs
npm run check
```

`npm run build` runs the same dependency-free source/structure checker; it is not a bundler or production compilation step. This project intentionally ships as static HTML/CSS/JS. The lockfile is included for reproducibility of the empty dependency tree.

## Business configuration

Update values in `src/business-config.js`. It uses JSDoc to describe the `BusinessConfig` shape. Update the review rating and count only after checking the current listing. Do not add opening hours, packages or menu data until the owner confirms them.

## Deploy checklist

- Confirm business facts, contact number, photos and all rights.
- Replace all illustrative images with venue-approved assets and update `docs/ASSET_CREDITS.md`.
- Consider downloading/self-hosting correctly licensed, optimized WebP/AVIF images and fonts, then test network failure and mobile data behavior.
- Set up HTTPS and real-domain hosting; update Open Graph metadata and configure canonical URL and sitemap if appropriate.
- Keep the concept noindex/robots lock until the owner authorizes public launch; then use the production domain and a proper robots/sitemap configuration.
- Add privacy notice, terms, server-side submission handling only if required, and any necessary consent/data-retention language before collecting inquiries at scale.
- Verify `wa.me` number and Maps destination on actual mobile devices.
- Run responsive/accessibility/performance QA on the final deployment.

## Secrets

No server credentials or API keys are currently required. `.env.example` intentionally contains only comments; never commit private `.env` files.
