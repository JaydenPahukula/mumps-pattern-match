import { NFA } from "../../classes/nfa.js";
import { buildAtom } from "./buildatom.js";
import { AST } from "../../types/ast.js";
import { NFANode } from "../../types/nfa.js";

export function build(tree: AST): NFANode {
	const nfa = new NFA();
	const startNode = nfa.newNode();
	let currNode = startNode;
	for (const atom of tree) {
		currNode = buildAtom(currNode, atom, nfa);
	}
	currNode.isEnd = true;
	return startNode;
}
