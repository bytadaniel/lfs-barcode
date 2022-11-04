export function mmToPx (mm: number): number {
	const px = Math.floor(3.7795275591 * mm)
	return px
}

// export function createCanvas(width: number, height: number, type?: 'pdf'|'svg'): Canvas {
// 	const canvas = createCanvas(width, height, type)

// 	const fontTSPath = path.resolve(__dirname, '../public/fonts/arial.ttf')
// 	const fontJSPath = path.resolve(__dirname, '../../public/fonts/arial.ttf')

// 	const currentPath = __dirname.includes('/lib/') ? fontJSPath : fontTSPath
// 	const fontExists = fs.existsSync(currentPath)

// 	console.log({ currentPath, fontExists, __dirname })

// 	if (fontExists) {
// 		registerFont(currentPath, { family: 'Arial' })
// 	}

// 	return canvas
// }