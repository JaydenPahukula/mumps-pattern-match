import { AST, ASTPatAtomNode, ASTNodeType, ASTPatGroupNode } from '../ast/types.js';
import { NFA, NFANode } from './types.js';

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
		if (code.includes('E')) {
			attachNewNode = (node) => {
				return (node.children[''] = mkNode()); // special case
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
	let resultSet = new Set<string>();
	for (const code of codes) {
		const matchStr = PATCODES[code];
		if (matchStr) {
			for (const c of matchStr) resultSet.add(c);
		}
	}
	return Array.from(resultSet).join('');
}

const PATCODES: { [key: string]: string | null } = {
	A: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	C: '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0A\x0B\x0C\x0D\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F',
	E: null, // special case, matches everything
	L: 'abcdefghijklmnopqrstuvwxyz',
	N: '0123456789',
	P: ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
	U: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};
