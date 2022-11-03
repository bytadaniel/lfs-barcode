"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperA4Element = void 0;
const Queue_1 = require("../queue/Queue");
const common_1 = require("../utils/common");
class PaperA4Element {
    constructor() {
        this.unusedElements = [];
        this.matrix = [];
        this.millimeters = {
            width: 210,
            height: 297
        };
        this.pixels = {
            width: (0, common_1.mmToPx)(this.millimeters.width),
            height: (0, common_1.mmToPx)(this.millimeters.height)
        };
        this.cursor = {
            width: 0,
            height: 0
        };
    }
    organizeVertical(elements) {
        const queue = new Queue_1.Queue(elements);
        let canUseElement = true;
        while (queue.hasNext() && canUseElement) {
            const element = queue.next();
            const inBoundHeight = this.cursor.height + element.registry.getHeight() <= this.pixels.height;
            const inBoundWidth = this.cursor.width + element.registry.getWidth() <= this.pixels.width;
            // no rows
            if (!this.matrix.length) {
                this.matrix.push([]);
            }
            if (inBoundHeight && inBoundWidth) {
                const elementWithCursor = {
                    cursorState: { ...this.cursor },
                    element
                };
                // пуш в последнюю колонку последней строки
                this.matrix[this.matrix.length - 1].push(elementWithCursor);
                // сдвигаем курсор на следующую колонку этой же строки
                this.cursor.width += element.registry.getWidth();
                continue;
            }
            // Когда курсор дошел до конца строки
            if (inBoundHeight && !inBoundWidth) {
                // новая строка
                this.matrix.push([]);
                // сдвигаем курсор влево 
                this.cursor.width = 0;
                // и в конец высоты первого элемента предыдущей строки
                let rowHeight = this.matrix.map(rows => rows[0]).filter(c => c).reduce((sum, el) => sum += el.element.registry.getHeight(), 0);
                this.cursor.height = rowHeight;
                queue.append(element);
                continue;
            }
            // невозможно добавить элемент куда-либо - выход
            if (!inBoundHeight || !inBoundWidth) {
                canUseElement = false;
                queue.append(element); // return to queue
                break;
            }
            // в случае непредусмотренных ситуаций
            canUseElement = false;
            queue.append(element); // return to queue
            break;
        }
        // высвобождаем очередь
        while (queue.hasNext()) {
            const element = queue.next();
            this.unusedElements.push(element);
        }
    }
    arrangeElementsOnPaper(elements) {
        this.organizeVertical(elements);
    }
    getUnusedElements() {
        return this.unusedElements;
    }
    getUsedElementsWithState() {
        return this.matrix.flatMap(row => {
            return row.map(col => {
                return {
                    cursorState: col.cursorState,
                    buffer: col.element.getCanvas().toBuffer()
                };
            });
        });
    }
}
exports.PaperA4Element = PaperA4Element;
