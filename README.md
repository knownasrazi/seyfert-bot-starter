<div align="center">

# seyfert-bot-starter

```
  [ Use this template ]  --->  your-bot
                                 |
    src/index.ts  bots become alive
    src/commands/ auto-registered
    .env.example  BOT_TOKEN / CLIENT_ID
    biome.json    lint + format
```

**A modern Seyfert bot, ready in one click. Bun + TypeScript + Biome.**

</div>

<div align="center">

[![template](https://img.shields.io/badge/-use%20this%20template-2b3a4a?style=flat-square&logo=github)](https://github.com/new?template_name=seyfert-bot-starter&template_owner=knownasrazi)
[![license](https://img.shields.io/github/license/knownasrazi/seyfert-bot-starter?style=flat-square&color=7c26e0)](LICENSE)
[![bot](https://img.shields.io/badge/lib-seyfert%205-b873fa?style=flat-square&logo=discord&logoColor=white)](https://seyfert.dev)
[![runtime](https://img.shields.io/badge/runtime-bun-7c26e0?style=flat-square&logo=bun&logoColor=white)](https://bun.sh)
[![CI](https://img.shields.io/github/actions/workflow/status/knownasrazi/seyfert-bot-starter/ci.yml?style=flat-square&label=CI)](https://github.com/knownasrazi/seyfert-bot-starter/actions)

</div>

---

## start

1. Click **Use this template** above (or clone this repo).
2. Create a bot at the [Discord Developer Portal](https://discord.com/developers/applications) and copy its token.
3. Wire it up:

```bash
bun install
cp .env.example .env    # paste your BOT_TOKEN
bun run dev
```

Your bot answers `/ping` with `Pong!`.

## what's inside

| part | duty |
| ---- | ---- |
| `seyfert.config.ts` | token, intents and locations in one typed file |
| `src/index.ts` | builds the client and logs in |
| `src/events/ready.ts` | runs once the gateway is ready (first shard) |
| `src/commands/` | every file here auto-registers as a slash command |
| `@dotenvx/dotenvx` | loads `.env` before the client boots |
| `biome.json` | shared lint + format rules |
| scripts | `dev` / `start` / `lint` / `typecheck` / `format` |

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

Save, wait for the restart, and `/hello` exists.

## dev loop

```bash
bun run dev      # watch mode, hot reload
bun run lint     # biome check
bun run typecheck
bun run format   # biome format --write
```

## versioning

Kept deliberately anemic - a full-featured bot would be a distraction. Grows through your commands, not through template bloat.

## license

[MIT](./LICENSE) + [Razi](https://github.com/knownasrazi)

---

<div align="center">

*one click in. a bot online.*

</div>