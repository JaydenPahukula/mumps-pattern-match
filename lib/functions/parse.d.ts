import { Token } from './scan.js';
import { Scanner } from '../functions/scan.js';
export interface Parser {
    current_token: Token;
    s: Scanner;
}
export declare function parse(input: string): string;
