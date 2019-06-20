import { Command, Penelope, Util } from "../..";
import { Message } from "eris";

import * as util from "util";
import { exec } from "child_process";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "exec",
            description: "Execute commands in the terminal.",
            category: "\\🛠 Utility",
            usage: "<code>",
            ownerOnly: true,
            hidden: true
        });
    }

    async exec(message: Message, ...code: string[]) {

        const result = await util.promisify(exec)(code.join(" "), {
            timeout: "timeout" in (message as any).flags ? Number((message as any).flags.timeout) : 60000
        }).catch(err => ({ stdout: null, stderr: err }));

        const output = result.stdout ? `**\`OUTPUT\`**${Util.codeBlock("", result.stdout)}` : "";
        const outerr = result.stderr ? `**\`ERROR\`**${Util.codeBlock("", result.stderr)}` : "";
        
        return message.channel.createMessage([output, outerr].join("\n") || "Done. There was no output to stdout or stderr.");

    }

}