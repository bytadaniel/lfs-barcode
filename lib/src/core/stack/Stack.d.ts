export declare class Stack<T> {
    private readonly stack;
    constructor(elements: T[]);
    get size(): number;
    add(element: T): void;
    get(): T | undefined;
    hasElements(): boolean;
}
