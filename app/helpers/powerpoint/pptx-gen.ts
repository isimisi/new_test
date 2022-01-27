/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import PptxGenJS from "pptxgenjs";
import { ParseHTML } from "./HtmlParser.js";
import imageSize from "image-size";

interface Image {
  data: string;
  w: number;
  h: number;
}

interface Params {
  html: string[];
  body: string[];
}

/**
 * this function generates a powerpoint file from a dir, or a list of HTML strings and BASE64 images
 * @param {JSON} params paramaters follows the type {html:[],body:[]} where html is a list of html text
 * and body is the list of either images or json shapes
 * @returns {Promise<String>} returns a base64 encoded string of the powerpoint
 */
export function generatePPTX(params: Params) {
  const images: Image[] = [];

  for (const image of params.body) {
    const buffer = Buffer.from(image.split(",")[1], "base64");

    const size = imageSize(buffer);

    const width = size.width as number;
    const height = size.height as number;
    images.push({
      data: "data:image/jpg;base64," + image,
      w: width / 430,
      h: height / 430,
    });
  }

  const pptx = new PptxGenJS();

  const slides: PptxGenJS.Slide[] = [];

  for (const index in params.html) {
    const parsedHtml = ParseHTML(params.html[index]);
    for (const text of parsedHtml) {
      slides.push(pptx.addSlide());
      // @ts-ignore
      slides.at(-1).addText(text, { x: 4.0, y: 0.3, w: 6, h: 5, fontSize: 12 });
      try {
        // @ts-ignore
        slides.at(-1).addImage({
          data: images[index].data,
          y: 1.5,
          x: 0.5,
          w: images[index].w,
          h: images[index].h,
        });
      } catch (err) {
        console.error("no image for index");
        console.error(err);
      }
    }
  }

  pptx.writeFile({ fileName: "PptxGenJS-Demo" });
}
