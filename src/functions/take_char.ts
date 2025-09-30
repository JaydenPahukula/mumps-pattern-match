import { Scanner } from '../types/scanner.js';

export function take_char(s: Scanner) {
	s.current_token.text += s.current_char;
	s.increment();
}
