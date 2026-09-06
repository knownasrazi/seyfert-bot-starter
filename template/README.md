# <PACKAGE_NAME>

A Seyfert bot scaffolded with [seyfert-bot-starter](https://github.com/knownasrazi/seyfert-bot-starter).

## setup

```bash
cp .env.example .env
# paste your BOT_TOKEN into .env
bun install
```

## run

```bash
bun run dev    # watch mode
bun run start  # production
```

## commands

Every file under `src/commands/` is auto-registered. Start with `src/commands/ping.ts` and add more.