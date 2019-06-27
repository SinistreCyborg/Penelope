import { Event, Command, Monitor, Penelope, Console } from "../..";
import { Message, PrivateChannel, TextChannel } from "eris";

import { readdirSync } from "fs";
import path from "path";

export default class extends Event {

    private monitors: Monitor[] = [];
    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(message: Message) {

        for (const monitor of this.monitors) {
            await monitor.exec(message);
        }

    }

    init() {

        const mon_path = path.join(process.cwd(), "dist", "Internals", "Monitors");
        for (const file of readdirSync(mon_path)) {
            if (!file.endsWith(".js")) continue;

            const monitor = new (require(path.join(mon_path, file)).default)(this.client, file.split(".")[0]);
            this.monitors.push(monitor);

        }

    }

}