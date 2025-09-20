export class PatternSyntaxError extends Error {
	constructor(index: number, message?: string) {
		super(`PatternSyntaxError: ${message ?? "Syntax error"} at index ${index}`);
		this.name = "PatternSyntaxError";
	}
}
