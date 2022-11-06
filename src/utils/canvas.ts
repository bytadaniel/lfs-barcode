import path from 'path'
import { registerFont } from "canvas";

export function registerFonts() {
		const fontTSPath = path.resolve(__dirname, '../public/fonts/arial.ttf')
		// const fontJSPath = path.resolve(__dirname, '../../public/fonts/arial.ttf')
		// const currentPath = __dirname.includes('/lib/') ? fontJSPath : fontTSPath

		const currentPath = fontTSPath


		registerFont(currentPath, { family: 'Arial' })
}