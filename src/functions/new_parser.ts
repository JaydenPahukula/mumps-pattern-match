import { Parser } from '../types/parser.js';
import { Scanner } from '../types/scanner.js';
import { TokenType } from '../types/tokentype.js';

export function new_parser(s: Scanner): Parser {
	return {
		current_token: {
			kind: TokenType.Error,
			text: '',
		},
		s: s,
	};
}
