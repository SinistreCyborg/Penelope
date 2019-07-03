import { Event, Penelope, Guild, COLORS } from "../..";
import { Guild as ErisGuild, User, TextChannel } from "eris";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(guild: ErisGuild, user: User) {

        const { modLogs } = await Guild.findOneOrFail({
            select: [ "modLogs" ],
            where: { id: guild.id }
        });

        const channel = guild.channels.get(modLogs) as TextChannel;
        if (channel) {

            // Confirmation message
            channel.createMessage({ embed: {
                color: COLORS.WHITE,
                title: `❕ **${user.username}#${user.discriminator}** was \`unbanned\`. (${user.id})`,
                timestamp: new Date().toISOString(),
                footer: {
                    text: "User Unbanned",
                    icon_url: user.staticAvatarURL
                }
            } });

        }

    }

}