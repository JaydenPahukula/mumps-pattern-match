export class Parser {
	private _input;
	private _index = 0;

	constructor(input: string) {
		this._input = input;
	}

	public get currChar() {
		return this._input.at(this._index) ?? "";
	}

	public get currIndex() {
		return this._index;
	}

	public get done() {
		return this._index >= this._input.length;
	}

	public increment() {
		if (!this.done) {
			this._index++;
		}
	}
}
