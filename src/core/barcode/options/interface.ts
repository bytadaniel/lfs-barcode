export type BarcodeFormat = 'CODE128' | 'EAN13'

export interface BarcodeInputOptions {
    width: number,
	height: number,
	format: BarcodeFormat,
	displayValue: boolean,
	fontOptions: string,
	font: string,
	text?: string,
	textAlign: "center" | "left" | "right",
	textPosition: "bottom" | "top",
	textMargin: number,
	fontSize: number,
	background: string,
	lineColor: string,
	margin: number,
	marginTop?: number,
	marginBottom?: number,
	marginLeft?: number,
	marginRight?: number,
    ean128?: boolean,
	valid: (d?: boolean) => boolean
}