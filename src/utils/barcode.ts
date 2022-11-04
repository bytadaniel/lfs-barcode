import { XMLSerializer, DOMImplementation } from 'xmldom'
import { loadImage } from 'canvas'
import JsBarcode from 'jsbarcode'
import { BarcodeType } from '../interface'
import sharp from 'sharp'

export function createSvgFromBarcode(barcode: string, type: BarcodeType) {
	const xmlSerializer = new XMLSerializer();
	const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
	const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	
	JsBarcode(svgNode, barcode, {
		xmlDocument: document,
		format: type,
		displayValue: true,
	})
	
	const svg = xmlSerializer.serializeToString(svgNode);
	return svg
}

export async function createBarcodeImage(type: BarcodeType, data: string, width: number, height: number) {
	return new Promise<any>(async (resolve, reject) => {
		const stringSvgHTMLElement = createSvgFromBarcode(data, type)

		const buffer = await sharp(Buffer.from(stringSvgHTMLElement))
			.resize(width, height, { fit: 'fill' })
			.png({ quality: 100 })
			.toBuffer()

		const image = await loadImage(buffer)

		resolve(image)
	})
}