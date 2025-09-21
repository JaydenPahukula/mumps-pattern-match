import { Pattern } from "./pattern.js";

/** Tests if `str` matches `pattern`. */
export function match(str: string, pattern: string): boolean {
	return new Pattern(pattern).exec(str);
}
