import { InvalidInputException } from "./exceptions";
import type { BarcodeRef, Encoding } from "./formats/barcode";
import CODE128AUTO from "./formats/code128/CODE128_AUTO";
import { linearizeEncodings } from "./helpers/linearizeEncodings";
import { merge } from "./helpers/merge";
import type { BarcodeInputOptions } from "./options";
import { CanvasBarcodeRenderer } from "./renderers/CanvasBarcodeRenderer";

export class API {
    _encodings: Encoding[]

    constructor () {
        this._encodings = []
    }

    public getRenderer(options: BarcodeInputOptions)  {
        const encoded = this.encode(options.text, this.getEncoder(options.format), options);
        this._encodings.push(...encoded);
        return new CanvasBarcodeRenderer(this._encodings, options)
    }

    private getEncoder (format: BarcodeInputOptions['format']) {
        switch (format) {
            case 'CODE128':
                return CODE128AUTO
            default:
                return CODE128AUTO
        }
    }

    public encode (text: string, Encoder: BarcodeRef, options: BarcodeInputOptions) {
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
