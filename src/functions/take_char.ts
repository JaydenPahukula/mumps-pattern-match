import Scanner from "../types/scanner";

export default function take_char(s: Scanner) {
	s.current_token.text += s.current_char;
	s.increment();
}
