import { match } from '../lib/index.js';

const TESTS: [string, string, boolean][] = [
	['', '1E', false],
	['', '0E', true],
	['a', '1E', true],
	['a', '1"a"', true],
	['asdf', '4L', true],
	['asdF', '4L', false],
	['asdF', '4A', true],
	// patcodes
	['123abc', '6N', false],
	['123abc', '6L', false],
	['123abc', '6NL', true],
	['123abc', '6NLNL', true],
	['123abc', '6NLCPA', true],
	['123abc', '6E', true],
	// literals
	['hello', '1"hello"', true],
	['hello', '1"Hello"', false],
	['Hello', '1"hello"', false],
	['hihihihihi', '5"hi"', true],
	// repcounts
	['', '0.E', true],
	['', '1.E', false],
	['0', '.0E', false],
	['0', '.1E', true],
	['0123456789', '.N', true],
	['0123456789', '.N', true],
	['0123456789', '.10N', true],
	['0123456789', '.9N', false],
	['0123456789', '11.N', false],
	['0123456789', '10.N', true],
	['0123456789', '10.10N', true],
	['0123456789', '9.8N', false],
	['0123456789', '5.15N', true],
	['0123456789', '0.100N', true],
	// alternation
	['x', '1(1"x")', true],
	['x', '1(2"x")', false],
	['x', '2(1"x")', false],
	['x', '5(1"x",0"x")', true],
	['x', '1(1"x",1"y")', true],
	['y', '1(1"x",1"y")', true],
	['xxxyyy', '6(1"x",1"y")', true],
	['xxxyyy', '6(1"x",1"y",1"z")', true],
	['xxxyyy', '2(3"x",3"y")', true],
	['xxxyyy', '3(2"x",2"y")', false],
	['xxyyzz', '1(3(2(1"x",1"y",1"z")))', true],
];

console.log('Starting tests...\n');

let numPass = 0;
let numFail = 0;
let T = Date.now();
for (const [str, pattern, shouldMatch] of TESTS) {
	let t = Date.now();
	const result = match(str, pattern);
	t = Date.now() - t;
	if (result === shouldMatch) {
		numPass++;
		console.log(`[\x1b[32mPASS\x1b[0m] \"${str}\"?${pattern} -> ${result} \x1b[90m(${t}ms)\x1b[0m`);
	} else {
		numFail++;
		console.log(
			`[\x1b[31mFAIL\x1b[0m] \"${str}\"?${pattern} -> ${result} (expected ${shouldMatch}) \x1b[90m(${t}ms)\x1b[0m`,
		);
	}
}
T = Date.now() - T;

console.log(`\n${numPass} tests passed, ${numFail} tests failed \x1b[90m(${T}ms)\x1b[0m\n`);
