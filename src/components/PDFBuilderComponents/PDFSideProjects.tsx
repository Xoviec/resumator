import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";
import { SideProjectModel } from "../LivePreviewerComponents/SideProjectItem";

const Root = styled.View`
  background-color: #e0e0e0;
  padding: 20px;
  width: 200px;
  margin: 8px 0;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 10px;
  font-family: "TTCommonsPro";
`;

const DegreeText = styled.Text`
  font-size: 10px;
  font-family: "TTCommonsPro";
`;
const CollegeText = styled.Text`
  margin-top: 4px;
  font-size: 10px;
`;

const LinkText = styled.Text`
  font-size: 9px;
  color: #181626;
  margin-top: 4px;
`;

const Wrapper = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
`;

interface SideProjectItemProps {
  sideProjectItem: SideProjectModel;
}

const SideProjectItem: VoidFunctionComponent<SideProjectItemProps> = ({
  sideProjectItem: { title, description, link },
}) => {
  return (
    <Wrapper>
      <DegreeText>{title}</DegreeText>
      <CollegeText>{description}</CollegeText>
      <LinkText>{link}</LinkText>
    </Wrapper>
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
    type === PDFSideProjectType.SideProject ? "SIDE PROJECTS" : "PUBLICATIONS";

  return (
    <Root wrap={true}>
      <Header>{title}</Header>
      {sideProjects.map((sideProjectItem, i) => {
        return <SideProjectItem key={i} sideProjectItem={sideProjectItem} />;
      })}
    </Root>
  );
};
