"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperA4ElementManager = void 0;
const PaperA4Element_1 = require("../core/paper/PaperA4Element");
const PaperA4CanvasElement_1 = require("../core/paper/PaperA4CanvasElement");
class PaperA4ElementManager {
    constructor(elements) {
        this.elements = elements;
        this.papers = [];
    }
    async getPapers(formatCallback) {
        const promises = this.papers.map(async (paper) => {
            const paperCanvas = await new PaperA4CanvasElement_1.PaperA4CanvasElement(paper).getCanvas();
            const format = formatCallback(paperCanvas);
            return format;
        });
        return Promise.all(promises);
    }
    arrangeElementsOnPapers() {
        let elements = [...this.elements];
        do {
            const paper = new PaperA4Element_1.PaperA4Element();
            paper.arrangeElementsOnPaper(elements);
            this.papers.push(paper);
            elements = paper.getUnusedElements(); // переприсваиваем элементы для условия выхода
        } while (elements.length > 0);
    }
}
exports.PaperA4ElementManager = PaperA4ElementManager;
