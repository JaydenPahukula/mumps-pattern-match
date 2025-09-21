import { AST, ASTAtomNode, ASTNodeType } from "../ast/asttypes.js";
import { NFA, NFANode } from "./nfatypes.js";
import { NFAHelper } from "./nfahelper.js";

export function generateNFA(tree: AST): NFA {
	const nfa = new NFAHelper();
	const startNode = nfa.newNode();
	let currNode = startNode;
	for (const atom of tree) {
		currNode = buildAtom(currNode, atom, nfa);
	}
	currNode.isEnd = true;
	return startNode;
}

function buildAtom(startNode: NFANode, atom: ASTAtomNode, nfa: NFAHelper): NFANode {
	// define fn to create new node based on pattern element
	let attachNewNode: ((node: NFANode) => NFANode) | undefined = undefined;
	if (atom.element.type === ASTNodeType.Literal) {
		const s = atom.element.string;
		attachNewNode = (node) => {
			const newNode = nfa.newNode();
			node.children[s] = newNode;
			return newNode;
		};
	} else if (atom.element.type === ASTNodeType.PatCode) {
		const code = atom.element.code;
		attachNewNode = (node) => {
			const newNode = nfa.newNode();
			node.children[getMatchString(code)] = newNode;
			return newNode;
		};
	} else if (atom.element.type === ASTNodeType.Alternation) {
		const atoms = atom.element.atoms;
		attachNewNode = (node) => {
			const endNode = nfa.newNode();
			atoms.forEach((atom) => {
				let newNode = nfa.newNode();
				node.eChildren.push(newNode);
				newNode = buildAtom(newNode, atom, nfa);
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
	const endNode = nfa.newNode();
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
	if (codes.includes("E")) return ""; // "" means everything
	let s = new Set<string>();
	for (const code of codes) {
		if (code === "A") s = union(s, patCodeASet);
		if (code === "U") s = union(s, patCodeUSet);
		if (code === "L") s = union(s, patCodeLSet);
		if (code === "C") s = union(s, patCodeCSet);
		if (code === "N") s = union(s, patCodeNSet);
		if (code === "P") s = union(s, patCodePSet);
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
