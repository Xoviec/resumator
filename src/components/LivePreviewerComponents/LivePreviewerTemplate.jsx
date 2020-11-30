import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { TopSection } from "./TopSection";
import Education from "./Education";
import { Skills } from "./Skills";
import PDFPreviewModal from "./PDFPreviewModal";
import PreviewControls from "./PreviewControls";
import { Experience } from "./Experience";
import { SideProjects } from "./SideProjects";
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
    console.log(sectionKey, values);
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
      <TopSection
        personalia={{ ...dataState.personalia, introduction: dataState.introduction }}
        onSubmit={(data) => {
          const { introduction, ...personalia } = data;
          onSubmitSection("personalia", personalia);
          onSubmitSection("introduction", introduction);
        }}
      />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        marginTop={1}
        // gridGap does not use the material spacing system, so 8 is needed here for 8px.
        gridGap={8}
      >
        {/* Left column */}
        <Box
          display="flex"
          flexDirection="column"
          flex={2}
          gridGap={8}
        >
          <Experience
            type="Projects"
            experience={dataState.projects}
            onSubmit={(data) => onSubmitSection("projects", data)}
          />
          <Experience
            type="Work Experience"
            experience={dataState.experience}
            onSubmit={(data) => onSubmitSection("experience", data)}
          />
        </Box>
        {/* Right column */}
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          gridGap={8}
        >
          <Skills skills={dataState.skills} onSubmit={(data) => onSubmitSection("skills", data)} />
          <SideProjects
            type="Side projects"
            projects={dataState.sideProjects}
            onSubmit={(data) => onSubmitSection("sideProjects", data)}
          />
          <SideProjects
            type="Publications"
            projects={dataState.publications}
            onSubmit={(data) => onSubmitSection("publications", data)}
          />
          <Education
            education={dataState.education}
            onSubmit={(values) =>
              onAddNewItemForSectionHandler("education", values)
            }
            onEditHandler={(values, index) => onEditSectionItem("education", values, index)}
            onDeleteHandler={(values, index) => onDeleteSectionItem("education", values, index)}
          />
        </Box>
      </Box>      

      <PDFPreviewModal
        data={dataState}
        setShowPDFModal={setShowPDFModal}
        showPDFModal={showPDFModal}
      />
    </>
  );
};

export default LivePreviewerTemplate;
