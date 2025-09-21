export declare class ParseHelper {
    private _input;
    private _index;
    constructor(input: string);
    currChar(): string;
    currIndex(): number;
    isDone(): boolean;
    increment(): void;
}
