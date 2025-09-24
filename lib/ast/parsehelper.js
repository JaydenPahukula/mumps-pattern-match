export class ParseHelper {
    _input;
    _index = 0;
    constructor(input) {
        this._input = input;
    }
    currChar() {
        return this._input.at(this._index) ?? '';
    }
    currIndex() {
        return this._index;
    }
    isDone() {
        return this._index >= this._input.length;
    }
    increment() {
        if (!this.isDone()) {
            this._index++;
        }
    }
}
//# sourceMappingURL=parsehelper.js.map