import { PDFViewer } from "@react-pdf/renderer";
import { memo, VoidFunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import { ResumeModel } from "../../components/LivePreviewerComponents/ResumeModel";
import { PDFTemplate } from "../../components/PDFTemplate/PDFTemplate";
import { useResume } from "../../hooks/useResume";

interface PDFTemplateWrapperProps {
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

type PDFPreviewerPageProps = RouteComponentProps<{ id: string }>;

export const PDFPreviewerPage: VoidFunctionComponent<PDFPreviewerPageProps> = (
  props
) => {
  const { resume, loading, error } = useResume(props.match.params.id);

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}
      {resume && <PDFTemplateWrapper resume={resume} />}
    </>
  );
};
