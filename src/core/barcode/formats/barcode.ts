import type { BarcodeInputOptions } from "../options";

export type Encoded = {
    width?: number;
    height?: number;
    barcodePadding?: number;
    text: string | undefined;
    data: string;
    options?: BarcodeInputOptions
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

    public abstract encode(): Encoded
}

export interface BarcodeRef {
    new(data: string, options: BarcodeInputOptions): Barcode
}
