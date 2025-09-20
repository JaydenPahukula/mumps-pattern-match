export declare class Parser {
    private _input;
    private _index;
    constructor(input: string);
    get currChar(): string;
    get currIndex(): number;
    get done(): boolean;
    increment(): void;
}
