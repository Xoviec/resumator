import React, { useState } from "react";
import styled from "@emotion/styled";
import { Typography, Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { getFormattedDate } from "../../utils/getFormattedDate";
import ActionButtons from "./ActionButtons";
import Chip from "@material-ui/core/Chip";

const ExperienceItem = ({ experienceItem, onClickEdit, onDeleteHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  let editor;

  try {
    editor = convertFromRaw(JSON.parse(experienceItem.description));
    editor = EditorState.createWithContent(editor);
    editor = stateToHTML(editor.getCurrentContent());
  } catch (e) {
    editor = null;
  }

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
      <Grid
        className={!isOpen ? "container" : ""}
        style={{ maxHeight: isOpen ? null : 60 }}
      >
        {editor ? (
          <div dangerouslySetInnerHTML={{ __html: editor }} />
        ) : (
          experienceItem.description
        )}
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
        <SkillsContainer>
          {experienceItem.skills &&
            experienceItem.skills.map(({ name }) => (
              <CustomChip
                key={name}
                size="small"
                variant="outlined"
                label={name}
                color="secondary"
              />
            ))}
        </SkillsContainer>
      </Techniques>
      <ActionButtons
        className={`edit-button-${experienceItem.id}`}
        onEditClick={() => onClickEdit(experienceItem)}
        onDeleteClick={() => onDeleteHandler(experienceItem)}
      />
    </ExperienceItemContainer>
  );
};

const CHIP_GUTTER = 8;
const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: -${CHIP_GUTTER}px;
`;

const CustomChip = styled(Chip)`
  margin-left: ${CHIP_GUTTER}px;
  margin-top: ${CHIP_GUTTER}px;
`;

const Techniques = styled.div`
  display: flex;
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
