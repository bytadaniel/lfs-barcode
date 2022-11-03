"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFImageReader = void 0;
const pdf_lib_1 = require("pdf-lib");
class PDFImageReader {
    constructor(base64Images) {
        this.base64Images = base64Images;
    }
    async getFile() {
        const pdfDoc = await pdf_lib_1.PDFDocument.create();
        for (const [index, base64Image] of this.base64Images.entries()) {
            const pdfImage = await pdfDoc.embedPng(base64Image);
            const imagePage = pdfDoc.insertPage(index);
            const scaleParams = pdfImage.scaleToFit(595.28, 841.89);
            imagePage.drawImage(pdfImage, {
                x: 0,
                y: 0,
                width: scaleParams.width,
                height: scaleParams.height
            });
        }
        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    }
}
exports.PDFImageReader = PDFImageReader;
