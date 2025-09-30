import { Scanner } from "./scanner";
import { Token } from "./token";

export interface Parser {
    current_token: Token;
    s: Scanner;
}
