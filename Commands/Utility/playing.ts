import { Command, Penelope } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "playing",
            description: "Check who's playing a game.",
            category: "🛠 Utility",
            usage: "<game>"
        });
    }

    exec(message: Message, ...game: string[]) {

        if (!game.length) throw "You have to specify a game!";

        message.channel = message.channel as TextChannel;
        const players = message.channel.guild.members
            .filter(e => e.game ? true : false)
            .filter(e => e.game!.name === game.join(" "));

        return message.channel.createMessage(
            !players.length
                ? `No one is playing \`${game}\`.`
                : players.length === 1
                    ? `There is \`1\` person playing \`${game}\`.`
                    : `There are \`${players.length}\` people playing \`${game}\`.`
        );

    }

}