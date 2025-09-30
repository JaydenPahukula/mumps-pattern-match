import { parse } from './parse.js';

export function pm(string: string, pattern: string): boolean {
	const regexp_pattern = parse(pattern);
	console.log(regexp_pattern);

	return new RegExp(regexp_pattern, 'su').test(string);
}
