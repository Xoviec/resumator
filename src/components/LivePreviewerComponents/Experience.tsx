import { FunctionComponent, useState } from "react";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { ExperienceModel, ExperienceItem } from "./ExperienceItem";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import {
  FormColumn,
  FormDatePicker,
  FormRow,
  FormSkillsSelect,
  FormTextField,
} from "../Form";
import { FormRichTextEditor } from "../Form/FormRichTextEditor";

interface ExperienceProps {
  type: string;
  experience: ExperienceModel[];
  onSubmit: (value: ExperienceModel[]) => void;
}

export const Experience: FunctionComponent<ExperienceProps> = ({
  type,
  experience,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<ExperienceModel | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    const filteredExperience = [...experience];
    filteredExperience.splice(index, 1);
    onSubmit(filteredExperience);
  };

  const handleEdit = (item: ExperienceModel, index: number) => {
    setEditItem(item);
    setEditItemIndex(index);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
  };

  const handleSave = (item: ExperienceModel) => {
    let updatedExperience = [...experience];
    if (editItemIndex !== null) updatedExperience.splice(editItemIndex!, 1, item);
    else updatedExperience.push(item);

    updatedExperience = sortDateDescending(updatedExperience);

    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
    onSubmit(updatedExperience);
  };

  /**
   * Sort by endDate Date object propriety in descending order.
   * If endDate is null, it is placed on first.
   * If both are equal, including both null, sort descending by startDate
   * @param targetArray ExperienceModel[]
   * @returns ExperienceModel[]
   */
  const sortDateDescending = (targetArray: ExperienceModel[]): ExperienceModel[] => {
    return targetArray.sort((a, b) => {
      const endTimeA = a.endDate?.getTime();
      const endTimeB = b.endDate?.getTime();
      const startTimeA = a.startDate?.getTime();
      const startTimeB = b.startDate?.getTime();

      if (
        (endTimeA === endTimeB && startTimeA > startTimeB) ||
        (!endTimeA && endTimeB) ||
        endTimeA > endTimeB
      )
        return -1;

      if (
        (endTimeA === endTimeB && startTimeA < startTimeB) ||
        (endTimeA && !endTimeB) ||
        endTimeA < endTimeB
      )
        return 1;

      return 0;
    });
  };

  return (
    <Section
      action="add"
      title={type}
      actionTooltip={`Add ${type.toLowerCase()}`}
      actionOnClick={() => setIsEditing(true)}
    >
      <Box display="flex" flexDirection="column" marginTop={-1} gap="8px">
        {experience.map((entry: ExperienceModel, index: number) => (
          <Box display="flex" flexDirection="column" key={index} gap="16px">
            <ExperienceItem
              type={type}
              experienceItem={entry}
              onDelete={() => handleDelete(index)}
              onEdit={(item) => handleEdit(item, index)}
            />
            {index < experience.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      <SectionEditDialog
        title={editItem ? `Edit ${type}` : `Add ${type}`}
        data={editItem!}
        open={isEditing}
        onCancel={handleEditCancel}
        onSave={handleSave}
      >
        <FormColumn>
          <FormRow>
            <FormTextField required name="role" label="Role" />
            <FormTextField required name="company" label="Company" />
          </FormRow>
          <FormRow>
            <FormDatePicker name="startDate" label="Start" />
            <FormDatePicker name="endDate" label="End" />
          </FormRow>
          <FormRow>
            <FormRichTextEditor name="description" label="Description" />
          </FormRow>
          <FormRow>
            <FormSkillsSelect name="stackAndTechniques" label="Skills" />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
    </Section>
  );
};
