import { parse_count } from './parse_count.js';
import { parse_pattern_element } from './parse_pattern_element.js';
export function parse_pattern_atom(p) {
    const count = parse_count(p);
    const element = parse_pattern_element(p);
    return element + count;
}
//# sourceMappingURL=parse_pattern_atom.js.map