import { parseCount } from "./parsecount.js";
import { parseElement } from "./parseelement.js";
export function parseAtom(p) {
    const startIndex = p.currIndex;
    const count = parseCount(p);
    const element = parseElement(p);
    return {
        type: 0 /* ASTNodeType.Atom */,
        pos: startIndex,
        len: p.currIndex - startIndex,
        count: count,
        element: element,
    };
}
//# sourceMappingURL=parseatom.js.map