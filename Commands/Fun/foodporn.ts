import { Command, Penelope, EMBED_COLOR as color, Util, APIs, fetch as $ } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "foodporn",
            description: "Fetch some mouth-watering images... too bad you can't have it.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message) {

        const { title, hash, ext, reddit: subreddit } = await $(APIs.IMGUR("foodporn"))
            .then(res => res.json())
            .then(body => Util.random(body.data));
        
        return message.channel.createMessage({ embed: {
            color, title,
            url: `https://reddit.com${subreddit}`,
            footer: Util.genericFooter(message.author),
            image: {
                url: `http://imgur.com/${hash}${ext.replace(/\?.*/, "")}`
            }
        } });

    }

}