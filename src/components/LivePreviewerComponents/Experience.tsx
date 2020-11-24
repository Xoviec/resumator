import React, { FunctionComponent, useState } from "react";
import { Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { ExperienceModel, ExperienceItem } from "./ExperienceItem";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormColumn, FormDatePicker, FormRow, FormTextField } from "../Form";

interface ExperienceProps {
  type: string,
  experience: ExperienceModel[];
  onSubmit: (value: ExperienceModel[]) => void;
}

export const Experience: FunctionComponent<ExperienceProps> = ({ type, experience, onSubmit }) => {
  // const [skillsState, setSkillsState] = React.useState(experience.skills || []);
  // const [descriptionState, setDescriptionState] = React.useState();

  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<ExperienceModel | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    const filteredExperience = [...experience];
    filteredExperience.splice(index, 1);
    onSubmit(filteredExperience);
  }

  const handleEdit = (item: ExperienceModel, index: number) => {
    setEditItem(item);
    setEditItemIndex(index);
    setIsEditing(true);
  };

  const handleSave = (item: ExperienceModel) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(editItemIndex!, 1, item);

    setEditItem(null);
    setEditItemIndex(null);
    setIsEditing(false);
    onSubmit(updatedExperience);
  }

  return (
    <Section
      action="add"
      title={type}
      actionTooltip={`Add ${type.toLowerCase()}`}
      actionOnClick={() => setIsEditing(true)}
    >
      <Box
        display="flex"
        flexDirection="column"
        marginTop={-1}
        gridGap={8}
      >
        {experience.map((entry: any, index: any) => (
          <Box
            display="flex"
            flexDirection="column"
            key={index}
            gridGap={16}
          >
            <ExperienceItem
              type={type}
              experienceItem={entry}
              onDelete={() => handleDelete(index)}
              onEdit={(item) => handleEdit(item, index)}
            />
            {index < experience.length - 1 && (
              <Divider />
            )}
          </Box>
        ))}
      </Box>

      <SectionEditDialog
        title={editItem ? `Edit ${type}` : `Add ${type}`}
        data={editItem!}
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onSave={handleSave}
      >
        <FormColumn>
          <FormRow>
            <FormTextField
              required
              name="role"
              label="Role"
            />
            <FormTextField
              required
              name="company"
              label="Company"
            />
          </FormRow>
          <FormRow>
            <FormDatePicker
              name="startDate"
              label="Start"
            />
            <FormDatePicker
              name="endDate"
              label="End"
            />
          </FormRow>
          <FormRow>
            <FormTextField
              multiline
              name="description"
              label="Description"
              rows={10}
            />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
      
      {/* <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={resetForm}
        methods={methods}
        heading={`Add ${type} details`}
        onPrimaryActionClicked={() => {
          const values = getValues();
          if (editingExisting) {
            onEditHandler(values, currentItemIndex);
          } else {
            onSubmit(values);
          }
          resetForm();
        }}
        onSecondaryActionClicked={resetForm}
      >
        <RichTextEditor methods={methods} value={descriptionState} />

        <SkillsSelectFormField
          onSkillsChanged={setSkillsState}
          skills={skillsState}
          formControl={control}
          formRules={{ required: true }}
          name="skills"
        />
      </EditModalWrapper> */}
    </Section>
  );
};
