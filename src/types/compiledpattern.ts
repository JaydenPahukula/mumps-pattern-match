import { AST } from "./ast.js";

export interface CompiledPattern {
	text: string;
	ast: AST;
}
