import { Stack } from "../stack/Stack";
import { StickerCanvasElement } from "../../api/StickerCanvasElement";
import { mmToPx } from "../utils/common";

interface Dimensions {
  width: number,
  height: number
}

interface ElementWithCursorState {
  cursorState: Dimensions,
  element: StickerCanvasElement
}

interface CanvasWithCursorState {
  cursorState: Dimensions,
  buffer: Buffer
}

export class PaperA4Element {
  millimeters: Dimensions;
  pixels: Dimensions;
  cursor: Dimensions;

  unusedElements: StickerCanvasElement[];
  matrix: ElementWithCursorState[][];

  constructor(
  ) {
    this.unusedElements = []
    this.matrix = []

    this.millimeters = {
      width: 210,
      height: 297
    }
    this.pixels = {
      width: mmToPx(this.millimeters.width),
      height: mmToPx(this.millimeters.height)
    }
    this.cursor = {
      width: 0,
      height: 0
    }
  }

  private organizeVertical(elements: StickerCanvasElement[]) {
    const stack = new Stack(elements)

    let canUseElement = true

    while (stack.hasElements() && canUseElement) {
      const element = stack.get()!

      const inBoundHeight = this.cursor.height + element.registry.getHeight() <= this.pixels.height
      const inBoundWidth = this.cursor.width + element.registry.getWidth() <= this.pixels.width

      // no rows
      if (!this.matrix.length) {
        this.matrix.push([])
      }

      if (inBoundHeight && inBoundWidth) {
        const elementWithCursor: ElementWithCursorState = {
          cursorState: { ...this.cursor },
          element
        }

        // пуш в последнюю колонку последней строки
        this.matrix[this.matrix.length-1].push(elementWithCursor)

        // сдвигаем курсор на следующую колонку этой же строки
        this.cursor.width += element.registry.getWidth()
        continue
      }

      // Когда курсор дошел до конца строки
      if (inBoundHeight && !inBoundWidth) {
        // новая строка
        this.matrix.push([])

        // сдвигаем курсор влево 
        this.cursor.width = 0
        // и в конец высоты первого элемента предыдущей строки
        let rowHeight = this.matrix.map(rows => rows[0]).filter(c => c).reduce((sum, el) => sum += el.element.registry.getHeight(), 0)
        this.cursor.height = rowHeight
        stack.add(element)

        continue
      }

      // невозможно добавить элемент куда-либо - выход
      if (!inBoundHeight || !inBoundWidth) {
        canUseElement = false
        stack.add(element) // return to queue
        break
      }

      // в случае непредусмотренных ситуаций
      canUseElement = false
      stack.add(element) // return to queue
      break
    }

    // высвобождаем очередь
    while (stack.hasElements()) {
      const element = stack.get()!
      this.unusedElements.push(element)
    }
  }

  public arrangeElementsOnPaper(elements: StickerCanvasElement[]) {
    this.organizeVertical(elements)
  }

  public getUnusedElements() {
    return this.unusedElements
  }

  public getUsedElementsWithState(): CanvasWithCursorState[] {
    return this.matrix.flatMap(row => {
      return row.map(col => {
        return {
          cursorState: col.cursorState,
          buffer: col.element.getCanvas().toBuffer()
        } as CanvasWithCursorState
      })
    })
  }
}