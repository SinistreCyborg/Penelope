import { Command, Penelope, EMBED_COLOR as color, Util } from "../..";
import { Message } from "eris";
import fetch from "node-fetch";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "foodporn",
            description: "Fetch some mouth-watering images... too bad you can't have it.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message) {

        const { title, hash, ext, reddit: subreddit } = await fetch("https://imgur.com/r/foodporn/hot.json")
            .then(res => res.json())
            .then(body => Util.random(body.data));
        
        return message.channel.createMessage({ embed: {
            color, title,
            url: `https://reddit.com${subreddit}`,
            image: {
                url: `http://imgur.com/${hash}${ext.replace(/\?.*/, "")}`
            },
            footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator}`,
                icon_url: message.author.avatarURL
            }
        } });

    }

}