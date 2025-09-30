import { Parser } from '../types/parser.js';
import { TokenType } from '../types/tokentype.js';
import { accept_it } from './accept_it.js';
import { parse_pattern_atom } from './parse_pattern_atom.js';

export function parse_pattern_atom_list(p: Parser) {
	let result: string[] = [parse_pattern_atom(p)];
	while (p.current_token.kind === TokenType.Comma) {
		accept_it(p);
		result.push(parse_pattern_atom(p));
	}
	return result.join('|');
}
