import React from "react";
import ActionButtons from "./ActionButtons";
import styled from "@emotion/styled";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const SideProjectItem = ({ projectItem, onClickEdit, onDeleteHandler }) => {
  return (
    <ExperienceItemContainer id={projectItem.id}>
      <Typography variant="h6">{projectItem.title}</Typography>
      <Typography gutterBottom variant="body1">
        {projectItem.description}
      </Typography>

      <Link
        rel="noreferrer noopener"
        target="_blank"
        color="secondary"
        href={projectItem.link}
      >
        {projectItem.link}
      </Link>
      <ActionButtons
        className={`edit-button-${projectItem.id}`}
        onEditClick={() => onClickEdit(projectItem)}
        onDeleteClick={() => onDeleteHandler(projectItem)}
      />
      <Box mt={2}>
        <Divider />
      </Box>
    </ExperienceItemContainer>
  );
};

const ExperienceItemContainer = styled.div`
  position: relative;
  margin: 24px 0;

  &:hover {
    .edit-button {
      visibility: visible;
    }
  }

  &:hover {
    ${({ id }) => `
    .edit-button-${id} {
      visibility: visible;
     }
    `}
  }
`;

export default SideProjectItem;
