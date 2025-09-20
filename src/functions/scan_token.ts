import Scanner from "../types/scanner";
import TokenType from "../types/tokentype";
import take_char from "./take_char";
import { isdigit, toupper } from "./utils";

export default function scan_token(s: Scanner): TokenType {
	switch (toupper(s.current_char)) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			do {
				take_char(s);
			} while (isdigit(s.current_char));
			return TokenType.Int;
		case '"':
			take_char(s);
			while (s.current_char != '"') take_char(s);
			take_char(s);
			return TokenType.String;
		case "(":
			take_char(s);
			return TokenType.LParen;
		case ")":
			take_char(s);
			return TokenType.RParen;
		case ",":
			take_char(s);
			return TokenType.Comma;
		case ".":
			take_char(s);
			return TokenType.Dot;
		case "A":
		case "C":
		case "E":
		case "L":
		case "N":
		case "P":
		case "U":
			take_char(s);
			return TokenType.PatternCode;
		case "\0":
			return TokenType.EOT;
		default:
			console.error("SYNTAX ERROR TODO");
			take_char(s);
			return TokenType.Error;
	}
}
