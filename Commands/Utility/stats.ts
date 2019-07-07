import { Command, Penelope, EMBED_COLOR as color, Util } from "../..";
import { Message, EmbedBase } from "eris";
import path from "path";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "stats",
            description: "Check some statistics about me.",
            category: "🛠 Utility"
        });
    }

    exec(message: Message) {

        let embed: EmbedBase = {
            color, fields: this.base,
            timestamp: new Date().toISOString(),
            footer: Util.genericFooter(message.author)
        };

        // Send info about node.
        if (this.isFlag("node", message)) embed = {
            ...embed, fields: [...this.node],
            title: `Node.js ${process.version}`
        };

        // Send info about dependencies.
        if (this.isFlag("deps", message)) {
            if (this.client.owner.id !== message.author.id) throw "You must be the owner to use this flag!";
            embed.fields = [...this.deps];
        }

        return message.channel.createMessage({ embed });

    }

    private isFlag(flag: string, message: Message): boolean {
        return flag in (message as any).flags;
    }

    get deps(): object[] {

        const { dependencies: deps, devDependencies: devDeps } = require(path.join(process.cwd(), "package.json"));
        return [{
            name: "Dependencies",
            value: Util.codeBlock("json", JSON.stringify(deps, null, 2)),
            inline: true
        }, {
            name: "Dev Dependencies",
            value: Util.codeBlock("json", JSON.stringify(devDeps, null, 2)),
            inline: true
        }];

    }

    get base(): object[] {
        return [{
            name: "Memory",
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
            inline: true
        }, {
            name: "Uptime",
            value: `${Math.floor(process.uptime())} sec`,
            inline: true
        }, {
            name: "Node.js",
            value: process.version,
            inline: true
        }, {
            name: "User(s)",
            value: String(this.users),
            inline: true
        }, {
            name: "Channel(s)",
            value: String([...this.client.guilds.values()].map(e => [...e.channels.values()]).flat().length),
            inline: true
        }, {
            name: "Guild(s)",
            value: String(this.client.guilds.size),
            inline: true
        }]
    }

    get node() {

        let fields: object[] = [];
        for (const name in process.versions) {
            if (name === "node") continue;
            fields.push({
                // @ts-ignore
                name, value: process.versions[name],
                inline: true
            });
        }

        return fields;

    }

    // # of members, but remove duplicates and exclude bots.
    get users(): number {

        const users = this.client.users
            .filter(e => !e.bot)
            .map(e => e.id);

        return [...new Set(users)].length;
        
    }

}