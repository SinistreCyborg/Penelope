import { Event, Penelope, Guild, COLORS } from "../..";
import { Guild as ErisGuild, User, TextChannel } from "eris";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(guild: ErisGuild, user: User): Promise<void> {

        const { modLogs } = await Guild.findOneOrFail({
            select: [ "modLogs" ],
            where: { id: guild.id }
        });

        const channel = guild.channels.get(modLogs) as TextChannel;
        if (channel) {

            // @ts-ignore
            const { reason: description } = await guild.getBan(user.id);

            // Confirmation message
            channel.createMessage({ embed: {
                color: COLORS.BLACK, description,
                title: `❌ **${user.username}#${user.discriminator}** was \`banned\`. (${user.id})`,
                timestamp: new Date().toISOString(),
                footer: {
                    text: "User Banned",
                    icon_url: user.staticAvatarURL
                }
            } });

        }

    }

}