import Scanner from "../types/scanner";
import TokenType from "../types/tokentype";

export default function new_scanner(input: string): Scanner {
	return new Scanner(input);
}
