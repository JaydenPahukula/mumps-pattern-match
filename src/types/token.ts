import { TokenType } from "./tokentype";

export interface Token {
    kind: TokenType;
    text: string;
}
