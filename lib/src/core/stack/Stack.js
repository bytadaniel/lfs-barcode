"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor(elements) {
        this.stack = [];
        elements.forEach(e => this.add(e));
    }
    get size() {
        return this.stack.length;
    }
    add(element) {
        this.stack.push(element);
    }
    get() {
        return this.stack.pop();
    }
    hasElements() {
        return this.size > 0;
    }
}
exports.Stack = Stack;
