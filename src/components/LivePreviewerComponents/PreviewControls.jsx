import React from "react";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import saveAs from "file-saver";
import avatars from "../../assets/images/avatars";
import DropdownButton from "./DropdownButton";
import createDocx from "../../lib/createDocx";
import formatResumeFilename from "../../lib/formatResumeFilename";

const PreviewControls = ({ setShowPDFModal, goTo, onSaveClicked, resume }) => {
  const onClickDropdown = async (action) => {
    switch (action) {
      case "PDF": {
        goTo(`/download/${resume.id}`);
        return;
      }
      case "DOCX": {
        const { firstName, lastName, avatar: avatarName } = resume.personalia;
        const avatarDataUri = (avatars.find((x) => x.name === avatarName) || avatars[0]).img;
        const [ template, avatar ] = await Promise.all([
          fetch('/template.docx').then(res => res.arrayBuffer()),
          fetch(avatarDataUri).then(res => res.arrayBuffer()),
        ]);
        const docx = await createDocx(resume, template, avatar);
        const file = new Blob([ docx ], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        saveAs(file, formatResumeFilename(firstName, lastName, "docx"));
        return;
      }
      default:
        return;
    }
  };

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
          onClick={onClickDropdown}
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
