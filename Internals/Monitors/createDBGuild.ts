import { Monitor, Penelope, Guild } from "../..";
import { Message, PrivateChannel } from "eris";

export default class extends Monitor {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(message: Message) {

        if (message.channel instanceof PrivateChannel) return;

        let guild = await Guild.findOne({ where: { id: message.channel.guild.id } });
        if (guild) return;

        guild = new Guild();
        guild.id = message.channel.guild.id;
        guild.prefix = this.client.prefix;
        
        await guild.save();
        return;

    }

}