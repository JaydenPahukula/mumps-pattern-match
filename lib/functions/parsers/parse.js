import { parseAtom } from "./parseatom.js";
export function parse(p) {
    const atoms = [];
    while (!p.done) {
        atoms.push(parseAtom(p));
    }
    return atoms;
}
//# sourceMappingURL=parse.js.map