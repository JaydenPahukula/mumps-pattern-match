import { Scanner } from '../types/scanner.js';
import { Token } from '../types/token.js';
import { scan_token } from './scan_token.js';

export function scan(s: Scanner): Token {
	s.current_token.text = '';
	s.current_token.kind = scan_token(s);
	return s.current_token;
}
