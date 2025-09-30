import { new_parser } from "./new_parser";
import { new_scanner } from "./new_scanner";
import { parse } from "./parse";
import { perl_pm } from "./perl_pm";

export function pm(string: string, pattern: string): boolean {
    const p = new_parser(new_scanner(pattern));
    const pcre_pattern = parse(p);

    return perl_pm(string, pattern);
}
