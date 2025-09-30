import { Parser } from "../types/parser";
import { TokenType } from "../types/tokentype";
import { parse_pattern_atom } from "./parse_pattern_atom";

export function parse_pattern(p: Parser): string {
    let result = "";
    while (p.current_token.kind === TokenType.Int || p.current_token.kind === TokenType.Dot) {
        result += parse_pattern_atom(p);
    }
    return result;
}
