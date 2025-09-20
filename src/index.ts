import { compile } from "./functions/compile.js";
import { exec } from "./functions/exec.js";

function match(str: string, pattern: string): boolean {
	return exec(str, compile(pattern));
}

export { compile, exec, match };
