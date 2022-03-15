import { memo, VoidFunctionComponent } from "react";
import { Document, Font, Page, View, Text } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import TTCommonsPro from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Regular.ttf";
import TTCommonsProMedium from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Medium.ttf";
import TTCommonsProBold from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Bold.ttf";
import TTCommonsProItalic from "../../assets/fonts/TTCommonsPro/TTCommonsPro-Italic.ttf";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import { PDFHeader, Logo } from "../PDFBuilderComponentsV2/PDFHeader";
import { PDFIntroduction } from "../PDFBuilderComponentsV2/PDFIntroduction";
import { PDFPersonalDetails } from "../PDFBuilderComponentsV2/PDFPersonalDetails";
import { PDFProjects } from "../PDFBuilderComponentsV2/PDFProjects";
import { PDFFooter } from "../PDFBuilderComponentsV2/PDFFooter";
import LogoBlack from "../../assets/images/iO-logo-black.png";

Font.register({
  family: "TTCommonsPro",
  fonts: [
    { src: TTCommonsPro, fontWeight: "normal", fontStyle: "normal" },
    { src: TTCommonsProMedium, fontWeight: "medium", fontStyle: "medium" },
    { src: TTCommonsProBold, fontWeight: "bold", fontStyle: "normal" },
    { src: TTCommonsProItalic, fontWeight: "normal", fontStyle: "italic" },
  ],
});

const PageContent = styled(View)`
  width: 100%;
  height: 100%;
  padding: 60px 40px 0;
`;

const TableView = styled(View)`
  display: flex;
  flex-direction: row;
`;

const LeftColumn = styled(View)`
  width: 125px;
  margin-right: 25px;
  padding-top: 15px;
  border-top-width: 1px;
  border-color: #000;
  border-style: hairline;
`;

const FirstPageLeftColumn = styled(LeftColumn)`
  border-color: #fff;
`;

const LeftColumnHeader = styled(Text)`
  font-family: "TTCommonsPro";
  font-size: 9px;
  font-weight: bold;
`;

const RightColumn = styled(View)`
  flex: 1;
  margin-left: 20px;
  padding-top: 12px;
  border-top-width: 1px;
  border-color: #000;
  border-style: hairline;
`;

const FirstPageRightColumn = styled(RightColumn)`
  border-color: #fff;
`;

const LogoWrapper = styled(View)`
  display: flex;
  height: 140px;
  align-items: flex-end;
`;

interface PDFTemplateProps {
  resume: ResumeModel;
}

export const PDFTemplateV2: VoidFunctionComponent<PDFTemplateProps> = memo(
  ({ resume }) => {
    return (
      <Document>
        <Page size="A4">
          <View
            render={({ pageNumber }: { pageNumber: number }) => (
              <View
                style={{
                  position: "absolute",
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: pageNumber === 1 ? "#4255cf" : "#fff",
                }}
              />
            )}
          />
          <PageContent>
            <PDFHeader personalia={resume.personalia} />

            <TableView>
              <FirstPageLeftColumn>
                <PDFPersonalDetails personalia={resume.personalia} />
              </FirstPageLeftColumn>

              <FirstPageRightColumn>
                <Text>
                  <PDFIntroduction introduction={resume.introduction} />
                </Text>
              </FirstPageRightColumn>
            </TableView>

            <PDFFooter textColor="#fff" />
          </PageContent>
        </Page>

        <Page size="A4">
          <PageContent>
            <LogoWrapper>
              <Logo src={LogoBlack} />
            </LogoWrapper>
            <TableView>
              <LeftColumn>
                <LeftColumnHeader>Projects</LeftColumnHeader>
              </LeftColumn>
              <RightColumn>
                <PDFProjects projects={resume.projects} />
              </RightColumn>
            </TableView>

            <PDFFooter fixed />
          </PageContent>
        </Page>
      </Document>
    );
  },
  () => true // This fixes a weird lib bug -> https://github.com/diegomura/react-pdf/issues/420
);

PDFTemplateV2.displayName = "PDFTemplateV2";
