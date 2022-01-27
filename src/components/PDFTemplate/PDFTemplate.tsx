import { memo, VoidFunctionComponent } from "react";
import { Document, Font, Page, View, Image } from "@react-pdf/renderer";
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
import { pdfLogo } from "../PDFBuilderComponents/pdfLogo";
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

const FlexView = styled(View)`
  display: flex;
  flex-direction: row;
`;

const Footer = styled(View)`
  position: absolute;
  left: 0;
  right: 20px;
  bottom: 10px;
  height: 60px;
  text-align: right;
`;

const Logo = styled(Image)`
  position: absolute;
  right: 0;
  bottom: 10px;
  height: 40px;
`;

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

          <FlexView>
            <View>
              {/* <PDFIntroduction introduction={resume.introduction} /> */}
              <PDFSkills skills={resume.skills} />
              <PDFEducation education={resume.education} />
              <PDFSideProjects
                type={PDFSideProjectType.SideProject}
                sideProjects={resume.sideProjects}
              />
              <PDFSideProjects
                type={PDFSideProjectType.Publication}
                sideProjects={resume.publications}
              />
              <View style={{ width: "200px", height: "100vh" }}></View>
            </View>

            <View>
              {/* <PDFSocialLinks socialLinks={resume.socialLinks} /> */}
              <PDFProjects projects={resume.projects} />
              <PDFWorkExperience experience={resume.experience} />
            </View>
          </FlexView>

          <Footer fixed>
            <Logo src={pdfLogo} />
          </Footer>
        </CustomPage>
      </Document>
    );
  },
  () => true // This fixes a weird lib bug -> https://github.com/diegomura/react-pdf/issues/420
);

PDFTemplate.displayName = "PDFTemplate";
