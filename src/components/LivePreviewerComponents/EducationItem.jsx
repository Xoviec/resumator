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

      <ActionButtonsWrapper className="action-buttons">
        <ActionButtons
          onEditClick={() => onEditHandler(educationEntry)}
          onDeleteClick={() => onDeleteHandler(educationEntry)}
          tooltipTextLabel="education"
        />
      </ActionButtonsWrapper>
    </EducationItemContainer>
  );
};

const EducationItemContainer = styled.div`
  position: relative;
  margin: 16px 0;

  &:hover .action-buttons {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ActionButtonsWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  opacity: 0;
  transform: translateX(3px);
  transition: opacity 225ms ease-out, transform 225ms ease-out;
`;

export default EducationItem;
