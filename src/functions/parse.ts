import { PatternSyntaxError } from "../errors/patternsyntaxerror";
import { Parser } from "../types/parser";
import { TokenType } from "../types/tokentype";
import { parse_pattern } from "./parse_pattern";
import { scan } from "./scan";

export function parse(p: Parser): string {
    p.current_token = scan(p.s);
    const result = parse_pattern(p);
    if (p.current_token.kind !== TokenType.EOT) {
        throw new PatternSyntaxError(p.s.current_index);
    }
    return result;
}
