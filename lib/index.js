import { compile } from "./functions/compile.js";
import { exec } from "./functions/exec.js";
function match(str, pattern) {
    return exec(str, compile(pattern));
}
export { compile, exec, match };
//# sourceMappingURL=index.js.map