import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const themeRoot = path.join(root, "theme");
const manifest = JSON.parse(await fs.readFile(path.join(themeRoot, "manifest.json"), "utf8"));
const packageJson = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
const colorsOnlyManifest = JSON.parse(await fs.readFile(path.join(root, "variants", "colors-only", "manifest.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(manifest.manifest_version === 3, "manifest_version must be 3");
assert(manifest.name === "Chromet Dark", "Unexpected theme name");
assert(manifest.version === packageJson.version, "Theme and package versions must match");
assert(colorsOnlyManifest.version === packageJson.version, "Colors-only variant and package versions must match");
assert(!("permissions" in manifest), "Themes must not request permissions");
assert(!("host_permissions" in manifest), "Themes must not request host permissions");

const allowedColors = new Set([
  "frame", "frame_inactive", "frame_incognito", "frame_incognito_inactive",
  "background_tab", "background_tab_inactive", "background_tab_incognito", "background_tab_incognito_inactive",
  "toolbar", "toolbar_text", "toolbar_button_icon", "tab_text", "tab_background_text",
  "tab_background_text_inactive", "tab_background_text_incognito", "tab_background_text_incognito_inactive",
  "bookmark_text", "omnibox_background", "omnibox_text", "ntp_background", "ntp_header", "ntp_text", "ntp_link"
]);

for (const [key, value] of Object.entries(manifest.theme.colors)) {
  assert(allowedColors.has(key), `Unsupported theme color key: ${key}`);
  assert(Array.isArray(value) && (value.length === 3 || value.length === 4), `${key} must be an RGB or RGBA array`);
  assert(value.every((channel) => Number.isInteger(channel) && channel >= 0 && channel <= 255), `${key} contains an invalid color channel`);
}

const toolbarColor = manifest.theme.colors.toolbar;
const toolbarIconColor = manifest.theme.colors.toolbar_button_icon;
assert(JSON.stringify(toolbarColor) === JSON.stringify([31, 33, 33]), "toolbar must match the solid lower toolbar image region");
assert(JSON.stringify(toolbarIconColor) === JSON.stringify([140, 141, 140]), "Unexpected toolbar icon color");

const separatorAlpha = 0x3A;
const derivedContentDivider = toolbarIconColor.map((channel, index) =>
  Math.round((separatorAlpha * channel + (255 - separatorAlpha) * toolbarColor[index]) / 255));
assert(JSON.stringify(derivedContentDivider) === JSON.stringify([56, 58, 57]), "Unexpected derived toolbar content divider color");

const references = [
  ...Object.values(manifest.icons ?? {}),
  ...Object.values(manifest.theme.images ?? {})
];
for (const reference of references) {
  await fs.access(path.join(themeRoot, reference));
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  }))).flat();
}

const packageFiles = await walk(themeRoot);
const executableExtensions = new Set([".js", ".mjs", ".cjs", ".html", ".htm"]);
for (const file of packageFiles) {
  assert(!executableExtensions.has(path.extname(file).toLowerCase()), `Executable file found in theme package: ${file}`);
}

for (const size of [16, 32, 48, 128]) {
  const metadata = await sharp(path.join(themeRoot, "icons", `icon-${size}.png`)).metadata();
  assert(metadata.width === size && metadata.height === size, `icon-${size}.png has the wrong dimensions`);
}

const toolbarPath = path.join(themeRoot, "images", "toolbar.png");
const toolbarMetadata = await sharp(toolbarPath).metadata();
assert(toolbarMetadata.width === 512 && toolbarMetadata.height === 200, "toolbar.png must be 512 by 200");
const { data: toolbarPixels, info: toolbarInfo } = await sharp(toolbarPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

function pixel(x, y) {
  const start = (y * toolbarInfo.width + x) * toolbarInfo.channels;
  return [...toolbarPixels.subarray(start, start + 4)];
}

function expectedToolbarPixel(row) {
  const active = [50, 52, 54];
  const toolbar = [31, 33, 33];
  const blend = row < 48 ? 0 : row > 63 ? 1 : (row - 48) / 15;
  return [
    ...active.map((channel, index) => Math.round(channel + (toolbar[index] - channel) * blend)),
    255
  ];
}

for (let row = 0; row < toolbarInfo.height; row++) {
  const expected = JSON.stringify(expectedToolbarPixel(row));
  for (const column of [0, Math.floor(toolbarInfo.width / 2), toolbarInfo.width - 1]) {
    assert(JSON.stringify(pixel(column, row)) === expected, `Toolbar transition is wrong at column ${column}, row ${row}`);
  }
}

const expectedAssets = new Map([
  ["assets/brand/chromet-dark-mark-master.png", [1254, 1254]],
  ["assets/store/screenshot-1280x800.png", [1280, 800]],
  ["assets/store/screenshot-tabs-1280x800.png", [1280, 800]],
  ["assets/store/screenshot-browsing-1280x800.png", [1280, 800]],
  ["assets/store/promo-small-440x280.png", [440, 280]],
  ["assets/store/promo-marquee-1400x560.png", [1400, 560]]
]);

for (const [relativeFile, [width, height]] of expectedAssets) {
  const metadata = await sharp(path.join(root, relativeFile)).metadata();
  assert(metadata.width === width && metadata.height === height, `${relativeFile} has the wrong dimensions`);
  assert(metadata.hasAlpha === false, `${relativeFile} must be a 24-bit PNG without an alpha channel`);
}

console.log(`Validated Chromet Dark ${manifest.version}: manifest, package contents, icons, toolbar gradient, screenshot, and promotional artwork are correct.`);
