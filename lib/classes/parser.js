export class Parser {
    _input;
    _index = 0;
    constructor(input) {
        this._input = input;
    }
    get currChar() {
        return this._input.at(this._index) ?? "";
    }
    get currIndex() {
        return this._index;
    }
    get done() {
        return this._index >= this._input.length;
    }
    increment() {
        if (!this.done) {
            this._index++;
        }
    }
}
//# sourceMappingURL=parser.js.map