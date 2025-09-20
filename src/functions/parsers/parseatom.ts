import { Parser } from "../../classes/parser.js";
import { ASTNodeType, ASTAtomNode } from "../../types/ast.js";
import { parseCount } from "./parsecount.js";
import { parseElement } from "./parseelement.js";

export function parseAtom(p: Parser): ASTAtomNode {
	const startIndex = p.currIndex;
	const count = parseCount(p);
	const element = parseElement(p);
	return {
		type: ASTNodeType.Atom,
		pos: startIndex,
		len: p.currIndex - startIndex,
		count: count,
		element: element,
	};
}
