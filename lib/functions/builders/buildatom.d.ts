import { NFA } from "../../classes/nfa.js";
import { ASTAtomNode } from "../../types/ast.js";
import { NFANode } from "../../types/nfa.js";
export declare function buildAtom(startNode: NFANode, atom: ASTAtomNode, nfa: NFA): NFANode;
