import { Command, Penelope, Util, oneLine } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "kiss-marry-kill",
            description: "Determines who to kiss, who to marry, and who to kill.",
            category: "🎉 Fun",
            aliases: ["kmk"],
            usage: "<person1> <person2> <person3>"
        });
    }

    exec(message: Message, ...people: string[]) {

        if (people.length > 3) throw "Only give me 3 people plox.";
        const [ kiss, marry, kill ] = Util.shuffle(people);

        return message.channel.createMessage(oneLine`
            I'd kiss ${kiss} 💋,
            marry ${marry} 💍,
            and kill ${kill} 🔪.
        `);

    }

}