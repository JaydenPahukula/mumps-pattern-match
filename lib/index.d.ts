export declare function match(string: string, pattern: string): Promise<boolean>;

export class PatternSyntaxError extends Error {
	constructor(position: number, message?: string);
}
