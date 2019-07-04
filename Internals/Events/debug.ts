import { Event, Penelope, Console, Util } from "../..";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    exec(message: string, id: number) {
        if ([...process.argv].includes("debug")) {
            Console.warn("Penelope", Util.shardMessage(message, id));
        }
    }

}