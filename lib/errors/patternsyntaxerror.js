export class PatternSyntaxError extends Error {
    constructor(position, message) {
        super(`PatternSyntaxError: ${message ?? 'Syntax error'} at pos ${position}`);
        this.name = 'PatternSyntaxError';
    }
}
//# sourceMappingURL=patternsyntaxerror.js.map