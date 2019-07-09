import { Command, Penelope, Guild } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "prefix",
            description: "Set a customized prefix specific to your server.",
            category: "⚙️ Config",
            usage: "[prefix]",
            guildOnly: true,
            requiredPerms: ["MANAGE_SERVER"]
        });
    }

    async exec(message: Message, prefix: string = this.client.prefix) {

        message.channel = message.channel as TextChannel;
        const guild = await Guild.findOne({
            where: { id: message.channel.guild.id }
        });

        const old = guild!.prefix;
        if (old === prefix) throw `That's already the current prefix in ${message.channel.guild.name}!`;

        guild!.prefix = prefix;
        await guild!.save();

        return message.channel.createMessage(
            prefix == this.client.prefix
                ? `✅ Reset the prefix in ${message.channel.guild.name} to \`${this.client.prefix}\`.`
                : `✅ Changed the prefix in ${message.channel.guild.name} to \`${prefix}\`.`
        );

    }

}