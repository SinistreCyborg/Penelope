import { Event, Monitor, Penelope } from "../..";
import { Message } from "eris";

import { readdirSync } from "fs";
import path from "path";

export default class extends Event {

    private monitors: Monitor[] = [];
    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec(message: Message) {

        const inOrder = this.monitors.sort((a, b) => a.order - b.order);
        for (const monitor of inOrder) {
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