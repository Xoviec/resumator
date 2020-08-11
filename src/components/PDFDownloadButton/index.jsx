import React, { useState, memo } from "react";
import styled from "@emotion/styled";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CircularProgress, Tooltip } from "@material-ui/core";
import GetApp from "@material-ui/icons/GetApp";
import ErrorIcon from "@material-ui/icons/Error";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PDFTemplate from "../PDFTemplate/PDFTemplate";
import { getCVFileName } from "../../utils/getCVFileName";

const DownloadButton = memo(
  ({ resume }) => (
    <PDFDownloadLink
      document={<PDFTemplate resume={resume} />}
      fileName={getCVFileName(
        resume.personalia.firstName,
        resume.personalia.lastName
      )}
    >
      {({ loading, error }) => {
        if (loading) {
          return <CircularProgress />;
        }

        if (error) {
          console.error(error);

          return <ErrorIcon />;
        }

        return <GetApp />;
      }}
    </PDFDownloadLink>
  ),
  () => true // This fixes a weird lib bug -> https://github.com/diegomura/react-pdf/issues/420
);

DownloadButton.displayName = "DownloadButton";

const PDFDownloadButton = ({ resume }) => {
  const [generate, setGenerate] = useState(false);

  if (generate) {
    return (
      <Tooltip aria-label="Download" title="Download">
        <IconWrapper>
          <DownloadButton resume={resume} />
        </IconWrapper>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      aria-label="Generate file for download"
      title="Generate file for download"
    >
      <IconWrapper onClick={() => setGenerate(true)}>
        <FileCopyIcon />
      </IconWrapper>
    </Tooltip>
  );
};

const IconWrapper = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background: none;
  border: none;
  outline: none;

  a {
    text-decoration: none;
    color: currentColor;
  }
`;

export default PDFDownloadButton;
