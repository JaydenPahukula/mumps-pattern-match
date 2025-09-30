import { Parser } from '../types/parser.js';
import { TokenType } from '../types/tokentype.js';
import { parse_pattern_atom } from './parse_pattern_atom.js';

export function parse_pattern(p: Parser): string {
	let result = '';
	while (p.current_token.kind === TokenType.Int || p.current_token.kind === TokenType.Dot) {
		result += parse_pattern_atom(p);
	}
	return result;
}
