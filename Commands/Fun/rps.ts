import { Command, Penelope, Util } from "../..";
import { Message } from "eris";

export default class extends Command {

    private options = ["rock", "paper", "scissors"];

    constructor(client: Penelope) {
        super(client, {
            name: "rps",
            description: "Play Rock, Paper, Scissors with me.",
            category: "🎉 Fun",
            usage: "<rock|paper|scissors>"
        });
    }

    exec(message: Message, choice: string) {

        if (choice) choice = choice.toLowerCase();
        if (!this.options.includes(choice)) throw "You have to choose between rock, paper, and scissors...";

        const response = Util.random(this.options);
        if (choice === response) return message.channel.createMessage(`${Util.toProperCase(response)}! Yikes, we tied...`);

        let win: boolean;
        switch (response) {
            case "rock":
                win = choice === "paper" ? false : true;
                break;
            case "paper":
                win = choice === "rock" ? true : false;
                break;
            case "scissors":
                win = choice === "paper" ? true : false;
                break;
        }

        return message.channel.createMessage(`${Util.toProperCase(response)}! ${win! ? "Yay, I won!" : "Aww man, I lost :("}`);

    }

}