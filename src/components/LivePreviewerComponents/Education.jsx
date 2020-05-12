import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "../Card";
import EditIcon from "./EditIcon";
import EditModalWrapper from "./ModalWrapper";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { FormField, InputWrapper, StyledLabel } from "../FormComponents";
import { Checkbox, Input } from "@rebass/forms";
import { Button, Flex } from "rebass";
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
  return (
    <EducationContainer>
      <Title>Education</Title>
      {education.map((e) => (
        <EducationItem
          key={e.id}
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
      >
        <FormField name="name" label="Name">
          <Input name="name" ref={register()} />
        </FormField>

        <FormField name="institute" label="Institute">
          <Input name="institute" ref={register()} />
        </FormField>

        <FormField name="startDate" label="Start Date">
          <Input name="startDate" type="date" ref={register()} />
        </FormField>

        <FormField name="endDate" label="End Date">
          <Input name="endDate" type="date" ref={register()} />
        </FormField>

        <InputWrapper>
          <StyledLabel>
            <Checkbox
              as="input"
              type="checkbox"
              name={`certificate`}
              ref={register()}
            />
            Certificate
          </StyledLabel>
        </InputWrapper>

        <Flex justifyContent="flex-end">
          <Button
            onClick={() => {
              setIsEditingExisting(false);
              setIsEditing(false);
              setCurrentItemId(null);
            }}
            mr={4}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (editingExisting) {
                onUpdateEducation({ ...methods.getValues(), id: currentItemId });
              } else {
                onSubmit(methods.getValues());
              }
              setCurrentItemId(null);
              setIsEditing(false);
            }}
            variant="primary"
            type="button"
          >
            Save
          </Button>
        </Flex>
      </EditModalWrapper>
    </EducationContainer>
  );
};

const Title = styled.h2`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.primary};
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
