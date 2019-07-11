import { Command, Penelope } from "../..";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "clap",
            description: "Make me say whatever you want by clapping!",
            category: "🎉 Fun"
        });
    }

    exec(message: Message, ...text: string[]) {

        if (!text.length) throw "What am I supposed to clap?!";
        return message.channel.createMessage(text.join(" 👏 "));
        
    }

}