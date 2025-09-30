export class PatternSyntaxError extends Error {
    constructor(message, index) {
        super(`${message} (at index ${index})`);
        this.name = 'PatternSyntaxError';
    }
}
//# sourceMappingURL=patternsyntaxerror.js.map