import { Command, Penelope, Util, EMBED_COLOR as color, APIs, fetch as $ } from "../..";
import { Message } from "eris";

export default class extends Command {

    readonly options: string[] = [
        "cat",
        "dog",
        "fox",
        "koala",
        "panda"
    ];

    constructor(client: Penelope) {
        super(client, {
            name: "animal",
            description: "Grabs a random animal image.",
            category: "🎉 Fun"
        });
    }

    async exec(message: Message) {

        const { link: url } = await $(APIs.ANIMAL(Util.random(this.options)))
            .then(res => res.json());

        return message.channel.createMessage({ embed: {
            color, image: { url },
            footer: Util.genericFooter(message.author)
        } });

    }

}