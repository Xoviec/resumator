import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TruncatedChip } from "../Material/TruncatedChip";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormColumn, FormRow, FormSkillsSelect } from "../Form";
import update from "immutability-helper";

export interface SkillModel {
  name: string;
}
interface SkillsProps {
  skills: SkillModel[];
  onSubmit: (skills: SkillModel[]) => void;
}

export const Skills: FunctionComponent<SkillsProps> = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState(skills);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

  useEffect(() => {
    setCards(skills);
  }, [skills]);

  return (
    <Section
      title="Skills"
      action="edit"
      actionTooltip="Edit skills"
      actionOnClick={() => setIsEditing(true)}
    >
      <Box display="flex" flexWrap="wrap" gap="8px">
        {cards.map((skill, idx) => (
          <TruncatedChip
            key={skill?.name}
            label={skill?.name}
            moveCard={moveCard}
            index={idx}
          />
        ))}
      </Box>

      <SectionEditDialog
        title="Skills"
        data={{ skills }}
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onSave={(data) => {
          setIsEditing(false);
          onSubmit(data.skills);
        }}
      >
        <FormColumn>
          <FormRow>
            <FormSkillsSelect name="skills" />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
    </Section>
  );
};
