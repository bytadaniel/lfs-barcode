import { loadImage } from 'canvas'
import sharp from 'sharp'

const EAC_SVG_BUFFER = Buffer.from(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
>`)

export async function createEACImage(width: number, height: number) {
	const buffer = await sharp(EAC_SVG_BUFFER)
		.resize(width, height)
		.png({ quality: 100 })
		.toBuffer()
	// const buffer = await svgToImg.from(EAC_SVG_BUFFER).toPng({
	// 	width,
	// 	height
	// })
	const image = await loadImage(buffer)
	return image as any
}