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
exports.createEACImage = void 0;
const canvas_1 = require("canvas");
/**
 * У этого пакета есть баг
 * При первом запуске может быть ошибка
 */
const svgToImg = __importStar(require("svg-to-img"));
const EAC_SVG = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:ns1="http://sozi.baierouge.fr"
    xmlns:cc="http://web.resource.org/cc/"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    viewBox="0 0 500 500"
  >
  <g
      id="imagebot_2"
      label="Layer 1"
    >
    <path
        id="imagebot_3"
        fill-rule="evenodd"
        fill="#161413"
        d="m221.96 59.31v54.36 54.38 54.36h54.37v-54.36-54.38-54.36h-54.37zm-54.37-54.372h54.37 54.37 54.36v54.372 54.36 54.38 54.36 54.36 54.37 54.37 54.36 54.37h-54.36v-54.37-54.36-54.37-54.37h-54.37v54.37 54.37 54.36 54.37h-54.37v-54.37-54.36-54.37-54.37-54.36-54.36-54.38-54.36-54.372zm-163.1 0h54.372 54.362v54.372h-54.361v54.36 54.38 54.36h54.361v54.36h-54.361v54.37 54.37 54.36h54.361v54.37h-54.361-54.372l-0.0005-54.37v-54.36-54.37-54.37-54.36-54.36-54.38-54.36-54.372zm380.57 0h54.37 54.37v54.372h-54.37v54.36 54.38 54.36 54.36 54.37 54.37 54.36h54.37v54.37h-54.37-54.37v-54.37-54.36-54.37-54.37-54.36-54.36-54.38-54.36-54.372z"
        label="Layer 1"
    />
    <title
      >Layer 1</title
    >
  </g
  >
  <metadata
    >
    <rdf:RDF
      >
      <cc:Work
        >
        <dc:format
          >image/svg+xml</dc:format
        >
        <dc:type
            rdf:resource="http://purl.org/dc/dcmitype/StillImage"
        />
        <cc:license
            rdf:resource="http://creativecommons.org/licenses/publicdomain/"
        />
        <dc:publisher
          >
          <cc:Agent
              rdf:about="http://openclipart.org/"
            >
            <dc:title
              >Openclipart</dc:title
            >
          </cc:Agent
          >
        </dc:publisher
        >
      </cc:Work
      >
      <cc:License
          rdf:about="http://creativecommons.org/licenses/publicdomain/"
        >
        <cc:permits
            rdf:resource="http://creativecommons.org/ns#Reproduction"
        />
        <cc:permits
            rdf:resource="http://creativecommons.org/ns#Distribution"
        />
        <cc:permits
            rdf:resource="http://creativecommons.org/ns#DerivativeWorks"
        />
      </cc:License
      >
    </rdf:RDF
    >
  </metadata
  >
</svg
>
`;
async function createEACImage(width, height) {
    const buffer = await svgToImg.from(EAC_SVG).toPng({
        width,
        height
    });
    const image = await (0, canvas_1.loadImage)(buffer);
    return image;
}
exports.createEACImage = createEACImage;
