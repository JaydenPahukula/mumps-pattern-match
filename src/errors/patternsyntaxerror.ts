export default class PatternSyntaxError extends Error {
	constructor(position: number, message?: string) {
		super(`PatternSyntaxError: ${message ?? "Syntax error"} at pos ${position}`);
		this.name = "PatternSyntaxError";
	}
}
