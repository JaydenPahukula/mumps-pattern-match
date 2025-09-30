import { Token } from '../types/token.js';
import { TokenType } from '../types/tokentype.js';

export class Scanner {
	public current_index = 0;

	public current_char: string;
	public current_token: Token = {
		kind: TokenType.Error,
		text: '',
	};

	constructor(public input: string) {
		this.current_char = input[0] ?? '\0';
	}

	public increment() {
		this.current_index += 1;
		this.current_char = this.input[this.current_index] ?? '\0';
	}
}

export function scan(s: Scanner): Token {
	s.current_token.text = '';
	s.current_token.kind = scan_token(s);
	return s.current_token;
}

function scan_token(s: Scanner): TokenType {
	switch (s.current_char.toUpperCase()) {
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			do {
				take_char(s);
			} while (isdigit(s.current_char));
			return TokenType.Int;
		case '"':
			take_char(s);
			while (s.current_char != '"') take_char(s);
			take_char(s);
			return TokenType.String;
		case '(':
			take_char(s);
			return TokenType.LParen;
		case ')':
			take_char(s);
			return TokenType.RParen;
		case ',':
			take_char(s);
			return TokenType.Comma;
		case '.':
			take_char(s);
			return TokenType.Dot;
		case 'A':
		case 'C':
		case 'E':
		case 'L':
		case 'N':
		case 'P':
		case 'U':
			take_char(s);
			return TokenType.PatternCode;
		case '\0':
			return TokenType.EOT;
		default:
			console.error('SYNTAX ERROR TODO');
			take_char(s);
			return TokenType.Error;
	}
}

function take_char(s: Scanner) {
	s.current_token.text += s.current_char;
	s.increment();
}

function isdigit(c: string): boolean {
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
