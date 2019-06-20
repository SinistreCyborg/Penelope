export { Penelope } from "./Internals/Penelope";

export { Command } from "./Internals/Command";
export { Console } from "./Internals/Console";
export { Event } from "./Internals/Event";
export * from "./Internals/Constants";

export { Stopwatch } from "./Modules/Stopwatch";
export { Type } from "./Modules/Type";
export { Util } from "./Modules/Util";

import { Penelope as Client } from "./Internals/Penelope";
new Client().connect();