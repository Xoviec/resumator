import { Box } from "@material-ui/core";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useFirebaseApp } from "../../context/FirebaseContext";
import { Education } from "./Education";
import { EducationModel } from "./EducationItem";
import { Experience } from "./Experience";
import { ExperienceModel } from "./ExperienceItem";
import PDFPreviewModal from "./PDFPreviewModal";
import { PreviewControls } from "./PreviewControls";
import { SideProjectModel } from "./SideProjectItem";
import { SideProjects } from "./SideProjects";
import { SkillModel, Skills } from "./Skills";
import { PersonaliaModel, TopSection } from "./TopSection";
import { SocialLinks, SocialLinkModel } from "./SocialLinks";

interface Resume {
  id: string;
  personalia: PersonaliaModel;
  introduction: string | undefined;
  projects: ExperienceModel[];
  experience: ExperienceModel[];
  skills: SkillModel[];
  sideProjects: SideProjectModel[];
  publications: SideProjectModel[];
  education: EducationModel[];
  socialLinks: SocialLinkModel[];
}

interface LivePreviewerTemplateProps {
  data: Resume;
}

const LivePreviewerTemplate: FunctionComponent<LivePreviewerTemplateProps> = ({
  data,
}) => {
  const [resume, setResume] = useState<Resume>(data);

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

  const addResume = useCallback(
    async (resume: Resume) => {
      const doc = resumesRef.doc();

      try {
        await doc.set(resume);
        setResume({ ...resume, id: doc.id });
      } catch (e) {
        alert(`Error adding document. ${e instanceof Error ? `${e.message}` : ""}`);
      }
    },
    [resumesRef]
  );

  const updateResume = async (resume: Resume) => {
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

  useEffect(() => {
    if (!resume.id) {
      addResume(resume);
    }
  }, [addResume, resume]);

  const [showPDFModal, setShowPDFModal] = useState(false);

  const handleSubmit = (resumePartial: Partial<Resume>) => {
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
        // gridGap does not use the material spacing system, so 8 is needed here for 8px.
        gridGap={16}
      >
        {/* Left column */}
        <Box display="flex" flexDirection="column" flex={2} gridGap={16}>
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
        <Box display="flex" flexDirection="column" flex={1} gridGap={16}>
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
        data={resume}
        setShowPDFModal={setShowPDFModal}
        showPDFModal={showPDFModal}
      />
    </>
  );
};

export default LivePreviewerTemplate;
