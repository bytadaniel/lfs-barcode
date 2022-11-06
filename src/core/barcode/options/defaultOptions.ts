import type { BarcodeInputOptions } from "./interface";

export const defaultOptions: BarcodeInputOptions = {
	width: 2,
	height: 100,
	format: 'CODE128',
	displayValue: true,
	fontOptions: "",
	font: "monospace",
	text: undefined,
	textAlign: "center",
	textPosition: "bottom",
	textMargin: 2,
	fontSize: 20,
	background: "#ffffff",
	lineColor: "#000000",
	margin: 10,
	marginTop: undefined,
	marginBottom: undefined,
	marginLeft: undefined,
	marginRight: undefined,
	valid: () => false,
}
