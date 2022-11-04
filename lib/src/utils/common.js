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
    const fontTSPath = path_1.default.resolve(__dirname, '../public/fonts/arial.ttf');
    const fontJSPath = path_1.default.resolve(__dirname, '../../public/fonts/arial.ttf');
    const currentPath = __dirname.includes('/lib/') ? fontJSPath : fontTSPath;
    const fontExists = fs_1.default.existsSync(currentPath);
    console.log({ currentPath, fontExists, __dirname });
    if (fontExists) {
        (0, canvas_1.registerFont)(currentPath, { family: 'Arial' });
    }
    return canvas;
}
exports.createCanvasWrapper = createCanvasWrapper;
