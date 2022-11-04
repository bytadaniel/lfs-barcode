import { BarcodeType } from '../interface';
export declare function createSvgFromBarcode(barcode: string, type: BarcodeType): string;
export declare function createBarcodeImage(type: BarcodeType, data: string, width: number, height: number): Promise<any>;
