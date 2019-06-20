import { Command, Penelope, EMBED_COLOR as color } from "../..";
import { Message } from "eris";
import fetch from "node-fetch";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "thanos",
            description: "Get a quote that Thanos himself said.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message) {

        const { quote } = await fetch("https://thanosapi.herokuapp.com/random/")
            .then(res => res.json());

        
        return message.channel.createMessage({ embed: {
            title: "Thanos said:",
            color, description: `"${quote}"`,
            footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator}`,
                icon_url: message.author.avatarURL
            }
        } });

    }

}