export const enum ASTNodeType {
	PatGroup = 'patgroup',
	PatAtom = 'patatom',
	RepCount = 'repcount',
	PatCode = 'patcode',
	StrLit = 'strlit',
	Alternation = 'alternation',
}

interface ASTNode {
	type: ASTNodeType;
	pos: number;
	len: number;
}

export interface ASTPatGroupNode extends ASTNode {
	type: ASTNodeType.PatGroup;
	atoms: ASTPatAtomNode[];
}

export interface ASTPatAtomNode extends ASTNode {
	type: ASTNodeType.PatAtom;
	count: ASTRepCountNode;
	element: ASTPatElementNode;
}

export interface ASTRepCountNode extends ASTNode {
	type: ASTNodeType.RepCount;
	count: [number | undefined, number | undefined];
}

export interface ASTPatCodeNode extends ASTNode {
	type: ASTNodeType.PatCode;
	code: string;
}

export interface ASTStrLitNode extends ASTNode {
	type: ASTNodeType.StrLit;
	string: string;
}

export interface ASTAlternationNode extends ASTNode {
	type: ASTNodeType.Alternation;
	patterns: ASTPatGroupNode[];
}

export type ASTPatElementNode = ASTPatCodeNode | ASTStrLitNode | ASTAlternationNode;

export type AST = ASTPatGroupNode;
