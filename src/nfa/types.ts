export type NFA = NFANode;

export interface NFANode {
	id: number;
	isEnd: boolean;
	children: {
		[key: string]: NFANode;
	};
	// epsilon transitions
	eChildren: NFANode[];
}
