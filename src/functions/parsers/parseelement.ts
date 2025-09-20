import { Parser } from "../../classes/parser.js";
import { PatternSyntaxError } from "../../errors/patternsyntaxerror.js";
import { ASTElementNode, ASTNodeType, ASTAtomNode } from "../../types/ast.js";
import { parseAtom } from "./parseatom.js";

export function parseElement(p: Parser): ASTElementNode {
	const startIndex = p.currIndex;
	switch (p.currChar) {
		case '"':
			// string literal
			p.increment();
			const chars: string[] = [];
			while (!p.done && p.currChar !== '"') {
				chars.push(p.currChar);
				p.increment();
			}
			if (p.done) throw new PatternSyntaxError(startIndex, "Unmatched parenthesis");
			p.increment();
			return {
				type: ASTNodeType.Literal,
				pos: startIndex,
				len: p.currIndex - startIndex,
				string: chars.join(""),
			};
		case "(":
			// alternation
			p.increment();
			const atoms: ASTAtomNode[] = [parseAtom(p)];
			while (true) {
				if ((p.currChar as string) === ",") {
					p.increment();
					atoms.push(parseAtom(p));
				} else if ((p.currChar as string) === ")") {
					break;
				} else {
					throw new PatternSyntaxError(p.currIndex, "Expected ',' or ')'");
				}
			}
			p.increment();
			return {
				type: ASTNodeType.Alternation,
				pos: startIndex,
				len: p.currIndex - startIndex,
				atoms: atoms,
			};
		default:
			// pattern code
			const patCodes = [];
			while (isPatternCode(p.currChar.toUpperCase())) {
				patCodes.push(p.currChar);
				p.increment();
			}
			if (patCodes.length === 0) throw new PatternSyntaxError(p.currIndex);
			return {
				type: ASTNodeType.PatCode,
				pos: startIndex,
				len: p.currIndex - startIndex,
				code: patCodes.join(""),
			};
	}
}

function isPatternCode(s: string) {
	return s === "A" || s === "C" || s === "E" || s === "L" || s === "N" || s === "P" || s === "U";
}
