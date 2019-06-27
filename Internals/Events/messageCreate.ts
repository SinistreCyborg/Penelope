import { Event, Command, Penelope, Guild } from "../..";
import { Message, PrivateChannel, TextChannel } from "eris";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(message: Message) {

        const guildPrefix = message.channel instanceof TextChannel ? await Guild.findOne({
            select: [ "prefix" ],
            where: { id: message.channel.guild.id }
        }).then(guild => guild!.prefix) : undefined;

        if (
            message.channel instanceof TextChannel &&
            guildPrefix && !message.content.startsWith(guildPrefix)
        ) return;

        if (
            message.author.bot ||
            [this.client.prefix, `<@${this.client.user.id}>`].every(i => !message.content.startsWith(i))
        ) return;

        const potentialFlags = message.content.split(" ")
            .filter(str => str.startsWith("--"))
            .map(str => str.slice(2));

        // @ts-ignore
        message.flags = {};
        for (const flag of potentialFlags) {
            const parts = flag.split("=");
            // @ts-ignore
            message.flags[parts[0]] = parts.pop();
        }

        message.content = message.content.split(" ").filter(str => !str.startsWith("--")).join(" ");
        const params = this.resolveParams(message.content);

        const command = this.client.resolveCmd(params[0]);
        if (!command || !(await this.handle(command, message))) return;

        try {
            await command.exec(message, ...params.slice(1));
        } catch(err) {
            await message.channel.createMessage(`🚫 ${err.message || err}`);
        }


    }

    private resolveParams(content: string): string[] {
        if (content.startsWith(`<@${this.client.user.id}>`)) {
            return content.split(" ").slice(1);
        } else {
            return content.slice(this.client.prefix.length).split(" ");
        }
    }

    private async handle(command: Command, message: Message): Promise<boolean> {

        if (command.guildOnly && message.channel instanceof PrivateChannel) {
            await message.channel.createMessage(`🚫 \`${command.name}\` must be run in a server.`);
            return false;
        }

        if (command.ownerOnly && message.author.id !== this.client.owner.id) {
            if (!command.hidden) await message.channel.createMessage(`🚫 \`${command.name}\` is restricted to the owner.`);
            return false;
        }

        return true;

    }

}