import { XMLSerializer, DOMImplementation } from 'xmldom'
import { loadImage } from 'canvas'
import JsBarcode from 'jsbarcode'
import type { BarcodeType } from '../interface'
import sharp from 'sharp'
import { getBarcode } from '../core/barcode/get-barcode'
import { defaultOptions } from '../core/barcode/options'

export function createSvgFromBarcode(barcode: string, type: BarcodeType) {
	const xmlSerializer = new XMLSerializer();
	const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
	const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

	JsBarcode(svgNode, barcode, {
		font: "OCR-B",
		displayValue: true,
		xmlDocument: document,
		format: type,
	})
	
	const svg = xmlSerializer.serializeToString(svgNode);

	console.log(svg)

	return svg
}

export async function createBarcodeImage(_type: BarcodeType, data: string, width: number, height: number) {
	return new Promise<any>(async (resolve) => {
		// const stringSvgHTMLElement = createSvgFromBarcode(data, type)

		const barcodeCanvas = getBarcode({
			...defaultOptions,
			text: data,
			width,
			height,
			font: "OCR-B",
			displayValue: true,
			format: 'CODE128',
		})



		const buffer = await sharp(barcodeCanvas.toBuffer())
			.resize(width, height, { fit: 'fill' })
			.png({ quality: 100 })
			.toBuffer()

		// const buffer = await sharp(Buffer.from(stringSvgHTMLElement))
		// 	.resize(width, height, { fit: 'fill' })
		// 	.png({ quality: 100 })
		// 	.toBuffer()

		const image = await loadImage(buffer)

		resolve(image)
	})
}