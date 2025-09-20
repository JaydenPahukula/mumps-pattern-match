export declare function match(string: string, pattern: string): boolean;

export class PatternSyntaxError extends Error {
	constructor(position: number, message?: string);
}
