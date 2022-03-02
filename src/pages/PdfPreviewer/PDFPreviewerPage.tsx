import { PDFViewer } from "@react-pdf/renderer";
import { memo, VoidFunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { ResumeModel } from "../../components/LivePreviewerComponents/ResumeModel";
import { PDFTemplate } from "../../components/PDFTemplate/PDFTemplate";
import { useResume } from "../../hooks";

export interface PDFTemplateWrapperProps {
  resume: ResumeModel;
}

const PDFTemplateWrapper: VoidFunctionComponent<PDFTemplateWrapperProps> = memo(
  ({ resume }) => {
    return (
      <PDFViewer width="100%" height="100%">
        <PDFTemplate resume={resume} />
      </PDFViewer>
    );
  },
  () => true // This fixes a weird lib bug -> https://github.com/diegomura/react-pdf/issues/420
);

PDFTemplateWrapper.displayName = "PDFTemplateWrapper";

type paramsId = {
  id: string;
};

export const PDFPreviewerPage: VoidFunctionComponent = () => {
  const { id } = useParams<paramsId>();
  const { resume, loading, error } = useResume(id);

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}
      {resume && <PDFTemplateWrapper resume={resume} />}
    </>
  );
};
