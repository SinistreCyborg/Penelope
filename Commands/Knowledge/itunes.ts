import { Command, Penelope, APIs, fetch as $, EMBED_COLOR as color, stripIndents } from "../..";
import { Message, TextChannel } from "eris";
import moment from "moment";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "itunes",
            description: "Find a song on iTunes.",
            category: "🧠 Knowledge",
            aliases: ["music", "song"],
            usage: "<query>"
        });
    }

    async exec(message: Message, ...query: string[]) {

        if (!query.length) throw "You must specify what to search for!";
        const {
            releaseDate, artworkUrl100: url, collectionViewUrl,
            trackExplicitness, primaryGenreName, trackTimeMillis: length,
            trackName, trackViewUrl, artistName, artistViewUrl
        } = await $(APIs.ITUNES(query.join(" "), (message.channel as TextChannel).nsfw || false))
            .then(res => res.json())
            .then(body => body.results[0]);

        return message.channel.createMessage({ embed: {
            color, thumbnail: { url },
            footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator}`,
                icon_url: message.author.avatarURL
            },
            description: stripIndents`
                **__[${trackName}](${trackViewUrl})__** by [${artistName}](${artistViewUrl}) ${trackExplicitness.startsWith("not") ? "" : "🔞"}
                ${primaryGenreName} • ${Math.floor(length/1000/60)}:${Math.floor(length/1000%60)}

                Released **${moment(releaseDate).from(new Date())}**.
                [Open in  Music](${collectionViewUrl})
            `
        } });

    }

}