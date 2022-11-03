import { BarcodeType } from "../interface";
import { StickerCoordinatesRegistry } from "../core/sticker/StickerCoordinatesRegistry";
interface StickerParams {
    width: number;
    height: number;
    fontSize: number;
}
export declare class StickerCanvasElement {
    registry: StickerCoordinatesRegistry;
    cache: {
        images: {
            barcode?: any;
            eac?: any;
        };
        textLines: string[];
        flags: {
            stroke?: boolean;
        };
    };
    constructor(params: StickerParams);
    setBarcode(barcode: string, type: BarcodeType): Promise<void>;
    setEAC(): Promise<void>;
    setStroke(): Promise<void>;
    setAttributedText(record: Record<string, string>): Promise<void>;
    getCanvas(): import("canvas").Canvas;
}
export {};
