import { Command, Penelope, EMBED_COLOR as color } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "avatar",
            description: "View someone's avatar.",
            category: "🛠 Utility",
            usage: "<@user>"
        });
    }

    async exec(message: Message) {

        if (!message.mentions.length) throw "You must @mention a user in this server!";
        const user = message.mentions[0];

        return message.channel.createMessage({ embed: {
            color, title: `${user.username}#${user.discriminator}'s avatar`,
            image: {
                url: user.dynamicAvatarURL("jpg", 2048)
            },
            footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator}`,
                icon_url: message.author.avatarURL
            }
        } });

    }

}