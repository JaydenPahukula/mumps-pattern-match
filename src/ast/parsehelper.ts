export class ParseHelper {
	private _input;
	private _index = 0;

	constructor(input: string) {
		this._input = input;
	}

	public currChar() {
		return this._input.at(this._index) ?? "";
	}

	public currIndex() {
		return this._index;
	}

	public isDone() {
		return this._index >= this._input.length;
	}

	public increment() {
		if (!this.isDone()) {
			this._index++;
		}
	}
}
