import { NFANode } from './types.js';

export function execNFA(nfa: NFANode, str: string): boolean {
	let q = traverseEpsilonTransitions([nfa]);
	for (const c of str) {
		const newQ: NFANode[] = [];
		for (const currNode of q) {
			let child = currNode.children[c];
			if (child !== undefined) newQ.push(child);
			// check patcode E
			child = currNode.children[''];
			if (child !== undefined) newQ.push(child);
		}
		q = traverseEpsilonTransitions([...new Set(newQ)]);
	}
	for (const node of q) {
		if (node.isEnd) return true;
	}
	return false;
}

// returns the new queue after exploring all available epsilon transitions
function traverseEpsilonTransitions(queue: NFANode[]): NFANode[] {
	// simple BFS
	const q = [...queue];
	const visited = new Set<NFANode>(queue);
	while (true) {
		const currNode = q.pop();
		if (!currNode) break;

		for (const child of currNode.eChildren) {
			if (visited.has(child)) continue;
			visited.add(child);
			q.push(child);
		}
	}

	return Array.from(visited);
}
