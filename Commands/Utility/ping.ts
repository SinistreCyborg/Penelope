import { Command, Penelope } from "../..";
import { Message, PrivateChannel } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "ping",
            description: "Check my connection to Discord.",
            category: "🛠 Utility"
        });
    }

    async exec(message: Message) {

        const ping = await message.channel.createMessage("Pinging...");

        const round_trip = ping.timestamp - message.timestamp;
        return ping.edit(`🏓 Pong! Round-trip took: ${round_trip}ms. Latency: ${this.latency(message)}ms.`);

    }

    private latency(message: Message): number {
        if (message.channel instanceof PrivateChannel) {
            return [...this.client.shards.values()][0].latency;
        } else {
            return message.channel.guild.shard.latency;
        }
    }

}