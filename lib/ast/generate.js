import { PatternSyntaxError } from '../errors/patternsyntaxerror.js';
export class ParseHelper {
    str;
    _index = 0;
    constructor(str) {
        this.str = str;
    }
    currChar() {
        return this.str.at(this._index) ?? '';
    }
    currIndex() {
        return this._index;
    }
    isDone() {
        return this._index >= this.str.length;
    }
    increment() {
        if (!this.isDone())
            this._index++;
    }
}
/** Generates the AST of the pattern, or throws a `PatternSyntaxError` */
export function generateAST(pattern) {
    const p = new ParseHelper(pattern);
    return parseGroup(p);
}
function parseGroup(p, stopChars = []) {
    const startIndex = p.currIndex();
    const atoms = [];
    // stop reading atoms if any char in stopChars is encountered
    while (!p.isDone() && !stopChars.includes(p.currChar())) {
        atoms.push(parseAtom(p));
    }
    return {
        type: 'patgroup',
        pos: startIndex,
        len: p.currIndex() - startIndex,
        str: p.str.slice(startIndex, p.currIndex()),
        atoms: atoms,
    };
}
function parseAtom(p) {
    const startIndex = p.currIndex();
    return {
        type: 'patatom',
        pos: startIndex,
        len: p.currIndex() - startIndex,
        str: p.str.slice(startIndex, p.currIndex()),
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
    if (p.currChar() === '.') {
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
            throw new PatternSyntaxError('Expected a repitition count', startIndex);
        const x = digitsToNum(digits1);
        count = [x, x];
    }
    return {
        type: 'repcount',
        count: count,
        pos: startIndex,
        len: p.currIndex() - startIndex,
        str: p.str.slice(startIndex, p.currIndex()),
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
                throw new PatternSyntaxError("Expected '\"'", startIndex);
            p.increment();
            return {
                type: 'strlit',
                pos: startIndex,
                len: p.currIndex() - startIndex,
                string: chars.join(''),
                str: p.str.slice(startIndex, p.currIndex()),
            };
        case '(':
            // alternation
            p.increment();
            if (p.currChar() === ')')
                throw new PatternSyntaxError('Cannot have an empty alternation', p.currIndex());
            const groups = [parseGroup(p, [',', ')'])];
            while (1) {
                if (p.currChar() === ')')
                    break;
                else if (p.currChar() === ',') {
                    p.increment();
                    groups.push(parseGroup(p, [',', ')']));
                }
                else {
                    throw new PatternSyntaxError("Expected ',' or ')'", p.currIndex());
                }
            }
            p.increment();
            return {
                type: 'alternation',
                pos: startIndex,
                len: p.currIndex() - startIndex,
                str: p.str.slice(startIndex, p.currIndex()),
                patterns: groups,
            };
        default:
            // pattern code
            const patCodes = [];
            while (isPatternCode(p.currChar().toUpperCase())) {
                patCodes.push(p.currChar());
                p.increment();
            }
            if (patCodes.length === 0)
                throw new PatternSyntaxError('Expected a valid pattern code', p.currIndex());
            return {
                type: 'patcode',
                pos: startIndex,
                len: p.currIndex() - startIndex,
                str: p.str.slice(startIndex, p.currIndex()),
                code: patCodes.join(''),
            };
    }
}
export function digitsToNum(digits) {
    const num = parseInt(digits.join(''));
    if (isNaN(num))
        return undefined;
    return num;
}
export function isDigit(s) {
    return (s === '0' ||
        s === '1' ||
        s === '2' ||
        s === '3' ||
        s === '4' ||
        s === '5' ||
        s === '6' ||
        s === '7' ||
        s === '8' ||
        s === '9');
}
export function isPatternCode(s) {
    return s === 'A' || s === 'C' || s === 'E' || s === 'L' || s === 'N' || s === 'P' || s === 'U';
}
//# sourceMappingURL=generate.js.map