import { accept_it } from './accept_it.js';
export function parse_count(p) {
    let result;
    if (p.current_token.kind === 0 /* TokenType.Int */) {
        const lowerbound = p.current_token.text;
        accept_it(p);
        result = '{';
        if (p.current_token.kind === 5 /* TokenType.Dot */) {
            accept_it(p);
            result += lowerbound + ',';
            if (p.current_token.kind === 0 /* TokenType.Int */) {
                result += p.current_token.text;
                accept_it(p);
            }
        }
        else {
            result += lowerbound;
        }
        result += '}';
    }
    else {
        // Must have been a Dot.
        accept_it(p);
        if (p.current_token.kind === 0 /* TokenType.Int */) {
            result = '{0,' + p.current_token.text + '}';
            accept_it(p);
        }
        else {
            result = '*';
        }
    }
    return result;
}
//# sourceMappingURL=parse_count.js.map