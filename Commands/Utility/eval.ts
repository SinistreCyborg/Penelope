import { Command, Penelope, Stopwatch, Type, Util, stripIndents } from "../..";
import { inspect } from "util";
import fetch from "node-fetch";
import vm from "vm";
import { Message } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "eval",
            aliases: ["ev"],
            description: "Evaluate JavaScript code.",
            category: "🛠 Utility",
            usage: "<code>",
            ownerOnly: true,
            hidden: true
        });
    }

    async exec(message: Message, ...str: string[]) {

        if (!str.length) throw "You didn't give me code to run...";
        let code = str
            .join(" ")
            .replace(/[“”]/g, "\"")
            .replace(/[‘’]/g, "'");
        
        const swatch = new Stopwatch();
        let success, syncTime, asyncTime, result, type, thenable = false;

        try {

            if ("async" in (message as any).flags) code = `(async () => {\n${code}\n})();`;
            result = message.author.id === this.client.owner.id ? eval(code) : this.safeEval(code);
            syncTime = swatch.toString();
            type = new Type(result);
            
            if (Util.isThenable(result)) {
                thenable = true;
                swatch.restart();
                result = await result;
                asyncTime = swatch.toString();
            }
            
            success = true;

        } catch(err) {

            if (!syncTime) syncTime = swatch.toString();
            if (!type) type = new Type(err);
            if (thenable && !asyncTime) asyncTime = swatch.toString();
            if (err && err.stack) this.client.emit("err", err.stack);

            result = err;
            success = false;

        }

        swatch.stop();

        if (typeof result !== "string") result = inspect(result, {
            depth: "depth" in (message as any).flags ? parseInt((message as any).flags.depth) || 0 : 0,
            showHidden: Boolean((message as any).flags.showHidden)
        });

        const time = this.formatTime(syncTime, asyncTime);
        result = result
            .replace(/`/g, `\`${String.fromCharCode(8203)}`)
            .replace(/@/g, `@${String.fromCharCode(8203)}`);
        
        const footer = Util.codeBlock("ts", type.toString()),
            output = `**${success ? "Output" : "err"}**:${Util.codeBlock("js", result)}\n**Type**:${footer}\n${time}`;
        
        if ("silent" in (message as any).flags) return message.channel.createMessage("✨ Done!");

        if (output.length < 2000) return message.channel.createMessage(output);

        const key = await fetch("https://hastebin.com/documents", { method: "POST", body: result })
            .then(res => res.json())
            .then(body => body.key);

        return message.channel.createMessage(stripIndents`
            The output was too long. Here's a HasteBIN instead:
            https://hastebin.com/${key}
        `);

    }

    safeEval(code: string): any {

        let sandbox: any = {},
            resultKey = `SAFE_EVAL_${Math.floor(Math.random() * 1000000)}`,
            clearContext = `(function() {
                Function = undefined;
                const keys = Object.getOwnPropertyNames(this).concat(["constructor"]);
                keys.forEach((key) => {
                    const item = this[key];
                    if (!item || typeof item.constructor !== "function") return;
                    this[key].constructor = undefined;
                });
            })();`;

        sandbox[resultKey] = {};
        code = [clearContext, resultKey, "=", code].join("");

        vm.runInNewContext(code, sandbox);
        return sandbox[resultKey];

    }

    formatTime(syncTime: string, asyncTime?: string): string {
        return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
    }

}