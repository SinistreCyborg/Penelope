import { Monitor, Command, Penelope } from "../..";
import { Message, PrivateChannel } from "eris";

export default class extends Monitor {

    constructor(client: Penelope, name: string) {
        super(client, name, 2);
    }

    async exec(message: Message) {

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