export class NFA {
    _num = 0;
    newNode(opts = {}) {
        const node = {
            id: this._num,
            isEnd: false,
            children: {},
            eChildren: [],
            ...opts,
        };
        this._num++;
        return node;
    }
}
//# sourceMappingURL=nfa.js.map