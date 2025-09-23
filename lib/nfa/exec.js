export function execNFA(nfa, str) {
    let q = traverseEpsilonTransitions([nfa]);
    for (const c of str) {
        const newQ = [];
        for (const currNode of q) {
            const child = currNode.children[c];
            if (child !== undefined)
                newQ.push(child);
        }
        q = traverseEpsilonTransitions([...new Set(newQ)]);
    }
    for (const node of q) {
        if (node.isEnd)
            return true;
    }
    return false;
}
// returns the new queue after exploring all available epsilon transitions
function traverseEpsilonTransitions(queue) {
    // simple BFS
    const q = [...queue];
    const visited = new Set(queue);
    while (true) {
        const currNode = q.pop();
        if (!currNode)
            break;
        for (const child of currNode.eChildren) {
            if (visited.has(child))
                continue;
            visited.add(child);
            q.push(child);
        }
    }
    return Array.from(visited);
}
//# sourceMappingURL=exec.js.map