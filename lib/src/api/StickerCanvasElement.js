"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerCanvasElement = void 0;
const StickerCoordinatesRegistry_1 = require("../core/sticker/StickerCoordinatesRegistry");
const barcode_1 = require("../utils/barcode");
const eac_1 = require("../utils/eac");
const canvas_1 = require("canvas");
class StickerCanvasElement {
    constructor(params) {
        this.registry = new StickerCoordinatesRegistry_1.StickerCoordinatesRegistry(params.width, params.height, params.fontSize);
        this.cache = {
            images: {},
            flags: {},
            textLines: [],
        };
    }
    async setBarcode(barcode, type) {
        this.registry.barcode();
        const barcodeCoordinates = this.registry.coordinates['images']['barcode'];
        const image = await (0, barcode_1.createBarcodeImage)(type, barcode, barcodeCoordinates.w, barcodeCoordinates.h);
        this.cache.images.barcode = image;
    }
    async setEAC() {
        this.registry.eac();
        const eacCoordinates = this.registry.coordinates['images']['eac'];
        const image = await (0, eac_1.createEACImage)(eacCoordinates.w, eacCoordinates.h);
        this.cache.images.eac = image;
    }
    async setStroke() {
        this.cache.flags.stroke = true;
    }
    async setAttributedText(record) {
        this.registry.attributes(record);
    }
    getCanvas() {
        this.registry.validate();
        const canvas = (0, canvas_1.createCanvas)(this.registry.getWidth(), this.registry.getHeight());
        const ctx = canvas.getContext('2d');
        ctx.font = `${this.registry.fontSize}px Arial`;
        ctx.drawImage(this.cache.images.barcode, this.registry.coordinates.images.barcode.x, this.registry.coordinates.images.barcode.y);
        if (this.registry.coordinates.images.eac) {
            ctx.drawImage(this.cache.images.eac, this.registry.coordinates.images.eac.x, this.registry.coordinates.images.eac.y);
        }
        if (this.cache.flags.stroke) {
            const offsetPx = 2;
            const perimeter = 2 * (this.registry.getWidth() + this.registry.getHeight());
            const strokeWidth = Math.floor(perimeter * 0.01);
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.setLineDash([strokeWidth, strokeWidth / 2]);
            ctx.moveTo(offsetPx, offsetPx);
            ctx.lineTo(this.registry.getWidth() - offsetPx, offsetPx);
            ctx.lineTo(this.registry.getWidth() - offsetPx, this.registry.getHeight() - offsetPx);
            ctx.lineTo(offsetPx, this.registry.getHeight() - offsetPx);
            ctx.lineTo(offsetPx, offsetPx);
            ctx.stroke();
        }
        ctx.fillStyle = 'black';
        for (const lineCoordinates of this.registry.coordinates.lines) {
            ctx.fillText(lineCoordinates.value, lineCoordinates.x, lineCoordinates.y);
        }
        return canvas;
    }
}
exports.StickerCanvasElement = StickerCanvasElement;
