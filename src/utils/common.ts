import fs from 'fs'
import path from 'path'
import { Canvas, createCanvas, registerFont } from "canvas"

export function mmToPx (mm: number): number {
	const px = Math.floor(3.7795275591 * mm)
	return px
}

export function createCanvasWrapper(width: number, height: number, type?: 'pdf'|'svg'): Canvas {
	const canvas = createCanvas(width, height, type)
	const fontPath = path.resolve(__dirname, '../fonts/arial.ttf')
	const fontExists = fs.existsSync(fontPath)

	console.log({ fontPath, fontExists, __dirname })

	if (fontExists) {
		registerFont(fontPath, { family: 'Arial' })
	}

	return canvas
}