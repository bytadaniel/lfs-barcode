import { createCanvas } from "canvas";
import { InvalidInputException } from "./exceptions";
import ErrorHandler from "./exceptions/ErrorHandler";
import type { BarcodeRef, Encoded } from "./formats/barcode";
import CODE128AUTO from "./formats/code128/CODE128_AUTO";
import { linearizeEncodings } from "./helpers/linearizeEncodings";
import { merge } from "./helpers/merge";
import { BarcodeInputOptions, defaultOptions } from "./options";
import CanvasRenderer from "./renderers/CanvasRenderer";

export class API {
    _options: BarcodeInputOptions;
    _encodings: Encoded[]

    constructor () {
        this._options = defaultOptions
        this._encodings = []
    }

    public options (options: BarcodeInputOptions) {
        this._options = merge(this._options, options);
	    return this;
    }

    public getRenderer(): CanvasRenderer {
        return new ErrorHandler(this).wrapBarcodeCall<CanvasRenderer>(
            (text: string, options: BarcodeInputOptions) => {

				const newOptions: BarcodeInputOptions = merge(this._options, options);
				const encoded = this.encode(text, this.getEncoder(), newOptions);
				this._encodings.push(...encoded);

                return new CanvasRenderer(createCanvas(10, 10), this._encodings, newOptions)
            }
        ) as CanvasRenderer
    }

    private getEncoder () {
        switch (this._options.format) {
            case 'CODE128':
                return CODE128AUTO
            default:
                return CODE128AUTO
        }
    }

    public encode (text: string, Encoder: BarcodeRef, options: BarcodeInputOptions) {
        // Ensure that text is a string
        text = "" + text;

        const encoder = new Encoder(text, options);

        // If the input is not valid for the encoder, throw error.
        // If the valid callback option is set, call it instead of throwing error
        if(!encoder.valid()){
            throw new InvalidInputException(encoder.constructor.name, text);
        }

        // Make a request for the binary data (and other infromation) that should be rendered
        // Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
        // Convert to [1-1, 1-2, 2, 3-1, 3-2]
        const encoded = linearizeEncodings(encoder.encode());

        // Merge
        for( let i = 0; i < encoded.length; i++){
            encoded[i].options = merge(options, encoded[i]?.options);
        }

        return encoded;
    }
}
