import { AST } from "../ast/types.js";
import { NFA } from "./types.js";
export declare function generateNFA(tree: AST): NFA;
export declare const PATCODES: {
    [key: string]: string | null;
};
