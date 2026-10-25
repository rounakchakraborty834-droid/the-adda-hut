# File manifest

| Path | Purpose |
|---|---|
| `index.html` | Complete static concept page and metadata. |
| `styles.css` | Visual system, responsive composition, interaction and reduced-motion styling. |
| `src/app.js` | Interactions and progressive animation layer. |
| `src/business-config.js` | Central, JSDoc-typed business data and verification state. |
| `server.mjs` | Tiny Node built-in static server for local preview. |
| `package.json` / `package-lock.json` | Project metadata and dependency-free scripts/lockfile. |
| `.env.example` | Secret-free environment template. |
| `robots.txt` | Prevents crawler indexing during concept review. |
| `public/brand/logo-original.png` | Preserved supplied logo file. |
| `public/brand/logo-transparent.png` | Processed transparent logo derivative. |
| `public/brand/favicon-64.png` | Favicon. |
| `public/brand/app-icon.png` | App/social preview icon. |
| `scripts/check-project.mjs` | Static structure/source checks. |
| `docs/CONTENT_VERIFICATION.md` | Verified facts, source conflicts, owner confirmations. |
| `docs/DESIGN_AND_SKILL_AUDIT.md` | Research/resource audit and applied design notes. |
| `docs/ASSET_CREDITS.md` | Logo, illustrative photography, font and animation source notes. |
| `docs/ANIMATION_GUIDE.md` | Motion behaviors, accessibility and fallbacks. |
| `docs/BUILD_AND_RUN.md` | Local run, deployment and launch checklist. |
| `docs/TEST_REPORT.md` | Checks run and outstanding external QA. |
| `docs/FILE_MANIFEST.md` | Archive contents manifest. |
| `README.md` | Project overview and getting started. |

No `node_modules`, `.git` directory, `.env` secrets, cache, or generated build output is intended to ship in the ZIP.
