import { AST, ASTPatAtomNode, ASTRepCountNode, ASTPatElementNode, ASTNodeType, ASTPatGroupNode } from './types.js';
import { PatternSyntaxError } from '../errors/patternsyntaxerror.js';
import { ParseHelper } from './parsehelper.js';

/** Generates the AST of the pattern, or throws a `PatternSyntaxError` */
export function generateAST(pattern: string): AST {
	const p = new ParseHelper(pattern);
	return parseGroup(p);
}

function parseGroup(p: ParseHelper, stopChars: string[] = []): ASTPatGroupNode {
	const startIndex = p.currIndex();
	const atoms: ASTPatAtomNode[] = [];
	// stop reading atoms if any char in stopChars is encountered
	while (!p.isDone() && !stopChars.includes(p.currChar())) {
		atoms.push(parseAtom(p));
	}
	return {
		type: ASTNodeType.PatGroup,
		pos: startIndex,
		len: p.currIndex() - startIndex,
		atoms: atoms,
	};
}

function parseAtom(p: ParseHelper): ASTPatAtomNode {
	const startIndex = p.currIndex();
	return {
		type: ASTNodeType.PatAtom,
		pos: startIndex,
		len: p.currIndex() - startIndex,
		count: parseCount(p),
		element: parseElement(p),
	};
}

function parseCount(p: ParseHelper): ASTRepCountNode {
	const startIndex = p.currIndex();
	const digits1: string[] = [];
	let count: [number | undefined, number | undefined];
	while (isDigit(p.currChar())) {
		digits1.push(p.currChar());
		p.increment();
	}
	if (p.currChar() === '.') {
		p.increment();
		const digits2: string[] = [];
		while (isDigit(p.currChar())) {
			digits2.push(p.currChar());
			p.increment();
		}
		count = [digitsToNum(digits1), digitsToNum(digits2)];
	} else {
		if (digits1.length === 0) throw new PatternSyntaxError('Expected a repitition count', startIndex);
		const x = digitsToNum(digits1);
		count = [x, x];
	}
	return {
		type: ASTNodeType.RepCount,
		count: count,
		pos: startIndex,
		len: p.currIndex() - startIndex,
	};
}

function parseElement(p: ParseHelper): ASTPatElementNode {
	const startIndex = p.currIndex();
	switch (p.currChar()) {
		case '"':
			// string literal
			p.increment();
			const chars: string[] = [];
			while (!p.isDone() && p.currChar() !== '"') {
				chars.push(p.currChar());
				p.increment();
			}
			if (p.isDone()) throw new PatternSyntaxError("Expected '\"'", startIndex);
			p.increment();
			return {
				type: ASTNodeType.StrLit,
				pos: startIndex,
				len: p.currIndex() - startIndex,
				string: chars.join(''),
			};
		case '(':
			// alternation
			p.increment();
			if (p.currChar() === ')') throw new PatternSyntaxError('Cannot have an empty alternation', p.currIndex());
			const groups: ASTPatGroupNode[] = [parseGroup(p, [',', ')'])];
			while (1) {
				if (p.currChar() === ')') break;
				else if (p.currChar() === ',') {
					p.increment();
					groups.push(parseGroup(p, [',', ')']));
				} else {
					throw new PatternSyntaxError("Expected ',' or ')'", p.currIndex());
				}
			}
			p.increment();
			return {
				type: ASTNodeType.Alternation,
				pos: startIndex,
				len: p.currIndex() - startIndex,
				patterns: groups,
			};
		default:
			// pattern code
			const patCodes = [];
			while (isPatternCode(p.currChar().toUpperCase())) {
				patCodes.push(p.currChar());
				p.increment();
			}
			if (patCodes.length === 0) throw new PatternSyntaxError('Expected a valid pattern code', p.currIndex());
			return {
				type: ASTNodeType.PatCode,
				pos: startIndex,
				len: p.currIndex() - startIndex,
				code: patCodes.join(''),
			};
	}
}

export function digitsToNum(digits: string[]): number | undefined {
	const num = parseInt(digits.join(''));
	if (isNaN(num)) return undefined;
	return num;
}

export function isDigit(s: unknown) {
	return (
		s === '0' ||
		s === '1' ||
		s === '2' ||
		s === '3' ||
		s === '4' ||
		s === '5' ||
		s === '6' ||
		s === '7' ||
		s === '8' ||
		s === '9'
	);
}

export function isPatternCode(s: string) {
	return s === 'A' || s === 'C' || s === 'E' || s === 'L' || s === 'N' || s === 'P' || s === 'U';
}
