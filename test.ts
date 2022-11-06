import fs from 'fs'
import { PaperA4ElementManager, PDFImageReader, StickerCanvasElement, utils } from './src'

async function main () {
    const wMM = 300
    const hMM = 200
    const wPx = utils.mmToPx(wMM)
    const hPx = utils.mmToPx(hMM)

    const elements: StickerCanvasElement[] = []

    for (let i = 0; i <= 10; i++) {
        const element = new StickerCanvasElement({
            width: wPx,
            height: hPx,
            fontSize: 12
        })
    
        await element.setStroke()
        await element.setBarcode('2008099808000', 'CODE128')
        await element.setEAC()
        await element.setAttributedText({
            ['Артикул']: '111798571',
            ['Изготовитель']: 'ИП Плонке Илья Сергеевич, Краснодарский Край, Северский р-н, пгт. Афипский, Смоленское шоссе, 42',
            ['Поставщик']: 'ИП Плонке Илья Сергеевич, Россия, г.Люберцы, ул. Кирова 9-1-155, isplonke@gmail.com',
            ['Состав']: 'полиэстер - 30%, Вискоза - 65%, спандекс - 5%'
        })
    
        elements.push(element)
    }
    
    const A4 = new PaperA4ElementManager(elements)
    A4.arrangeElementsOnPapers()
    
    const base64Papers = await A4.getPapers(canvas => canvas.toDataURL())
    
    const file = await new PDFImageReader(base64Papers).getFile()

    fs.writeFileSync('./pdf.pdf', file)
    console.log('file save')
}

main()
