import { AST } from "./asttypes.js";
/** Generates the AST of the pattern, or throws a `PatternSyntaxError` */
export declare function generateAST(pattern: string): AST;
export declare function digitsToNum(digits: string[]): number | undefined;
export declare function isDigit(s: unknown): s is "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export declare function isPatternCode(s: string): s is "A" | "C" | "E" | "L" | "N" | "P" | "U";
