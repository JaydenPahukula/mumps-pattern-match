import { PatternSyntaxError } from "../errors/patternsyntaxerror.js";
import { ParseHelper } from "./parsehelper.js";
/** Generates the AST of the pattern, or throws a `PatternSyntaxError` */
export function generateAST(pattern) {
    const p = new ParseHelper(pattern);
    const atoms = [];
    while (!p.isDone()) {
        atoms.push(parseAtom(p));
    }
    return atoms;
}
function parseAtom(p) {
    const startIndex = p.currIndex();
    return {
        type: 0 /* ASTNodeType.Atom */,
        pos: startIndex,
        len: p.currIndex() - startIndex,
        count: parseCount(p),
        element: parseElement(p),
    };
}
function parseCount(p) {
    const startIndex = p.currIndex();
    const digits1 = [];
    let count;
    while (isDigit(p.currChar())) {
        digits1.push(p.currChar());
        p.increment();
    }
    if (p.currChar() === ".") {
        p.increment();
        const digits2 = [];
        while (isDigit(p.currChar())) {
            digits2.push(p.currChar());
            p.increment();
        }
        count = [digitsToNum(digits1), digitsToNum(digits2)];
    }
    else {
        if (digits1.length === 0)
            throw new PatternSyntaxError(startIndex, "Expected a repitition count");
        const x = digitsToNum(digits1);
        count = [x, x];
    }
    return {
        type: 1 /* ASTNodeType.Count */,
        count: count,
        pos: startIndex,
        len: p.currIndex() - startIndex,
    };
}
function parseElement(p) {
    const startIndex = p.currIndex();
    switch (p.currChar()) {
        case '"':
            // string literal
            p.increment();
            const chars = [];
            while (!p.isDone() && p.currChar() !== '"') {
                chars.push(p.currChar());
                p.increment();
            }
            if (p.isDone())
                throw new PatternSyntaxError(startIndex, "Unmatched parenthesis");
            p.increment();
            return {
                type: 3 /* ASTNodeType.Literal */,
                pos: startIndex,
                len: p.currIndex() - startIndex,
                string: chars.join(""),
            };
        case "(":
            // alternation
            p.increment();
            const atoms = [parseAtom(p)];
            while (true) {
                if (p.currChar() === ",") {
                    p.increment();
                    atoms.push(parseAtom(p));
                }
                else if (p.currChar() === ")")
                    break;
                else
                    throw new PatternSyntaxError(p.currIndex(), "Expected ',' or ')'");
            }
            p.increment();
            return {
                type: 4 /* ASTNodeType.Alternation */,
                pos: startIndex,
                len: p.currIndex() - startIndex,
                atoms: atoms,
            };
        default:
            // pattern code
            const patCodes = [];
            while (isPatternCode(p.currChar().toUpperCase())) {
                patCodes.push(p.currChar());
                p.increment();
            }
            if (patCodes.length === 0)
                throw new PatternSyntaxError(p.currIndex());
            return {
                type: 2 /* ASTNodeType.PatCode */,
                pos: startIndex,
                len: p.currIndex() - startIndex,
                code: patCodes.join(""),
            };
    }
}
export function digitsToNum(digits) {
    const num = parseInt(digits.join(""));
    if (isNaN(num))
        return undefined;
    return num;
}
export function isDigit(s) {
    return (s === "0" ||
        s === "1" ||
        s === "2" ||
        s === "3" ||
        s === "4" ||
        s === "5" ||
        s === "6" ||
        s === "7" ||
        s === "8" ||
        s === "9");
}
export function isPatternCode(s) {
    return s === "A" || s === "C" || s === "E" || s === "L" || s === "N" || s === "P" || s === "U";
}
//# sourceMappingURL=generateast.js.map