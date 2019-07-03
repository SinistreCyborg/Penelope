import { Event, Penelope, Console, Util } from "../..";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    exec(message: string, id: number) {
        if (process.env.DEBUG) {
            Console.warn("Penelope", Util.shardMessage(message, id));
        }
    }

}