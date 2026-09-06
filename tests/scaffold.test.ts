import { beforeAll, describe, expect, test } from "bun:test";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { scaffold } from "../src/scaffold";

const EXPECTED_FILES = [
  "package.json",
  "tsconfig.json",
  "biome.json",
  ".env.example",
  ".gitignore",
  "README.md",
  "src/index.ts",
  "src/commands/ping.ts",
];

describe("scaffold", () => {
  let root = "";

  beforeAll(async () => {
    const dir = await mkdtemp(join(tmpdir(), "seyfert-starter-"));
    root = await scaffold(join(dir, "my-bot"));
  });

  test("produces the full project tree", async () => {
    for (const file of EXPECTED_FILES) {
      expect(await Bun.file(join(root, file)).exists()).toBe(true);
    }
  });

  test("substitutes the package name", async () => {
    const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8")) as { name: string };
    expect(pkg.name).toBe("my-bot");
  });

  test("leaves no placeholder tokens behind", async () => {
    const pkg = await readFile(join(root, "package.json"), "utf8");
    expect(pkg).not.toContain("<PACKAGE_NAME>");
  });
});
