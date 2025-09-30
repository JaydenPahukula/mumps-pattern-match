import { Token } from './token.js';
export declare class Scanner {
    input: string;
    current_index: number;
    current_char: string;
    current_token: Token;
    constructor(input: string);
    increment(): void;
}
