import { NFANode } from "../types/nfa.js";

export class NFA {
	private _num = 0;

	public newNode(opts: Partial<Omit<NFANode, "id">> = {}): NFANode {
		const node = {
			id: this._num,
			isEnd: false,
			children: {},
			eChildren: [],
			...opts,
		};
		this._num++;
		return node;
	}
}
