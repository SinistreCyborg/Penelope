import { Command, Penelope, Guild } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "member-log",
            description: "Set the channel to log when users join/leave.",
            category: "🚨 Moderation",
            usage: "<enable|disable> [#channel]",
            guildOnly: true,
            requiredPerms: ["manageGuild"]
        });
    }

    async exec(message: Message, option: string) {

        const guild = await Guild.findOne({
            where: { id: (message.channel as TextChannel).guild.id }
        });

        const old = guild!.memberLogs;
        switch (option) {
            case "enable":

                guild!.memberLogs = message.channelMentions![0] || message.channel.id;
                await guild!.save();

                await message.channel.createMessage(`✅ Enabled member-logs in <#${guild!.memberLogs}>${old ? ` instead of <#${old}>` : ""}`);
                break;

            case "disable":

                guild!.memberLogs = "";
                await guild!.save();

                await message.channel.createMessage(`✅ Disabled member-logs in <#${old}>`);
                break;
        
            default:
                
                throw `Hmm... I don't know what that's supposed to mean. Your options were: \`enable\`/\`disable\``;

        }

        return message;

    }

}