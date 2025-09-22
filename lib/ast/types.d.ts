export declare const enum ASTNodeType {
    Atom = 0,
    Count = 1,
    PatCode = 2,
    Literal = 3,
    Alternation = 4
}
interface ASTNode {
    type: ASTNodeType;
    pos: number;
    len: number;
}
export interface PatternAtom extends ASTNode {
    type: ASTNodeType.Atom;
    count: RepCount;
    element: PatternElement;
}
export interface RepCount extends ASTNode {
    type: ASTNodeType.Count;
    count: [number | undefined, number | undefined];
}
export interface PatternCode extends ASTNode {
    type: ASTNodeType.PatCode;
    code: string;
}
export interface StrLit extends ASTNode {
    type: ASTNodeType.Literal;
    string: string;
}
export interface Alternation extends ASTNode {
    type: ASTNodeType.Alternation;
    atoms: PatternAtom[];
}
export type PatternElement = PatternCode | StrLit | Alternation;
export type AST = PatternAtom[];
export {};
