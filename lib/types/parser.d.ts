import { Scanner } from '../functions/scan.js';
import { Token } from './token.js';
export interface Parser {
    current_token: Token;
    s: Scanner;
}
