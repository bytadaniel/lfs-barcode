/// <reference types="node" />
declare type Base64 = string;
export declare class PDFImageReader {
    base64Images: Base64[];
    constructor(base64Images: Base64[]);
    getFile(): Promise<Buffer>;
}
export {};
