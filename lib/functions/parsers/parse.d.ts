import { AST } from "../../types/ast.js";
/** Generates the AST of the pattern, or throws a `PatternSyntaxError` */
export declare function parse(pattern: string): AST;
