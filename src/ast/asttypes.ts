export const enum ASTNodeType {
	Atom,
	Count,
	PatCode,
	Literal,
	Alternation,
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

// The abstract syntax tree of a pattern is a list of pattern atoms
export type AST = PatternAtom[];
