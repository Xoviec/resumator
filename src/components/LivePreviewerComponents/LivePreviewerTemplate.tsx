import React, { useContext, useState, FunctionComponent, useEffect } from "react";
import { Box } from "@material-ui/core";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { PreviewControls } from "./PreviewControls";
import { TopSection, PersonaliaModel } from "./TopSection";
import { Experience } from "./Experience";
import { ExperienceModel } from "./ExperienceItem";
import { Skills, SkillModel } from "./Skills";
import { SideProjects } from "./SideProjects";
import { SideProjectModel } from "./SideProjectItem";
import { Education } from "./Education";
import { EducationModel } from "./EducationItem";
import PDFPreviewModal from "./PDFPreviewModal";
import { useCollection } from "react-firebase-hooks/firestore";

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

  const [showPDFModal, setShowPDFModal] = useState(false);
  const [skillList, setSkillList] = useState<string[]>([]);

  const { firebase } = useContext(FirebaseAppContext) as any;
  const resumesRef = (firebase as any) // Remove this when typings are provided for the Firebase context.
    .firestore()
    .collection("resumes");

  const prevDocumentTitle = document.title;

  const addResume = async (resume: Resume) => {
    const doc = resumesRef.doc();

    try {
      await doc.set(resume);
      setResume({ ...resume, id: doc.id });
    } catch (e) {
      alert(`Error adding document. ${e.message}`);
    }
  };

  const updateResume = async (resume: Resume) => {
    try {
      await resumesRef.doc(resume.id).update({
        ...resume,
        isImport: false, // explicitly remove database import flag, but only when saving to firestore
      });
    } catch (e) {
      alert(`Error updating document. ${e.message}`);
    }
  };

  const [val] = useCollection(firebase.firestore().collection("allSkills"));

  useEffect(() => {
    if (val) {
      setSkillList(val.docs[0].data().skills);
    }
  }, [val]);

  useEffect(() => {
    let fullName = "";
    if (resume?.personalia?.firstName) {
      fullName += resume.personalia.firstName;
      if (resume.personalia.lastName) {
        fullName += ` ${data.personalia.lastName}`;
      }
      fullName += " - ";
    }
    document.title = `${fullName}${prevDocumentTitle}`;

    if (!resume.id) {
      addResume(resume);
    }

    return function cleanup() {
      document.title = prevDocumentTitle;
    };
  });

  const handleSubmit = (resumePartial: Partial<Resume>) => {
    const newResume = { ...resume, ...resumePartial };
    updateResume(newResume);
    setResume(newResume);
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
            options={skillList}
          />
          <Experience
            type="Work Experience"
            experience={resume.experience}
            onSubmit={(data) => handleSubmit({ experience: data })}
            options={skillList}
          />
        </Box>
        {/* Right column */}
        <Box display="flex" flexDirection="column" flex={1} gridGap={16}>
          <Skills
            skills={resume.skills}
            onSubmit={(data) => handleSubmit({ skills: data })}
            options={skillList}
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
