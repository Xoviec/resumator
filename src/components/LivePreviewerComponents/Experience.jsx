import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "../Card";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButtons from "./ActionButtons";
import EditModalWrapper from "./ModalWrapper";
import { Button, Flex } from "rebass";
import { useForm } from "react-hook-form";
import { getFormattedDate } from "../../utils/getFormattedDate";
import Input from "../Input";
import { TextField } from "@material-ui/core";

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

  const methods = useForm({});

  const onClickEdit = (experienceEntry) => {
    setCurrentItemId(experienceEntry.id);
    setIsEditingExisting(true);
    methods.reset(experienceEntry);
    setIsEditing(true);
  };

  return (
    <Card>
      <Title>{type}</Title>
      <AddNew
        className="add-new-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        icon={faPlus}
      />
      {experience.map((e, i) => (
        <ExperienceItem key={i} id={e.id}>
          <TopSection>
            <h3> {e.role}</h3>
            <h3>
              {getFormattedDate(e.startDate)} - {getFormattedDate(e.endDate)}
            </h3>
          </TopSection>
          <Description>{e.description}</Description>
          <Techniques>
            <span>
              Techniques:{" "}
              {e.stackAndTechniques &&
                e.stackAndTechniques.map((t) => <span key={t.name}>{t.name} </span>)}
            </span>
          </Techniques>
          <ActionButtons
            className={`edit-button-${e.id}`}
            onEditClick={() => onClickEdit(e)}
            onDeleteClick={() => onDeleteHandler(e)}
          />
        </ExperienceItem>
      ))}
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
        <Input
          as={TextField}
          name="company"
          label="Company"
          control={methods.control}
          defaultValue=""
        />
        <Input
          as={TextField}
          name="role"
          label="Role"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="description"
          label="Description"
          control={methods.control}
          defaultValue=""
          multiline
          rows={4}
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

        <Flex justifyContent="flex-end">
          <Button
            onClick={() => {
              setIsEditing(false);
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
                onEditHandler({ ...methods.getValues(), id: currentItemId });
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
    </Card>
  );
};

const AddNew = styled(FontAwesomeIcon)`
  position: absolute;
  right: 32px;
  top: 48px;
`;
const TopSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const Techniques = styled.div`
  padding: 4px;
  margin: 0;
  font-size: 13px;
`;
const Description = styled.p`
  font-size: 14px;
`;
const Title = styled.h2`
  text-transform: uppercase;
`;

const ExperienceItem = styled.div`
  position: relative;
  margin: 24px 0;
  padding: 16px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    .edit-button {
      visibility: visible;
    }
  }

  &:hover {
    ${({ id }) => `
    .edit-button-${id} {
      visibility: visible;
     }
    `}
  }
`;

export default Experience;
