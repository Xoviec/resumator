import React, { useState } from "react";
import TopSection from "./Topsection";
import Introduction from "./Introduction";
import Education from "./Education";
import styled from "@emotion/styled";
import { Button } from "rebass";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import { PDFDocument } from "../../pages/PdfPreviewer";
import { PDFViewer } from "@react-pdf/renderer";
import Experience from "./Experience";
import Skills from "./Skills";

const deleteEntry = (section, values, state) => {
  return state[section].filter((s) => s.id !== values.id);
};

const addEntry = (section, values, state) => {
  const newState = state[section];
  newState.push(values);
  return newState;
};

const updateEntry = (section, values, state) => {
  const stateWithoutEntry = state[section].filter((s) => s.id !== values.id);
  stateWithoutEntry.push(values);
  return stateWithoutEntry;
};

const LivePreviewerTemplate = ({ data }) => {
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [dataState, setDataState] = useState(data);
  const history = useHistory();
  const goTo = (path) => history.push(path);

  const onEditHandler = (section, values) => {
    const newState = updateEntry(section, values, dataState);
    console.log(newState);
    setDataState((prevState) => ({
      ...prevState,
      [section]: newState,
    }));
  };

  const deleteHandler = (section, values) => {
    const newStateForSection = deleteEntry(section, values.id, dataState);
    setDataState((prevState) => ({
      ...prevState,
      [section]: newStateForSection,
    }));
  };

  const onAddNewItemForSectionHandler = (section, values) => {
    const updatedSection = addEntry(section, values, dataState);
    setDataState((prevState) => ({
      ...prevState,
      [section]: updatedSection,
    }));
  };

  const onSubmitSection = (sectionKey, values) => {
    setDataState((prevState) => ({
      ...prevState,
      [sectionKey]: values,
    }));
  };

  return (
    <LivePreviewerTemplateContainer>
      <TopSide>
        <div>
          <StyledButton
            onClick={() => goTo(`/overview`)}
            variant="secondary"
            type="button"
          >
            Back to overview
          </StyledButton>
        </div>

        <div>
          <StyledButton variant="secondary" type="button">
            Download
          </StyledButton>
          <StyledButton
            onClick={() => {
              setShowPDFModal(true);
            }}
            variant="secondary"
            type="button"
          >
            Preview
          </StyledButton>

          <StyledButton variant="secondary" type="button">
            Share
          </StyledButton>
          <StyledButton variant="primary" type="button">
            Save
          </StyledButton>
        </div>
      </TopSide>
      <Content>
        {dataState.personalia && (
          <TopSection personalia={dataState.personalia} onSubmit={onSubmitSection} />
        )}
        {dataState.introduction && (
          <Introduction
            introduction={dataState.introduction}
            onSubmit={onSubmitSection}
          />
        )}
        {data.skills && <Skills skills={data.skills} />}
        {dataState.education && (
          <Education
            education={dataState.education}
            onSubmit={(values) => onAddNewItemForSectionHandler("education", values)}
            onUpdateEducation={(values) => onEditHandler("education", values)}
            onDeleteHandler={(values) => deleteHandler("education", values)}
          />
        )}
        {dataState.projects && (
          <Experience
            onEditHandler={(values) => onEditHandler("projects", values)}
            onDeleteHandler={(values) => deleteHandler("projects", values)}
            onSubmit={(values) => onAddNewItemForSectionHandler("projects", values)}
            type="Projects"
            experience={dataState.projects}
          />
        )}
        {dataState.experience && (
          <Experience
            type="Work Experience"
            onEditHandler={(values) => onEditHandler("experience", values)}
            onDeleteHandler={(values) => deleteHandler("experience", values)}
            onSubmit={(values) =>
              onAddNewItemForSectionHandler("experience", values)
            }
            experience={dataState.experience}
          />
        )}
      </Content>

      {showPDFModal && (
        <StyledModal
          isOpen={showPDFModal}
          onRequestClose={() => setShowPDFModal(false)}
          contentLabel="PDF preview"
          ariaHideApp={false}
        >
          <ModalContent>
            <PDFViewer width={"100%"} height={"100%"}>
              <PDFDocument resume={dataState} />
            </PDFViewer>
          </ModalContent>
        </StyledModal>
      )}
    </LivePreviewerTemplateContainer>
  );
};
const StyledModal = styled(Modal)`
  margin: 32px;
  padding: 32px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const ModalContent = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const TopSide = styled.div`
  display: flex;
  grid-gap: 8px;
  padding: 16px;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const Content = styled.div``;

const LivePreviewerTemplateContainer = styled.div`
  background-color: white;
`;
export default LivePreviewerTemplate;
