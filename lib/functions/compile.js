import { build } from "./builders/build.js";
import { parse } from "./parsers/parse.js";
export function compile(pattern) {
    const ast = parse(pattern);
    return {
        text: pattern,
        ast: ast,
        nfa: build(ast),
    };
}
//# sourceMappingURL=compile.js.map