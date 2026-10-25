# The Adda Hut × Vayora — Website Concept

A responsive, motion-led concept website for The Adda Hut, Siliguri. This is a **concept preview by Vayora**, not an authorised replacement for the venue's official website. The site intentionally includes `noindex, nofollow` metadata and a restrictive `robots.txt` while business owners review the proposal.

## Run locally

Requirements: Node.js 20 or newer. No npm dependencies are required.

```bash
npm run check
npm run dev
```

Open `http://127.0.0.1:4173`. `npm start` runs the same static development server. Stop it with `Ctrl+C`.

## Project map

- `index.html` — semantic page structure, SEO/social metadata, section content.
- `styles.css` — tokens, responsive layouts, media treatment, focus and reduced-motion styles.
- `src/app.js` — navigation, occasion explorer, form validation, WhatsApp message preparation, gallery filtering/lightbox, and progressive GSAP motion.
- `src/business-config.js` — typed-by-JSDoc business data and verification state.
- `public/brand/` — original supplied logo, transparent logo, favicon and app icon.
- `scripts/check-project.mjs` — dependency-free structural and source checks.
- `docs/` — content verification, design/skill audit, asset credits, animation notes, runbook and test report.

## Concept details

The design language grows from the supplied logo: ink black, warm ivory, straw gold and terracotta. The content uses a mix of editorial typography, an occasion selector, offset image compositions, a signature story transition, an illustrative gallery, public-review information and a booking enquiry flow. GSAP and ScrollTrigger load from a CDN as progressive enhancement; core content and the enquiry flow are regular HTML/CSS/JavaScript.

## Before a real launch

1. Replace illustrative stock imagery with current, authorised photographs of the actual venue where available.
2. Confirm the preferred booking number with the owner, and verify hours, menu, services, package inclusions, prices, capacity and booking terms directly.
3. Re-check the Google Business listing rating/review count before publishing and update `src/business-config.js`.
4. Confirm rights to the logo and every photo/video. Update `docs/ASSET_CREDITS.md`.
5. Review privacy, terms, form handling and operational requirements with the business owner. The current inquiry flow opens a prefilled WhatsApp draft; it does not send automatically or store submissions on a server.
6. Configure production hosting and HTTPS, replace concept-preview indexing controls only after written approval, and test the production domain, canonical URL, performance and accessibility.

## Important implementation limits

The supplied venue website was returning a suspension notice during research. Public indexed content had contradictory details, so this concept does not publish opening hours, prices, venue capacity, menu items, package promises or invented customer testimonials. Pexels imagery is illustrative and is not presented as actual venue photography. Image/CDN/font/GSAP resources are remote, so an internet connection is needed for all visual material and motion enhancements to load.

See `docs/CONTENT_VERIFICATION.md` and `docs/TEST_REPORT.md` before presenting this as launch-ready.
