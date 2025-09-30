export function toupper(s: string): string {
	return s.toUpperCase();
}

export function isdigit(c: string): boolean {
	return (
		c === '0' ||
		c === '1' ||
		c === '2' ||
		c === '3' ||
		c === '4' ||
		c === '5' ||
		c === '6' ||
		c === '7' ||
		c === '8' ||
		c === '9'
	);
}

export function ispunct(c: string): boolean {
	return /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(c);
}
