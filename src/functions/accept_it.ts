import { Parser } from '../types/parser.js';
import { scan } from './scan.js';

export function accept_it(p: Parser) {
	p.current_token = scan(p.s);
}
