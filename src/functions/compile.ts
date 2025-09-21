import { build } from "./builders/build.js";
import { CompiledPattern } from "../types/compiledpattern.js";
import { parse } from "./parsers/parse.js";

export function compile(pattern: string): CompiledPattern {
	const ast = parse(pattern);
	return {
		text: pattern,
		ast: ast,
		nfa: build(ast),
	};
}
