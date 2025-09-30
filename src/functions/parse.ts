import { PatternSyntaxError } from '../errors/patternsyntaxerror.js';
import { Parser } from '../types/parser.js';
import { TokenType } from '../types/tokentype.js';
import { parse_pattern } from './parse_pattern.js';
import { scan } from './scan.js';

export function parse(p: Parser): string {
	p.current_token = scan(p.s);
	const result = parse_pattern(p);
	if (p.current_token.kind !== TokenType.EOT) {
		throw new PatternSyntaxError(p.s.current_index);
	}
	return result;
}
