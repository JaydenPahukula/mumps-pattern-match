import { Scanner } from './scanner.js';
import { Token } from './token.js';

export interface Parser {
	current_token: Token;
	s: Scanner;
}
