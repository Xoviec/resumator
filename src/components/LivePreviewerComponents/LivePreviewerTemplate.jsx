import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import TopSection from "./TopSection";
import Introduction from "./Introduction";
import Education from "./Education";
import Skills from "./Skills";
import PDFPreviewModal from "./PDFPreviewModal";
import PreviewControls from "./PreviewControls";
import Experience from "./Experience";
import SideProjects from "./SideProjects";
import { Box } from "@material-ui/core";

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
        await resumesRef.update({
          ...dataState,
          isImport: false, // explicitly remove database import flag, but only when saving to firestore
        });
      } else {
        const resumesRef = firebase.firestore().collection("resumes").doc();
        await resumesRef.set(dataState);
      }
      history.push("/overview");
    } catch (e) {
      alert(`Error writing document. ${e.message}`);
    }
  };

  const onAddNewItemForSectionHandler = (sectionKey, values) => {
    const newSectionState = [
      ...dataState[sectionKey],
      values,
    ];
    setDataState((prevState) => ({
      ...prevState,
      [sectionKey]: newSectionState,
    }));
  };

  const onSubmitSection = (sectionKey, values) => {
    setDataState((prevState) => ({
      ...prevState,
      [sectionKey]: values,
    }));
  };

  // Replace item at index with values
  const onEditSectionItem = (sectionKey, values, index) => {
    const sectionState = dataState[sectionKey];
    const newSectionState = [
      ...sectionState.slice(0, index),
      values,
      ...sectionState.slice(index + 1),
    ];
    setDataState((prevState) => ({
      ...prevState,
      [sectionKey]: newSectionState,
    }));
  };

  // Delete item at index
  const onDeleteSectionItem = (sectionKey, values, indexToDelete) => {
    const newSectionState = dataState[sectionKey].filter((_, index) => index !== indexToDelete);
    setDataState((prevState) => ({
      ...prevState,
      [sectionKey]: newSectionState,
    }));
  };

  return (
    <>
      <PreviewControls
        onSaveClicked={onSubmit}
        goTo={goTo}
        setShowPDFModal={setShowPDFModal}
        resume={dataState}
      />
      {/* <> */}
        {/* <ColumnContainer> */}
      <TopSection
        personalia={dataState.personalia}
        introduction={dataState.introduction}
        onSubmit={onSubmitSection}
      />

      {/* <Introduction
        introduction={dataState.introduction}
        onSubmit={onSubmitSection}
      /> */}
        {/* </ColumnContainer> */}

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
        {/* Left column */}
        <Box display="flex" flexDirection="column" flex={2} marginRight={{ md: 1.5 }}>
          {dataState.projects && (
            <Experience
              type="Projects"
              onEditHandler={(values, index) => onEditSectionItem("projects", values, index)}
              onDeleteHandler={(values, index) => onDeleteSectionItem("projects", values, index)}
              onSubmit={(values) => onAddNewItemForSectionHandler("projects", values)}
              experience={dataState.projects}
            />
          )}
          {dataState.experience && (
            <Experience
              type="Work Experience"
              onEditHandler={(values, index) => onEditSectionItem("experience", values, index)}
              onDeleteHandler={(values, index) => onDeleteSectionItem("experience", values, index)}
              onSubmit={(values) =>
                onAddNewItemForSectionHandler("experience", values)
              }
              experience={dataState.experience}
            />
          )}
        </Box>
        {/* Right column */}
        <Box display="flex" flexDirection="column" flex={1}>
          {dataState.skills && (
            <Skills skills={dataState.skills} onSubmit={onSubmitSection} />
          )}
          {dataState.sideProjects && (
            <SideProjects
              type="Side projects"
              onEditHandler={(values, index) => onEditSectionItem("sideProjects", values, index)}
              onDeleteHandler={(values, index) => onDeleteSectionItem("sideProjects", values, index)}
              onSubmit={(values) =>
                onAddNewItemForSectionHandler("sideProjects", values)
              }
              projects={dataState.sideProjects}
            />
          )}
          {dataState.publications && (
            <SideProjects
              type="Publications"
              onEditHandler={(values, index) => onEditSectionItem("publications", values, index)}
              onDeleteHandler={(values, index) => onDeleteSectionItem("publications", values, index)}
              onSubmit={(values) =>
                onAddNewItemForSectionHandler("publications", values)
              }
              projects={dataState.publications}
            />
          )}
          {dataState.education && (
            <Education
              education={dataState.education}
              onSubmit={(values) =>
                onAddNewItemForSectionHandler("education", values)
              }
              onEditHandler={(values, index) => onEditSectionItem("education", values, index)}
              onDeleteHandler={(values, index) => onDeleteSectionItem("education", values, index)}
            />
          )}
        </Box>
      </Box>      
        
        
      {/* </> */}

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

  @media (max-width: 970px) {
    display: block;
  }
`;

export default LivePreviewerTemplate;
