import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export const TEMPLATE_DIR = join(PROJECT_ROOT, "template");

export async function scaffold(targetDir: string): Promise<string> {
  const target = resolve(targetDir);
  const projectName = basename(target);
  await mkdir(target, { recursive: true });
  await copyTree(TEMPLATE_DIR, target, projectName);
  return target;
}

async function copyTree(from: string, to: string, projectName: string): Promise<void> {
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
