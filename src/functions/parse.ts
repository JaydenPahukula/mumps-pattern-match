// void parse (struct parser* p, char* s) {
//     struct bstring result;
//     p->current_token = scan (&(p->s));
//     result = parse_pattern (p);
//     if (p->current_token.kind != EOT) {
//         syntax_error ("Syntax error in pattern",
//                       p->s.input, p->s.current_char - p->s.input);
//     }
//     make_cstring (s, result);
// }

import PatternSyntaxError from "../errors/patternsyntaxerror";
import Parser from "../types/parser";
import TokenType from "../types/tokentype";
import parse_pattern from "./parse_pattern";
import scan from "./scan";

export default function parse(p: Parser): string {
	p.current_token = scan(p.s);
	const result = parse_pattern(p);
	if (p.current_token.kind !== TokenType.EOT) {
		throw new PatternSyntaxError(p.s.current_index);
	}
	return result;
}
