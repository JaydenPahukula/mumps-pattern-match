import { PatternSyntaxError } from '../errors/patternsyntaxerror.js';
import { scan } from './scan.js';
import { Scanner } from '../functions/scan.js';
export function parse(input) {
    const s = new Scanner(input);
    const p = {
        current_token: scan(s),
        s: s,
    };
    const result = parse_pattern(p);
    if (p.current_token.kind !== 7 /* TokenType.EOT */) {
        throw new PatternSyntaxError('Syntax error', p.s.current_index);
    }
    return '^' + result + '$';
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
        if (p.current_token.kind !== 5 /* TokenType.Dot */)
            throw new PatternSyntaxError('Expected a repetition count', p.s.current_index);
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
function parse_pattern_element(p) {
    let result;
    switch (p.current_token.kind) {
        case 6 /* TokenType.PatternCode */:
            result = '[';
            do {
                result += get_range(p.current_token.text);
                accept_it(p);
            } while (p.current_token.kind === 6 /* TokenType.PatternCode */);
            result += ']';
            break;
        case 1 /* TokenType.String */:
            const str = p.current_token.text.slice(1, -1); // remove quotations
            result = '(?:' + escape_regexp(str) + ')';
            accept_it(p);
            break;
        case 2 /* TokenType.LParen */:
            accept_it(p);
            result = '(?:' + parse_pattern_list(p) + ')';
            if (p.current_token.kind !== 3 /* TokenType.RParen */)
                throw new PatternSyntaxError('Expected a closing parenthesis', p.s.current_index);
            accept_it(p);
            break;
        default:
            throw new PatternSyntaxError('Expected a pattern element', p.s.current_index);
    }
    return result;
}
function parse_pattern_list(p) {
    let pattern = parse_pattern(p);
    if (pattern === '')
        throw new PatternSyntaxError('Expected a pattern atom', p.s.current_index);
    let result = [pattern];
    while (p.current_token.kind === 4 /* TokenType.Comma */) {
        accept_it(p);
        pattern = parse_pattern(p);
        if (pattern === '')
            throw new PatternSyntaxError('Expected a pattern atom', p.s.current_index);
        result.push(pattern);
    }
    return result.join('|');
}
function accept_it(p) {
    p.current_token = scan(p.s);
}
function escape_regexp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function get_range(code) {
    code = code.toUpperCase();
    if (code === 'A')
        return 'a-zA-z';
    if (code === 'C')
        return '\\x00-\\x1F\\x7F';
    if (code === 'E')
        return '\\x00-\\x7F';
    if (code === 'L')
        return 'a-z';
    if (code === 'N')
        return '0-9';
    if (code === 'P')
        return '\\x20-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7B-\\x7E';
    if (code === 'U')
        return 'A-Z';
    return '';
}
//# sourceMappingURL=parse.js.map