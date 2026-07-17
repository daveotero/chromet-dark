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

const toolbar = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="200" viewBox="0 0 512 200">
  <rect width="512" height="200" fill="#1F2121"/>
  <rect width="512" height="56" fill="#323436"/>
</svg>`);

await sharp(toolbar)
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

const preview = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="28" stdDeviation="30" flood-color="#000" flood-opacity=".55"/>
    </filter>
    <style>
      .ui { font-family: Inter, Segoe UI, Arial, sans-serif; }
      .label { fill: #A6A6A5; font-size: 18px; letter-spacing: .4px; }
    </style>
  </defs>
  <rect width="1600" height="1000" fill="#0E0F0F"/>
  <g filter="url(#shadow)">
    <rect x="70" y="70" width="1460" height="820" rx="18" fill="#171615" stroke="#3D3F40" stroke-width="2"/>
    <path d="M88 70 H1512 Q1530 70 1530 88 V145 H70 V88 Q70 70 88 70Z" fill="#191A1A"/>
    <rect x="70" y="145" width="1460" height="115" fill="#1F2121"/>
    <rect x="70" y="145" width="1460" height="1" fill="#3D3F40"/>
    <rect x="320" y="91" width="250" height="54" rx="14" fill="#323436"/>
    <circle cx="349" cy="118" r="9" fill="#1FB8CD"/>
    <text x="371" y="125" fill="#D6D5D4" font-size="20" class="ui">New Tab</text>
    <circle cx="103" cy="118" r="8" fill="#8C8D8C"/>
    <text x="123" y="125" fill="#A6A6A5" font-size="19" class="ui">A quiet corner of the web</text>
    <text x="595" y="126" fill="#8C8D8C" font-size="28" class="ui">+</text>
    <g fill="none" stroke="#8C8D8C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M102 177 l-10 10 10 10"/><path d="M133 177 l10 10-10 10" opacity=".45"/>
      <path d="M177 179 a11 11 0 1 0 4 17"/><path d="M177 179 h9 v9"/>
    </g>
    <rect x="222" y="163" width="1090" height="48" rx="24" fill="#323436" stroke="#1FB8CD" stroke-width="2"/>
    <circle cx="250" cy="187" r="8" fill="#1FB8CD"/>
    <circle cx="1281" cy="187" r="7" fill="none" stroke="#8C8D8C" stroke-width="2"/>
    <path d="M1277 187 l3 3 6-7" fill="none" stroke="#8C8D8C" stroke-width="2"/>
    <g fill="#8C8D8C"><circle cx="1360" cy="187" r="8"/><circle cx="1402" cy="187" r="8"/><circle cx="1444" cy="187" r="8"/></g>
    <g transform="translate(96 229)">
      <circle cx="0" cy="0" r="7" fill="#1FB8CD"/><circle cx="42" cy="0" r="7" fill="#8C8D8C"/>
      <circle cx="84" cy="0" r="7" fill="#A6A6A5"/><circle cx="126" cy="0" r="7" fill="#1FB8CD"/>
      <circle cx="168" cy="0" r="7" fill="#8C8D8C"/><circle cx="210" cy="0" r="7" fill="#A6A6A5"/>
    </g>
    <rect x="70" y="260" width="1460" height="1" fill="#292B2B"/>
    <text x="800" y="508" text-anchor="middle" fill="#D6D5D4" font-size="42" font-weight="600" class="ui">Chromet Dark</text>
    <text x="800" y="549" text-anchor="middle" fill="#8C8D8C" font-size="20" class="ui">Graphite. Cyan. Quiet.</text>
    <rect x="466" y="600" width="668" height="68" rx="34" fill="#1F2121" stroke="#383C3C" stroke-width="2"/>
    <circle cx="507" cy="634" r="10" fill="none" stroke="#8C8D8C" stroke-width="3"/>
    <path d="M514 641 l10 10" stroke="#8C8D8C" stroke-width="3"/>
    <text x="545" y="642" fill="#8C8D8C" font-size="20" class="ui">Search the web</text>
  </g>
  <g transform="translate(218 930)" class="ui">
    <g><circle r="13" fill="#191A1A"/><text x="24" y="7" class="label">#191A1A frame</text></g>
    <g transform="translate(275 0)"><circle r="13" fill="#323436"/><text x="24" y="7" class="label">#323436 active tab</text></g>
    <g transform="translate(603 0)"><circle r="13" fill="#1F2121" stroke="#3D3F40"/><text x="24" y="7" class="label">#1F2121 toolbar</text></g>
    <g transform="translate(915 0)"><circle r="13" fill="#1FB8CD"/><text x="24" y="7" class="label">#1FB8CD accent</text></g>
  </g>
</svg>`);

const previewFile = path.join(assetDir, "preview.png");
await sharp(preview).png({ compressionLevel: 9 }).toFile(previewFile);
await sharp(previewFile).resize(1280, 800).png({ compressionLevel: 9 }).toFile(path.join(storeDir, "screenshot-1280x800.png"));

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
    <text x="${textX}" y="${Math.round(height * 0.65)}" fill="#8C8D8C" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="${taglineSize}">Graphite. Cyan. Quiet.</text>
  </svg>`);
}

await sharp(promo(440, 280, 30, 16)).png({ compressionLevel: 9 }).toFile(path.join(storeDir, "promo-small-440x280.png"));
await sharp(promo(1400, 560, 76, 31)).png({ compressionLevel: 9 }).toFile(path.join(storeDir, "promo-marquee-1400x560.png"));

console.log("Generated theme, repository, and Chrome Web Store artwork.");
