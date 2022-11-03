import { PaperA4Element } from "./PaperA4Element";
export declare class PaperA4CanvasElement {
    paper: PaperA4Element;
    constructor(paper: PaperA4Element);
    getCanvas(): Promise<import("canvas").Canvas>;
}
