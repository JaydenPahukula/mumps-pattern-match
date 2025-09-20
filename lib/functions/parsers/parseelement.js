import { PatternSyntaxError } from "../../errors/patternsyntaxerror.js";
import { parseAtom } from "./parseatom.js";
export function parseElement(p) {
    const startIndex = p.currIndex;
    switch (p.currChar) {
        case '"':
            // string literal
            p.increment();
            const chars = [];
            while (!p.done && p.currChar !== '"') {
                chars.push(p.currChar);
                p.increment();
            }
            if (p.done)
                throw new PatternSyntaxError(startIndex, "Unmatched parenthesis");
            p.increment();
            return {
                type: 3 /* ASTNodeType.Literal */,
                pos: startIndex,
                len: p.currIndex - startIndex,
                string: chars.join(""),
            };
        case "(":
            // alternation
            p.increment();
            const atoms = [parseAtom(p)];
            while (true) {
                if (p.currChar === ",") {
                    p.increment();
                    atoms.push(parseAtom(p));
                }
                else if (p.currChar === ")") {
                    break;
                }
                else {
                    throw new PatternSyntaxError(p.currIndex, "Expected ',' or ')'");
                }
            }
            p.increment();
            return {
                type: 4 /* ASTNodeType.Alternation */,
                pos: startIndex,
                len: p.currIndex - startIndex,
                atoms: atoms,
            };
        default:
            // pattern code
            const patCodes = [];
            while (isPatternCode(p.currChar.toUpperCase())) {
                patCodes.push(p.currChar);
                p.increment();
            }
            if (patCodes.length === 0)
                throw new PatternSyntaxError(p.currIndex);
            return {
                type: 2 /* ASTNodeType.PatCode */,
                pos: startIndex,
                len: p.currIndex - startIndex,
                code: patCodes.join(""),
            };
    }
}
function isPatternCode(s) {
    return s === "A" || s === "C" || s === "E" || s === "L" || s === "N" || s === "P" || s === "U";
}
//# sourceMappingURL=parseelement.js.map