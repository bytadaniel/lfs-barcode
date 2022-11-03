export declare class Queue<T> {
    private readonly queue;
    constructor(elements: T[]);
    get length(): number;
    append(element: T): void;
    next(): T | undefined;
    hasNext(): boolean;
}
