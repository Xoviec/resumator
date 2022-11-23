/* eslint-disable no-case-declarations */
import { pdf as createPdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { ResumeModel } from "../components/LivePreviewerComponents/ResumeModel";
import { PDFTemplate } from "../components/PDFTemplate/PDFTemplate";
import { formatResumeFilename } from "./formatResumeFilename";

export async function downloadResume(resume: ResumeModel, type: string) {
  const { firstName, lastName } = resume.personalia;
  let file: Blob;
  switch (type.toLowerCase()) {
    case "pdf_io":
      const pdfTemplate = <PDFTemplate {...{ resume }} />;
      const pdf = await createPdf(pdfTemplate).toBlob();
      file = new Blob([pdf], {
        type: "application/pdf",
      });
      break;
    default:
      return;
  }

  const filename = formatResumeFilename(firstName, lastName, type);

  saveAs(file, filename);
}
