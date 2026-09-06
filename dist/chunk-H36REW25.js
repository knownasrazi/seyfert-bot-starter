import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname, resolve, basename } from 'path';
import { fileURLToPath } from 'url';

// src/scaffold.ts
var PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
var TEMPLATE_DIR = join(PROJECT_ROOT, "template");
var VARIABLES = {
  "<PACKAGE_NAME>": (targetDir) => basename(targetDir)
};
async function scaffold(targetDir) {
  const target = resolve(targetDir);
  await mkdir(target, { recursive: true });
  await copyTree(TEMPLATE_DIR, target);
  return target;
}
async function copyTree(from, to) {
  const entries = await readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const src = join(from, entry.name);
    const dest = join(to, entry.name);
    if (entry.isDirectory()) {
      await mkdir(dest, { recursive: true });
      await copyTree(src, dest);
    } else {
      let data = await readFile(src, "utf8");
      for (const [token, resolve2] of Object.entries(VARIABLES)) {
        data = data.replaceAll(token, resolve2(to));
      }
      await writeFile(dest, data, "utf8");
    }
  }
}

export { TEMPLATE_DIR, scaffold };
//# sourceMappingURL=chunk-H36REW25.js.map
//# sourceMappingURL=chunk-H36REW25.js.map