import PatternSyntaxError from "../errors/patternsyntaxerror";
import Parser from "../types/parser";
import TokenType from "../types/tokentype";
import accept_it from "./accept_it";
import leaning_toothpickize from "./leaning_toothpickize";
import parse_pattern_atom_list from "./parse_pattern_atom_list";

const char_classes = {
	A: "[:alpha:]",
	C: "[:cntrl:]",
	E: "[:print:][:cntrl:]",
	L: "[:lower:]",
	N: "\\d",
	P: "[:punct:]",
	O: "[:upper:]",
};

export default function parse_pattern_element(p: Parser) {
	let result: string;
	switch (p.current_token.kind) {
		case TokenType.PatternCode:
			result = "[";
			do {
				result += char_classes[p.current_token.text[0] as keyof typeof char_classes] ?? "";
				accept_it(p);
			} while (p.current_token.kind === TokenType.PatternCode);
			result += "]";
			break;
		case TokenType.String:
			result = "(" + leaning_toothpickize(p.current_token.text) + ")";
			accept_it(p);
			break;
		case TokenType.LParen:
			accept_it(p);
			result = "(" + parse_pattern_atom_list(p) + ")";
			if ((p.current_token.kind as TokenType) !== TokenType.RParen)
				throw new PatternSyntaxError(p.s.current_index, "Expected closing parenthasis");
			accept_it(p);
			break;
		default:
			throw new PatternSyntaxError(p.s.current_index);
	}
	return result;
}
