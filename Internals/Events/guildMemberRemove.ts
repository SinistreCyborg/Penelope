import { Event, Penelope, Guild, COLORS, stripIndents } from "../..";
import { Guild as ErisGuild, Member, TextChannel } from "eris";
import moment from "moment";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(guild: ErisGuild, { id, user: { username: name, discriminator: discrim }, staticAvatarURL: icon_url, joinedAt }: Member) {

        const { memberLogs } = await Guild.findOneOrFail({
            select: [ "memberLogs" ],
            where: { id: guild.id }
        });

        const channel = guild.channels.get(memberLogs) as TextChannel;
        if (channel) channel.createMessage({ embed: {
            color: COLORS.RED,
            title: `📤 **${name}#${discrim}** has \`left\` the server. (${id})`,
            timestamp: new Date().toISOString(),
            footer: { icon_url, text: "User Leave" },
            description: stripIndents`
                Joined the server **${moment(joinedAt).from(new Date())}**.
                We now have **${guild.members.filter(e => !e.user.bot).length}** humans.
            `
        } });

    }

}