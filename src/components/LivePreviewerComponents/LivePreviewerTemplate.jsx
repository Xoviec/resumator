import React, { useContext, useState } from "react";
import TopSection from "./Topsection";
import Introduction from "./Introduction";
import Education from "./Education";
import { useHistory } from "react-router-dom";
import Skills from "./Skills";
import PDFPreviewModal from "./PDFPreviewModal";
import PreviewControls from "./PreviewControls";
import Experience from "./Experience";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { v4 as uuidv4 } from "uuid";
import SideProjects from "./SideProjects";
import _ from "lodash";
import styled from "@emotion/styled";

const deleteEntry = (section, values, state) => {
  const clonedState = _.cloneDeep(state);
  const newSectionState = clonedState[section];
  return newSectionState.filter((s) => s.id !== values.id);
};

const addEntry = (section, values, state) => {
  const clonedState = _.cloneDeep(state);
  const newSectionState = clonedState[section];
  newSectionState.push({ ...values, id: uuidv4() });
  return newSectionState;
};

const updateEntry = (section, values, state) => {
  const clonedState = _.cloneDeep(state);
  const stateWithoutEntry = clonedState[section].filter((s) => s.id !== values.id);
  stateWithoutEntry.push(values);
  return stateWithoutEntry;
};

const LivePreviewerTemplate = ({ data }) => {
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [dataState, setDataState] = useState(data);
  const history = useHistory();
  const goTo = (path) => history.push(path);
  const { firebase } = useContext(FirebaseAppContext);

  const onSubmit = async () => {
    try {
      if (dataState.id) {
        const resumesRef = firebase
          .firestore()
          .collection("resumes")
          .doc(dataState.id);
        await resumesRef.update(dataState);
      } else {
        const resumesRef = firebase.firestore().collection("resumes").doc();
        await resumesRef.set(dataState);
      }
      history.push("/overview");
    } catch (e) {
      alert(`Error writing document. ${e.message}`);
    }
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

  const onEditSectionItem = (section, values) => {
    const newState = updateEntry(section, values, dataState);
    setDataState((prevState) => ({
      ...prevState,
      [section]: newState,
    }));
  };

  const onDeleteSectionItem = (section, values) => {
    const newStateForSection = deleteEntry(section, values, dataState);
    setDataState((prevState) => ({
      ...prevState,
      [section]: newStateForSection,
    }));
  };

  return (
    <>
      <PreviewControls
        onSaveClicked={() => onSubmit()}
        goTo={goTo}
        setShowPDFModal={setShowPDFModal}
        id={dataState.id}
      />
      <>
        {dataState.personalia && (
          <TopSection personalia={dataState.personalia} onSubmit={onSubmitSection} />
        )}

        <Introduction
          introduction={dataState.introduction}
          onSubmit={onSubmitSection}
        />
        <ColumnContainer>
          {dataState.skills && (
            <Skills skills={dataState.skills} onSubmit={onSubmitSection} />
          )}
          {dataState.education && (
            <Education
              education={dataState.education}
              onSubmit={(values) =>
                onAddNewItemForSectionHandler("education", values)
              }
              onUpdateEducation={(values) => onEditSectionItem("education", values)}
              onDeleteHandler={(values) => onDeleteSectionItem("education", values)}
            />
          )}
        </ColumnContainer>
        {dataState.projects && (
          <Experience
            onEditHandler={(values) => onEditSectionItem("projects", values)}
            onDeleteHandler={(values) => onDeleteSectionItem("projects", values)}
            onSubmit={(values) => onAddNewItemForSectionHandler("projects", values)}
            type="Projects"
            experience={dataState.projects}
          />
        )}
        {dataState.experience && (
          <Experience
            type="Work Experience"
            onEditHandler={(values) => onEditSectionItem("experience", values)}
            onDeleteHandler={(values) => onDeleteSectionItem("experience", values)}
            onSubmit={(values) =>
              onAddNewItemForSectionHandler("experience", values)
            }
            experience={dataState.experience}
          />
        )}
        {dataState.openSourceWork && (
          <SideProjects
            type="Open Source work"
            onEditHandler={(values) => onEditSectionItem("openSourceWork", values)}
            onDeleteHandler={(values) =>
              onDeleteSectionItem("openSourceWork", values)
            }
            onSubmit={(values) =>
              onAddNewItemForSectionHandler("openSourceWork", values)
            }
            projects={dataState.openSourceWork}
          />
        )}

        {dataState.publications && (
          <SideProjects
            type="Publications"
            onEditHandler={(values) => onEditSectionItem("publications", values)}
            onDeleteHandler={(values) => onDeleteSectionItem("publications", values)}
            onSubmit={(values) =>
              onAddNewItemForSectionHandler("publications", values)
            }
            projects={dataState.publications}
          />
        )}
      </>

      <PDFPreviewModal
        data={dataState}
        setShowPDFModal={setShowPDFModal}
        showPDFModal={showPDFModal}
      />
    </>
  );
};

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`;

export default LivePreviewerTemplate;
