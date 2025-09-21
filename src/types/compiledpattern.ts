import { NFANode } from "./nfa.js";
import { AST } from "./ast.js";

export interface CompiledPattern {
	text: string;
	ast: AST;
	nfa: NFANode;
}
