import React, { useState } from "react";
import TopSection from "./Topsection";
import Introduction from "./Introduction";
import Education from "./Education";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import Experience from "./Experience";
import Skills from "./Skills";
import PDFPreviewModal from "./PDFPreviewModal";
import PreviewControls from "./PreviewControls";

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
      <PreviewControls goTo={goTo} setShowPDFModal={setShowPDFModal} />
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

      <PDFPreviewModal
        data={dataState}
        setShowPDFModal={setShowPDFModal}
        showPDFModal={showPDFModal}
      />
    </LivePreviewerTemplateContainer>
  );
};

const Content = styled.div``;

const LivePreviewerTemplateContainer = styled.div`
  background-color: white;
`;
export default LivePreviewerTemplate;
