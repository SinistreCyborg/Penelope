import { Command, Penelope, APIs, fetch as $, EMBED_COLOR as color, stripIndents, Util } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "wikipedia",
            description: "Finds a Wikipedia Article by title.",
            category: "🧠 Knowledge",
            aliases: ["wiki", "wp"],
            usage: "<query>"
        });
    }

    async exec(message: Message, ...query: string[]) {

        if (!query.length) throw "You must specify something to search for.";
        const {
            title, extract, description, content_urls,
            thumbnail: { source: url, width, height }
        } = await $(APIs.WIKI(query.join(" ")))
            .then(res => res.json());

        return message.channel.createMessage({ embed: {
            color, thumbnail: { url, width, height },
            footer: Util.genericFooter(message.author),
            description: stripIndents`
                **__[${title}](${content_urls.desktop.page})__**
                **${description}**\n
                ${extract}
            `
        } });

    }

}