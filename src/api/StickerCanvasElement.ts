import { BarcodeType } from "../interface";
import { StickerCoordinatesRegistry } from "../core/sticker/StickerCoordinatesRegistry";
import { createBarcodeImage } from "../utils/barcode";
import { createEACImage } from "../utils/eac";
import { createCanvas } from "canvas";

interface StickerParams {
	width: number,
	height: number,
	fontSize: number
}

export class StickerCanvasElement {
	registry: StickerCoordinatesRegistry;
	cache: {
		images: {
			barcode?: any,
			eac?: any
		},
		textLines: string[],
		flags: {
			stroke?: boolean
		}
	};

	constructor (params: StickerParams) {
		this.registry = new StickerCoordinatesRegistry(params.width, params.height, params.fontSize)
		this.cache = {
			images: {},
			flags: {},
			textLines: [],
		}
	}

	public async setBarcode (barcode: string, type: BarcodeType) {
		this.registry.barcode()

		const barcodeCoordinates = this.registry.coordinates['images']['barcode']!

		const image = await createBarcodeImage(
			type,
			barcode,
			barcodeCoordinates.w,
			barcodeCoordinates.h
		)

		this.cache.images.barcode = image
	}

	public async setEAC () {
		this.registry.eac()

		const eacCoordinates = this.registry.coordinates['images']['eac']!

		const image = await createEACImage(
			eacCoordinates.w,
			eacCoordinates.h
		)

		this.cache.images.eac = image
	}

	public async setStroke() {
		this.cache.flags.stroke = true
	}

	public async setAttributedText(record: Record<string, string>) {
		this.registry.attributes(record)
	}

	public getCanvas () {
		this.registry.validate()

		const canvas = createCanvas(this.registry.getWidth(), this.registry.getHeight())
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

		ctx.font = `${this.registry.fontSize}px Arial`

		ctx.drawImage(
			this.cache.images.barcode!,
			this.registry.coordinates.images.barcode!.x,
			this.registry.coordinates.images.barcode!.y,
		)

		if (this.registry.coordinates.images.eac) {
			ctx.drawImage(
				this.cache.images.eac!,
				this.registry.coordinates.images.eac!.x,
				this.registry.coordinates.images.eac!.y,
			)	
		}

		if (this.cache.flags.stroke) {
			const offsetPx = 2
			const perimeter = 2 * (this.registry.getWidth() + this.registry.getHeight())
			const strokeWidth = Math.floor(perimeter * 0.01)
			
			ctx.strokeStyle = 'black'
			ctx.beginPath();
			ctx.setLineDash([strokeWidth, strokeWidth / 2]);
			ctx.moveTo(offsetPx, offsetPx);
			ctx.lineTo(this.registry.getWidth() - offsetPx, offsetPx);
			ctx.lineTo(this.registry.getWidth() - offsetPx, this.registry.getHeight() - offsetPx);
			ctx.lineTo(offsetPx, this.registry.getHeight() - offsetPx);
			ctx.lineTo(offsetPx, offsetPx);
			ctx.stroke();
		}
		
		ctx.fillStyle = 'black'
		for (const lineCoordinates of this.registry.coordinates.lines) {
			ctx.fillText(
				lineCoordinates.value,
				lineCoordinates.x,
				lineCoordinates.y
			)
		}

		return canvas
	}
}
