import React from "react";
import styled from "@emotion/styled";
import ActionButtons from "./ActionButtons";

const EducationItem = ({ onEditHandler, onDeleteHandler, ...educationEntry }) => {
  return (
    <EducationItemContainer id={educationEntry.id}>
      <p>
        <b>{educationEntry.name}</b>
      </p>
      <p>{educationEntry.institute}</p>
      <p>
        {educationEntry.startDate} - {educationEntry.endDate}
      </p>
      <ActionButtons
        className={`edit-button-${educationEntry.id}`}
        onEditClick={() => onEditHandler(educationEntry)}
        onDeleteClick={() => onDeleteHandler(educationEntry)}
      />
    </EducationItemContainer>
  );
};

const EducationItemContainer = styled.div`
  position: relative;
  margin: 16px 0;

  &:hover {
    ${({ id }) => `
    .edit-button-${id} {
      visibility: visible;
     }
    `}
  }
`;
export default EducationItem;
