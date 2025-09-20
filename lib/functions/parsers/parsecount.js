import { PatternSyntaxError } from "../../errors/patternsyntaxerror.js";
export function parseCount(p) {
    const startIndex = p.currIndex;
    const digits = [];
    let count;
    while (isDigit(p.currChar)) {
        digits.push(p.currChar);
        p.increment();
    }
    if (p.currChar === ".") {
        p.increment();
        const digits2 = [];
        while (isDigit(p.currChar)) {
            digits2.push(p.currChar);
            p.increment();
        }
        count = [digitsToNum(digits), digitsToNum(digits2)];
    }
    else {
        if (digits.length === 0)
            throw new PatternSyntaxError(startIndex, "Expected a repitition count");
        count = digitsToNum(digits) ?? -1; // should never happen
    }
    return {
        type: 1 /* ASTNodeType.Count */,
        count: count,
        pos: startIndex,
        len: p.currIndex - startIndex,
    };
}
function digitsToNum(digits) {
    const num = parseInt(digits.join(""));
    if (isNaN(num))
        return undefined;
    return num;
}
function isDigit(s) {
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
//# sourceMappingURL=parsecount.js.map