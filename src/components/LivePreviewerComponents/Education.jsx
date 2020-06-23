import React, { useState } from "react";
import styled from "@emotion/styled";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { DatePicker } from "@material-ui/pickers";
import Card from "../Card";
import Input from "../Input";
import { DATE_FIELD_DEFAULT_VALUE } from "../constants";
import EditIcon from "./EditIcon";
import EditModalWrapper from "./ModalWrapper";
import EmptyNotice from "./EmptyNotice";
import EducationItem from "./EducationItem";

const Education = ({ education, onSubmit, onUpdateEducation, onDeleteHandler }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingExisting, setIsEditingExisting] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const methods = useForm({});
  const register = methods.register;

  const onEditHandler = (educationEntry) => {
    setCurrentItemId(educationEntry.id);
    setIsEditingExisting(true);
    methods.reset(educationEntry);
    setIsEditing(true);
  };

  const minDate = (endDate) => endDate > methods.getValues().startDate;

  return (
    <EducationContainer>
      <Typography gutterBottom variant="h4">
        Education
      </Typography>
      {education.map((e, i) => (
        <EducationItem
          key={i}
          {...e}
          onEditHandler={(values) => onEditHandler({ ...values, id: e.id })}
          onDeleteHandler={onDeleteHandler}
        />
      ))}
      <EmptyNotice items={education} />

      <EditIcon
        icon={faPlus}
        className="edit-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        isEditing={isEditing}
      />

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => {
          setIsEditingExisting(false);
          methods.reset({});
          setIsEditing(false);
        }}
        methods={methods}
        contentLabel="Add education details"
        heading="Add new education"
        onPrimaryActionClicked={() => {
          if (editingExisting) {
            onUpdateEducation({ ...methods.getValues(), id: currentItemId });
          } else {
            onSubmit(methods.getValues());
          }
          setCurrentItemId(null);
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          setIsEditingExisting(false);
          setIsEditing(false);
          setCurrentItemId(null);
        }}
      >
        <Input
          as={TextField}
          rules={{ required: "name is required" }}
          name="nameInput"
          label="Name"
          control={methods.control}
          errors={methods.errors}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="institute"
          label="Institute"
          rules={{ required: "institute is required" }}
          control={methods.control}
          errors={methods.errors}
          defaultValue=""
        />

        <Input
          as={DatePicker}
          control={methods.control}
          rules={{ required: "start date is required" }}
          errors={methods.errors}
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
          control={methods.control}
          errorMessage="end date should greater then the start date"
          rules={{ validate: minDate }}
          errors={methods.errors}
          onChange={([selected]) => {
            return selected;
          }}
          name="endDate"
          label="End Date"
          format="dd/MM/yyyy"
        />

        <FormControlLabel
          control={
            <Checkbox name="certificate" color="primary" inputRef={register} />
          }
          label={<p>Certificate</p>}
        />
      </EditModalWrapper>
    </EducationContainer>
  );
};

const EducationContainer = styled(Card)`
  &:hover {
    .edit-button {
      visibility: visible;
    }
  }
`;
export default Education;
