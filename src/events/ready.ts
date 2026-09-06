import { createEvent } from "seyfert";

export default createEvent({
  data: { once: false, name: "ready" },
  async run(user, _client) {
    console.log(`[seyfert] ${user.username} is online`);
  },
});
