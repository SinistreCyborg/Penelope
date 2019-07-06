import { Command, Penelope, oneLine } from "../..";
import { Message, TextChannel, Invite } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "topinvites",
            description: "Check the top invites in a server.",
            category: "🛠 Utility",
            aliases: ["top-invites", "inv", "invites"],
            requiredPerms: ["MANAGE_SERVER"],
            guildOnly: true
        });
    }

    async exec(message: Message) {

        const invites = await (message.channel as TextChannel).guild.getInvites();
        const top_ten: Invite[] = invites
            .filter(inv => inv.uses! > 0)
            .sort((a, b) => b.uses! - a.uses!)
            .slice(0, 10);

        if (!top_ten.length) throw "Either there are no invites, or none of them are used.";
        return message.channel.createMessage(top_ten.map(inv => oneLine`
            **${inv.inviter!.username}**'s invite
            **${inv.code}**
            has **${inv.uses!.toLocaleString()}** uses.
        `).join("\n"));

    }

}