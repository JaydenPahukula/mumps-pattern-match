import Parser from "../types/parser";
import Scanner from "../types/scanner";
import TokenType from "../types/tokentype";

export default function new_parser(s: Scanner): Parser {
	return {
		current_token: {
			kind: TokenType.Error,
			text: "",
		},
		s: s,
	};
}
