import { Command, Penelope, Guild } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "message-log",
            description: "Set the channel to log when messages are edited/deleted.",
            category: "⚙️ Config",
            usage: "<enable|disable> [#channel]",
            guildOnly: true,
            requiredPerms: ["MANAGE_SERVER"]
        });
    }

    async exec(message: Message, option: string) {

        const guild = await Guild.findOne({
            where: { id: (message.channel as TextChannel).guild.id }
        });

        const old = guild!.messageLogs;
        switch (option) {
            case "enable":

                guild!.messageLogs = message.channelMentions![0] || message.channel.id;
                await guild!.save();

                await message.channel.createMessage(`✅ Enabled message-logs in <#${guild!.messageLogs}>${old ? ` instead of <#${old}>` : ""}`);
                break;

            case "disable":

                guild!.messageLogs = "";
                await guild!.save();

                await message.channel.createMessage(`✅ Disabled message-logs in <#${old}>`);
                break;
        
            default:
                
                throw `Hmm... I don't know what that's supposed to mean. Your options were: \`enable\`/\`disable\``;

        }

        return message;

    }

}