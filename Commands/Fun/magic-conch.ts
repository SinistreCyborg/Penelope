import { Command, Penelope, Util } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "conch",
            description: "Ask the magic conch any question you have.",
            category: "🎉 Fun",
            usage: "<question>"
        });
    }

    private responses: string[] = [
        "Maybe someday.",
        "Nothing.",
        "Neither.",
        "I don't think so.",
        "Yes.",
        "Try asking again.",
        "No."
    ];

    exec(message: Message, ...question: string[]) {

        if (!question.length || !question.pop()!.endsWith("?")) throw "You must ask a question!";
        return message.channel.createMessage(`🐚 ${Util.random(this.responses)}`);

    }

}