import { Event, Penelope, Guild, COLORS, stripIndents } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(message: Message|object) {

        if (!(message instanceof Message)) return;
        if (!(message.channel instanceof TextChannel)) return;
        if (message.author.id === this.client.user.id) return;

        const { messageLogs } = await Guild.findOneOrFail({
            select: [ "messageLogs" ],
            where: { id: message.channel.guild.id }
        });

        const channel = message.channel.guild.channels.get(messageLogs) as TextChannel;
        if (channel) {

            channel.createMessage({ embed: {
                color: COLORS.RED,
                timestamp: new Date().toISOString(),
                footer: { text: "Message Delete" },
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                },
                description: stripIndents`
                    **Deleted in**: ${message.channel.mention} (${message.channel.id})
                    **Content**: ${message.content}
                `
            } });

        }

    }

}