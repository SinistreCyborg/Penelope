import { Command, Penelope, EMBED_COLOR as color, APIs, Util } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "waifu",
            description: "Check out some nice waifus.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message) {
        return message.channel.createMessage({ embed: {
            color, image: { url: APIs.WAIFU },
            footer: Util.genericFooter(message.author)
        } });
    }

}