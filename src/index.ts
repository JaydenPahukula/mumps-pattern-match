import { Pattern } from './pattern.js';

/** Tests if `str` matches `pattern`. */
function match(str: string, pattern: string): boolean {
	return new Pattern(pattern).match(str);
}

export { Pattern, match };

// types
export * from './ast/types.js'; // AST types
export * from './nfa/types.js'; // NFA types
