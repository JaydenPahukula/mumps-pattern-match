import { parse_pattern_atom } from './parse_pattern_atom.js';
export function parse_pattern(p) {
    let result = '';
    while (p.current_token.kind === 0 /* TokenType.Int */ || p.current_token.kind === 5 /* TokenType.Dot */) {
        result += parse_pattern_atom(p);
    }
    return result;
}
//# sourceMappingURL=parse_pattern.js.map