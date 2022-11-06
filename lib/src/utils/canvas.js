"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFonts = void 0;
const path_1 = __importDefault(require("path"));
const canvas_1 = require("canvas");
function registerFonts() {
    const fontTSPath = path_1.default.resolve(__dirname, '../public/fonts/arial.ttf');
    const fontJSPath = path_1.default.resolve(__dirname, '../../public/fonts/arial.ttf');
    const currentPath = __dirname.includes('/lib/') ? fontJSPath : fontTSPath;
    (0, canvas_1.registerFont)(currentPath, { family: 'Arial' });
}
exports.registerFonts = registerFonts;
