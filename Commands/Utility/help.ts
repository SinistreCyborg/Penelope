import { Command, Penelope, EMBED_COLOR as color, oneLine, stripIndents, commaLists } from "../..";
import { Message, EmbedBase } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "help",
            description: "Get a list of my commands, or info about a specific command.",
            category: "🛠 Utility",
            usage: "[command]"
        });
    }

    async exec(message: Message, potential: string) {

        if (potential) {

            const { description, ...command } = this.client.resolveCmd(potential)!;
            if (!command || command.ownerOnly) throw "I don't recognize that command. Sorry!";

            const embed: EmbedBase = {
                color, description,
                title: oneLine`
                    @${this.client.user.username}
                    ${command.name}
                    ${command.usage}
                    ${command.ownerOnly ? "⭐️" : ""}
                `
            };

            return message.channel.createMessage({ embed });

        }

        let embed: EmbedBase = {
            color, title: "My Commands",
            fields: [],
            description: stripIndents`
                **Support Server**: https://discord.gg/JuN5PCt
                **Code Repository**: https://github.com/SinistreCyborg/Penelope
            `
        };

        for (const category of this.categories) {
            embed.fields = [...embed.fields!, {
                name: category,
                value: commaLists`${this.cmdByCategory(category).map(e => `\`${e}\``)}`
            }];
        }

        return message.channel.createMessage({ embed });

    }

    get categories(): string[] {
        const mapped = [...this.client.commands.values()].map(cmd => cmd.category);
        return [...new Set(mapped)];
    }

    cmdByCategory(category: string): string[] {
        return [...this.client.commands.values()].filter(cmd => cmd.category === category && !cmd.hidden && !cmd.ownerOnly).map(cmd => cmd.name);
    }

}