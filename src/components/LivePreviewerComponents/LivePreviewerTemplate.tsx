import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { PDFPreviewModal } from "./PDFPreviewModal";
import { PreviewControls } from "./PreviewControls";
import { ResumeModel } from "./ResumeModel";
import { SideProjects } from "./SideProjects";
import { Skills } from "./Skills";
import { SocialLinks } from "./SocialLinks";
import { TopSection } from "./TopSection";
import { Introduction } from "./Introduction";
import { ThemeStyle } from "./PreviewControls";

interface LivePreviewerTemplateProps {
  data: ResumeModel;
}

const LivePreviewerTemplate: FunctionComponent<LivePreviewerTemplateProps> = ({
  data,
}) => {
  const [resume, setResume] = useState<ResumeModel>(data);

  const { personalia } = resume;

  useEffect(() => {
    const defaultTitle = "CV | iO";
    let fullName = "";
    if (personalia?.firstName) {
      fullName += personalia.firstName;
      if (personalia.lastName) {
        fullName += ` ${personalia.lastName}`;
      }
      fullName += " - ";
    }

    document.title = `${fullName}${defaultTitle}`;
  }, [personalia.firstName, personalia.lastName]);

  const { firebase } = useFirebaseApp();

  const resumesRef = firebase // Remove this when typings are provided for the Firebase context.
    .firestore()
    .collection("resumes");

  const updateResume = async (resume: ResumeModel) => {
    try {
      await resumesRef.doc(resume.id).update({
        ...resume,
        isImport: false, // explicitly remove database import flag, but only when saving to firestore
      });
      setResume(resume);
    } catch (e) {
      alert(`Error updating document. ${e instanceof Error ? `${e.message}` : ""}`);
    }
  };

  const [showPDFModal, setShowPDFModal] = useState(false);
  const [themeStyle, setThemeStyle] = useState<"iO" | "FrontMen">("iO");

  const handleSubmit = (resumePartial: Partial<ResumeModel>) => {
    const newResume = { ...resume, ...resumePartial };
    updateResume(newResume);
  };

  return (
    <>
      <PreviewControls
        setShowPDFModal={setShowPDFModal}
        setThemeStyle={setThemeStyle}
        resume={resume}
      />
      <TopSection
        personalia={{
          ...resume.personalia,
        }}
        introduction={resume.introduction}
        isArchived={resume.isArchived}
        onSubmit={(data) => {
          const { introduction, ...personalia } = data;
          handleSubmit({
            personalia,
            introduction,
          });
        }}
      />
      <Introduction
        introText={resume.motivation ? resume.motivation : ""}
        onSubmit={(data) => {
          handleSubmit({
            motivation: data.motivation,
          });
        }}
      />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        marginTop={2}
        gap="16px"
      >
        {/* Left column */}
        <Box display="flex" flexDirection="column" flex={2} gap="16px">
          <Experience
            type="Projects via iO"
            skills={resume.skills}
            experience={resume.projects}
            onSubmit={(projects, skills) => handleSubmit({ projects, skills })}
          />
          <Experience
            type="Work Experience"
            skills={resume.skills}
            experience={resume.experience}
            onSubmit={(experience, skills) => handleSubmit({ experience, skills })}
          />
        </Box>
        {/* Right column */}
        <Box display="flex" flexDirection="column" flex={1} gap="16px">
          <SocialLinks
            socialLinks={resume.socialLinks}
            onSubmit={(data) => handleSubmit({ socialLinks: data })}
          />
          <Skills
            skills={resume.skills}
            onSubmit={(data) => handleSubmit({ skills: data })}
          />
          <SideProjects
            type="Side projects"
            projects={resume.sideProjects}
            onSubmit={(data) => handleSubmit({ sideProjects: data })}
          />
          <SideProjects
            type="Publications"
            projects={resume.publications}
            onSubmit={(data) => handleSubmit({ publications: data })}
          />
          <Education
            education={resume.education}
            onSubmit={(data) => handleSubmit({ education: data })}
          />
        </Box>
      </Box>
      <PDFPreviewModal
        resume={resume}
        setShowPDFModal={setShowPDFModal}
        themeStyle={themeStyle as ThemeStyle}
        showPDFModal={showPDFModal}
      />
    </>
  );
};

export default LivePreviewerTemplate;
