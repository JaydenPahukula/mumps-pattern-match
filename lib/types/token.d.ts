import { TokenType } from './tokentype.js';
export interface Token {
    kind: TokenType;
    text: string;
}
