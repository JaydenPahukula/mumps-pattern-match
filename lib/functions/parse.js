import { PatternSyntaxError } from '../errors/patternsyntaxerror.js';
import { parse_pattern } from './parse_pattern.js';
import { scan } from './scan.js';
export function parse(p) {
    p.current_token = scan(p.s);
    const result = parse_pattern(p);
    if (p.current_token.kind !== 7 /* TokenType.EOT */) {
        throw new PatternSyntaxError(p.s.current_index);
    }
    return result;
}
//# sourceMappingURL=parse.js.map