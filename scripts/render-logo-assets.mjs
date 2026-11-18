/**
 * Publishes the vector logo to the website and renders all raster versions from it.
 * Run after scripts/build-logo-svg.py (or just: npm run logo).
 *
 *   brand/svg/*.svg  →  public/images/*.svg, public/favicon.svg
 *                    →  public/images/logo.png, favicons, apple-touch-icon, og-image.jpg
 */
import { copyFile, readFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgDir = path.join(root, 'brand', 'svg');
const pub = path.join(root, 'public');
const img = path.join(pub, 'images');
const p = (...s) => path.join(...s);

// 1. Vector files used directly by the site
const copies = {
  'logo-horizontal.svg': 'logo-horizontal.svg',
  'logo-horizontal-white.svg': 'logo-horizontal-white.svg',
  'logo-stacked.svg': 'logo-stacked.svg',
  'logo-stacked-white.svg': 'logo-stacked-white.svg',
  'mark.svg': 'logo-mark.svg',
};
for (const [from, to] of Object.entries(copies)) await copyFile(p(svgDir, from), p(img, to));
await copyFile(p(svgDir, 'mark-square.svg'), p(pub, 'favicon.svg'));

// 2. Raster versions
const square = await readFile(p(svgDir, 'mark-square.svg'));
const render = (buf, width) => sharp(buf, { density: 600 }).resize({ width });

await render(await readFile(p(svgDir, 'logo-stacked.svg')), 600).png().toFile(p(img, 'logo.png'));
await render(square, 32).png().toFile(p(pub, 'favicon-32.png'));
await render(square, 192).png().toFile(p(pub, 'icon-192.png'));
await render(square, 512).png().toFile(p(img, 'logo-mark.png'));
const touchIcon = await render(square, 148).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
  .composite([{ input: touchIcon, left: 16, top: 16 }])
  .png()
  .toFile(p(pub, 'apple-touch-icon.png'));

// 3. Open Graph / social share image (1200×630)
const logoW = 560;
const logoPng = await render(await readFile(p(svgDir, 'logo-horizontal-white.svg')), logoW).png().toBuffer();
const logoMeta = await sharp(logoPng).metadata();
const ogBg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#061a2e"/><stop offset="1" stop-color="#0e3557"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.9" cy="0" r="0.6">
      <stop offset="0" stop-color="#1b6ca8" stop-opacity="0.55"/><stop offset="1" stop-color="#1b6ca8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="930" y="-140" width="400" height="400" rx="110" transform="rotate(45 1130 60)" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="3"/>
  <rect x="900" y="470" width="200" height="200" rx="56" transform="rotate(45 1000 570)" fill="none" stroke="#f39200" stroke-opacity="0.3" stroke-width="3"/>
  <text x="80" y="330" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="72" fill="#ffffff">Connecting Talent</text>
  <text x="80" y="415" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="72" fill="#ffffff">with <tspan fill="#f39200">Opportunity.</tspan></text>
  <rect x="80" y="468" width="4" height="36" rx="2" fill="#f39200"/>
  <text x="100" y="496" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="27" fill="#d2deeb">Recruitment &amp; Staffing Solutions · Growing Careers, Building Businesses.</text>
  <text x="80" y="575" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="26" fill="#f39200">growhighstaffing.com</text>
</svg>`;
await sharp(Buffer.from(ogBg))
  .composite([{ input: logoPng, left: 80, top: 80 }])
  .jpeg({ quality: 88 })
  .toFile(p(pub, 'og-image.jpg'));

// 4. Remove raster logos from the old JPEG-based pipeline that the site no longer uses
for (const old of ['logo-horizontal.png', 'logo-horizontal-white.png', 'logo-white.png']) {
  if (existsSync(p(img, old))) await unlink(p(img, old));
}
console.log('Logo assets updated (logo height in OG:', logoMeta.height, 'px)');
