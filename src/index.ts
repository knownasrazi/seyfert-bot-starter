import "@dotenvx/dotenvx/config";
import { Client } from "seyfert";

const client = new Client();

void client.start();
