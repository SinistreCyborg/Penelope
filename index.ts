export { Penelope } from "./Internals/Penelope";

export { Command } from "./Internals/Command";
export { Console } from "./Internals/Console";
export { Event } from "./Internals/Event";

import { Penelope as Client } from "./Internals/Penelope";
new Client().connect();