export function new_parser(s) {
    return {
        current_token: {
            kind: 8 /* TokenType.Error */,
            text: '',
        },
        s: s,
    };
}
//# sourceMappingURL=new_parser.js.map