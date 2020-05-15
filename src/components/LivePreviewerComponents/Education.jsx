import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "../Card";
import EditIcon from "./EditIcon";
import EditModalWrapper from "./ModalWrapper";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import EducationItem from "./EducationItem";
import { TextField } from "@material-ui/core";
import Input from "../Input";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
  return (
    <EducationContainer>
      <Title>Education</Title>
      {education.map((e, i) => (
        <EducationItem
          key={i}
          {...e}
          onEditHandler={(values) => onEditHandler({ ...values, id: e.id })}
          onDeleteHandler={onDeleteHandler}
        />
      ))}
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
          name="name"
          label="Name"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="institute"
          label="Institute"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="startDate"
          label="Start Date"
          control={methods.control}
          defaultValue=""
          type="date"
        />
        <Input
          as={TextField}
          name="endDate"
          label="End Date"
          control={methods.control}
          defaultValue=""
          type="date"
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

const Title = styled.h2`
  margin: 0 0 16px;
  text-transform: uppercase;
`;

const EducationContainer = styled(Card)`
  &:hover {
    .edit-button {
      visibility: visible;
    }
  }
`;
export default Education;
