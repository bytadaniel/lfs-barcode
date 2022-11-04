"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperA4CanvasElement = void 0;
const canvas_1 = require("canvas");
const common_1 = require("../../utils/common");
class PaperA4CanvasElement {
    constructor(paper) {
        this.paper = paper;
    }
    async getCanvas() {
        const paperElements = this.paper.getUsedElementsWithState();
        const canvas = (0, common_1.createCanvasWrapper)((0, common_1.mmToPx)(210), (0, common_1.mmToPx)(297));
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.stroke();
        for (const paperElement of paperElements) {
            const image = await (0, canvas_1.loadImage)(paperElement.buffer);
            ctx.drawImage(image, paperElement.cursorState.width, paperElement.cursorState.height);
        }
        return canvas;
    }
}
exports.PaperA4CanvasElement = PaperA4CanvasElement;
