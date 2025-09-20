import TokenType from "./tokentype";

export default interface Token {
	kind: TokenType;
	text: string;
}
