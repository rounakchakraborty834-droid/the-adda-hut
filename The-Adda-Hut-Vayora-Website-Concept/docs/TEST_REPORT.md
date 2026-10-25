# Test and QA report

**Prepared:** 25 October 2026  
**Overall status:** Local structure and interaction checks pass. External-media and production-domain checks remain pending because the execution environment blocks external resources.

## Checks run in this environment

| Check | Result | Notes |
|---|---|---|
| `node --check src/app.js` | PASS | JavaScript syntax check. |
| `node --check src/business-config.js` | PASS | Configuration module syntax check. |
| `node --check server.mjs` | PASS | Node static server syntax check. |
| `npm ci --ignore-scripts --offline` | PASS | Clean install succeeded with the empty dependency tree; `node_modules` was removed after the test so it is not included in the archive. |
| `npm run check` / `npm run build` | PASS | Dependency-free structural checks; 17 required files and 9 source markers verified. The `build` script is a project check, not a bundler. |
| Local HTTP smoke test | PASS | `GET /`, `/styles.css`, and the transparent logo returned HTTP 200 with expected content types. |
| HTML structure audit | PASS | No duplicate IDs, unresolved in-page fragment links, or missing `aria-controls` targets. All local `/...` paths audited for the page are present. |
| Responsive horizontal overflow | PASS | No document/body width overflow at 360, 390, 430, 768, 1024, 1280, 1440 or 1920 CSS px in the offline browser harness. |
| Section screenshot review | PARTIAL PASS | Hero, occasion explorer, signature story, gallery, reviews, location, booking form and footer were rendered and reviewed in the offline harness at desktop width, plus full-page mobile/desktop captures. The page structure and responsive rhythm were reviewed; real photos and live map were unavailable because third-party requests were blocked. |
| Mobile navigation | PASS | Opens, updates ARIA state, and closes after following a link. |
| Occasion-to-form handoff | PASS | Selecting Anniversary updates the tab and enquiry occasion field. |
| Enquiry form validation | PASS | Blank required fields are rejected and an error is announced/focused. |
| WhatsApp draft preparation | PASS | Valid form yields an encoded `wa.me` URL for the configured number; it does not open or send automatically. |
| Gallery filter and lightbox | PASS | Category filter hides other categories; dialog opens and Escape closes it. |
| Reduced-motion preference | PASS | Browser preference is detected and reveal content receives the final visible state. |
| Offline media fallback | PASS | Local logo loads; inaccessible remote imagery receives a fallback label without removing the rest of the page. |

### Browser harness details

The environment's Chromium browser denied direct navigation to both `http://127.0.0.1:4173/` and `file://` with `ERR_BLOCKED_BY_ADMINISTRATOR`, even though `curl` confirmed the local server responds with HTTP 200. To test the real page logic in that environment, a browser harness loaded the same HTML and CSS source into a document, embedded the supplied transparent logo, and ran the same configuration and app code after adapting only its module import for the harness. This is a useful interaction/layout test, but it is not a full deployment-browser verification of the HTTP-loaded module path.

## External resources not verified in this runtime

The runtime cannot resolve external hosts and the QA harness deliberately aborts external requests for repeatability. As a result, Pexels photos, Google Fonts, Google Maps embed, and the GSAP/ScrollTrigger CDN did not load in the browser harness. The reported browser console resource failures are expected from those deliberately blocked requests, not a proof that the external URLs fail on a normal internet connection. The visible fallback was tested; the final photographic composition, actual map embed and live GSAP animation should be re-checked from a normal connected browser.

## Required before production launch

- Confirm the owner-approved phone number, business hours, current listing rating/count, menu, capacity, services, package terms and availability.
- Replace illustrative stock photos with venue-approved imagery and optimize/self-host it if licensing permits; update the asset credits.
- Re-test the final site with a normally connected browser and the real production host/domain.
- Inspect the actual loaded hero, all major sections, gallery, map, footer and mobile layouts at 360, 390, 430, 768, 1024, 1280, 1440 and 1920 CSS px.
- Verify actual GSAP/ScrollTrigger timeline behavior, keyboard navigation and assistive-technology behavior, as well as performance/accessibility audits on final assets.
- Re-test Maps and WhatsApp on real devices, including a device where WhatsApp is not installed.
- Review privacy/terms and business approval before removing noindex controls.

No item in the production list above is marked passed because the required owner confirmation or production environment was not available here.
