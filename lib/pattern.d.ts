import { AST } from "./ast/asttypes.js";
import { NFA } from "./nfa/nfatypes.js";
/** A compiled pattern. Run `.exec("...")` to match a string against this pattern. */
export declare class Pattern {
    #private;
    ast: AST;
    nfa: NFA;
    constructor(pattern: string);
    get str(): string;
    exec(str: string): boolean;
}
