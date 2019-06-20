import { Command, Penelope, EMBED_COLOR as color, APIs } from "../..";
import { Message, TextChannel } from "eris";
import fetch from "node-fetch";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "movie",
            description: "Retrieve information about a movie.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message, ...name: string[]) {

        if (!name.length) throw "You must specify a search term!";

        const url: any = new URL(APIs.MOVIE)
        url.search = new URLSearchParams([
            ["api_key", this.client.keys.TMDB],
            ["query", name.join(" ")]
        ]);

        const { title, poster_path, overview: description, adult, id } = await fetch(url)
            .then(res => res.json())
            .then(body => body.results[0]);

        if (
            adult
            && message.channel instanceof TextChannel
            && !message.channel.nsfw
        ) throw "The result I found is 🔞. Ask me this in an NSFW channel.";

        return message.channel.createMessage({ embed: {
            color, title, description,
            url: `https://www.themoviedb.org/movie/${id}`,
            image: {
                url: `https://image.tmdb.org/t/p/original${poster_path}`
            },
            footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator}`,
                icon_url: message.author.avatarURL
            }
        } });

    }

}