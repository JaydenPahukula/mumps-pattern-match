export class PatternSyntaxError extends Error {
    constructor(index, message) {
        super(`PatternSyntaxError: ${message ?? "Syntax error"} at index ${index}`);
        this.name = "PatternSyntaxError";
    }
}
//# sourceMappingURL=patternsyntaxerror.js.map