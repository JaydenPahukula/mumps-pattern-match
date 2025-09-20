/*
 * pattern ::= {pattern_atom}
 * pattern_atom ::= count pattern_element
 * count ::= int | '.' | '.' int | int '.' | int '.' int
 * pattern_element ::= pattern_code {pattern_code} | string | alternation
 * pattern_code ::= 'A' | 'C' | 'E' | 'L' | 'N' | 'P' | 'U'
 * alternation ::= '(' pattern_atom {',' pattern_atom}
 */
export {};
//# sourceMappingURL=ast.js.map