import { memo, VoidFunctionComponent } from "react";
import { Document, Font, Page, View, Image } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import Stratum1 from "../../assets/fonts/Stratum1-Bold.ttf";
import Tillium from "../../assets/fonts/Titillium_Web/TitilliumWeb-Light.ttf";
import {
  PDFSideProjects,
  PDFSideProjectType,
} from "../PDFBuilderComponentsFM/PDFSideProjects";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import { pdfLogo } from "../PDFBuilderComponentsFM/pdfLogo";
import { PDFProjects } from "../PDFBuilderComponentsFM/PDFProjects";
import { PDFWorkExperience } from "../PDFBuilderComponentsFM/PDFWorkExperience";
import { PDFIntroduction } from "../PDFBuilderComponentsFM/PDFIntroduction";
import { PDFSocialLinks } from "../PDFBuilderComponentsFM/PDFSocialLinks";
import { PDFSkills } from "../PDFBuilderComponentsFM/PDFSkills";
import { PDFEducation } from "../PDFBuilderComponentsFM/PDFEducation";
import { PDFHeader } from "../PDFBuilderComponentsFM/PDFHeader";

Font.register({ family: "Stratum", src: Stratum1 });
Font.register({
  family: "Titillium Web",
  format: "truetype",
  src: Tillium,
});

const CustomPage = styled(Page)`
  padding: 20px 20px 70px;
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

export const PDFTemplateFM: VoidFunctionComponent<PDFTemplateProps> = memo(
  ({ resume }) => {
    return (
      <Document>
        <CustomPage size="A4">
          <PDFHeader personalia={resume.personalia} />

          <FlexView>
            <View>
              <PDFIntroduction introduction={resume.introduction} />
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
              <PDFSocialLinks socialLinks={resume.socialLinks} />
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

PDFTemplateFM.displayName = "PDFTemplate";