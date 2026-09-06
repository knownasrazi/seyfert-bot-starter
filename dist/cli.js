#!/usr/bin/env bun
import { scaffold } from './chunk-H36REW25.js';

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
//# sourceMappingURL=cli.js.map
//# sourceMappingURL=cli.js.map