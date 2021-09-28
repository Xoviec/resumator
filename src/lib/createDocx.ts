import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";
import PizZip from "pizzip";
import { LooseObject } from "../types/LooseObject";
import { Resume } from "../types/Resume";

import { formatDatesInObject } from "./date";

export default async function createDocx(
  resume: Resume,
  template: ArrayBuffer,
  avatar: ArrayBuffer
) {
  const imageModule = new ImageModule({
    centered: false,
    getImage: (tagValue: string) => avatar, // return avatar regardless of tag value
    getSize: () => [80, 200],
  });

  const zip = new PizZip(template);
  const options = { modules: [imageModule] };
  const doc = await new Docxtemplater(zip, options);
  const tags = {
    ...formatDescriptionsInObject(resume),
    ...resume.personalia, // unnest names, city, date of birth for easier usage inside template
    image: "avatar.png", // ImageModule won't load this file by name but needs it to import binary data correctly
  };
  doc.setData(formatDatesInObject(tags, "MMMM y"));

  doc.render();

  return doc.getZip().generate({ type: "uint8array" });
}

function formatDescriptionsInObject(object: LooseObject): LooseObject {
  for (const key in object) {
    const prop = object[key];
    if (key === "description") {
      object["description"] = formatDescription(prop); // special tag inside template
    } else if (typeof prop === "object") {
      object[key] = formatDescriptionsInObject(prop);
    }
  }
  return object;
}

type DraftJSBlock = {
  text: string;
  type: string;
  inlineStyleRanges: { offset: number; length: number; style: string }[];
};
function formatDescription(description: string): string {
  try {
    const { blocks } = JSON.parse(description);
    const output = blocks.reduce((output: string, { text, type }: DraftJSBlock) => {
      if (type === "ordered-list-item" || type === "unordered-list-item") {
        return `${output}${formatListItem(text, type)}`;
      } else {
        return `${output}<w:p><w:r><w:t>${text}</w:t></w:r></w:p>`;
      }
    }, "");
    return `${output}`;
  } catch {
    return description
      .split("\n")
      .map((entry) => `<w:p><w:r><w:t>${entry}</w:t></w:r></w:p>`)
      .join("");
  }
}

function formatListItem(
  text: string,
  type: "ordered-list-item" | "unordered-list-item"
): string {
  /**
   * Refers to ids of <w: num> tags in the template docx, under numbering.xml.
   * Each one points to a different instance of abstractNum with its own logic (bullets/numbers/ levels) and styling.
   * At the time of edit, 1 is the orange bullets of skill List, 2 is simple black bullets and 3 is numbers.
   * Known issue: numbered list does not restart with each section, but treats all lists as a single big list.
   */
  const listId = "ordered-list-item" === type ? 3 : 2;
  return (
    "<w:p>" +
    // List definition values
    `<w:pPr>
        <w:numPr>
          <w:ilvl w:val="0"/>
          <w:numId w:val="${listId}" />
        </w:numPr>
      </w:pPr>` +
    // Actual content
    `<w:r><w:t>${text}</w:t></w:r>` +
    "</w:p>"
  );
}
