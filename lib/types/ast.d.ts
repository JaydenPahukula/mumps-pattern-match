export declare const enum ASTNodeType {
    Atom = 0,
    Count = 1,
    PatCode = 2,
    Literal = 3,
    Alternation = 4
}
interface BaseNode {
    type: ASTNodeType;
    pos: number;
    len: number;
}
export interface ASTAtomNode extends BaseNode {
    type: ASTNodeType.Atom;
    count: ASTCountNode;
    element: ASTPatCodeNode | ASTLiteralNode | ASTAlternationNode;
}
export interface ASTCountNode extends BaseNode {
    type: ASTNodeType.Count;
    count: number | [number | undefined, number | undefined];
}
export interface ASTPatCodeNode extends BaseNode {
    type: ASTNodeType.PatCode;
    code: string;
}
export interface ASTLiteralNode extends BaseNode {
    type: ASTNodeType.Literal;
    string: string;
}
export interface ASTAlternationNode extends BaseNode {
    type: ASTNodeType.Alternation;
    atoms: ASTAtomNode[];
}
export type ASTElementNode = ASTPatCodeNode | ASTLiteralNode | ASTAlternationNode;
export type ASTNode = ASTAtomNode | ASTCountNode | ASTPatCodeNode | ASTLiteralNode | ASTAlternationNode;
export type AST = ASTAtomNode[];
export {};
