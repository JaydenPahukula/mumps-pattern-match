import { Parser } from "../types/parser";
import { scan } from "./scan";

export function accept_it(p: Parser) {
    p.current_token = scan(p.s);
}
