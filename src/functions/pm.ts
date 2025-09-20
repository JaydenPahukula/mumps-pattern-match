// int pm (const unsigned char string[], const unsigned char pattern[],struct MSV * svPtr) {
//     struct parser p = new_parser (new_scanner ((char*) pattern));
//     char pcre_pattern[STR_MAX];

import new_parser from "./new_parser";
import new_scanner from "./new_scanner";
import parse from "./parse";
import perl_pm from "./perl_pm";

//     parse (&p, pcre_pattern);
//     if (PM_DEBUG) printf ("%s\n%s\n", pattern, pcre_pattern);
//     return perl_pm ((char*) string, pcre_pattern, 0,svPtr);
// }

export default async function pm(string: string, pattern: string): Promise<boolean> {
	const p = new_parser(new_scanner(pattern));
	const pcre_pattern = parse(p);

	return perl_pm(string, pcre_pattern);
}
