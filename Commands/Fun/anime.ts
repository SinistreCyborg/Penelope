import { Command, Penelope, EMBED_COLOR as color, APIs, fetch as $ } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "anime",
            description: "Retrieve information about an anime.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message, ...name: string[]) {

        if (!name.length) throw "You must specify a search term!";

        const {
            nsfw,
            slug,
            canonicalTitle,
            subtype,
            ageRating,
            posterImage: {
                original: url
            }
        } = await $(APIs.ANIME(name.join(" ")))
            .then(res => res.json())
            .then(body => body.data[0].attributes);

        if (
            nsfw
            && message.channel instanceof TextChannel
            && !message.channel.nsfw
        ) throw "The result I found is 🔞. Ask me this in an NSFW channel.";

        return message.channel.createMessage({ embed: {
            color, title: `${canonicalTitle} (${subtype}-${ageRating})`, image: { url },
            url: `https://www.crunchyroll.com/${slug}`,
            footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator}`,
                icon_url: message.author.avatarURL
            }
        } });

    }

}