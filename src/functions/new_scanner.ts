import { Scanner } from '../types/scanner.js';
import { TokenType } from '../types/tokentype.js';

export function new_scanner(input: string): Scanner {
	return new Scanner(input);
}
