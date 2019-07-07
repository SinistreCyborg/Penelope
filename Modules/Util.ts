import chalk from "chalk";
import { User } from "eris";

export class Util {

    static toProperCase(str: string): string {
        return str.replace(/([^\W_]+[^\s-]*) */g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    static codeBlock(lang: string, code: string): string {
        return `\`\`\`${lang}\n${code}\`\`\``;
    }

    static isThenable(input: any): boolean {
        return (input instanceof Promise) || (input !== Promise.prototype && Util.isFunction(input.then) && Util.isFunction(input.catch));
    }

    static isFunction(input: any): boolean {
        return typeof input === "function";
    }

    static random(input: any[]): any {
        return input[Math.floor(Math.random() * input.length)];
    }

    static shardMessage(message: string, id: number): string {
        return `${id === undefined ? "" : chalk.bold(`(Shard ${id})`)} ${message}`;
    }

    static genericFooter({ username, discriminator, avatarURL: icon_url }: User): { text: string; icon_url: string; } {
        return {
            icon_url, text: `Requested by ${username}#${discriminator}`,
        };
    }

}