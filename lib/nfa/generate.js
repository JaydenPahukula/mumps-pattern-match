import { NFAHelper } from "./helper.js";
export function generateNFA(tree) {
    const nfa = new NFAHelper();
    const startNode = nfa.newNode();
    const endNode = buildPatternGroup(startNode, tree, nfa);
    endNode.isEnd = true;
    return startNode;
}
function buildPatternGroup(startNode, patternGroup, nfa) {
    for (const atom of patternGroup.atoms) {
        startNode = buildAtom(startNode, atom, nfa);
    }
    return startNode;
}
function buildAtom(startNode, atom, nfa) {
    // define fn to create new node based on pattern element
    let attachNewNode = undefined;
    if (atom.element.type === "strlit" /* ASTNodeType.Literal */) {
        const strLit = atom.element.string;
        attachNewNode = (node) => {
            // path graph structure
            for (const char of strLit) {
                const newNode = nfa.newNode();
                node.children[char] = newNode;
                node = newNode;
            }
            return node;
        };
    }
    else if (atom.element.type === "patcode" /* ASTNodeType.PatCode */) {
        const code = atom.element.code;
        attachNewNode = (node) => {
            const newNode = nfa.newNode();
            // multiple edges to newNode
            for (const char of getMatchString(code)) {
                node.children[char] = newNode;
            }
            return newNode;
        };
    }
    else if (atom.element.type === "alternation" /* ASTNodeType.Alternation */) {
        const patterns = atom.element.patterns;
        attachNewNode = (node) => {
            const endNode = nfa.newNode();
            patterns.forEach((patternGroup) => {
                let newNode = nfa.newNode();
                node.eChildren.push(newNode);
                newNode = buildPatternGroup(newNode, patternGroup, nfa);
                newNode.eChildren.push(endNode);
            });
            return endNode;
        };
    }
    else {
    } // something went wrong
    if (attachNewNode === undefined)
        throw new Error("This shouldn't happen");
    // deal with count
    let [lowerBound, upperBound] = atom.count.count;
    lowerBound ??= 0;
    let currNode = startNode;
    for (let i = 0; i < lowerBound; i++) {
        currNode = attachNewNode(currNode);
    }
    const endNode = nfa.newNode();
    if (upperBound === undefined) {
        const newNode = attachNewNode(currNode);
        newNode.eChildren.push(currNode);
        currNode.eChildren.push(endNode);
    }
    else {
        for (let i = lowerBound; i < upperBound; i++) {
            currNode.eChildren.push(endNode);
            currNode = attachNewNode(currNode);
        }
        currNode.eChildren.push(endNode);
    }
    return endNode;
}
/** Gets a string with all chars that match any of the pattern codes */
function getMatchString(codes) {
    codes = codes.toUpperCase();
    if (codes.includes("E"))
        return ""; // "" means everything
    let s = new Set();
    for (const code of codes) {
        if (code === "A")
            s = union(s, patCodeASet);
        if (code === "U")
            s = union(s, patCodeUSet);
        if (code === "L")
            s = union(s, patCodeLSet);
        if (code === "C")
            s = union(s, patCodeCSet);
        if (code === "N")
            s = union(s, patCodeNSet);
        if (code === "P")
            s = union(s, patCodePSet);
    }
    return Array.from(s).join("");
}
// Sets of chars that match the corresponding pattern code
const patCodeCSet = union(asciiRange(0, 31), asciiRange(127, 127));
const patCodeLSet = asciiRange(97, 122);
const patCodeUSet = asciiRange(65, 90);
const patCodeASet = union(patCodeLSet, patCodeUSet);
const patCodeNSet = asciiRange(48, 57);
const patCodePSet = union(asciiRange(32, 47), asciiRange(58, 64), asciiRange(91, 96), asciiRange(123, 126));
/** Creates a set of all characters with ascii values in [`lo`, `hi`] */
function asciiRange(lo, hi) {
    return new Set(String.fromCharCode(...[...Array(hi - lo + 1).keys()].map((i) => i + lo)));
}
/** Set union */
function union(s, ...other) {
    const result = new Set(s);
    other.forEach((s1) => s1.forEach((val) => result.add(val)));
    return result;
}
//# sourceMappingURL=generate.js.map