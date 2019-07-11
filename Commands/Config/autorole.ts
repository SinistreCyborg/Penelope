import { Command, Penelope, Guild } from "../..";
import { Message, TextChannel, Guild as ErisGuild, Role } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "autorole",
            description: "Give new users a role upon join.",
            category: "⚙️ Config",
            usage: "<enable|disable> [@role]",
            guildOnly: true,
            requiredPerms: ["MANAGE_SERVER"]
        });
    }

    async exec(message: Message, option: string, ...rolestr: string[]) {

        message.channel = message.channel as TextChannel;
        const guild = await Guild.findOne({
            where: { id: message.channel.guild.id }
        });

        switch (option) {
            case "enable":

                const role = this.resolveRole(message.channel.guild, message.roleMentions[0] || rolestr.join(" "));
                if (!role) throw "I can't find a role by that name!";

                guild!.autorole = role.id;
                await guild!.save();

                await message.channel.createMessage(`✅ New members will be given the \`${role.name}\` role.`);
                break;

            case "disable":

                guild!.autorole = "";
                await guild!.save();

                await message.channel.createMessage(`✅ New members won't be given any role.`);
                break;
        
            default:

                throw `Hmm... I don't know what that's supposed to mean. Your options were: \`enable\`/\`disable\``;

        }

        return message;

    }

    private resolveRole(guild: ErisGuild, role: string): Role | undefined {
        return guild.roles.get(role) || guild.roles.find(e => e.name.toLowerCase() === role.toLowerCase());
    }

}