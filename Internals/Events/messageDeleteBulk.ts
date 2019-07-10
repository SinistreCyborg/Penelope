import { Event, Penelope, Guild, COLORS } from "../..";
import { Message, TextChannel } from "eris";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(messages: Message[]) {

        messages[0].channel = messages[0].channel as TextChannel;
        const { messageLogs } = await Guild.findOneOrFail({
            select: [ "messageLogs" ],
            where: { id: messages[0].channel.guild.id }
        });

        const channel = messages[0].channel.guild.channels.get(messageLogs) as TextChannel;
        if (channel) channel.createMessage(`🗑 Removed \`${messages.length}\` in ${messages[0].channel.mention}.`);

    }

}