export interface NFANode {
    id: number;
    isEnd: boolean;
    children: {
        [key: string]: NFANode;
    };
    eChildren: NFANode[];
}
