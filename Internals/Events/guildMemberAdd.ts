import { Event, Penelope, Guild, COLORS, stripIndents } from "../..";
import { Guild as ErisGuild, Member, TextChannel } from "eris";
import moment from "moment";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(guild: ErisGuild, member: Member) {

        const {
            id, staticAvatarURL: icon_url,
            user: { username: name, discriminator: discrim, createdAt }
        } = member;

        const { memberLogs, autorole } = await Guild.findOneOrFail({
            select: [ "memberLogs", "autorole" ],
            where: { id: guild.id }
        });

        if (autorole) {
            const role = guild.roles.get(autorole);
            if (role) await member.addRole(autorole);
        }

        const channel = guild.channels.get(memberLogs) as TextChannel;
        if (channel) channel.createMessage({ embed: {
            color: COLORS.GREEN,
            title: `📥 **${name}#${discrim}** has \`joined\` the server. (${id})`,
            timestamp: new Date().toISOString(),
            footer: { icon_url, text: "User Join" },
            description: stripIndents`
                Account created **${moment(createdAt).from(new Date())}**.
                We now have **${guild.members.filter(e => !e.user.bot).length}** humans.
            `
        } });

    }

}