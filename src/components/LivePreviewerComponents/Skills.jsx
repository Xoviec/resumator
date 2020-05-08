import React from "react";
import styled from "@emotion/styled";
import angularBadge from "../../assets/images/angularBadge.png";
import nodeBadge from "../../assets/images/nodeBadge.png";
import cssBadge from "../../assets/images/cssBadge.png";
import { Flex } from "rebass";
import Card from "../Card";

const Skills = ({ skills }) => {
  return (
    <Card>
      <Title>Skills</Title>
      <Flex alignItems="center" justifyContent="space-around">
        <Badge src={angularBadge} />
        <Badge src={nodeBadge} />
        <Badge src={cssBadge} />
      </Flex>
      <Subtitle>Languages - frameworks - libraries</Subtitle>
      <ul>
        {skills.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>
    </Card>
  );
};

const Badge = styled.img`
  width: 22%;
`;

const Title = styled.h2`
  margin: 0 0 16px;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
`;

export default Skills;
