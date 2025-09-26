export type ASTNodeType = 'patgroup' | 'patatom' | 'repcount' | 'patcode' | 'strlit' | 'alternation';
export interface ASTBaseNode {
    type: ASTNodeType;
    pos: number;
    len: number;
    str: string;
}
export interface ASTPatGroupNode extends ASTBaseNode {
    type: 'patgroup';
    atoms: ASTPatAtomNode[];
}
export interface ASTPatAtomNode extends ASTBaseNode {
    type: 'patatom';
    count: ASTRepCountNode;
    element: ASTPatElementNode;
}
export interface ASTRepCountNode extends ASTBaseNode {
    type: 'repcount';
    count: [number | undefined, number | undefined];
}
export interface ASTPatCodeNode extends ASTBaseNode {
    type: 'patcode';
    code: string;
}
export interface ASTStrLitNode extends ASTBaseNode {
    type: 'strlit';
    string: string;
}
export interface ASTAlternationNode extends ASTBaseNode {
    type: 'alternation';
    patterns: ASTPatGroupNode[];
}
export type ASTPatElementNode = ASTPatCodeNode | ASTStrLitNode | ASTAlternationNode;
export type ASTNode = ASTPatGroupNode | ASTPatAtomNode | ASTRepCountNode | ASTPatCodeNode | ASTStrLitNode | ASTAlternationNode;
export type AST = ASTPatGroupNode;
