import React from "react";
import ActionButtons from "./ActionButtons";
import styled from "@emotion/styled";

const SideProjectItem = ({ projectItem, onClickEdit, onDeleteHandler }) => {
  return (
    <ExperienceItemContainer id={projectItem.id}>
      <TopSection>
        <h3> {projectItem.title}</h3>
      </TopSection>
      <Description>{projectItem.description}</Description>
      <a rel="noreferrer noopener" target="_blank" href={projectItem.link}>
        {projectItem.link}
      </a>
      <ActionButtons
        className={`edit-button-${projectItem.id}`}
        onEditClick={() => onClickEdit(projectItem)}
        onDeleteClick={() => onDeleteHandler(projectItem)}
      />
    </ExperienceItemContainer>
  );
};

const Description = styled.p`
  font-size: 14px;
`;

const TopSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const ExperienceItemContainer = styled.div`
  position: relative;
  margin: 24px 0;
  padding: 16px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

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
