<div align="center">

# seyfert-bot-starter

```
  create-seyfert-bot my-bot
        |
        v
  [ src/index.ts ]  [ src/commands/ ]  [ .env ]  [ biome ]
        |                  |               |          |
        +----- Seyfert 5 ----+------ dotenv -----+----+
```

**A total starter for a modern Seyfert Discord bot. One command, zero config.**

</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/seyfert-bot-starter?style=flat-square&color=b873fa&logo=npm&label=npm)](https://www.npmjs.com/package/seyfert-bot-starter)
[![downloads](https://img.shields.io/npm/dm/seyfert-bot-starter?style=flat-square&color=9a3ff0)](https://www.npmjs.com/package/seyfert-bot-starter)
[![license](https://img.shields.io/github/license/knownasrazi/seyfert-bot-starter?style=flat-square&color=7c26e0)](LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/knownasrazi/seyfert-bot-starter/ci.yml?style=flat-square&label=CI)](https://github.com/knownasrazi/seyfert-bot-starter/actions)
[![bun](https://img.shields.io/badge/runtime-bun-7c26e0?style=flat-square&logo=bun&logoColor=white)](https://bun.sh)

</div>

---

## get the bot running

```bash
bunx create-seyfert-bot my-bot
cd my-bot

cp .env.example .env     # add your BOT_TOKEN
bun install
bun run dev
```

Your bot is ready. That's the whole onboarding.

## what you get

```
my-bot
|-- package.json        # seyfert 5, dotenvx, bun scripts
|-- tsconfig.json       # strict, decorator-ready
|-- biome.json          # formatting + linting
|-- .env.example        # BOT_TOKEN / CLIENT_ID
|-- src
|   |-- index.ts        # client bootstrap, ready event
|   `-- commands
|       `-- ping.ts     # first slash command
`-- README.md           # scaffolded with your name
```

## the parts

| part | duty |
| ---- | ---- |
| `src/index.ts` | builds the client, sets intents + locations, logs in |
| `src/commands/` | every file here is auto-registered on startup |
| `@dotenvx/dotenvx` | loads `.env` before the client boots |
| `biome.json` | shared lint + format rules, spaces/2 |
| scripts | `dev`/`start`/`lint`/`typecheck`/`format` |

## why this over hand-typing

| issue | starter |
| ----- | ------- |
| decorator tsconfig flags missing | already enabled |
| `.env` never loaded | dotenvx imported up top |
| commands need the right `locations` | wired in `index.ts` |
| lint/deps drift | pinned `biome.json` + versions |

## add a command

```ts
// src/commands/hello.ts
import { Command, type CommandContext, Declare } from "seyfert";

@Declare({
  name: "hello",
  description: "Wave back",
})
export default class HelloCommand extends Command {
  run(ctx: CommandContext) {
    return ctx.write({ content: "Hello there!" });
  }
}
```

Restart `bun run dev` and it registers itself.

## install instead of scaffold?

`create-seyfert-bot` copies the template. If you want the template as a
reference tree instead, read `src/template/` in the repo.

## development of this package

```bash
git clone https://github.com/knownasrazi/seyfert-bot-starter.git
cd seyfert-bot-starter
bun install
bun run release
```

## license

[MIT](./LICENSE) + [Razi](https://github.com/knownasrazi)

---

<div align="center">

*one command in. one bot working.*

</div>