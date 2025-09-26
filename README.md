# MUMPS Pattern Matching in TypeScript

A TypeScript implementation of the MUMPS pattern match operator (?), for use in modern JavaScript/TypeScript projects.

## Usage

To match a string against a pattern, simply use the `match` function:

```ts
import { match } from 'mumps-pattern-match';

console.log(match('Hello', '1U.A')); // true
console.log(match('World!', '1U.A')); // false
```

The two match calls in the previous example are equivalent to the M expressions `"Hello"?1U.A` and `"World!"?1U.A`, respectively.

If you plan on reusing a pattern, you can compile it once then match it many times, like this:

```ts
import { Pattern } from 'mumps-pattern-match';

const pat = new Pattern('1U.A');

console.log(pat.match('Hello')); // true
console.log(pat.match('World!')); // false
```

This is more efficient, since compiling the pattern takes more work than executing it. Learn more in the [Performance](#performance) section.

## Supported MUMPS Implementations

There are many different implementations of M, but from what I can tell, there are only two different ways the pattern match operator is defined in modern implementations.

The 1995 ANSI MUMPS standard specifies that an alternation may only contain pattern atoms. Some implementations adhere to this definition (i.e. GT.M, [GPL Mumps](https://www.cs.uni.edu/~okane/index.html)), but some implementations allow complete pattern groups (multiple atoms) in alternations (i.e. IRIS/Cache ObjectScript).

My implementation uses the latter option, but I plan on supporting both. This is the only difference I have found between different implementations of the pattern match operator, but my understanding is limited by the sparse amount of public documentation. If you are knowledgeable about this, please reach out!

Here are some links that were helpful in my research:

- The Annotated M\[UMPS\] Standards (http://71.174.62.16/Demo/AnnoStd)
- The 1995 Standard MUMPS Pocket Guide (https://vistaexpertise.net/bookstore/1995-standard-mumps-pocket-guide/1995-standard-mumps-pocket-guide.pdf)
- GPL Mumps: https://www.cs.uni.edu/~okane/index.html (tysm Kevin O'Kane🙏)
- IRIS ObjectScript Reference: https://docs.intersystems.com/irislatest/csp/docbook/DocBook.UI.Page.cls?KEY=RCOS
- GT.M Programmer's Guide: https://www.mumps.cz/gtm/books/pg/UNIX_manual/index.html

## Algorithm

TODO

## Performance

TODO

## API

TODO
