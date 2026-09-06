import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export const TEMPLATE_DIR = join(PROJECT_ROOT, "template");

const VARIABLES: Record<string, (targetDir: string) => string> = {
  "<PACKAGE_NAME>": (targetDir) => basename(targetDir),
};

export async function scaffold(targetDir: string): Promise<string> {
  const target = resolve(targetDir);
  await mkdir(target, { recursive: true });
  await copyTree(TEMPLATE_DIR, target);
  return target;
}

async function copyTree(from: string, to: string): Promise<void> {
  const entries = await readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const src = join(from, entry.name);
    const dest = join(to, entry.name);
    if (entry.isDirectory()) {
      await mkdir(dest, { recursive: true });
      await copyTree(src, dest);
    } else {
      let data = await readFile(src, "utf8");
      for (const [token, resolve] of Object.entries(VARIABLES)) {
        data = data.replaceAll(token, resolve(to));
      }
      await writeFile(dest, data, "utf8");
    }
  }
}
