import Parser from "../types/parser";
import scan from "./scan";

export default function accept_it(p: Parser) {
	p.current_token = scan(p.s);
}
