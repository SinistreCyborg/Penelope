import { Command, Penelope, fetch as $, APIs, EMBED_COLOR as color, Util } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "shiba",
            description: "Grab a picture of Shiba Inu.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message) {

        const url = await $(APIs.SHIBA)
            .then(res => res.json())
            .then(body => body[0]);

        return message.channel.createMessage({ embed: {
            color, image: { url },
            footer: Util.genericFooter(message.author)
        } });

    }

}