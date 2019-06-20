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

}