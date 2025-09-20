import { match } from "../lib/index.js";

async function runTests(tests: [string, string, boolean][]) {
	console.log("Starting tests...\n");

	let pass = 0;
	let fail = 0;
	let T = Date.now();
	for (const [str, pattern, shouldMatch] of tests) {
		let t = Date.now();
		const result = await match(str, pattern);
		t = Date.now() - t;
		if (result === shouldMatch) {
			pass++;
			console.log(`[\x1b[32mPASS\x1b[0m] \"${str}\"?${pattern} \x1b[90m(${t}ms)\x1b[0m`);
		} else {
			fail++;
			console.log(
				`[\x1b[31mFAIL\x1b[0m] \"${str}\"?${pattern} expected ${shouldMatch}, got ${result} \x1b[90m(${t}ms)\x1b[0m`
			);
		}
	}
	T = Date.now() - T;

	console.log(`\n${pass} passed, ${fail} failed \x1b[90m(${T}ms)\x1b[0m\n`);
}

(async () => await runTests([["a", '1"a"', true]]))();
