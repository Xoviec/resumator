import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent, Fragment } from "react";
import { SideProjectModel } from "../LivePreviewerComponents/SideProjectItem";

const RightView = styled.View``;

const Header = styled.Text`
  font-size: 10px;
  font-family: "TTCommonsPro";
  font-weight: bold;
  font-style: bold;
  color: #fff;
`;

const DegreeText = styled.Text`
  font-family: "TTCommonsPro";
  font-weight: medium;
  fonts-style: medium;
  font-size: 10px;
`;

const CollegeText = styled.Text`
  font-family: "Reckless";
  font-size: 10px;
  font-style: italic;
  color: #000;
`;

const DateText = styled.Text`
  font-family: "TTCommonsPro";
  font-size: 10px;
  width: 180px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const WrapperColumn = styled.View`
  display: flex;
  flex-direction: column;
`;

const HrGray = styled.View`
  width: 363px;
  opacity: 0.2;
  margin: 10px 0;
  border: 0.5px solid #000;
`;

const HrBold = styled.View`
  width: 363px;
  margin-bottom: 10px;
  border: 0.5px solid #000;
`;

const HrWhite = styled.View`
  width: 87px;
  margin-bottom: 10px;
  border: 0.5px solid #fff;
`;

interface SideProjectItemProps {
  sideProjectItem: SideProjectModel;
}

const SideProjectItem: VoidFunctionComponent<SideProjectItemProps> = ({
  sideProjectItem: { title, description, link },
}) => {
  return (
    <Row>
      <WrapperColumn style={{ marginRight: "auto", width: 150 }}>
        <DegreeText>{title}</DegreeText>
        <CollegeText href={link} style={{ textDecoration: "none" }}>
          {link}
        </CollegeText>
      </WrapperColumn>
      <DateText>{description}</DateText>
    </Row>
  );
};

export enum PDFSideProjectType {
  SideProject,
  Publication,
}

interface PDFSideProjectsProps {
  sideProjects: SideProjectModel[];
  type: PDFSideProjectType;
}

export const PDFSideProjects: VoidFunctionComponent<PDFSideProjectsProps> = ({
  sideProjects,
  type,
}) => {
  if (!sideProjects || !sideProjects.length) {
    return null;
  }

  const title =
    type === PDFSideProjectType.SideProject ? "Side Projects" : "Publications";

  return (
    <Row style={{ paddingRight: 24, marginTop: 17 }}>
      <WrapperColumn style={{ flexGrow: 1 }} fixed>
        <HrWhite />
        <Header>{title}</Header>
      </WrapperColumn>

      <RightView>
        <HrBold fixed />
        {sideProjects.map((sideProjectItem, i) => {
          return (
            <Fragment key={i}>
              {i >= 1 && <HrGray fixed />}
              <SideProjectItem sideProjectItem={sideProjectItem} />
            </Fragment>
          );
        })}
      </RightView>
    </Row>
  );
};
