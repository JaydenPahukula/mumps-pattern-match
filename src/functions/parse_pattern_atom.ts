import { Parser } from "../types/parser";
import { parse_count } from "./parse_count";
import { parse_pattern_element } from "./parse_pattern_element";

export function parse_pattern_atom(p: Parser): string {
    const count = parse_count(p);
    const element = parse_pattern_element(p);
    return element + count;
}
