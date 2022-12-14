import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { FunctionComponent, VoidFunctionComponent } from "react";
import { useModal, useStartDate } from "../../hooks/";
// libs
import { setYear } from "../../lib/date";
import { appendSkills } from "../../utils";
import {
  FormColumn,
  FormDatePicker,
  FormRow,
  FormSkillsSelect,
  FormTextField,
} from "../Form";
import { FormRichTextEditor } from "../Form/FormRichTextEditor";
import { ExperienceItem, ExperienceModel } from "./ExperienceItem";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { SkillModel } from "./Skills";

interface ExperienceProps {
  type: string;
  experience: ExperienceModel[];
  skills: SkillModel[];
  onSubmit: (value: ExperienceModel[], skills: SkillModel[]) => void;
}

const ExperienceFormFields: VoidFunctionComponent = () => {
  const startMinDate = setYear(1970);
  const { startDate, onStartDateChange } = useStartDate();
  return (
    <FormColumn>
      <FormRow>
        <FormTextField autoFocus required name="role" label="Role" />
        <FormTextField required name="company" label="Company" />
      </FormRow>
      <FormRow>
        <FormDatePicker
          onDateSet={onStartDateChange}
          minDate={startMinDate}
          disableFuture
          name="startDate"
          label="Start date"
        />
        <FormDatePicker
          disableFuture
          minDate={startDate}
          name="endDate"
          label="End date"
        />
      </FormRow>
      <FormRow>
        <FormRichTextEditor name="description" label="Description" />
      </FormRow>
      <FormRow>
        <FormSkillsSelect name="stackAndTechniques" label="Skills" />
      </FormRow>
    </FormColumn>
  );
};

export const Experience: FunctionComponent<ExperienceProps> = ({
  type,
  experience,
  skills,
  onSubmit,
}) => {
  const {
    isEditing,
    editItem,
    editItemIndex,
    handleEdit,
    handleEditCancel,
    setEditItem,
    setEditItemIndex,
    setIsEditing,
  } = useModal();

  const handleDelete = (index: number) => {
    const filteredExperience = [...experience];
    filteredExperience.splice(index, 1);
    onSubmit(filteredExperience, skills);
  };

  const handleSave = (item: ExperienceModel) => {
    let updatedExperience = [...experience];
    if (editItemIndex !== null) updatedExperience.splice(editItemIndex!, 1, item);
    else updatedExperience.push(item);

    updatedExperience = sortDateDescending(updatedExperience);
    const updatedSkills = appendSkills(skills, item.stackAndTechniques);

    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
    onSubmit(updatedExperience, updatedSkills);
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
        <ExperienceFormFields />
      </SectionEditDialog>
    </Section>
  );
};
