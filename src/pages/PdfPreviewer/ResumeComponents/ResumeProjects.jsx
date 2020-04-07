import React from "react";
import { Box, Flex, Text, Heading } from "rebass";

export const ResumeProjects = (props) => {
  return (
    <>
      <Heading color="#ff450d">Projects</Heading>
      {props.projects.map((project) => {
        return (
          <>
            <Text>{project.role}</Text>
          </>
        );
      })}
    </>
  );
};
