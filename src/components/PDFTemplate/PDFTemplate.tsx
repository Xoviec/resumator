import { memo, VoidFunctionComponent } from "react";
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
import Reckless from "../../assets/fonts/Reckless/TTF/Reckless-Regular.ttf";
import RecklessBold from "../../assets/fonts/Reckless/TTF/Reckless-Bold.ttf";
import RecklessItalic from "../../assets/fonts/Reckless/TTF/Reckless-RegularItalic.ttf";
import TTCommonsPro from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Regular.ttf";
import TTCommonsProMedium from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Medium.ttf";
import TTCommonsProBold from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Bold.ttf";
import TTCommonsProItalic from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Italic.ttf";
import {
  PDFSideProjects,
  PDFSideProjectType,
} from "../PDFBuilderComponents/PDFSideProjects";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import LogoBlack from "../../assets/images/iO-logo-black.png";
import { PDFProjects } from "../PDFBuilderComponents/PDFProjects";
import { PDFWorkExperience } from "../PDFBuilderComponents/PDFWorkExperience";
import { PDFIntroduction } from "../PDFBuilderComponents/PDFIntroduction";
import { PDFSocialLinks } from "../PDFBuilderComponents/PDFSocialLinks";
import { PDFSkills } from "../PDFBuilderComponents/PDFSkills";
import { PDFEducation } from "../PDFBuilderComponents/PDFEducation";
import { PDFHeader } from "../PDFBuilderComponents/PDFHeader";

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
  top: 0;
  left: 28px;
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
    return (
      <Document>
        <CustomPage size="A4">
          <PDFHeader
            personalia={resume.personalia}
            socialLinks={resume.socialLinks}
            introduction={resume.introduction}
          />

          <View>
            {/* <PDFIntroduction introduction={resume.introduction} /> */}
            <PDFSkills skills={resume.skills} />
            <View
              render={({ pageNumber }) =>
                pageNumber >= 2 ? <View style={styles.mb_72} /> : null
              }
              fixed
            />
            <PDFWorkExperience experience={resume.experience} />
            <PDFEducation education={resume.education} />
            {/* <PDFSideProjects
              type={PDFSideProjectType.SideProject}
              sideProjects={resume.sideProjects}
            /> */}
            <PDFSideProjects
              type={PDFSideProjectType.Publication}
              sideProjects={resume.publications}
            />
            {/* <PDFSocialLinks socialLinks={resume.socialLinks} /> */}
            {/* <PDFProjects projects={resume.projects} /> */}
          </View>

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
        </CustomPage>
      </Document>
    );
  },
  () => true // This fixes a weird lib bug -> https://github.com/diegomura/react-pdf/issues/420
);

PDFTemplate.displayName = "PDFTemplate";
