import { FunctionComponent, useState } from "react";
import { Box } from "@material-ui/core";
import { TruncateChip } from "../Material/truncatedChip";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormColumn, FormRow, FormSkillsSelect } from "../Form";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";

export interface SkillModel {
  name: string;
}
interface SkillsProps {
  skills: SkillModel[];
  onSubmit: (skills: SkillModel[]) => void;
}

export const Skills: FunctionComponent<SkillsProps> = ({ skills, onSubmit }) => {
  const { skillList } = useSkillsContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Section
      title="Skills"
      action="edit"
      actionTooltip="Edit skills"
      actionOnClick={() => setIsEditing(true)}
    >
      <Box display="flex" flexWrap="wrap" gridGap={8}>
        {skills.map((skill) => (
          <TruncateChip
            key={skill.name}
            size="small"
            variant="outlined"
            label={skill.name}
            color="secondary"
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
            <FormSkillsSelect name="skills" options={skillList} />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
    </Section>
  );
};
