export class NFAHelper {
    _num = 0;
    newNode() {
        const node = {
            id: this._num,
            isEnd: false,
            children: {},
            eChildren: [],
        };
        this._num++;
        return node;
    }
}
//# sourceMappingURL=nfahelper.js.map