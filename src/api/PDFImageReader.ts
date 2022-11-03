import { PDFDocument } from "pdf-lib"

type Base64 = string

export class PDFImageReader {
    constructor (public base64Images: Base64[]) {}

    public async getFile(): Promise<Buffer> {
        const pdfDoc = await PDFDocument.create()

        for (const [index, base64Image] of this.base64Images.entries()) {
            const pdfImage = await pdfDoc.embedPng(base64Image)
            const imagePage = pdfDoc.insertPage(index)
    
            const scaleParams = pdfImage.scaleToFit(595.28, 841.89)
    
            imagePage.drawImage(pdfImage, {
                x: 0,
                y: 0,
                width: scaleParams.width,
                height: scaleParams.height
            })
    
        }
    
        const pdfBytes = await pdfDoc.save()

        return Buffer.from(pdfBytes)
    }
}