import { generateAST } from './ast/generate.js';
import { generateNFA } from './nfa/generate.js';
import { execNFA } from './nfa/exec.js';
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
    match(str) {
        return execNFA(this.nfa, str);
    }
}
function deepFreeze(obj) {
    Object.freeze(obj);
    for (const value of Object.values(obj)) {
        if (value && typeof value === 'object' && !Object.isFrozen(value)) {
            deepFreeze(value);
        }
    }
    return obj;
}
//# sourceMappingURL=pattern.js.map