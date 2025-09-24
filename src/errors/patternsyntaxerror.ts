export class PatternSyntaxError extends Error {
	constructor(message: string, index: number) {
		super(`${message} (at index ${index})`);
		this.name = "PatternSyntaxError";
	}
}
