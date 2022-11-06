import type { BarcodeInputOptions } from "../options";

export type Encoding = {
    width?: number;
    height?: number;
    barcodePadding?: number;
    text?: string;
    options?: BarcodeInputOptions
    data: string;
}

export abstract class Barcode {
    data: string;
    text: BarcodeInputOptions['text'];
    options: BarcodeInputOptions;

	constructor(data: string, options: BarcodeInputOptions){
		this.data = data;
		this.text = options.text || data;
		this.options = options;
	}

    public abstract valid(): boolean

    public abstract encode(): Encoding
}

export interface BarcodeRef {
    new(data: string, options: BarcodeInputOptions): Barcode
}
