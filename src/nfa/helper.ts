import { NFANode } from "./types.js";

export class NFAHelper {
	private _num = 0;

	public newNode(): NFANode {
		const node = {
			id: this._num,
			isEnd: false,
			children: {},
			eChildren: [],
		};
		this._num++;
		return node;
	}
}
