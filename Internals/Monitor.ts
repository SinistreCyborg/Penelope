import { Penelope } from "..";
import { Message } from "eris";

export abstract class Monitor {

    client: Penelope;
    name: string;
    order: number;

    constructor(client: Penelope, name: string, order: number) {
        this.client = client;
        this.name = name;
        this.order = order;
    }

    abstract exec(message: Message): any;

}