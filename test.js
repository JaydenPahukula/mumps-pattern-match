import { compile } from "./lib/index.js";

const pattern = '.E1A2(1"a",2EAP)';

console.dir(compile(pattern), { depth: 100 });
