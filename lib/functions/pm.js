import { PatternSyntaxError } from '../errors/patternsyntaxerror.js';
import { scan, Scanner } from './scan.js';
export function pm(string, pattern) {
    const p = {
        current_token: {
            kind: 8 /* TokenType.Error */,
            text: '',
        },
        s: new Scanner(pattern),
    };
    const pcre_pattern = parse(p);
    console.log(pcre_pattern);
    return false;
}
function parse(p) {
    p.current_token = scan(p.s);
    const result = parse_pattern(p);
    if (p.current_token.kind !== 7 /* TokenType.EOT */) {
        throw new PatternSyntaxError('', p.s.current_index);
    }
    return result;
}
function parse_pattern(p) {
    let result = '';
    while (p.current_token.kind === 0 /* TokenType.Int */ || p.current_token.kind === 5 /* TokenType.Dot */) {
        result += parse_pattern_atom(p);
    }
    return result;
}
function parse_pattern_atom(p) {
    const count = parse_count(p);
    const element = parse_pattern_element(p);
    return element + count;
}
function parse_count(p) {
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
function accept_it(p) {
    p.current_token = scan(p.s);
}
const char_classes = {
    A: '[:alpha:]',
    C: '[:cntrl:]',
    E: '[:print:][:cntrl:]',
    L: '[:lower:]',
    N: '\\d',
    P: '[:punct:]',
    O: '[:upper:]',
};
function parse_pattern_element(p) {
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
                throw new PatternSyntaxError('Expected closing parenthasis', p.s.current_index);
            accept_it(p);
            break;
        default:
            throw new PatternSyntaxError('', p.s.current_index);
    }
    return result;
}
function parse_pattern_atom_list(p) {
    let result = [parse_pattern_atom(p)];
    while (p.current_token.kind === 4 /* TokenType.Comma */) {
        accept_it(p);
        result.push(parse_pattern_atom(p));
    }
    return result.join('|');
}
function leaning_toothpickize(unmangled) {
    let result = [];
    for (const c of unmangled) {
        if (c === '"')
            result.push('"');
        else {
            if (ispunct(c))
                result.push('\\');
            result.push(c);
        }
    }
    return result.join('');
}
function ispunct(c) {
    return /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(c);
}
//# sourceMappingURL=pm.js.map