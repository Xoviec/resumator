import {
  Document,
  Font,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import { memo, VoidFunctionComponent } from "react";
import RecklessBold from "../../assets/fonts/Reckless/TTF/Reckless-Bold.ttf";
import Reckless from "../../assets/fonts/Reckless/TTF/Reckless-Regular.ttf";
import RecklessItalic from "../../assets/fonts/Reckless/TTF/Reckless-RegularItalic.ttf";
import TTCommonsProBold from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Bold.ttf";
import TTCommonsProItalic from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Italic.ttf";
import TTCommonsProMedium from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Medium.ttf";
import TTCommonsPro from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Regular.ttf";
import LogoBlack from "../../assets/images/iO-logo-black.png";
import { ResumeLanguage } from "../../types/language";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import { PDFEducation } from "../PDFBuilderComponents/PDFEducation";
import { PDFHeader } from "../PDFBuilderComponents/PDFHeader";
import { PDFLanguages } from "../PDFBuilderComponents/PDFLanguages";
import { PDFMotivation } from "../PDFBuilderComponents/PDFMotivation";
import { PDFProjects } from "../PDFBuilderComponents/PDFProjects";
import {
  PDFSideProjects,
  PDFSideProjectType,
} from "../PDFBuilderComponents/PDFSideProjects";
import { PDFSkills } from "../PDFBuilderComponents/PDFSkills";
import { PDFWorkExperience } from "../PDFBuilderComponents/PDFWorkExperience";

Font.register({
  family: "Reckless",
  fonts: [
    { src: Reckless, fontWeight: "normal", fontStyle: "normal" },
    { src: RecklessBold, fontWeight: "bold", fontStyle: "bold" },
    { src: RecklessItalic, fontWeight: "normal", fontStyle: "italic" },
  ],
});

Font.register({
  family: "TTCommonsPro",
  fonts: [
    { src: TTCommonsPro, fontWeight: "normal", fontStyle: "normal" },
    { src: TTCommonsProMedium, fontWeight: "medium", fontStyle: "medium" },
    { src: TTCommonsProBold, fontWeight: "bold", fontStyle: "bold" },
    { src: TTCommonsProItalic, fontWeight: "normal", fontStyle: "italic" },
  ],
});

const CustomPage = styled(Page)`
  position: relative;
`;

const SecondaryHeader = styled(View)`
  position: absolute;
  top: 10px;
  left: 28px;
`;

const FooterWrapper = styled(View)`
  margin-top: 100px;
  height: 100%;
  background: #873170;
  position: relative;
  padding: 15px 37px;
`;

const FooterWrapperBlock = styled(View)`
  width: 412px;
  height: 100%;
  background: #f5b3cc;
  position: absolute;
  top: -40px;
  right: 36px;
  bottom: 36px;
`;

const styles = StyleSheet.create({
  flexView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
  },
  text: {
    fontFamily: "TTCommonsPro",
    fontSize: 18,
  },
  mb_72: {
    marginBottom: 72,
  },
});

interface PDFTemplateProps {
  resume: ResumeModel;
}

export const PDFTemplate: VoidFunctionComponent<PDFTemplateProps> = memo(
  ({ resume }) => {
    const showFooter =
      resume.education.length ||
      resume.publications.length ||
      resume.languages.length;
    return (
      <Document>
        <CustomPage size="A4" style={{ paddingBottom: 15 }}>
          <PDFHeader
            personalia={resume.personalia}
            socialLinks={resume.socialLinks}
            introduction={resume.introduction}
          />
          <SecondaryHeader fixed>
            <View
              render={({ pageNumber }) =>
                pageNumber >= 2 ? (
                  <View style={styles.flexView}>
                    <Image src={LogoBlack} style={styles.logo} />
                    <Text style={styles.text}>
                      {resume.personalia.firstName} {resume.personalia.lastName}
                    </Text>
                  </View>
                ) : null
              }
              fixed
            />
          </SecondaryHeader>

          <View>
            <PDFMotivation motivation={resume.motivation} />
            <PDFSkills skills={resume.skills} />
            <View
              render={({ pageNumber }) =>
                (pageNumber >= 2 && resume.experience.length >= 1) ||
                (pageNumber >= 2 && resume.projects.length >= 1) ? (
                  <View style={styles.mb_72} />
                ) : null
              }
              fixed
            />
            <PDFProjects projects={resume.projects} />
            <PDFWorkExperience experience={resume.experience} />
          </View>
          {showFooter ? (
            <FooterWrapper break>
              <FooterWrapperBlock />
              <PDFEducation education={resume.education} />
              <PDFLanguages resumeLanguages={resume.languages as ResumeLanguage[]} />
              <PDFSideProjects
                type={PDFSideProjectType.Publication}
                sideProjects={resume.publications}
              />
              <PDFSideProjects
                type={PDFSideProjectType.SideProject}
                sideProjects={resume.sideProjects}
              />
            </FooterWrapper>
          ) : null}
        </CustomPage>
      </Document>
    );
  },
  () => true // This fixes a weird lib bug -> https://github.com/diegomura/react-pdf/issues/420
);

PDFTemplate.displayName = "PDFTemplate";
