"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBarcodeImage = exports.createSvgFromBarcode = void 0;
const xmldom_1 = require("xmldom");
const canvas_1 = require("canvas");
const jsbarcode_1 = __importDefault(require("jsbarcode"));
/**
 * У этого пакета есть баг
 * При первом запуске может быть ошибка
 */
const svgToImg = __importStar(require("svg-to-img"));
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
        const buffer = await svgToImg.from(stringSvgHTMLElement).toPng({
            width,
            height
        });
        const image = await (0, canvas_1.loadImage)(buffer);
        resolve(image);
    });
}
exports.createBarcodeImage = createBarcodeImage;
