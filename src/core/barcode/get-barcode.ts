import { API } from "./api";
import { BarcodeInputOptions, defaultOptions } from "./options";

export function getBarcode(
    options: BarcodeInputOptions
) {
    const api = new API()

    const fullOptions = { ...defaultOptions, ...options }

    const canvas = api.getRenderer(fullOptions).render()

    return canvas
}