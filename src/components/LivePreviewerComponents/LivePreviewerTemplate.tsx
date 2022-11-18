import { Box, Typography } from "@mui/material";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
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
import { Motivation } from "./Motivation";
import { ThemeStyle } from "./PreviewControls";
import { Page } from "../layout";
import Languages from "./Languages";
import { useFetchData } from "../../hooks/useFetchData";
import {
  Language,
  LanguageProficiencyMap,
  Proficiency,
  ResumeLanguage,
} from "../../types/language";
import {
  transformResumeLanguages,
  convertSecondsToDateTimeString,
} from "../../utils";

export interface LivePreviewerTemplateProps {
  data: ResumeModel;
}

const LivePreviewerTemplate: FunctionComponent<LivePreviewerTemplateProps> = ({
  data,
}) => {
  const [resume, setResume] = useState<ResumeModel>(data);
  const [title, setTitle] = useState("");

  const { data: availableLanguages } = useFetchData<Language[]>({
    collectionName: "languages",
  });

  const { data: proficiencies } = useFetchData<Proficiency[]>({
    collectionName: "proficiencies",
  });

  const { personalia } = resume;

  useEffect(() => {
    let fullName = "";
    if (personalia?.firstName) {
      fullName += personalia.firstName;
      if (personalia.lastName) {
        fullName += ` ${personalia.lastName}`;
      }
    }
    setTitle(fullName);
  }, [personalia.firstName, personalia.lastName]);

  const updateResumeState = useCallback(
    (updatedResume: ResumeModel) => {
      setResume({
        ...updatedResume,
        languages: transformResumeLanguages(
          availableLanguages,
          proficiencies,
          updatedResume.languages as LanguageProficiencyMap[]
        ),
        personalia: {
          ...updatedResume.personalia,
          role: updatedResume.personalia.role || "Experienced Developer",
        },
      });
    },
    [availableLanguages, proficiencies]
  );

  useEffect(() => {
    updateResumeState(data);
  }, [data, updateResumeState]);

  const { firebase } = useFirebaseApp();

  const resumesRef = firebase // Remove this when typings are provided for the Firebase context.livetem
    .firestore()
    .collection("resumes");

  const updateResume = async (resume: ResumeModel) => {
    try {
      const { lastUpdated, ...restResume } = resume;
      await resumesRef.doc(resume.id).update({
        ...restResume,
        isImport: false, // explicitly remove database import flag, but only when saving to firestore
      });
      updateResumeState(resume);
    } catch (e) {
      alert(`Error updating document. ${e instanceof Error ? `${e.message}` : ""}`);
    }
  };

  const [showPDFModal, setShowPDFModal] = useState(false);
  const [themeStyle, setThemeStyle] = useState<"iO">("iO");

  const handleSubmit = (resumePartial: Partial<ResumeModel>) => {
    const newResume = { ...resume, ...resumePartial };
    updateResume({ ...newResume, lastUpdated: Date.now() });
  };

  const dateTimeString = convertSecondsToDateTimeString(resume.lastUpdated);
  return (
    <Page title={title}>
      <>
        <PreviewControls
          setShowPDFModal={setShowPDFModal}
          setThemeStyle={setThemeStyle}
          resume={resume}
          onToggleIsArchived={() => {
            handleSubmit({
              isArchived: !resume.isArchived,
            });
          }}
        />
        <Typography
          variant="subtitle1"
          align="right"
          style={{
            fontSize: "0.625rem",
          }}
        >
          Last modified: {dateTimeString}
        </Typography>
        <TopSection
          personalia={personalia}
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
        <Motivation
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
            <Languages
              resumeLanguages={resume.languages as ResumeLanguage[]}
              onSubmit={(data) => handleSubmit({ languages: data })}
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
    </Page>
  );
};

export default LivePreviewerTemplate;
