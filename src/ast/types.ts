export const enum ASTNodeType {
	Group = "group", // list of atoms
	Atom = "atom",
	RepCount = "count",
	PatCode = "patcode",
	Literal = "strlit",
	Alternation = "alternation",
}

interface ASTNode {
	type: ASTNodeType;
	pos: number;
	len: number;
}

export interface PatternGroup extends ASTNode {
	type: ASTNodeType.Group;
	atoms: PatternAtom[];
}

export interface PatternAtom extends ASTNode {
	type: ASTNodeType.Atom;
	count: RepCount;
	element: PatternElement;
}

export interface RepCount extends ASTNode {
	type: ASTNodeType.RepCount;
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
	patterns: PatternGroup[];
}

export type PatternElement = PatternCode | StrLit | Alternation;

export type AST = PatternGroup;
