import { Penelope } from "..";

export abstract class Event {

    client: Penelope;
    readonly name: string;

    constructor(client: Penelope, name: string) {
        this.client = client;
        this.name = name;
    }

    abstract exec(...args: any): void;

}