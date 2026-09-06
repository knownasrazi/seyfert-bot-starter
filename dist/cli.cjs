#!/usr/bin/env bun
'use strict';

var promises = require('fs/promises');
var path = require('path');
var url = require('url');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
var PROJECT_ROOT = path.join(path.dirname(url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('cli.cjs', document.baseURI).href)))), "..");
var TEMPLATE_DIR = path.join(PROJECT_ROOT, "template");
async function scaffold(targetDir) {
  const target = path.resolve(targetDir);
  const projectName = path.basename(target);
  await promises.mkdir(target, { recursive: true });
  await copyTree(TEMPLATE_DIR, target, projectName);
  return target;
}
async function copyTree(from, to, projectName) {
  const entries = await promises.readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await promises.mkdir(dest, { recursive: true });
      await copyTree(src, dest, projectName);
    } else {
      let data = await promises.readFile(src, "utf8");
      data = data.replaceAll("<PACKAGE_NAME>", projectName);
      await promises.writeFile(dest, data, "utf8");
    }
  }
}

// src/cli.ts
var name = process.argv[2] ?? "";
if (name === "") {
  console.error("usage: create-seyfert-bot <project-name>");
  process.exit(1);
}
if (name.includes(" ")) {
  console.error("error: project name must be a single word");
  process.exit(1);
}
async function main() {
  const target = await scaffold(name);
  console.log(`scaffolded a seyfert bot at ${target}`);
  console.log("next:");
  console.log(`  cd ${name}`);
  console.log("  bun install");
  console.log("  cp .env.example .env  # add your BOT_TOKEN");
  console.log("  bun run dev");
}
void main();
//# sourceMappingURL=cli.cjs.map
//# sourceMappingURL=cli.cjs.map