import { Event, Penelope, Console } from "../..";

export default class extends Event {

    constructor(...args: [Penelope, string]) {
        super(...args);
    }

    async exec() {
        this.client.owner = (await this.client.getOAuthApplication()).owner;
        Console.success(this.client.user.username, `Logged in, serving ${this.client.commands.size} command(s) to ${this.client.guilds.size} guild(s).`);
    }

}