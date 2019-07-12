import { Command, Penelope, EMBED_COLOR as color, APIs, fetch as $, Util } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "movie",
            description: "Retrieve information about a movie.",
            usage: "<movie name>",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message, ...name: string[]) {

        if (!name.length) throw "You must specify a search term!";

        const { title, poster_path, overview: description, adult, id } = await $(APIs.MOVIE(name.join(" ")))
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
            footer: Util.genericFooter(message.author),
            image: {
                url: `https://image.tmdb.org/t/p/original${poster_path}`
            }
        } });

    }

}