import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useFirebaseApp } from "../../context/FirebaseContext";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { PDFPreviewModal } from "./PDFPreviewModal";
import { PreviewControls } from "./PreviewControls";
import { ResumeModel } from "./ResumeModel";
import { SideProjects } from "./SideProjects";
import { Skills } from "./Skills";
import { SocialLinks } from "./SocialLinks";
import { TopSection } from "./TopSection";

interface LivePreviewerTemplateProps {
  data: ResumeModel;
}

const LivePreviewerTemplate: FunctionComponent<LivePreviewerTemplateProps> = ({
  data,
}) => {
  const [resume, setResume] = useState<ResumeModel>(data);

  useEffect(() => {
    setResume(data);
  }, [data]);

  const { personalia } = resume;

  useEffect(() => {
    const defaultTitle = "CV | Frontmen";
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

  const handleSubmit = (resumePartial: Partial<ResumeModel>) => {
    const newResume = { ...resume, ...resumePartial };
    updateResume(newResume);
  };

  return (
    <>
      <PreviewControls setShowPDFModal={setShowPDFModal} resume={resume} />
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
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        marginTop={2}
        gap="16px"
      >
        {/* Left column */}
        <Box display="flex" flexDirection="column" flex={2} gap="16px">
          <Experience
            type="Projects"
            experience={resume.projects}
            onSubmit={(data) =>
              handleSubmit({
                projects: data,
              })
            }
          />
          <Experience
            type="Work Experience"
            experience={resume.experience}
            onSubmit={(data) => handleSubmit({ experience: data })}
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
        showPDFModal={showPDFModal}
      />
    </>
  );
};

export default LivePreviewerTemplate;
