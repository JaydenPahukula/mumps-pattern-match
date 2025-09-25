export declare class ParseHelper {
    private _input;
    private _index;
    constructor(input: string);
    get str(): string;
    currChar(): string;
    currIndex(): number;
    isDone(): boolean;
    increment(): void;
}
