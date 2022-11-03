"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBarcodeImage = exports.createSvgFromBarcode = void 0;
const xmldom_1 = require("xmldom");
const canvas_1 = require("canvas");
const jsbarcode_1 = __importDefault(require("jsbarcode"));
const sharp_1 = __importDefault(require("sharp"));
function createSvgFromBarcode(barcode, type) {
    const xmlSerializer = new xmldom_1.XMLSerializer();
    const document = new xmldom_1.DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    (0, jsbarcode_1.default)(svgNode, barcode, {
        xmlDocument: document,
        format: type,
        displayValue: true,
    });
    const svg = xmlSerializer.serializeToString(svgNode);
    return svg;
}
exports.createSvgFromBarcode = createSvgFromBarcode;
async function createBarcodeImage(type, data, width, height) {
    return new Promise(async (resolve, reject) => {
        const stringSvgHTMLElement = createSvgFromBarcode(data, type);
        const buffer = await (0, sharp_1.default)(Buffer.from(stringSvgHTMLElement))
            .resize(width, height, { fit: 'fill' })
            .png({ quality: 100 })
            .toBuffer();
        const image = await (0, canvas_1.loadImage)(buffer);
        resolve(image);
    });
}
exports.createBarcodeImage = createBarcodeImage;
