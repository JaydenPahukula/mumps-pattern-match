import { compile } from "./functions/compile.js";
import { exec } from "./functions/exec.js";
declare function match(str: string, pattern: string): boolean;
export { compile, exec, match };
