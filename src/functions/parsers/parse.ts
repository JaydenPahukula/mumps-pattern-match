import { Parser } from "../../classes/parser.js";
import { AST, ASTAtomNode } from "../../types/ast.js";
import { parseAtom } from "./parseatom.js";

/** Generates the AST of the pattern, or throws a `PatternSyntaxError` */
export function parse(pattern: string): AST {
	const p = new Parser(pattern);
	const atoms: ASTAtomNode[] = [];
	while (!p.done) {
		atoms.push(parseAtom(p));
	}
	return atoms;
}
