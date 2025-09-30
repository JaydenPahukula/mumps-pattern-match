import { PatternSyntaxError } from '../errors/patternsyntaxerror.js';
import { accept_it } from './accept_it.js';
import { leaning_toothpickize } from './leaning_toothpickize.js';
import { parse_pattern_atom_list } from './parse_pattern_atom_list.js';
const char_classes = {
    A: '[:alpha:]',
    C: '[:cntrl:]',
    E: '[:print:][:cntrl:]',
    L: '[:lower:]',
    N: '\\d',
    P: '[:punct:]',
    O: '[:upper:]',
};
export function parse_pattern_element(p) {
    let result;
    switch (p.current_token.kind) {
        case 6 /* TokenType.PatternCode */:
            result = '[';
            do {
                result += char_classes[p.current_token.text[0]] ?? '';
                accept_it(p);
            } while (p.current_token.kind === 6 /* TokenType.PatternCode */);
            result += ']';
            break;
        case 1 /* TokenType.String */:
            result = '(' + leaning_toothpickize(p.current_token.text) + ')';
            accept_it(p);
            break;
        case 2 /* TokenType.LParen */:
            accept_it(p);
            result = '(' + parse_pattern_atom_list(p) + ')';
            if (p.current_token.kind !== 3 /* TokenType.RParen */)
                throw new PatternSyntaxError(p.s.current_index, 'Expected closing parenthasis');
            accept_it(p);
            break;
        default:
            throw new PatternSyntaxError(p.s.current_index);
    }
    return result;
}
//# sourceMappingURL=parse_pattern_element.js.map