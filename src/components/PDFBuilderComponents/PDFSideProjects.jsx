import React from "react";
import styled from "@react-pdf/styled-components";

const Root = styled.View`
  background-color: #e0e0e0;
  padding: 20px;
  width: 200px;
  margin: 8px 0;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 10px;
  font-family: "Titillium Web";
`;

const DegreeText = styled.Text`
  font-size: 10px;
  font-family: "Stratum";
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

const SideProjectItem = ({ sideProjectItem: { title, description, link } }) => {
  return (
    <Wrapper>
      <DegreeText>{title}</DegreeText>
      <CollegeText>{description}</CollegeText>
      <LinkText>{link}</LinkText>
    </Wrapper>
  );
};
export function PDFSideProjects({ sideProjects, type }) {
  if (!sideProjects || !sideProjects.length) {
    return null;
  }

  return (
    <Root wrap={false}>
      <Header>{type === "openSource" ? "OPEN SOURCE" : "PUBLICATIONS"}</Header>
      {sideProjects.map((sideProjectItem, i) => {
        return <SideProjectItem key={i} sideProjectItem={sideProjectItem} />;
      })}
    </Root>
  );
}
