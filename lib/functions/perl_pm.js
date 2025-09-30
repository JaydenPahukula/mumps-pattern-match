import { pcre } from '../pcre/pcre.js';
export function perl_pm(string, pattern) {
    const regex = pcre.compile(pattern);
    const matches = regex.exec(string, 0);
    return matches?.length === 1 && matches[0]?.index === 0 && matches[0].length === string.length;
}
//# sourceMappingURL=perl_pm.js.map