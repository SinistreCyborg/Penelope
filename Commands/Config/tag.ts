import { Command, Penelope, Tag, EMBED_COLOR as color, stripIndents } from "../..";
import { Message, TextChannel } from "eris";
import moment from "moment";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "tag",
            description: "Manage tags in your server.",
            category: "⚙️ Config",
            usage: "<add|view|edit|remove> <title> [content]",
            guildOnly: true,
            requiredPerms: ["MANAGE_SERVER"]
        });
    }

    async exec(message: Message, action: string, title: string, ...text: string[]) {

        message.channel = message.channel as TextChannel;
        const tag = await Tag.findOne({
            where: {
                title, guildId: message.channel.guild.id
            }
        });

        if (["create", "add"].includes(action)) {
            if (tag) throw `A tag called ${title} already exists!`;
            return this.add(message, title, text.join(" "));
        }

        if (["view", "show"].includes(action)) {
            if (!tag) throw "A tag by that name doesn't exist!";
            return this.view(message, tag);
        }

        if (["change", "edit"].includes(action)) {
            if (!tag) throw "A tag by that name doesn't exist!";
            return this.edit(message, tag, title, text.join(" "));
        }

        if (["delete", "remove"].includes(action)) {
            if (!tag) throw "A tag by that name doesn't exist!";
            return this.remove(message, tag, title);
        }

        throw "I don't get what you're trying to do...";

    }

    private async add(message: Message, title: string, text: string): Promise<Message> {
        
        message.channel = message.channel as TextChannel;

        let newTag = new Tag();
        newTag.guildId = message.channel.guild.id;
        newTag.author = message.author.id;
        newTag.title = title;
        newTag.text = text;
        newTag.updatedAt = new Date();
            
        await newTag.save();
        return message.channel.createMessage(`Created tag **${title}** with text: ${text}`);

    }

    private async view(message: Message, { title, text, author, updatedAt }: Tag): Promise<Message> {

        const {
            username: name,
            discriminator: discrim,
            avatarURL: icon_url
        } = this.client.users.get(author)!;

        return message.channel.createMessage({ embed: {
            color, title,
            description: stripIndents`
                Updated **${moment(updatedAt).from(new Date())}**.
                Content: ${text}
            `,
            footer: {
                icon_url, text: `Created by ${name}#${discrim}`
            }
        } });

    }

    private async edit(message: Message, tag: Tag, title: string, text: string): Promise<Message> {

        if (message.author.id !== tag.author) throw "You're not the author of the tag!";

        tag.title = title;
        tag.text = text;
        tag.updatedAt = new Date();

        await tag.save();
        return message.channel.createMessage(`Edited tag **${title}** with text: ${text}`);

    }

    private async remove(message: Message, tag: Tag, title: string): Promise<Message> {

        await tag.remove();
        return message.channel.createMessage(`Removed tag **${title}**`);

    }

}