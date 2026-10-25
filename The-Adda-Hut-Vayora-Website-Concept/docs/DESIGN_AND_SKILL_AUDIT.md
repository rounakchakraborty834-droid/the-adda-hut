# Design references and skill audit

## Creative concept

**The Celebration Hideaway**: a warm, editorial celebration experience built around the original hut-on-“A” logo. Ink black, warm ivory, straw gold and terracotta are the base palette. Playfair Display adds expressive contrast with a neutral sans serif for navigation and utility. Section grammar varies across hero, manifesto, occasion selector, cinematic story, editorial features, asymmetric gallery, review statement, location and form.

## Resources inspected and applied

### Scroll Craft — `nateherkai/scroll-craft`
Read the skill documentation and device reference. Applied its direction to plan a journey with different visual devices and one signature story transition; avoid identical card grids, repeated fade-only sections and scroll hijacking; treat the mobile composition and reduced-motion path as first-class. The repository was queried via GitHub connector. A shell clone was attempted but failed because the environment could not resolve `github.com`; the documentation was still available through GitHub's connected file API.

### GSAP Skills — `greensock/gsap-skills`
Read official GSAP core and ScrollTrigger skill files. Applied one-time plugin registration, scroll-triggered reveals, transform/opacity movement, a counter triggered on section entry, reduced-motion handling, and cleanup on page lifecycle. GSAP is loaded from CDN and is a progressive enhancement, not the only way content appears.

### WebGL Animation Skills — `iart-ai/webgl-animation-skills`
Read the repository README and Three.js animation skill, including performance and cleanup guidance. No WebGL was added: the brief allows it only when it creates meaningful value, and this concept can achieve the intended dimensionality using art-directed imagery and light DOM motion without adding GPU cost or context-loss risk. This is a deliberate omission, not a claim that WebGL was implemented.

### shadcn/ui — `shadcn-ui/ui`
Read the shadcn skill guidance. The selected deliverable is a static, zero-dependency website rather than a React application, so installing shadcn would add an incompatible/unnecessary stack. Its relevant principles—composition, semantic controls and accessible focus behavior—were applied to native HTML navigation, tabs, form fields and dialog interactions instead. The stock shadcn visual system was not copied.

### Anthropic Frontend Design Skill — `anthropics/skills`
Read `skills/frontend-design/SKILL.md`. Applied the guidance to derive design decisions from the business identity and real logo, choose a particular editorial palette/typographic contrast, vary section hierarchy and avoid generic gradient-card layouts.

### UI UX Pro Max — `nextlevelbuilder/ui-ux-pro-max-skill`
Read the repository README and available installation/design-system guidance. The exact `skills/ui-ux-pro-max/SKILL.md` path was not present in the repository (404). Applied the available system-led approach: consistent design tokens, responsive breakpoints, visible focus and validation feedback, strong content hierarchy and mobile usability. The skill was not claimed as installed.

### Ponytail — `dietrichgebert/ponytail`
Read the skill, `AGENTS.md` and installation instructions. Applied its preference for the smallest complete implementation without skipping security, validation or accessibility. The agent-specific plugin was not installed because this runtime did not expose the plugin installation workflow described by its docs; no false claim of installation is made.

### 21st.dev MCP endpoint
The requested endpoint (`https://21st.dev/api/mcp`) was considered. No usable 21st.dev MCP tool/connection or credential was exposed in this runtime, so the integration was not configured and no secret was written to the project. It is not required for the site to run; native HTML/CSS/JS interactions were used instead. The `21st.dev` connection should be set up explicitly in a compatible client before any dependency on it is introduced.

## Design references

- Era Residence: https://era-residence.com — inspected as a contemporary hospitality / residence reference for brand continuity and considered pacing, not copied.
- Awwwards website gallery: https://www.awwwards.com/websites/
- Awwwards hotels category: https://www.awwwards.com/websites/hotels/
- SweetTape was surfaced as a possible design showcase at https://details.so — the supplied name was ambiguous, so no exact source project is claimed as verified or copied.
- “Nick Ho” could not be resolved to one unique website from the supplied brief; no URL was invented.

The supplied official site and Instagram profile were also considered for content research; the official domain was returning a suspension notice and the Instagram content was not independently verified in this run.

## Evidence / limitations

- The original logo attachment is retained and used by the site; transparent derivative, favicon and app icon are included.
- Design principles above are implemented in `index.html`, `styles.css`, `src/app.js` and `src/business-config.js`.
- No source code or full layout from a reference site was copied.
- Third-party assets could not be downloaded in this network-restricted shell, so illustrative Pexels photography, web fonts and GSAP remain remote dependencies. See `ASSET_CREDITS.md` and `TEST_REPORT.md`.
