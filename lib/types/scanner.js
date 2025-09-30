export class Scanner {
    input;
    current_index = 0;
    current_char;
    current_token = {
        kind: 8 /* TokenType.Error */,
        text: '',
    };
    constructor(input) {
        this.input = input;
        this.current_char = input[0] ?? '\0';
    }
    increment() {
        this.current_index += 1;
        this.current_char = this.input[this.current_index] ?? '\0';
    }
}
//# sourceMappingURL=scanner.js.map