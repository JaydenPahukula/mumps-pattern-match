import { parse } from './parse.js';
export function pm(string, pattern) {
    const regexp_pattern = parse(pattern);
    return new RegExp(regexp_pattern, 'su').test(string);
}
//# sourceMappingURL=pm.js.map