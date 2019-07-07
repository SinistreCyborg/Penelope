import { Event, Penelope, Guild, Case, COLORS, stripIndents } from "../..";
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

        // @ts-ignore
        const { reason } = await guild.getBan(user.id);

        const cases = await Case.find({
            where: { guildID: guild.id }
        });

        let modCase = new Case();
        modCase.caseID = cases.length ? cases.length++ : 1;
        modCase.reason = reason;
        modCase.userID = user.id;
        modCase.guildID = guild.id;
        await modCase.save();

        const channel = guild.channels.get(modLogs) as TextChannel;
        if (channel) {

            // Confirmation message
            channel.createMessage({ embed: {
                color: COLORS.BLACK, timestamp: new Date().toISOString(),
                description: stripIndents`
                    ❌ **${user.username}#${user.discriminator}** was \`banned\`. (${user.id})
                    Case: \`${modCase.id}\`
                    Reason: ${reason}
                `,
                footer: {
                    text: "User Banned",
                    icon_url: user.staticAvatarURL
                }
            } });

        }

    }

}