# Animation guide

## Motion direction

The movement takes its cues from the logo's angular “A” and warm thatched roof. Animation is used to add reveal, pacing and continuity—not to obscure copy or hijack scroll. Different parts of the page use different motion families rather than repeating one fade pattern.

## Implemented interactions

1. **Hero introduction:** a short GSAP timeline staggers the eyebrow, headline, copy, CTA and visual where GSAP is available.
2. **Editorial reveals:** ScrollTrigger animates `.reveal` elements using transform and opacity, with one-time triggers and normal document flow.
3. **Hero depth / signature story:** restrained image movement is attached to scroll progress for a cinematic feel; no pinned, full-page scroll lock is used.
4. **Occasion explorer:** accessible tabs switch the illustration and text to a matching concept, while carrying the selected occasion into the enquiry form.
5. **Gallery:** category filters, an HTML `<dialog>` lightbox, previous/next controls, keyboard escape/arrow navigation, and focus return.
6. **Public review counter:** the rating and count read the centrally configured public listing values; GSAP/ScrollTrigger animates the counter when it enters view, with final text retained when motion is disabled or scripts are unavailable.
7. **Navigation and CTA feedback:** mobile drawer controls, focus management, reduced-motion-aware scroll into the form, and standard CSS interaction transitions.

## Accessibility and failure behavior

- The source CSS includes `prefers-reduced-motion: reduce` rules, and the JS checks the same media query before enabling motion.
- Core content is in HTML and remains available if GSAP fails to load. GSAP is enhancement rather than a prerequisite for reading the page or preparing an enquiry.
- ScrollTrigger refreshes after gallery filtering; animation work is cleaned up on `pagehide`.
- Keyboard focus remains visible; the lightbox dialog supports Escape and arrow keys.
- No audio autoplay, scroll hijacking, or WebGL canvas is used.

## Performance choices

GSAP/ScrollTrigger and Google Fonts load from CDNs. Only transform/opacity-based DOM animation is used for most motion. A custom WebGL/Three.js layer was intentionally omitted: for this project the expected value did not justify GPU overhead, failure modes and extra maintenance. If a future build adds WebGL, it must include static mobile/reduced-motion fallbacks and disposal of geometries, textures and materials.

## Verification notes

The source-level test and local interaction checks are described in `TEST_REPORT.md`. The runtime environment could not fetch third-party media/CDN assets, so loaded-image and remote-library visual QA could not be fully replicated offline. Rendered browser checks, when available, should include motion-on and reduced-motion settings at desktop and mobile widths.
