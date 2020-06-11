import React, { useState } from "react";
import { getFormattedDate } from "../../utils/getFormattedDate";
import ActionButtons from "./ActionButtons";
import styled from "@emotion/styled";
import { Typography, Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import CustomChip from "./CustomChip";
import Box from "@material-ui/core/Box";

const ExperienceItem = ({ experienceItem, onClickEdit, onDeleteHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ExperienceItemContainer id={experienceItem.id}>
      <TopSection>
        <Typography variant="h6">{experienceItem.role}</Typography>
        <Typography variant="subtitle1">{experienceItem.company}</Typography>
        <Typography gutterBottom variant="body1">
          {getFormattedDate(experienceItem.startDate)} -
          {getFormattedDate(experienceItem.endDate)}
        </Typography>
      </TopSection>
      <Grid style={{ overflowY: 'hidden', maxHeight: isOpen ? null : 50 }}>
        <div dangerouslySetInnerHTML={{ __html: experienceItem.description }} />
      </Grid>
      <Link
        color="secondary"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prevState) => !prevState);
        }}
      >
        {isOpen ? "Read less" : "Read more"}
      </Link>
      <Techniques>
        <Typography variant="subtitle2">Skills:</Typography>
        {experienceItem.skills &&
          experienceItem.skills.map(({ name }) => (
            <ChipContainer key={name}>
              <CustomChip
                size="small"
                variant="outlined"
                label={name}
                color="secondary"
              />
            </ChipContainer>
          ))}
      </Techniques>
      <ActionButtons
        className={`edit-button-${experienceItem.id}`}
        onEditClick={() => onClickEdit(experienceItem)}
        onDeleteClick={() => onDeleteHandler(experienceItem)}
      />
      <Box mt={2}>
        <Divider />
      </Box>
    </ExperienceItemContainer>
  );
};

const ChipContainer = styled.div`
  margin: 0 8px;
`;

const Techniques = styled.div`
  display: flex;
  align-items: center;
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

export default ExperienceItem;
