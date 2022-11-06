import { Canvas, createCanvas } from "canvas";
import type { Encoding } from "../formats/barcode";
import type { BarcodeInputOptions } from "../options/interface";
// import { calculateEncodingAttributes, getTotalWidthOfEncodings, getMaximumHeightOfEncodings } from "./shared";

export class CanvasBarcodeRenderer {
    encodings: Encoding[];
    options: BarcodeInputOptions;

	constructor(encodings: Encoding[], options: BarcodeInputOptions){
		this.encodings = encodings;
		this.options = options;
	}

	public render() {
		this.options.stripWidth = Math.round(this.options.canvasWidth / this.encodings[0].data.length * 100) / 100


		const canvas = this.prepareCanvas();


		for (const encoding of this.encodings) {
			this.drawCanvasBarcode(canvas, encoding);
		}

        return canvas
	}

	private prepareCanvas() {
		const canvasWidth = this.encodings.reduce((maxWidth, encoding) => Math.max(maxWidth, encoding.data.length * this.options.stripWidth!), 0)
		const canvasHeight = this.options.canvasHeight

        const canvas = createCanvas(canvasWidth, canvasHeight)

        const ctx = canvas.getContext('2d')

		// Paint the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = this.options.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return canvas
	}

	private drawCanvasBarcode(canvas: Canvas, encoding: Encoding){
		const ctx = canvas.getContext('2d')
		const binary = encoding.data;

		ctx.fillStyle = this.options.lineColor;

		console.log(encoding)

		for(let index = 0; index < binary.length; index++){
			const is1 = binary[index] === '1'

			if (is1) {
				ctx.fillRect(
					index * this.options.stripWidth!,
					0,
					this.options.stripWidth!,
					this.options.canvasHeight
				)
			}
		}
	}
}