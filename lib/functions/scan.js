import { scan_token } from './scan_token.js';
export function scan(s) {
    s.current_token.text = '';
    s.current_token.kind = scan_token(s);
    return s.current_token;
}
//# sourceMappingURL=scan.js.map