import { Monitor, Command, Penelope, Guild } from "../..";
import { Message, PrivateChannel, TextChannel } from "eris";

export default class extends Monitor {

    constructor(client: Penelope, name: string) {
        super(client, name, 2);
    }

    async exec(message: Message) {

        const prefix = message.channel instanceof TextChannel
            ? (await Guild.findOne({ where: { id: message.channel.guild.id } }))!.prefix
            : this.client.prefix;

        console.log(prefix);

        if (
            message.author.bot ||
            [prefix, `<@${this.client.user.id}>`].every(i => !message.content.startsWith(i))
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
        const params = this.resolveParams(message.content, prefix);

        const command = this.client.resolveCmd(params[0]);
        if (!command || !(await this.handle(command, message))) return;

        try {
            await command.exec(message, ...params.slice(1));
        } catch(err) {
            await message.channel.createMessage(`🚫 ${err.message || err}`);
        }

    }

    private resolveParams(content: string, prefix: string): string[] {
        if (content.startsWith(`<@${this.client.user.id}>`)) {
            return content.split(" ").slice(1);
        } else {
            return content.slice(prefix.length).split(" ");
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