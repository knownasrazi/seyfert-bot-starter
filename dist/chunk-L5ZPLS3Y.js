import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname, resolve, basename } from 'path';
import { fileURLToPath } from 'url';

// src/scaffold.ts
var PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
var TEMPLATE_DIR = join(PROJECT_ROOT, "template");
async function scaffold(targetDir) {
  const target = resolve(targetDir);
  const projectName = basename(target);
  await mkdir(target, { recursive: true });
  await copyTree(TEMPLATE_DIR, target, projectName);
  return target;
}
async function copyTree(from, to, projectName) {
  const entries = await readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const src = join(from, entry.name);
    const dest = join(to, entry.name);
    if (entry.isDirectory()) {
      await mkdir(dest, { recursive: true });
      await copyTree(src, dest, projectName);
    } else {
      let data = await readFile(src, "utf8");
      data = data.replaceAll("<PACKAGE_NAME>", projectName);
      await writeFile(dest, data, "utf8");
    }
  }
}

export { TEMPLATE_DIR, scaffold };
//# sourceMappingURL=chunk-L5ZPLS3Y.js.map
//# sourceMappingURL=chunk-L5ZPLS3Y.js.map