import { NFANode } from "../types/nfa.js";
export declare class NFA {
    private _num;
    newNode(opts?: Partial<Omit<NFANode, "id">>): NFANode;
}
