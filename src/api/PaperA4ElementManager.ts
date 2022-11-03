import { PaperA4Element } from "../core/paper/PaperA4Element";
import { StickerCanvasElement } from "./StickerCanvasElement";
import { PaperA4CanvasElement } from "../core/paper/PaperA4CanvasElement";
import { Canvas } from "canvas";

export class PaperA4ElementManager {
	papers: PaperA4Element[];

	constructor (public elements: StickerCanvasElement[]) {
		this.papers = []
	}

	public async getPapers<T>(formatCallback: (canvas: Canvas) => T) {
		const promises = this.papers.map(async paper => {
			const paperCanvas: Canvas = await new PaperA4CanvasElement(paper).getCanvas()
			const format = formatCallback(paperCanvas)
			return format
		})

		return Promise.all(promises)
	}

	public arrangeElementsOnPapers () {
		let elements = [...this.elements]

		do {
			const paper = new PaperA4Element()
			paper.arrangeElementsOnPaper(elements)

			this.papers.push(paper)

			elements = paper.getUnusedElements() // переприсваиваем элементы для условия выхода
		} while (elements.length > 0)
	}
}