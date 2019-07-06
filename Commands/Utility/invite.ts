import { Command, Penelope, PERMS, stripIndents } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "invite",
            description: "Add me to your Discord server!",
            category: "🛠 Utility",
            requiredPerms: [
                "READ_MESSAGES",
                "SEND_MESSAGES",
                "EMBED_LINKS", 
                "ATTACH_FILES",
                "READ_MESSAGE_HISTORY",
                "ADD_REACTIONS"
            ]
        });
    }

    async exec(message: Message) {

        const permissions: number = this.permissions.reduce((x, y) => x + y, 0);
        return message.channel.createMessage(stripIndents`
            Add me to your server!
            <https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=${permissions}&scope=bot>
        `);

    }

    private get permissions(): number[] {

        return [

            // Remove duplicates
            ...new Set(

                // Convert commands to an array, mapped by their perms.
                [...this.client.commands.values()]
                .map(cmd => cmd.requiredPerms)

                // Converts sub-arrays into one large array.
                .flat()

            )

            // Get the perm number
        ].map(perm => PERMS[perm]);

    }

}