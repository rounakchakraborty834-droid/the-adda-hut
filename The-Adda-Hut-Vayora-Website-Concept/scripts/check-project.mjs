import { readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'index.html', 'styles.css', 'src/app.js', 'src/business-config.js', 'server.mjs',
  'public/brand/logo-original.png', 'public/brand/logo-transparent.png',
  'public/brand/favicon-64.png', 'public/brand/app-icon.png',
  'docs/CONTENT_VERIFICATION.md', 'docs/DESIGN_AND_SKILL_AUDIT.md',
  'docs/ASSET_CREDITS.md', 'docs/ANIMATION_GUIDE.md', 'docs/BUILD_AND_RUN.md',
  'docs/TEST_REPORT.md', 'docs/FILE_MANIFEST.md', 'README.md'
];
const problems = [];
for (const file of required) {
  const absolute = path.join(root, file);
  if (!existsSync(absolute) || !statSync(absolute).isFile()) problems.push(`Missing required file: ${file}`);
}
if (problems.length) {
  console.error('Project check failed:\n' + problems.map((p) => `- ${p}`).join('\n'));
  process.exit(1);
}
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const app = readFileSync(path.join(root, 'src/app.js'), 'utf8');
const config = readFileSync(path.join(root, 'src/business-config.js'), 'utf8');
const checks = [
  ['semantic main region', /<main\b[^>]*id="main"/.test(html)],
  ['booking form present', /id="booking-form"/.test(html)],
  ['review counter is configured centrally', /reviewCount:\s*343/.test(config)],
  ['contact and address bindings use the central configuration', /data-business-phone-link/.test(html) && /data-business-address/.test(html) && /BUSINESS\.phoneE164/.test(app) && /BUSINESS\.address/.test(app)],
  ['map and review links are configuration-bound', /data-business-map-embed/.test(html) && /data-business-reviews/.test(html) && /BUSINESS\.mapsSearchUrl/.test(app) && /BUSINESS\.reviewsUrl/.test(app)],
  ['WhatsApp click-to-chat flow exists', /wa\.me\//.test(app)],
  ['reduced-motion support exists', /prefers-reduced-motion/.test(app)],
  ['gallery dialog exists', /<dialog\b[^>]*id="lightbox"/.test(html)],
  ['temporary preview is noindex', /name="robots" content="noindex, nofollow"/.test(html)]
];
const failed = checks.filter(([, passed]) => !passed);
for (const [name, passed] of checks) console.log(`${passed ? 'PASS' : 'FAIL'} ${name}`);
if (failed.length) process.exit(1);
console.log(`\nProject structure checks passed (${required.length} required files; ${checks.length} source checks).`);
