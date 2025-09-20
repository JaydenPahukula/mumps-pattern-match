export const enum ASTNodeType {
	Atom,
	Count,
	PatCode,
	Literal,
	Alternation,
}

interface BaseNode {
	type: ASTNodeType;
	pos: number;
	len: number;
}

export interface ASTAtomNode extends BaseNode {
	type: ASTNodeType.Atom;
	count: ASTCountNode;
	element: ASTElementNode;
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

// The abstract syntax tree of a pattern is a list of pattern atoms
export type AST = ASTAtomNode[];
