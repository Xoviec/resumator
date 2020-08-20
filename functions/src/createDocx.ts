/// <reference path="./types/docxtemplater/index.d.ts" />
import * as DocxTemplater from "docxtemplater";
import * as ImageModule from "docxtemplater-image-module";
import * as PizZip from "pizzip";

import { Resume } from "./types";

import { formatDatesInObject } from "@local/date";
export default async function createDocx(resume: Resume, template: Buffer, avatar?: Buffer) {
  const imageModule = new ImageModule({
    centered: false,
    getImage: (tagValue: string) => avatar,
    getSize: () => [80, 200],
  });

  const zip = new PizZip(template);
  const options = { modules: [ imageModule ]} ;
  const doc = await new DocxTemplater(zip, options);

  const tags = {
    ...resume,
    ...resume.personalia, // unnest names, city, date of birth for easier usage inside template
  };
  doc.setData(formatDatesInObject(tags, "MMMM y"));

  // The render function replaces the placeholder text from the input.docx with the data
  doc.render();

  return doc.getZip().generate({ type: "nodebuffer" });
}
