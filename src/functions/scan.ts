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

export class Scanner {
	public current_index = 0;
	public current_char: string | null;
	public current_token: Token = {
		kind: TokenType.Error,
		text: '',
	};
	constructor(public input: string) {
		this.current_char = input[0] ?? null;
	}
	public increment() {
		this.current_index += 1;
		this.current_char = this.input[this.current_index] ?? null;
	}
}

export function scan(s: Scanner): Token {
	s.current_token.text = '';
	s.current_token.kind = scan_token(s);
	return s.current_token;
}

function scan_token(s: Scanner): TokenType {
	if (s.current_char === null) return TokenType.EOT;
	const c = s.current_char;
	if (is_digit(c)) {
		do {
			take_char(s);
		} while (is_digit(s.current_char));
		return TokenType.Int;
	} else if (c === '"') {
		take_char(s);
		while (s.current_char != '"') take_char(s); // TODO handle escaped double quote
		take_char(s);
		return TokenType.String;
	} else if (c === '(') {
		take_char(s);
		return TokenType.LParen;
	} else if (c === ')') {
		take_char(s);
		return TokenType.RParen;
	} else if (c === ',') {
		take_char(s);
		return TokenType.Comma;
	} else if (c === '.') {
		take_char(s);
		return TokenType.Dot;
	} else if (is_patcode(c)) {
		take_char(s);
		return TokenType.PatternCode;
	} else {
		console.error('SYNTAX ERROR TODO');
		take_char(s);
		return TokenType.Error;
	}
}

function take_char(s: Scanner) {
	s.current_token.text += s.current_char;
	s.increment();
}

function is_digit(c: string): boolean {
	return (
		c === '0' ||
		c === '1' ||
		c === '2' ||
		c === '3' ||
		c === '4' ||
		c === '5' ||
		c === '6' ||
		c === '7' ||
		c === '8' ||
		c === '9'
	);
}

function is_patcode(c: string): boolean {
	c = c.toUpperCase();
	return c === 'A' || c === 'C' || c === 'E' || c === 'L' || c === 'N' || c === 'P' || c === 'U';
}
