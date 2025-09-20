import Scanner from "../types/scanner";
import Token from "../types/token";
import scan_token from "./scan_token";

export default function scan(s: Scanner): Token {
	s.current_token.text = "";
	s.current_token.kind = scan_token(s);
	return s.current_token;
}
