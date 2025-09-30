import { PatternSyntaxError } from '../errors/patternsyntaxerror.js';
import { pcre } from '../pcre/pcre.js';
import { Parser } from '../types/parser.js';
import { Scanner } from '../types/scanner.js';
import { Token } from '../types/token.js';
import { TokenType } from '../types/tokentype.js';

export function pm(string: string, pattern: string): boolean {
	const p = new_parser(new_scanner(pattern));
	const pcre_pattern = parse(p);

	return perl_pm(string, pattern);
}

function new_parser(s: Scanner): Parser {
	return {
		current_token: {
			kind: TokenType.Error,
			text: '',
		},
		s: s,
	};
}

function new_scanner(input: string): Scanner {
	return new Scanner(input);
}

function parse(p: Parser): string {
	p.current_token = scan(p.s);
	const result = parse_pattern(p);
	if (p.current_token.kind !== TokenType.EOT) {
		throw new PatternSyntaxError('', p.s.current_index);
	}
	return result;
}

function parse_pattern(p: Parser): string {
	let result = '';
	while (p.current_token.kind === TokenType.Int || p.current_token.kind === TokenType.Dot) {
		result += parse_pattern_atom(p);
	}
	return result;
}

function parse_pattern_atom(p: Parser): string {
	const count = parse_count(p);
	const element = parse_pattern_element(p);
	return element + count;
}

function parse_count(p: Parser) {
	let result: string;

	if (p.current_token.kind === TokenType.Int) {
		const lowerbound = p.current_token.text;
		accept_it(p);
		result = '{';
		if ((p.current_token.kind as TokenType) === TokenType.Dot) {
			accept_it(p);
			result += lowerbound + ',';
			if ((p.current_token.kind as TokenType) === TokenType.Int) {
				result += p.current_token.text;
				accept_it(p);
			}
		} else {
			result += lowerbound;
		}
		result += '}';
	} else {
		// Must have been a Dot.
		accept_it(p);
		if ((p.current_token.kind as TokenType) === TokenType.Int) {
			result = '{0,' + p.current_token.text + '}';
			accept_it(p);
		} else {
			result = '*';
		}
	}
	return result;
}

function accept_it(p: Parser) {
	p.current_token = scan(p.s);
}

const char_classes = {
	A: '[:alpha:]',
	C: '[:cntrl:]',
	E: '[:print:][:cntrl:]',
	L: '[:lower:]',
	N: '\\d',
	P: '[:punct:]',
	O: '[:upper:]',
};

function parse_pattern_element(p: Parser) {
	let result: string;
	switch (p.current_token.kind) {
		case TokenType.PatternCode:
			result = '[';
			do {
				result += char_classes[p.current_token.text[0] as keyof typeof char_classes] ?? '';
				accept_it(p);
			} while (p.current_token.kind === TokenType.PatternCode);
			result += ']';
			break;
		case TokenType.String:
			result = '(' + leaning_toothpickize(p.current_token.text) + ')';
			accept_it(p);
			break;
		case TokenType.LParen:
			accept_it(p);
			result = '(' + parse_pattern_atom_list(p) + ')';
			if ((p.current_token.kind as TokenType) !== TokenType.RParen)
				throw new PatternSyntaxError('Expected closing parenthasis', p.s.current_index);
			accept_it(p);
			break;
		default:
			throw new PatternSyntaxError('', p.s.current_index);
	}
	return result;
}

function parse_pattern_atom_list(p: Parser) {
	let result: string[] = [parse_pattern_atom(p)];
	while (p.current_token.kind === TokenType.Comma) {
		accept_it(p);
		result.push(parse_pattern_atom(p));
	}
	return result.join('|');
}

function perl_pm(string: string, pattern: string): boolean {
	const regex = pcre.compile(pattern);
	const matches = regex.exec(string, 0);
	return matches?.length === 1 && matches[0]?.index === 0 && matches[0].length === string.length;
}

function leaning_toothpickize(unmangled: string): string {
	let result: string[] = [];
	for (const c of unmangled) {
		if (c === '"') result.push('"');
		else {
			if (ispunct(c)) result.push('\\');
			result.push(c);
		}
	}
	return result.join('');
}

function scan_token(s: Scanner): TokenType {
	switch (toupper(s.current_char)) {
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

function scan(s: Scanner): Token {
	s.current_token.text = '';
	s.current_token.kind = scan_token(s);
	return s.current_token;
}

function take_char(s: Scanner) {
	s.current_token.text += s.current_char;
	s.increment();
}

function toupper(s: string): string {
	return s.toUpperCase();
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

function ispunct(c: string): boolean {
	return /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(c);
}
