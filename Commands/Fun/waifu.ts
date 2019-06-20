import { Command, Penelope, EMBED_COLOR } from "../..";
import { Message, User } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "waifu",
            description: "Check out some nice waifus.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message) {
        const embed = this.waifu(message.author);
        return message.channel.createMessage({ embed });
    }

    private waifu(author: User): object {
        return {
            color: EMBED_COLOR,
            image: {
                url: `https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`
            },
            footer: {
                text: `Requested by ${author.username}#${author.discriminator}`,
                icon_url: author.avatarURL
            }
        }
    }

}