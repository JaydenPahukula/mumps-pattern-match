import { Token } from '../types/token.js';
export declare class Scanner {
    input: string;
    current_index: number;
    current_char: string | null;
    current_token: Token;
    constructor(input: string);
    increment(): void;
}
export declare function scan(s: Scanner): Token;
