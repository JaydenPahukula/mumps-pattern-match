import { generateAST } from "./ast/generate.js";
import { generateNFA } from "./nfa/nfa.js";
/** A compiled pattern. Run `.exec("...")` to match a string against this pattern. */
export class Pattern {
    #str;
    ast;
    nfa;
    constructor(pattern) {
        this.#str = pattern;
        this.ast = deepFreeze(generateAST(pattern));
        this.nfa = deepFreeze(generateNFA(this.ast));
    }
    get str() {
        return this.#str;
    }
    exec(str) {
        // TODO
        return true;
    }
}
function deepFreeze(obj) {
    Object.freeze(obj);
    for (const value of Object.values(obj)) {
        if (value && typeof value === "object" && !Object.isFrozen(value)) {
            deepFreeze(value);
        }
    }
    return obj;
}
//# sourceMappingURL=pattern.js.map