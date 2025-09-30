import { PatternSyntaxError } from '../errors/patternsyntaxerror.js';
import { Parser } from '../types/parser.js';
import { TokenType } from '../types/token.js';
import { scan, Scanner } from './scan.js';

export function pm(string: string, pattern: string): boolean {
	const p: Parser = {
		current_token: {
			kind: TokenType.Error,
			text: '',
		},
		s: new Scanner(pattern),
	};
	const pcre_pattern = parse(p);
	console.log(pcre_pattern);
	return false;
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

function ispunct(c: string): boolean {
	return /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(c);
}
