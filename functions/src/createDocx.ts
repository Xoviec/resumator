/// <reference path="./types/docxtemplater/index.d.ts" />
import * as DocxTemplater from "docxtemplater";
import * as ImageModule from "docxtemplater-image-module";
import * as PizZip from "pizzip";

import { Resume , LooseObject } from "./types";
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
    ...formatDescriptionsInObject(resume),
    ...resume.personalia, // unnest names, city, date of birth for easier usage inside template
  };
  doc.setData(formatDatesInObject(tags, "MMMM y"));

  // The render function replaces the placeholder text from the input.docx with the data
  doc.render();

  return doc.getZip().generate({ type: "nodebuffer" });
}

function formatDescriptionsInObject(object: LooseObject): LooseObject {
  for (const key in object) {
    let prop = object[key];
    if (key === "description") {
      object["description"] = formatDescription(prop); // special tag inside template
    } else if (typeof prop === "object") {
      object[key] = formatDescriptionsInObject(prop);
    }
  }
  return object;
}

type DraftJSBlock = {
  text: string,
  type: string,
  inlineStyleRanges: { offset: number, length: number, style: string }[]
}
function formatDescription(description: string): string {
  try {
    const { blocks } = JSON.parse(description);
    const output = blocks.reduce((output: string, { text, type }: DraftJSBlock) => {
      if (type === "ordered-list-item" || type === "unordered-list-item") {
        return `${output}${formatListItem(text, type)}`;
      } else {
        return `${output}<w:p><w:r><w:t>${text}</w:t></w:r></w:p>`
      }
    }, "");
    return `${output}`;
  } catch {
    return description.split('\n')
      .map(entry => `<w:p><w:r><w:t>${entry}</w:t></w:r></w:p>`)
      .join('');
  }
}

function formatListItem(text: string, type: "ordered-list-item" | "unordered-list-item"): string {
  const listId = ("ordered-list-item")
    ? 4 // TODO: Find actual listId for ordered lists in template
    : 3;
  return "<w:p>"
    // List definition values
    + `<w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="${listId}" /></w:numPr></w:pPr>`
    // Actual content
    + `<w:r><w:t>${text}</w:t></w:r>`
    + "</w:p>";
}
