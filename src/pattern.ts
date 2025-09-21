import { AST } from "./ast/asttypes.js";
import { generateAST } from "./ast/generateast.js";
import { generateNFA } from "./nfa/generatenfa.js";
import { NFA } from "./nfa/nfatypes.js";

/** A compiled pattern. Run `.exec("...")` to match a string against this pattern. */
export class Pattern {
	#str: string;
	ast: AST;
	nfa: NFA;

	constructor(pattern: string) {
		this.#str = pattern;
		this.ast = deepFreeze(generateAST(pattern));
		this.nfa = deepFreeze(generateNFA(this.ast));
	}

	public get str() {
		return this.#str;
	}

	public exec(str: string): boolean {
		// TODO
		return true;
	}
}

function deepFreeze<T extends object>(obj: T): T {
	Object.freeze(obj);
	for (const value of Object.values(obj)) {
		if (value && typeof value === "object" && !Object.isFrozen(value)) {
			deepFreeze(value);
		}
	}
	return obj;
}
