import { PaperA4Element } from "../core/paper/PaperA4Element";
import { StickerCanvasElement } from "./StickerCanvasElement";
import { Canvas } from "canvas";
export declare class PaperA4ElementManager {
    elements: StickerCanvasElement[];
    papers: PaperA4Element[];
    constructor(elements: StickerCanvasElement[]);
    getPapers<T>(formatCallback: (canvas: Canvas) => T): Promise<Awaited<T>[]>;
    arrangeElementsOnPapers(): void;
}
