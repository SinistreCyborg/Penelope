import { Event, Penelope, Console, Util } from "../..";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    exec(message: string, id: number) {
        Console.warn(this.client.user.username, Util.shardMessage(message, id));
    }

}