export type BarcodeFormat = 'CODE128' | 'EAN13'

export interface BarcodeInputOptions {
    canvasWidth: number,
	canvasHeight: number,
	stripWidth?: number,
	format: BarcodeFormat,
	displayValue: boolean,
	text: string,
	background: string,
	lineColor: string,
    ean128?: boolean,
	valid: (d?: boolean) => boolean
}