import { compile } from "./lib/index.js";

const pattern = "3.5N";

console.dir(compile(pattern).nfa, { depth: 100 });
