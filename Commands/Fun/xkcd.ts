import { Command, Penelope, EMBED_COLOR as color, APIs, fetch as $, Util } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "xkcd",
            description: "Check today's xkcd comic.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message) {

        const { safe_title: title, img: url } = await $(APIs.XKCD)
            .then(res => res.json());

        return message.channel.createMessage({ embed: {
            color, title, image: { url },
            footer: Util.genericFooter(message.author)
        } });

    }

}