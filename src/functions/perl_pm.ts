import { pcre } from "../pcre/pcre";

export default async function perl_pm(string: string, pattern: string): Promise<boolean> {
	await pcre.init();
	const regex = pcre.compile(pattern);
	const matches = regex.exec(string, 0);
	return matches?.length === 1 && matches[0].index === 0 && matches[0].length === string.length;
}
