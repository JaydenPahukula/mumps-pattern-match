import { Parser } from "../../classes/parser.js";
import { PatternSyntaxError } from "../../errors/patternsyntaxerror.js";
import { ASTCountNode, ASTNodeType } from "../../types/ast.js";

export function parseCount(p: Parser): ASTCountNode {
	const startIndex = p.currIndex;
	const digits: string[] = [];
	let count: number | [number | undefined, number | undefined];
	while (isDigit(p.currChar)) {
		digits.push(p.currChar);
		p.increment();
	}
	if (p.currChar === ".") {
		p.increment();
		const digits2: string[] = [];
		while (isDigit(p.currChar)) {
			digits2.push(p.currChar);
			p.increment();
		}
		count = [digitsToNum(digits), digitsToNum(digits2)];
	} else {
		if (digits.length === 0) throw new PatternSyntaxError(startIndex, "Expected a repitition count");
		count = digitsToNum(digits) ?? -1; // should never happen
	}
	return {
		type: ASTNodeType.Count,
		count: count,
		pos: startIndex,
		len: p.currIndex - startIndex,
	};
}

function digitsToNum(digits: string[]): number | undefined {
	const num = parseInt(digits.join(""));
	if (isNaN(num)) return undefined;
	return num;
}

function isDigit(s: unknown) {
	return (
		s === "0" ||
		s === "1" ||
		s === "2" ||
		s === "3" ||
		s === "4" ||
		s === "5" ||
		s === "6" ||
		s === "7" ||
		s === "8" ||
		s === "9"
	);
}
