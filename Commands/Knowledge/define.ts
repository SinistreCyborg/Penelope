import { Command, Penelope, fetch as $, APIs, EMBED_COLOR as color, stripIndents, Util } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "define",
            description: "Find the definition of a word.",
            category: "🧠 Knowledge",
            aliases: ["dict", "word"],
            usage: "<word>"
        });
    }

    async exec(message: Message, word: string) {

        if (!word) throw "You must specify a word to define!";
        const info = await $(APIs.WEBSTER(word) + `?key=${this.client.keys.WEBSTER}`)
            .then(res => res.json())
            .then(body => body[0]);

        if (typeof info === "string") throw "Idk what that word is, sorry.";
        return message.channel.createMessage({ embed: {
            color, footer: Util.genericFooter(message.author),
            description: stripIndents`
                **__[${info.meta.stems[0]}](https://www.merriam-webster.com/dictionary/${info.meta.stems[0]})__** (${info.fl})
                ${info.shortdef.map((def: string, i: number) => `(${i + 1}) ${def}`).join("\n")}
            `
        } });

    }

}