import { Pattern } from "./pattern.js";
/** Tests if `str` matches `pattern`. */
export function match(str, pattern) {
    return new Pattern(pattern).exec(str);
}
//# sourceMappingURL=match.js.map