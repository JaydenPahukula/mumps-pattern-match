import { Pattern } from './pattern.js';
/** Tests if `str` matches `pattern`. */
declare function match(str: string, pattern: string): boolean;
export { Pattern, match };
export { PatternSyntaxError } from './errors/patternsyntaxerror.js';
export * from './ast/types.js';
export * from './nfa/types.js';
