export const enum TokenType {
	Int,
	String,
	LParen,
	RParen,
	Comma,
	Dot,
	PatternCode,
	EOT,
	Error,
}

export interface Token {
	kind: TokenType;
	text: string;
}
