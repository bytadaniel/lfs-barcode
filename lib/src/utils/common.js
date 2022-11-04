"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCanvasWrapper = exports.mmToPx = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const canvas_1 = require("canvas");
function mmToPx(mm) {
    const px = Math.floor(3.7795275591 * mm);
    return px;
}
exports.mmToPx = mmToPx;
function createCanvasWrapper(width, height, type) {
    const canvas = (0, canvas_1.createCanvas)(width, height, type);
    const fontPath = path_1.default.resolve(__dirname, '../fonts/arial.ttf');
    const fontExists = fs_1.default.existsSync(fontPath);
    console.log({ fontPath, fontExists, __dirname });
    if (fontExists) {
        (0, canvas_1.registerFont)(fontPath, { family: 'Arial' });
    }
    return canvas;
}
exports.createCanvasWrapper = createCanvasWrapper;
