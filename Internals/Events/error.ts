import { Event, Penelope, Console, Util } from "../..";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    exec({ name, message }: Error, id: number) {
        Console.error(this.client.user.username, Util.shardMessage(`${name}: ${message}`, id));
    }

}