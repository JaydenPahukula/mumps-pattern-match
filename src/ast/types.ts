export const enum ASTNodeType {
	PatGroup = 'patgroup',
	PatAtom = 'patatom',
	RepCount = 'repcount',
	PatCode = 'patcode',
	StrLit = 'strlit',
	Alternation = 'alternation',
}

export interface ASTBaseNode {
	type: ASTNodeType;
	pos: number;
	len: number;
	str: string;
}

export interface ASTPatGroupNode extends ASTBaseNode {
	type: ASTNodeType.PatGroup;
	atoms: ASTPatAtomNode[];
}

export interface ASTPatAtomNode extends ASTBaseNode {
	type: ASTNodeType.PatAtom;
	count: ASTRepCountNode;
	element: ASTPatElementNode;
}

export interface ASTRepCountNode extends ASTBaseNode {
	type: ASTNodeType.RepCount;
	count: [number | undefined, number | undefined];
}

export interface ASTPatCodeNode extends ASTBaseNode {
	type: ASTNodeType.PatCode;
	code: string;
}

export interface ASTStrLitNode extends ASTBaseNode {
	type: ASTNodeType.StrLit;
	string: string;
}

export interface ASTAlternationNode extends ASTBaseNode {
	type: ASTNodeType.Alternation;
	patterns: ASTPatGroupNode[];
}

export type ASTPatElementNode = ASTPatCodeNode | ASTStrLitNode | ASTAlternationNode;

export type ASTNode =
	| ASTPatGroupNode
	| ASTPatAtomNode
	| ASTRepCountNode
	| ASTPatCodeNode
	| ASTStrLitNode
	| ASTAlternationNode;

export type AST = ASTPatGroupNode;
