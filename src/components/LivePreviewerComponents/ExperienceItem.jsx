import React from "react";
import { getFormattedDate } from "../../utils/getFormattedDate";
import ActionButtons from "./ActionButtons";
import styled from "@emotion/styled";

const ExperienceItem = ({ experienceItem, onClickEdit, onDeleteHandler }) => {
  return (
    <ExperienceItemContainer id={experienceItem.id}>
      <TopSection>
        <h3> {experienceItem.role}</h3>
        <h3>
          {getFormattedDate(experienceItem.startDate)} -{" "}
          {getFormattedDate(experienceItem.endDate)}
        </h3>
      </TopSection>
      <Description>{experienceItem.description}</Description>
      <Techniques>
        <span>
          Techniques:{" "}
          {experienceItem.stackAndTechniques &&
            experienceItem.stackAndTechniques.map((t) => (
              <span key={t.name}>{t.name} </span>
            ))}
        </span>
      </Techniques>
      <ActionButtons
        className={`edit-button-${experienceItem.id}`}
        onEditClick={() => onClickEdit(experienceItem)}
        onDeleteClick={() => onDeleteHandler(experienceItem)}
      />
    </ExperienceItemContainer>
  );
};

const Description = styled.p`
  font-size: 14px;
`;

const Techniques = styled.div`
  padding: 4px;
  margin: 0;
  font-size: 13px;
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

export default ExperienceItem;
