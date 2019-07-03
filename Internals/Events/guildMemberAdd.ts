import { Event, Penelope, Guild, COLORS } from "../..";
import { Guild as ErisGuild, Member, TextChannel } from "eris";
import moment from "moment";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(guild: ErisGuild, { id, user: { username: name, discriminator: discrim, createdAt }, staticAvatarURL: icon_url }: Member) {

        const { memberLogs } = await Guild.findOneOrFail({
            select: [ "memberLogs" ],
            where: { id: guild.id }
        });

        const channel = guild.channels.get(memberLogs) as TextChannel;
        if (channel) channel.createMessage({ embed: {
            color: COLORS.GREEN,
            title: `📥 **${name}#${discrim}** has \`joined\` the server. (${id})`,
            timestamp: new Date().toISOString(),
            description: [
                `Account created **${moment(createdAt).from(new Date())}**.`,
                `We now have **${guild.members.size}** members.`
            ].join("\n"),
            footer: { icon_url, text: "User Join" }
        } });

    }

}