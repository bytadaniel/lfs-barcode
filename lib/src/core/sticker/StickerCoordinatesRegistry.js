"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerCoordinatesRegistry = void 0;
const canvas_1 = require("canvas");
class StickerCoordinatesRegistry {
    constructor(width, height, fontSize) {
        this.firstWidth = width;
        this.firstHeight = height;
        this.updatedWidth = null;
        this.updatedHeight = null;
        this.neccessaryExecutions = {
            barcode: false
        };
        this.coordinates = { images: {}, lines: [] };
        this.canvasCtx = (0, canvas_1.createCanvas)(1, 1).getContext('2d');
        this.fontSize = fontSize;
        this.canvasCtx.font = `${fontSize}px Arial`;
        this.barcode();
    }
    registerImageCoordinates(name, x, y, w, h) {
        this.coordinates.images[name] = { x, y, w, h };
    }
    registerLineCoordinates(value, x, y) {
        this.coordinates.lines.push({ value, x, y });
    }
    getWidth() {
        return this.updatedWidth ? this.updatedWidth : this.firstWidth;
    }
    getHeight() {
        return this.updatedHeight ? this.updatedHeight : this.firstHeight;
    }
    getVolume() {
        return 2 * (this.getWidth() + this.getHeight());
    }
    setHeight(value) {
        this.updatedHeight = value;
    }
    barcode() {
        const imageWidth = Math.floor(this.getWidth() * 0.99);
        const imageHeight = Math.floor(this.getHeight() * 0.45);
        const offsetY = 5;
        const offsetX = Math.floor((this.getWidth() - imageWidth) / 2); // align center
        this.registerImageCoordinates('barcode', offsetX, offsetY, imageWidth, imageHeight);
        this.neccessaryExecutions.barcode = true;
    }
    eac() {
        const imageWidth = Math.floor(this.getWidth() * 0.2);
        const imageHeight = Math.floor(this.getHeight() * 0.2);
        const barcodeHeight = this.coordinates.images['barcode'].y + this.coordinates.images['barcode'].h;
        const positionX = Math.floor((this.getWidth() - imageWidth) / 2); // align center
        const positionY = barcodeHeight + (barcodeHeight * 0.15);
        this.registerImageCoordinates('eac', positionX, positionY, imageWidth, imageHeight);
    }
    attributes(record) {
        const headHeight = this.coordinates.images['eac']
            ? this.coordinates.images['eac'].y + this.coordinates.images['eac'].h
            : this.coordinates.images['barcode'].y + this.coordinates.images['barcode'].h;
        const words = Object
            .entries(record)
            .flatMap(([attribute, value]) => ([`${attribute}:`, ...`${value}. `.split(' ')]));
        const textOffset = this.getWidth() * 0.04; // отступ
        const textWidthBonds = this.getWidth() - 2 * textOffset; // длина с учетом отступок
        const lines = words.reduce((l, word) => {
            if (!l.length) {
                l.push(word);
                return l;
            }
            const line = l[l.length - 1];
            const potentialLineWidth = this.canvasCtx.measureText(line).width + this.canvasCtx.measureText(' ').width + this.canvasCtx.measureText(word).width;
            if (potentialLineWidth <= textWidthBonds) {
                l.pop();
                l.push(`${line} ${word}`);
            }
            else {
                l.push(word);
            }
            return l;
        }, []);
        for (const [index, line] of lines.entries()) {
            const lineHeigth = headHeight + (headHeight * 0.2) + index * this.fontSize + index * this.fontSize / 2;
            if (lineHeigth + this.fontSize / 2 > this.getHeight()) {
                this.setHeight(lineHeigth + this.fontSize);
            }
            this.registerLineCoordinates(line, // value
            textOffset, // x
            lineHeigth // y
            );
        }
    }
    validate() {
        const isFalse = (el) => !Boolean(el);
        if (Object.values(this.neccessaryExecutions).some(isFalse)) {
            throw new Error(`All this should exist in sticker ${Object.keys(this.neccessaryExecutions).join(', ')}`);
        }
    }
}
exports.StickerCoordinatesRegistry = StickerCoordinatesRegistry;
