import { Command, Penelope, EMBED_COLOR as color, REGION_EMOJIS, stripIndents } from "../..";
import { Message, Role, Guild, TextChannel, EmbedBase, Member, VoiceChannel } from "eris";
import moment from "moment";

export default class extends Command {

    private subject?: Role | Guild | Member;
    [key: string]: any;

    constructor(client: Penelope) {
        super(client, {
            name: "info",
            aliases: ["user-info", "server-info", "role-info"],
            description: "Get information about a user, a role, or the server itself.",
            category: "🛠 Utility",
            usage: "[@user|@role]",
            guildOnly: true
        });
    }

    async exec(message: Message, ...rolestr: string[]) {

        const { guild } = message.channel as TextChannel;
        this.subject = message.mentions.length ? guild.members.get(message.mentions[0].id) : (this.resolveRole(message, rolestr.join(" ")) || guild);

        const embed = {
            ...this[(this.subject!.constructor.name).toLowerCase() + "Info"],
            color, footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator}`,
                icon_url: message.author.avatarURL
            }
        };

        return message.channel.createMessage({ embed });
        

    }

    private resolveRole(message: Message, str: string): Role | undefined {

        message.channel = message.channel as TextChannel;
        const guild = message.channel.guild;

        return guild.roles.get(message.roleMentions[0] || str) || [...guild.roles.values()].find(e => e.name === str);

    }

    get roleInfo(): EmbedBase {

        const { name, id, createdAt, guild } = this.subject as Role;
        const members = guild.members.filter(m => m.roles.includes(id));

        return {
            title: `${name} (${id})`,
            description: stripIndents`
                Role created **${moment(createdAt).from(new Date())}**.
                **${((members.length / guild.members.size) * 100).toFixed(2)}%** of members **(${members.length}/${guild.members.size})** have this role.
            `
        };

    }

    get memberInfo(): EmbedBase {

        const {
            user: { username: name, discriminator: discrim, createdAt, staticAvatarURL: url },
            guild: { roles: guildRoles }, id, joinedAt, roles
        } = this.subject as Member;

        return {
            title: `${name}#${discrim} (${id})`,
            thumbnail: { url },
            description: stripIndents`
                Account created **${moment(createdAt).from(new Date())}**.
                Joined the server **${moment(joinedAt).from(new Date())}**.
            `,
            fields: [{
                name: `Roles [${roles.length}]`,
                value: roles.map(e => guildRoles.get(e)!.mention).join(" ")
            }]
        }

    }

    get guildInfo(): EmbedBase {

        const { name, region, createdAt, mfaLevel, members, ownerID, channels, roles } = this.subject as Guild;
        const { user: { username: ownerName, discriminator: discrim } } = members.get(ownerID)!;

        const humans = members.filter(e => !e.user.bot).length;
        const bots = members.filter(e => e.user.bot).length;

        const text = channels.filter(e => e instanceof TextChannel).length;
        const voice = channels.filter(e => e instanceof VoiceChannel).length;

        return {
            title: `${name} ${mfaLevel ? "🔒" : ""} ${REGION_EMOJIS[region]}`,
            description: `Server created **${moment(createdAt).from(new Date())}**.`,
            fields: [{
                name: "Owner",
                value: `${ownerName}#${discrim}`,
                inline: true
            }, {
                name: "Users",
                value: `${humans} humans / ${bots} bots`,
                inline: true
            }, {
                name: "Channels",
                value: `${text} text / ${voice} voice`,
                inline: true
            }, {
                name: `Roles [${roles.size}]`,
                value: roles.map(e => e.mention).join(" ")
            }]
        };

    }

}