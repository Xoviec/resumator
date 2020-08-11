import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useDocument } from "react-firebase-hooks/firestore";
import styled from "@emotion/styled";
import { Button, CircularProgress } from "@material-ui/core";
import GetApp from "@material-ui/icons/GetApp";
import PDFTemplate from "../../components/PDFTemplate/PDFTemplate";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { getCVFileName } from "../../utils/getCVFileName";

const PDFDownloadButton = React.memo(
  ({ resume, goBack }) => (
    <PDFDownloadLink
      document={<PDFTemplate resume={resume} />}
      fileName={getCVFileName(
        resume.personalia.firstName,
        resume.personalia.lastName
      )}
    >
      {({ loading, error }) => {
        if (loading) {
          return (
            <div>
              Rendering the PDF <CircularProgress />
            </div>
          );
        }

        if (error) {
          return (
            <div>
              There was an error while rendering the PDF: {JSON.stringify(error)}
            </div>
          );
        }

        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<GetApp />}
              onClick={goBack}
            >
              Download CV PDF
            </Button>
          </>
        );
      }}
    </PDFDownloadLink>
  ),
  () => true // This fixes a weird lib bug -> https://github.com/diegomura/react-pdf/issues/420
);

PDFDownloadButton.displayName = "PDFTemplateWrapper";

const PDFDownload = (props) => {
  const { firebase } = useContext(FirebaseAppContext);
  const resumeId = props.match.params.id;
  const [resumeData, loading, error] = useDocument(
    firebase.firestore().doc(`resumes/${resumeId}`)
  );
  const history = useHistory();

  const renderContent = () => {
    if (loading) {
      return (
        <span>
          Loading the document data <CircularProgress />
        </span>
      );
    }

    if (error) {
      return (
        <span>Error while trying to fetch CV data: {JSON.stringify(error)}</span>
      );
    }

    return <PDFDownloadButton resume={resumeData.data()} goBack={history.goBack} />;
  };

  return <Root>{renderContent()}</Root>;
};

const Root = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;

  a {
    text-decoration: none;
    color: currentColor;
  }
`;

export default PDFDownload;
