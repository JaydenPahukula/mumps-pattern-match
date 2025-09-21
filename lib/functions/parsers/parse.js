import { Parser } from "../../classes/parser.js";
import { parseAtom } from "./parseatom.js";
/** Generates the AST of the pattern, or throws a `PatternSyntaxError` */
export function parse(pattern) {
    const p = new Parser(pattern);
    const atoms = [];
    while (!p.done) {
        atoms.push(parseAtom(p));
    }
    return atoms;
}
//# sourceMappingURL=parse.js.map