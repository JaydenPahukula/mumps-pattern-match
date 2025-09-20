import Token from "./token";
import TokenType from "./tokentype";

export default class Scanner {
	public current_index = 0;

	public current_char: string;
	public current_token: Token = {
		kind: TokenType.Error,
		text: "",
	};

	constructor(public input: string) {
		this.current_char = input[0] ?? "\0";
	}

	public increment() {
		this.current_index += 1;
		this.current_char = this.input[this.current_index] ?? "\0";
	}
}
