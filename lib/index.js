"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.PDFImageReader = exports.PaperA4ElementManager = exports.StickerCanvasElement = void 0;
const StickerCanvasElement_1 = require("./src/api/StickerCanvasElement");
Object.defineProperty(exports, "StickerCanvasElement", { enumerable: true, get: function () { return StickerCanvasElement_1.StickerCanvasElement; } });
const PaperA4ElementManager_1 = require("./src/api/PaperA4ElementManager");
Object.defineProperty(exports, "PaperA4ElementManager", { enumerable: true, get: function () { return PaperA4ElementManager_1.PaperA4ElementManager; } });
const PDFImageReader_1 = require("./src/api/PDFImageReader");
Object.defineProperty(exports, "PDFImageReader", { enumerable: true, get: function () { return PDFImageReader_1.PDFImageReader; } });
const utils = __importStar(require("./src/utils/common"));
exports.utils = utils;
utils.createCanvasWrapper(0, 0);
