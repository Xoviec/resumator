import React from "react";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import DropdownButton from "./DropdownButton";
import downloadResume from "../../lib/downloadResume";

const PreviewControls = ({ setShowPDFModal, goTo, onSaveClicked, resume }) => {
  return (
    <TopSide>
      <>
        <StyledButton
          onClick={() => goTo(`/overview`)}
          variant="contained"
          type="button"
        >
          Back to overview
        </StyledButton>
      </>

      <div>
        <DropdownButton
          label="Download as.."
          actions={["PDF", "DOCX"]}
          onClick={(action) => downloadResume(resume, action)}
        />

        <StyledButton
          onClick={() => setShowPDFModal(true)}
          variant="contained"
          type="button"
        >
          Preview
        </StyledButton>

        <StyledButton
          onClick={onSaveClicked}
          variant="contained"
          type="button"
          color="primary"
        >
          Save
        </StyledButton>
      </div>
    </TopSide>
  );
};

const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const TopSide = styled.div`
  display: flex;
  grid-gap: 8px;
  padding: 16px;
  justify-content: space-between;
`;

export default PreviewControls;
