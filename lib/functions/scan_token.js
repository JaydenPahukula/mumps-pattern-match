import { take_char } from './take_char.js';
import { isdigit, toupper } from './utils.js';
export function scan_token(s) {
    switch (toupper(s.current_char)) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            do {
                take_char(s);
            } while (isdigit(s.current_char));
            return 0 /* TokenType.Int */;
        case '"':
            take_char(s);
            while (s.current_char != '"')
                take_char(s);
            take_char(s);
            return 1 /* TokenType.String */;
        case '(':
            take_char(s);
            return 2 /* TokenType.LParen */;
        case ')':
            take_char(s);
            return 3 /* TokenType.RParen */;
        case ',':
            take_char(s);
            return 4 /* TokenType.Comma */;
        case '.':
            take_char(s);
            return 5 /* TokenType.Dot */;
        case 'A':
        case 'C':
        case 'E':
        case 'L':
        case 'N':
        case 'P':
        case 'U':
            take_char(s);
            return 6 /* TokenType.PatternCode */;
        case '\0':
            return 7 /* TokenType.EOT */;
        default:
            console.error('SYNTAX ERROR TODO');
            take_char(s);
            return 8 /* TokenType.Error */;
    }
}
//# sourceMappingURL=scan_token.js.map