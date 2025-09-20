import Scanner from "./scanner";
import Token from "./token";

export default interface Parser {
	current_token: Token;
	s: Scanner;
}
