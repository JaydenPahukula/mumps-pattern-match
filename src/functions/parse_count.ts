import { Parser } from '../types/parser.js';
import { TokenType } from '../types/tokentype.js';
import { accept_it } from './accept_it.js';

export function parse_count(p: Parser) {
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
