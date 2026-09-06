import "@dotenvx/dotenvx/config";
import { config } from "seyfert";

export default config.bot({
  token: process.env.BOT_TOKEN ?? "",
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
  locations: {
    base: "src",
    commands: "commands",
    events: "events",
  },
});
