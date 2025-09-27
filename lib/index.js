import { Pattern } from './pattern.js';
/** Tests if `str` matches `pattern`. */
function match(str, pattern) {
    return new Pattern(pattern).match(str);
}
export { Pattern, match };
export { PatternSyntaxError } from './errors/patternsyntaxerror.js';
export * from './ast/types.js'; // AST types
export * from './nfa/types.js'; // NFA types
//# sourceMappingURL=index.js.map