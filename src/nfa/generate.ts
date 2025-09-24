import { AST, ASTPatAtomNode, ASTNodeType, ASTPatGroupNode } from "../ast/types.js";
import { NFA, NFANode } from "./types.js";

export function generateNFA(tree: AST): NFA {
	let nodeIndex = 0;
	const mkNode = () => ({
		id: nodeIndex++,
		isEnd: false,
		children: {},
		eChildren: [],
	});
	const startNode = mkNode();
	const endNode = buildPatternGroup(startNode, tree, mkNode);
	endNode.isEnd = true;
	return startNode;
}

function buildPatternGroup(startNode: NFANode, patternGroup: ASTPatGroupNode, mkNode: () => NFANode): NFANode {
	for (const atom of patternGroup.atoms) {
		startNode = buildAtom(startNode, atom, mkNode);
	}
	return startNode;
}

function buildAtom(startNode: NFANode, atom: ASTPatAtomNode, mkNode: () => NFANode): NFANode {
	// define fn to create new node based on pattern element
	let attachNewNode: ((node: NFANode) => NFANode) | undefined = undefined;
	if (atom.element.type === ASTNodeType.StrLit) {
		const strLit = atom.element.string;
		attachNewNode = (node) => {
			// path graph structure
			for (const char of strLit) {
				const newNode = mkNode();
				node.children[char] = newNode;
				node = newNode;
			}
			return node;
		};
	} else if (atom.element.type === ASTNodeType.PatCode) {
		const code = atom.element.code;
		if (code.includes("E")) {
			attachNewNode = (node) => {
				return (node.children[""] = mkNode()); // special case
			};
		} else {
			const match = getMatchString(code);
			attachNewNode = (node) => {
				const newNode = mkNode();
				// multiple edges to newNode
				for (const char of match) node.children[char] = newNode;
				return newNode;
			};
		}
	} else if (atom.element.type === ASTNodeType.Alternation) {
		const patterns = atom.element.patterns;
		attachNewNode = (node) => {
			const endNode = mkNode();
			patterns.forEach((patternGroup) => {
				let newNode = mkNode();
				node.eChildren.push(newNode);
				newNode = buildPatternGroup(newNode, patternGroup, mkNode);
				newNode.eChildren.push(endNode);
			});
			return endNode;
		};
	} else {
	} // something went wrong
	if (attachNewNode === undefined) throw new Error("This shouldn't happen");

	// deal with count
	let [lowerBound, upperBound] = atom.count.count;
	lowerBound ??= 0;
	let currNode = startNode;
	for (let i = 0; i < lowerBound; i++) {
		currNode = attachNewNode(currNode);
	}
	const endNode = mkNode();
	if (upperBound === undefined) {
		const newNode = attachNewNode(currNode);
		newNode.eChildren.push(currNode);
		currNode.eChildren.push(endNode);
	} else {
		for (let i = lowerBound; i < upperBound; i++) {
			currNode.eChildren.push(endNode);
			currNode = attachNewNode(currNode);
		}
		currNode.eChildren.push(endNode);
	}

	return endNode;
}

/** Gets a string with all chars that match any of the pattern codes */
function getMatchString(codes: string): string {
	codes = codes.toUpperCase();
	let s = new Set<string>();
	for (const code of codes) {
		if (code === "A") s = union(s, patCodeASet);
		if (code === "U") s = union(s, patCodeUSet);
		if (code === "L") s = union(s, patCodeLSet);
		if (code === "C") s = union(s, patCodeCSet);
		if (code === "N") s = union(s, patCodeNSet);
		if (code === "P") s = union(s, patCodePSet);
		else {
			// bad
		}
	}
	return Array.from(s).join("");
}

// Sets of chars that match the corresponding pattern code
const patCodeCSet = union(asciiRange(0, 31), asciiRange(127, 127));
const patCodeLSet = asciiRange(97, 122);
const patCodeUSet = asciiRange(65, 90);
const patCodeASet = union(patCodeLSet, patCodeUSet);
const patCodeNSet = asciiRange(48, 57);
const patCodePSet = union(asciiRange(32, 47), asciiRange(58, 64), asciiRange(91, 96), asciiRange(123, 126));

/** Creates a set of all characters with ascii values in [`lo`, `hi`] */
function asciiRange(lo: number, hi: number): Set<string> {
	return new Set<string>(String.fromCharCode(...[...Array(hi - lo + 1).keys()].map((i) => i + lo)));
}

/** Set union */
function union<T>(s: Set<T>, ...other: Set<T>[]): Set<T> {
	const result = new Set<T>(s);
	other.forEach((s1) => s1.forEach((val) => result.add(val)));
	return result;
}
