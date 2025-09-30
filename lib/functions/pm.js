import { new_parser } from './new_parser.js';
import { new_scanner } from './new_scanner.js';
import { parse } from './parse.js';
import { perl_pm } from './perl_pm.js';
export function pm(string, pattern) {
    const p = new_parser(new_scanner(pattern));
    const pcre_pattern = parse(p);
    return perl_pm(string, pattern);
}
//# sourceMappingURL=pm.js.map