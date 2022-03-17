/* eslint-disable no-case-declarations */
import { pdf as createPdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

import formatResumeFilename from "./formatResumeFilename";
import { PDFTemplate } from "../components/PDFTemplate/PDFTemplate";
import { PDFTemplateV2 } from "../components/PDFTemplate/PDFTemplateV2";
import { ResumeModel } from "../components/LivePreviewerComponents/ResumeModel";

export default async function downloadResume(resume: ResumeModel, type: string) {
  const { firstName, lastName, avatar: avatarName } = resume.personalia;
  let file: Blob;
  switch (type.toLowerCase()) {
    case "io":
      const pdfTemplate = <PDFTemplate {...{ resume }} />;
      const pdf = await createPdf(pdfTemplate).toBlob();
      file = new Blob([pdf], {
        type: "application/pdf",
      });
      break;
    case "iov2":
      const pdfTemplateV2 = <PDFTemplateV2 {...{ resume }} />;
      const pdfV2 = await createPdf(pdfTemplateV2).toBlob();
      file = new Blob([pdfV2], {
        type: "application/pdf",
      });
      break;
    default:
      return;
  }

  const filename = formatResumeFilename(firstName, lastName, type);

  saveAs(file, filename);
}
