import { loadImage } from "canvas";
import { createCanvasWrapper, mmToPx } from "../../utils/common";
import { PaperA4Element } from "./PaperA4Element";

export class PaperA4CanvasElement {
	constructor (public paper: PaperA4Element) {}

	public async getCanvas () {
		const paperElements = this.paper.getUsedElementsWithState()

		const canvas = createCanvasWrapper(mmToPx(210), mmToPx(297))
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

		ctx.fillStyle = 'red'
		ctx.rect(0, 0, canvas.width, canvas.height)
		ctx.stroke()

		for (const paperElement of paperElements) {
			const image = await loadImage(paperElement.buffer)
			ctx.drawImage(image as any, paperElement.cursorState.width, paperElement.cursorState.height)
		}

		return canvas
	}
}