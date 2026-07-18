import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const imageDir = path.join(root, "theme", "images");
const iconDir = path.join(root, "theme", "icons");
const assetDir = path.join(root, "assets");
const storeDir = path.join(assetDir, "store");

await Promise.all([
  fs.mkdir(imageDir, { recursive: true }),
  fs.mkdir(iconDir, { recursive: true }),
  fs.mkdir(storeDir, { recursive: true })
]);

const toolbarWidth = 512;
const toolbarHeight = 200;
const gradientStartRow = 48;
const gradientEndRow = 63;
const activeSurface = [50, 52, 54];
const toolbarSurface = [31, 33, 33];
const toolbar = Buffer.alloc(toolbarWidth * toolbarHeight * 4);

for (let y = 0; y < toolbarHeight; y++) {
  const blend = y < gradientStartRow
    ? 0
    : y > gradientEndRow
      ? 1
      : (y - gradientStartRow) / (gradientEndRow - gradientStartRow);
  const color = activeSurface.map((channel, index) =>
    Math.round(channel + (toolbarSurface[index] - channel) * blend));

  for (let x = 0; x < toolbarWidth; x++) {
    const offset = (y * toolbarWidth + x) * 4;
    toolbar[offset] = color[0];
    toolbar[offset + 1] = color[1];
    toolbar[offset + 2] = color[2];
    toolbar[offset + 3] = 255;
  }
}

await sharp(toolbar, {
  raw: { width: toolbarWidth, height: toolbarHeight, channels: 4 }
})
  .png({ compressionLevel: 9, palette: true })
  .toFile(path.join(imageDir, "toolbar.png"));

const icon = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <defs>
    <radialGradient id="bg" cx="58%" cy="42%" r="78%">
      <stop offset="0" stop-color="#252929"/>
      <stop offset="1" stop-color="#191A1A"/>
    </radialGradient>
    <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="3.2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect x="3" y="3" width="122" height="122" rx="28" fill="url(#bg)" stroke="#3D3F40" stroke-width="2"/>
  <circle cx="64" cy="64" r="37" fill="none" stroke="#383C3C" stroke-width="5"/>
  <path d="M32 75 C45 94, 75 104, 96 79" fill="none" stroke="#1FB8CD" stroke-width="7" stroke-linecap="round" filter="url(#glow)"/>
  <path d="M38 49 C49 31, 73 24, 91 38" fill="none" stroke="#A6A6A5" stroke-width="5" stroke-linecap="round" opacity=".82"/>
  <circle cx="96" cy="79" r="7" fill="#1FB8CD" filter="url(#glow)"/>
</svg>`);

for (const size of [16, 32, 48, 128]) {
  await sharp(icon)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(iconDir, `icon-${size}.png`));
}

function promo(width, height, titleSize, taglineSize) {
  const iconSize = Math.round(height * 0.28);
  const iconX = Math.round(width * 0.12);
  const iconY = Math.round((height - iconSize) / 2);
  const textX = Math.round(width * 0.34);
  return Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <radialGradient id="bg" cx="70%" cy="22%" r="100%"><stop offset="0" stop-color="#252929"/><stop offset="1" stop-color="#0E0F0F"/></radialGradient>
      <filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${Math.round(height * 0.06)}" fill="none" stroke="#3D3F40" stroke-width="2"/>
    <g transform="translate(${iconX} ${iconY}) scale(${iconSize / 128})">
      <circle cx="64" cy="64" r="48" fill="#191A1A" stroke="#3D3F40" stroke-width="4"/>
      <path d="M32 75 C45 94, 75 104, 96 79" fill="none" stroke="#1FB8CD" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M38 49 C49 31, 73 24, 91 38" fill="none" stroke="#A6A6A5" stroke-width="6" stroke-linecap="round" opacity=".82"/>
      <circle cx="96" cy="79" r="7" fill="#1FB8CD" filter="url(#glow)"/>
    </g>
    <text x="${textX}" y="${Math.round(height * 0.48)}" fill="#D6D5D4" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="${titleSize}" font-weight="650">Chromet Dark</text>
    <text x="${textX}" y="${Math.round(height * 0.65)}" fill="#8C8D8C" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="${taglineSize}">Graphite. Clear. Quiet.</text>
  </svg>`);
}

await sharp(promo(440, 280, 30, 16)).png({ compressionLevel: 9 }).toFile(path.join(storeDir, "promo-small-440x280.png"));
await sharp(promo(1400, 560, 76, 31)).png({ compressionLevel: 9 }).toFile(path.join(storeDir, "promo-marquee-1400x560.png"));

console.log("Generated theme icons, toolbar image, and Chrome Web Store promotional artwork.");
