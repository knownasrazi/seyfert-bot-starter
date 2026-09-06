import { Command, type CommandContext, Declare } from "seyfert";

@Declare({
	name: "ping",
	description: "Reply with pong",
})
export default class PingCommand extends Command {
	run(ctx: CommandContext) {
		return ctx.write({ content: "Pong!" });
	}
}
