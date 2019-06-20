import { Client, Message } from "eris";

interface CommandSettings {
    name: string;
    category: string;
    description: string;
    aliases?: string[];
    usage?: string;
    hidden?: boolean;
    guildOnly?: boolean;
    ownerOnly?: boolean;
    requiredPerms?: string[];
}

export abstract class Command implements CommandSettings {

    client: Client;
    readonly name: string;

    readonly category: string;
    readonly description: string;
    readonly aliases: string[];
    readonly usage: string;
    readonly hidden: boolean;
    readonly guildOnly: boolean;
    readonly ownerOnly: boolean;
    readonly requiredPerms: string[];

    constructor(client: Client, {
        name, category, description,
        aliases = [],
        usage = "",
        hidden = false,
        guildOnly = false,
        ownerOnly = false,
        requiredPerms = []
    }: CommandSettings) {

        this.client = client;
        this.name = name;

        this.category = category;
		this.description = description;
		this.aliases = aliases;
        this.usage = usage;
        this.hidden = hidden;
		this.guildOnly = guildOnly;
		this.ownerOnly = ownerOnly;
		this.requiredPerms = requiredPerms;

    }

    abstract async exec(message: Message, ...args: string[]): Promise<Message>;

}