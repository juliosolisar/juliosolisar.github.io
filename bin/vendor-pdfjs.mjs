import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = join(repositoryRoot, "node_modules", "pdfjs-dist");
const outputRoot = join(repositoryRoot, "assets", "pdfjs");

const files = [
  ["legacy/build/pdf.min.mjs", "pdf.min.mjs"],
  ["legacy/build/pdf.worker.min.mjs", "pdf.worker.min.mjs"],
  ["LICENSE", "LICENSE"],
];

const directories = ["cmaps", "iccs", "standard_fonts", "wasm"];

await rm(outputRoot, { force: true, recursive: true });
await mkdir(outputRoot, { recursive: true });

for (const [source, destination] of files) {
  await cp(join(packageRoot, source), join(outputRoot, destination));
}

for (const directory of directories) {
  await cp(join(packageRoot, directory), join(outputRoot, directory), { recursive: true });
}

const packageMetadata = JSON.parse(await readFile(join(packageRoot, "package.json"), "utf8"));
await writeFile(join(outputRoot, "VERSION"), `${packageMetadata.version}\n`);

console.log(`Vendored PDF.js ${packageMetadata.version} to assets/pdfjs`);
