"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor(elements) {
        this.queue = [];
        elements.forEach(e => this.append(e));
    }
    get length() {
        return this.queue.length;
    }
    append(element) {
        this.queue.push(element);
    }
    next() {
        return this.queue.shift();
    }
    hasNext() {
        return this.queue.length > 0;
    }
}
exports.Queue = Queue;
