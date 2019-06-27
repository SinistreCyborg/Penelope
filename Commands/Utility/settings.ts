import { Command, Penelope, Guild } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Command {

    [key: string]: any;
    constructor(client: Penelope) {
        super(client, {
            name: "settings",
            aliases: ["setting", "set", "configure"],
            description: "Configure the bot to your liking.",
            usage: "<key> <value>",
            category: "🛠 Utility",
            guildOnly: true,
            requiredPerms: ["manageGuild"]
        });
    }

    async exec(message: Message, key: string, ...value: string[]) {

        let guild = await Guild.findOne({ where: { id: (message.channel as TextChannel).guild.id } });
        if (!guild) {
            guild = new Guild();
            guild.id = (message.channel as TextChannel).guild.id;
            await guild.save();
        }

        if (this[key]) {
            return await this[key](message, guild, ...value);
        } else {
            throw "I don't know what that is!";
        }

    }

    private async prefix(message: Message, guild: Guild, prefix: string): Promise<Message> {
        guild.prefix = prefix;
        await guild.save();
        return message.channel.createMessage(`✅ Set prefix to: \`${prefix}\``);
    }

}