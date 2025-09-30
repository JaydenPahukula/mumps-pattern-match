import { ispunct } from './utils.js';

export function leaning_toothpickize(unmangled: string): string {
	let result: string[] = [];
	for (const c of unmangled) {
		if (c === '"') result.push('"');
		else {
			if (ispunct(c)) result.push('\\');
			result.push(c);
		}
	}
	return result.join('');
}
