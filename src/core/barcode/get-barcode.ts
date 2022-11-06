import { API } from "./api";
import type { BarcodeInputOptions } from "./options";

export function getBarcode(
    options: BarcodeInputOptions
) {
    const canvas = new API().options(options).getRenderer().render()
    return canvas
}