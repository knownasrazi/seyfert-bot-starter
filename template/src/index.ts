import "@dotenvx/dotenvx/config";
import { Client } from "seyfert";

const client = new Client({
	intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
	locations: {
		base: "src",
		commands: "commands",
	},
});

client.once("ready", () => {
	console.log("[seyfert] bot is online");
});

void client.start();
