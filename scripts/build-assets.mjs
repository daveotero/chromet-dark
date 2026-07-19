import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const imageDir = path.join(root, "theme", "images");
const iconDir = path.join(root, "theme", "icons");
const assetDir = path.join(root, "assets");
const brandDir = path.join(assetDir, "brand");
const storeDir = path.join(assetDir, "store");
const brandMarkPath = path.join(brandDir, "chromet-dark-mark-master.png");

await Promise.all([
  fs.mkdir(imageDir, { recursive: true }),
  fs.mkdir(iconDir, { recursive: true }),
  fs.mkdir(brandDir, { recursive: true }),
  fs.mkdir(storeDir, { recursive: true })
]);

await fs.access(brandMarkPath);

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

const { data: trimmedMark, info: trimmedMarkInfo } = await sharp(brandMarkPath)
  .trim({ background: "#000000", threshold: 8 })
  .png({ compressionLevel: 9 })
  .toBuffer({ resolveWithObject: true });

const markSide = Math.ceil(Math.max(trimmedMarkInfo.width, trimmedMarkInfo.height) * 1.12);
const markTile = await sharp({
  create: {
    width: markSide,
    height: markSide,
    channels: 3,
    background: "#000000"
  }
})
  .composite([{
    input: trimmedMark,
    left: Math.round((markSide - trimmedMarkInfo.width) / 2),
    top: Math.round((markSide - trimmedMarkInfo.height) / 2)
  }])
  .png({ compressionLevel: 9 })
  .toBuffer();

for (const size of [16, 32, 48, 128]) {
  await sharp(markTile)
    .resize(size, size, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(path.join(iconDir, `icon-${size}.png`));
}

function promoBackdrop({ width, height, titleSize, taglineSize, textX, titleY, taglineY }) {
  return Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#050606"/>
        <stop offset="0.58" stop-color="#101111"/>
        <stop offset="1" stop-color="#1B1C1C"/>
      </linearGradient>
      <radialGradient id="pearlGlow" cx="24%" cy="48%" r="44%">
        <stop offset="0" stop-color="#D8D4CC" stop-opacity=".09"/>
        <stop offset=".42" stop-color="#8C8D8C" stop-opacity=".035"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect width="${width}" height="${height}" fill="url(#pearlGlow)"/>
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${Math.round(height * 0.055)}" fill="none" stroke="#343636" stroke-width="2"/>
    <text x="${textX}" y="${titleY}" fill="#E8E5E0" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="${titleSize}" font-weight="600" letter-spacing=".005em">Chromet Dark</text>
    <text x="${textX}" y="${taglineY}" fill="#B3B3B0" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="${taglineSize}" font-weight="400" letter-spacing=".01em">Dark. Clean. Quiet.</text>
  </svg>`);
}

async function writePromo({ width, height, markSize, markX, markY, textX, titleSize, taglineSize, titleY, taglineY, filename }) {
  const resizedMark = await sharp(markTile)
    .resize(markSize, markSize, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(promoBackdrop({ width, height, titleSize, taglineSize, textX, titleY, taglineY }))
    .composite([{
      input: resizedMark,
      left: markX,
      top: markY,
      blend: "screen"
    }])
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(path.join(storeDir, filename));
}

await writePromo({
  width: 440,
  height: 280,
  markSize: 190,
  markX: 14,
  markY: 45,
  textX: 207,
  titleSize: 34,
  taglineSize: 19,
  titleY: 127,
  taglineY: 160,
  filename: "promo-small-440x280.png"
});

await writePromo({
  width: 1400,
  height: 560,
  markSize: 450,
  markX: 68,
  markY: 55,
  textX: 570,
  titleSize: 104,
  taglineSize: 44,
  titleY: 257,
  taglineY: 321,
  filename: "promo-marquee-1400x560.png"
});

console.log("Generated theme icons, toolbar image, and Chrome Web Store promotional artwork.");
