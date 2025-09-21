import { NFA } from "../../classes/nfa.js";
import { buildAtom } from "./buildatom.js";
export function build(tree) {
    const nfa = new NFA();
    const startNode = nfa.newNode();
    let currNode = startNode;
    for (const atom of tree) {
        currNode = buildAtom(currNode, atom, nfa);
    }
    currNode.isEnd = true;
    return startNode;
}
//# sourceMappingURL=build.js.map