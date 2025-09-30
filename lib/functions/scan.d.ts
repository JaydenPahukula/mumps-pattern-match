export declare const enum TokenType {
    Int = 0,
    String = 1,
    LParen = 2,
    RParen = 3,
    Comma = 4,
    Dot = 5,
    PatternCode = 6,
    EOT = 7,
    Error = 8
}
export interface Token {
    kind: TokenType;
    text: string;
}
export declare class Scanner {
    input: string;
    current_index: number;
    current_char: string | null;
    current_token: Token;
    constructor(input: string);
    increment(): void;
}
export declare function scan(s: Scanner): Token;
