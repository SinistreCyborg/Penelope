import { Command, Penelope, EMBED_COLOR as color } from "../..";
import { Message } from "eris";
import fetch from "node-fetch";

type XKCDResult = {
    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
};

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "xkcd",
            description: "Check today's xkcd comic.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message) {

        const { safe_title: title, img: url }: XKCDResult = await fetch("http://xkcd.com/info.0.json")
            .then(res => res.json());

        return message.channel.createMessage({ embed: {
            color, title, image: { url },
            footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator}`,
                icon_url: message.author.avatarURL
            }
        } });

    }

}