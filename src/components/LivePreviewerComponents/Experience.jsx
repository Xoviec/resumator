import React, { useState } from "react";
import styled from "@emotion/styled";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Card from "../Card";
import Input from "../Input";
import { DATE_FIELD_DEFAULT_VALUE } from "../constants";
import EmptyNotice from "./EmptyNotice";
import RichTextEditor from "./RichTextEditor";
import ExperienceItem from "./ExperienceItem";
import EditModalWrapper from "./ModalWrapper";
import SkillsSelectFormField from "./SkillsSelectFormField";
import ActionIcon from "./ActionIcon";

const Experience = ({
  type,
  experience,
  onSubmit,
  onEditHandler,
  onDeleteHandler,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingExisting, setIsEditingExisting] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [skillsState, setSkillsState] = React.useState(experience.skills || []);
  const [descriptionState, setDescriptionState] = React.useState();
  const methods = useForm({});
  const { control, getValues, reset } = methods;
  const typeLabel = type.toLowerCase();
  const tooltipText = `Add ${typeLabel}`;

  const onClickEdit = (experienceEntry, index) => {
    setCurrentItemIndex(index);
    setDescriptionState(experienceEntry.description);
    setIsEditingExisting(true);
    reset(experienceEntry);
    setIsEditing(true);
  };

  return (
    <Card>
      <TopWrapper>
        <Typography gutterBottom variant="h4">
          {type}
        </Typography>

        <ActionIcon
          onClick={() => setIsEditing((prevState) => !prevState)}
          icon={faPlus}
          tooltipText={tooltipText}
        />
      </TopWrapper>

      {experience.map((entry, index) => (
        <React.Fragment key={index}>
          <ExperienceItem
            experienceItem={entry}
            onDeleteHandler={(values) => (values) => onDeleteHandler(values, index)}
            onClickEdit={(values) => onClickEdit(values, index)}
          />

          {index < experience.length - 1 && (
            <Box mt={2}>
              <Divider />
            </Box>
          )}
        </React.Fragment>
      ))}

      <EmptyNotice show={experience.length === 0} icon={faPlus} />

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => {
          setIsEditingExisting(false);
          reset({});
          setIsEditing(false);
        }}
        methods={methods}
        contentLabel={`Add ${type} details`}
        heading={`Add ${type} details`}
        onPrimaryActionClicked={() => {
          const values = getValues();
          if (editingExisting) {
            onEditHandler(values, currentItemIndex);
          } else {
            onSubmit(values);
          }
          setCurrentItemIndex(null);
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          setIsEditing(false);
        }}
      >
        <Input
          as={TextField}
          name="company"
          label="Company"
          control={control}
          rules={{ required: "company is required" }}
          errors={methods.errors}
          defaultValue=""
        />
        <Input
          as={TextField}
          name="role"
          label="Role"
          rules={{ required: "role is required" }}
          errors={methods.errors}
          control={control}
          defaultValue=""
        />

        <RichTextEditor methods={methods} value={descriptionState} />

        <Input
          as={DatePicker}
          control={control}
          onChange={([selected]) => {
            return selected;
          }}
          rules={{ required: "start date is required" }}
          errors={methods.errors}
          name="startDate"
          label="Start Date"
          format="dd/MM/yyyy"
          defaultValue={DATE_FIELD_DEFAULT_VALUE}
        />
        <Input
          as={DatePicker}
          control={control}
          rules={{ required: false }}
          onChange={([selected]) => {
            return selected;
          }}
          name="endDate"
          label="End Date"
          format="dd/MM/yyyy"
          defaultValue={DATE_FIELD_DEFAULT_VALUE}
        />

        <SkillsSelectFormField
          onSkillsChanged={setSkillsState}
          skills={skillsState}
          formControl={control}
          formRules={{ required: true }}
          name="skills"
        />
      </EditModalWrapper>
    </Card>
  );
};

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Experience;
