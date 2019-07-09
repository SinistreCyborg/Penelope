import { Event, Penelope, Guild, COLORS, stripIndents } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(message: Message, old?: {
        content: string,
        editedTimestamp?: number
    }) {

        // Recommended by Eris
        // https://abal.moe/Eris/docs/Client#event-messageUpdate
        if (!old) return;

        if (!(message.channel instanceof TextChannel)) return;
        if (message.author.id === this.client.user.id) return;

        const { messageLogs } = await Guild.findOneOrFail({
            select: [ "messageLogs" ],
            where: { id: message.channel.guild.id }
        });

        const channel = message.channel.guild.channels.get(messageLogs) as TextChannel;
        if (channel) {

            channel.createMessage({ embed: {
                color: COLORS.ORANGE,
                timestamp: new Date(message.editedTimestamp || Date.now()).toISOString(),
                footer: { text: "Message Edit" },
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                },
                description: stripIndents`
                    **Edited in**: ${message.channel.mention} (${message.channel.id})
                    **Old Content**: ${old.content}
                    **New Content**: ${message.content}
                `
            } });

        }

    }

}