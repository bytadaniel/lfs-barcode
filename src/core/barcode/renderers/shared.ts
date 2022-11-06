import type { Encoded } from "../formats/barcode.js";
import { merge } from "../helpers/merge.js";
import type { BarcodeInputOptions } from "../options/interface.js";

function getEncodingHeight(encoding: Encoded, options: BarcodeInputOptions){
	return options.height +
		((options.displayValue && encoding.text!.length > 0) ? options.fontSize + options.textMargin : 0) +
		options.marginTop! +
		options.marginBottom!;
}

function getBarcodePadding(textWidth: number, barcodeWidth: number, options: BarcodeInputOptions){
	if(options.displayValue && barcodeWidth < textWidth){
		if(options.textAlign == "center"){
			return Math.floor((textWidth - barcodeWidth) / 2);
		}
		else if(options.textAlign == "left"){
			return 0;
		}
		else if(options.textAlign == "right"){
			return Math.floor(textWidth - barcodeWidth);
		}
	}
	return 0;
}

function calculateEncodingAttributes(encodings: Encoded[], barcodeOptions: BarcodeInputOptions, context: CanvasRenderingContext2D){
	for(let i = 0; i < encodings.length; i++){
		var encoding = encodings[i];
		var options: BarcodeInputOptions = merge(barcodeOptions, encoding.options);

		// Calculate the width of the encoding
		var textWidth;
		if(options.displayValue){
			textWidth = messureText(encoding.text!, options, context);
		}
		else{
			textWidth = 0;
		}

		var barcodeWidth = encoding.data.length * options.width;
		encoding.width =  Math.ceil(Math.max(textWidth, barcodeWidth));

		encoding.height = getEncodingHeight(encoding, options);

		encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
	}
}

function getTotalWidthOfEncodings(encodings: Encoded[]){
	var totalWidth = 0;
	for(let i = 0; i < encodings.length; i++){
		totalWidth += encodings[i].width!;
	}
	return totalWidth;
}

function getMaximumHeightOfEncodings(encodings: Encoded[]){
	var maxHeight = 0;
	for(let i = 0; i < encodings.length; i++){
		if(encodings[i].height! > maxHeight){
			maxHeight = encodings[i].height!;
		}
	}
	return maxHeight;
}

function messureText(string: string, options: BarcodeInputOptions, context: CanvasRenderingContext2D){
	let ctx: CanvasRenderingContext2D;

	if(context){
		ctx = context;
	}
	else if(typeof document !== "undefined"){
		ctx = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D
	}
	else{
		// If the text cannot be messured we will return 0.
		// This will make some barcode with big text render incorrectly
		return 0;
	}
	ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

	// Calculate the width of the encoding
	var measureTextResult = ctx.measureText(string);
	if (!measureTextResult) {
		// Some implementations don't implement measureText and return undefined.
		// If the text cannot be measured we will return 0.
		// This will make some barcode with big text render incorrectly
		return 0;
	}
	var size = measureTextResult.width;
	return size;
}

export {getMaximumHeightOfEncodings, getEncodingHeight, getBarcodePadding, calculateEncodingAttributes, getTotalWidthOfEncodings};