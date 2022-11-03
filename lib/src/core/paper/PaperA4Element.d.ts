/// <reference types="node" />
import { StickerCanvasElement } from "../../api/StickerCanvasElement";
interface Dimensions {
    width: number;
    height: number;
}
interface ElementWithCursorState {
    cursorState: Dimensions;
    element: StickerCanvasElement;
}
interface CanvasWithCursorState {
    cursorState: Dimensions;
    buffer: Buffer;
}
export declare class PaperA4Element {
    millimeters: Dimensions;
    pixels: Dimensions;
    cursor: Dimensions;
    unusedElements: StickerCanvasElement[];
    matrix: ElementWithCursorState[][];
    constructor();
    private organizeVertical;
    arrangeElementsOnPaper(elements: StickerCanvasElement[]): void;
    getUnusedElements(): StickerCanvasElement[];
    getUsedElementsWithState(): CanvasWithCursorState[];
}
export {};
