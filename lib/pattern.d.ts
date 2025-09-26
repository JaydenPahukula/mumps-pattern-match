import { AST } from './ast/types.js';
import { NFA } from './nfa/types.js';
export declare class Pattern {
    #private;
    ast: AST;
    nfa: NFA;
    constructor(pattern: string);
    get str(): string;
    match(str: string): boolean;
}
