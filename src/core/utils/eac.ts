import { loadImage } from 'canvas'
import fs from 'fs'
import path from 'path'
/**
 * У этого пакета есть баг
 * При первом запуске может быть ошибка
 */
import * as svgToImg from 'svg-to-img'

export async function createEACImage(width: number, height: number) {
	const eacSvg = fs.readFileSync(path.resolve(__dirname, '../../static/eac.svg'))
	const buffer = await svgToImg.from(eacSvg).toPng({
		width,
		height
	})
	const image = await loadImage(buffer)
	return image as any
}