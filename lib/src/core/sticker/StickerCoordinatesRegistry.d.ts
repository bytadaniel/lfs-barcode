import { ElementAliases } from "../../interface";
export interface NeccessaryExecutions {
    barcode: boolean;
}
export declare type ImageCoordinates = Partial<Record<ElementAliases, {
    x: number;
    y: number;
    w: number;
    h: number;
}>>;
export declare type TextLineCoordinates = {
    value: string;
    x: number;
    y: number;
};
export declare type Coordinates = {
    images: ImageCoordinates;
    lines: TextLineCoordinates[];
};
export declare class StickerCoordinatesRegistry {
    neccessaryExecutions: NeccessaryExecutions;
    firstWidth: number;
    firstHeight: number;
    updatedHeight: number | null;
    updatedWidth: number | null;
    coordinates: Coordinates;
    canvasCtx: CanvasRenderingContext2D;
    fontSize: number;
    constructor(width: number, height: number, fontSize: number);
    private registerImageCoordinates;
    private registerLineCoordinates;
    getWidth(): number;
    getHeight(): number;
    setHeight(value: number): void;
    barcode(): void;
    eac(): void;
    attributes(record: Record<string, string>): void;
    validate(): void;
}
