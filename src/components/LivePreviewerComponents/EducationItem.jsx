import React from "react";
import styled from "@emotion/styled";
import ActionButtons from "./ActionButtons";
import { getFormattedDate } from "../../utils/getFormattedDate";
import Typography from "@material-ui/core/Typography";

const EducationItem = ({ onEditHandler, onDeleteHandler, ...educationEntry }) => {
  return (
    <EducationItemContainer id={educationEntry.id}>
      <Typography variant={"h6"}>{educationEntry.name}</Typography>
      <Typography variant="subtitle1" color={"secondary"}>
        {educationEntry.institute}
      </Typography>
      <Typography variant="body1">
        {getFormattedDate(educationEntry.startDate)} -{" "}
        {getFormattedDate(educationEntry.endDate)}
      </Typography>
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
