import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import archiver from "archiver";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const themeRoot = path.join(root, "theme");
const manifest = JSON.parse(await fsp.readFile(path.join(themeRoot, "manifest.json"), "utf8"));
const distDir = path.join(root, "dist");
const outputFile = path.join(distDir, `chromet-dark-${manifest.version}.zip`);

await fsp.mkdir(distDir, { recursive: true });

await new Promise((resolve, reject) => {
  const output = fs.createWriteStream(outputFile);
  const archive = archiver("zip", { zlib: { level: 9 } });
  output.on("close", resolve);
  output.on("error", reject);
  archive.on("warning", (error) => error.code === "ENOENT" ? console.warn(error.message) : reject(error));
  archive.on("error", reject);
  archive.pipe(output);
  archive.glob("**/*", {
    cwd: themeRoot,
    ignore: ["Cached Theme.pak", ".DS_Store", "Thumbs.db"]
  });
  archive.finalize();
});

console.log(`Created ${outputFile}`);
