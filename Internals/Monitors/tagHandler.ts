import { Monitor, Penelope, Tag, Guild } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Monitor {

    constructor(client: Penelope, name: string) {
        super(client, name, 3);
    }

    async exec(message: Message) {

        if (!(message.channel instanceof TextChannel)) return;
        const prefix = (await Guild.findOne({ where: { id: message.channel.guild.id } }))!.prefix;

        if (
            message.author.bot ||
            [prefix, `<@${this.client.user.id}>`].every(i => !message.content.startsWith(i))
        ) return;

        const tag = await Tag.findOne({
            where: {
                guildId: message.channel.guild.id,
                title: this.resolveParams(message.content, prefix)[0]
            }
        });

        if (tag) message.channel.createMessage(tag.text);

    }

    private resolveParams(content: string, prefix: string): string[] {
        if (content.startsWith(`<@${this.client.user.id}>`)) {
            return content.split(" ").slice(1);
        } else {
            return content.slice(prefix.length).trim().split(/\s/g);
        }
    }

}