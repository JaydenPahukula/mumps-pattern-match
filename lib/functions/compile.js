import { Parser } from "../classes/parser.js";
import { parse } from "./parsers/parse.js";
export function compile(pattern) {
    const p = new Parser(pattern);
    return {
        text: pattern,
        ast: parse(p),
    };
}
//# sourceMappingURL=compile.js.map