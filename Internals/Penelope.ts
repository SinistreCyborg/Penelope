import Eris from "eris";
import { Command } from "..";

import { readFileSync, readdirSync, lstatSync } from "fs";
import path from "path";

import yaml from "js-yaml";
const settings = yaml.safeLoad(readFileSync(path.join(process.cwd(), "settings.yml"), "utf-8"));

const name = (file: string) => file.split(".")[0];
export class Penelope extends Eris.Client {

    commands: Map<string, Command> = new Map();
    get aliases(): Map<string, Command> {
        return [...this.commands.values()].reduce((a, c): Map<string, Command> => {
            for (const alias of c.aliases) a.set(alias, c);
            return a;
        }, new Map());
    }

    [key: string]: any;
    constructor() {
        super(settings.token);

        Object.assign(this, settings);

        // Load events.
        const evt_path = path.join(process.cwd(), "dist", "events");
        for (const file of readdirSync(evt_path)) {
            if (!file.endsWith(".js")) continue;

            const event = new (require(path.join(evt_path, file)).default)(this, name(file));
            this.on(event.name, (...args) => event.exec(...args));

        }

        // Load commands.
        const cmd_path = path.join(process.cwd(), "dist", "commands");
        for (const file of this.walk(cmd_path)) {
            if (!file.endsWith(".js")) continue;

            const command = new (require(file).default)(this, name(file));
            this.commands.set(command.name, command);

        }

    }

    private walk(dir: string): string[] {

        let files: string[] = [];
        for (const file of readdirSync(dir)) {
            const new_path = path.join(dir, file);
            if (lstatSync(new_path).isDirectory()) {
                files = [...files, this.walk(new_path)].flat();
            } else {
                files.push(new_path);
            }
        }

        return files;

    }

}