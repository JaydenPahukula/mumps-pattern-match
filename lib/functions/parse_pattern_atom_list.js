import { accept_it } from './accept_it.js';
import { parse_pattern_atom } from './parse_pattern_atom.js';
export function parse_pattern_atom_list(p) {
    let result = [parse_pattern_atom(p)];
    while (p.current_token.kind === 4 /* TokenType.Comma */) {
        accept_it(p);
        result.push(parse_pattern_atom(p));
    }
    return result.join('|');
}
//# sourceMappingURL=parse_pattern_atom_list.js.map