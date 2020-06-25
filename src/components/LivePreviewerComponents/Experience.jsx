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
  const [currentItemId, setCurrentItemId] = useState(null);
  const [skillsState, setSkillsState] = React.useState(experience.skills || []);
  const [descriptionState, setDescriptionState] = React.useState();
  const methods = useForm({});
  const { control, getValues, reset } = methods;
  const typeLabel = type.toLowerCase();
  const tooltipText = `Add ${typeLabel}`;

  const onClickEdit = (experienceEntry) => {
    setCurrentItemId(experienceEntry.id);
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

      {experience.map((e, i) => (
        <>
          <ExperienceItem
            experienceItem={e}
            key={i}
            onDeleteHandler={onDeleteHandler}
            onClickEdit={onClickEdit}
          />

          {i < experience.length - 1 && (
            <Box mt={2}>
              <Divider />
            </Box>
          )}
        </>
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
            onEditHandler({
              ...values,
              id: currentItemId,
              description: descriptionState,
            });
          } else {
            onSubmit(values);
          }
          setCurrentItemId(null);
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
          defaultValue=""
        />
        <Input
          as={TextField}
          name="role"
          label="Role"
          control={control}
          defaultValue=""
        />

        <RichTextEditor value={descriptionState} onChange={setDescriptionState} />

        <Input
          as={DatePicker}
          control={control}
          rules={{ required: true }}
          onChange={([selected]) => {
            return selected;
          }}
          name="startDate"
          label="Start Date"
          format="dd/MM/yyyy"
          defaultValue={DATE_FIELD_DEFAULT_VALUE}
        />
        <Input
          as={DatePicker}
          control={control}
          rules={{ required: true }}
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
