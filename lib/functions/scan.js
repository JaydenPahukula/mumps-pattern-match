export class Scanner {
    input;
    current_index = 0;
    current_char;
    current_token = {
        kind: 8 /* TokenType.Error */,
        text: '',
    };
    constructor(input) {
        this.input = input;
        this.current_char = input[0] ?? null;
    }
    increment() {
        this.current_index += 1;
        this.current_char = this.input[this.current_index] ?? null;
    }
}
export function scan(s) {
    s.current_token.text = '';
    s.current_token.kind = scan_token(s);
    return s.current_token;
}
function scan_token(s) {
    if (s.current_char === null)
        return 7 /* TokenType.EOT */;
    const c = s.current_char;
    if (is_digit(c)) {
        do {
            take_char(s);
        } while (is_digit(s.current_char));
        return 0 /* TokenType.Int */;
    }
    else if (c === '"') {
        take_char(s);
        while (s.current_char != '"')
            take_char(s); // TODO handle escaped double quote
        take_char(s);
        return 1 /* TokenType.String */;
    }
    else if (c === '(') {
        take_char(s);
        return 2 /* TokenType.LParen */;
    }
    else if (c === ')') {
        take_char(s);
        return 3 /* TokenType.RParen */;
    }
    else if (c === ',') {
        take_char(s);
        return 4 /* TokenType.Comma */;
    }
    else if (c === '.') {
        take_char(s);
        return 5 /* TokenType.Dot */;
    }
    else if (is_patcode(c)) {
        take_char(s);
        return 6 /* TokenType.PatternCode */;
    }
    else {
        console.error('SYNTAX ERROR TODO');
        take_char(s);
        return 8 /* TokenType.Error */;
    }
}
function take_char(s) {
    s.current_token.text += s.current_char;
    s.increment();
}
function is_digit(c) {
    return (c === '0' ||
        c === '1' ||
        c === '2' ||
        c === '3' ||
        c === '4' ||
        c === '5' ||
        c === '6' ||
        c === '7' ||
        c === '8' ||
        c === '9');
}
function is_patcode(c) {
    c = c.toUpperCase();
    return c === 'A' || c === 'C' || c === 'E' || c === 'L' || c === 'N' || c === 'P' || c === 'U';
}
//# sourceMappingURL=scan.js.map