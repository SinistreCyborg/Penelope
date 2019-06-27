import { Penelope } from "..";
import { Message } from "eris";

export abstract class Monitor {

    client: Penelope;
    name: string;

    constructor(client: Penelope, name: string) {
        this.client = client;
        this.name = name;
    }

    abstract exec(message: Message): any;

}