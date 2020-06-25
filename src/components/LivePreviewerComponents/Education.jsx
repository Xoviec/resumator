import React, { useState } from "react";
import styled from "@emotion/styled";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { DatePicker } from "@material-ui/pickers";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Card from "../Card";
import Input from "../Input";
import { DATE_FIELD_DEFAULT_VALUE } from "../constants";
import EditModalWrapper from "./ModalWrapper";
import EmptyNotice from "./EmptyNotice";
import EducationItem from "./EducationItem";
import ActionIcon from "./ActionIcon";

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
    <Card>
      <TopWrapper>
        <Typography gutterBottom variant="h4">
          Education
        </Typography>

        <ActionIcon
          onClick={() => setIsEditing((prevState) => !prevState)}
          tooltipText="Add education"
          icon={faPlus}
        />
      </TopWrapper>

      {education.map((e, i) => (
        <>
          <EducationItem
            key={i}
            {...e}
            onEditHandler={(values) => onEditHandler({ ...values, id: e.id })}
            onDeleteHandler={onDeleteHandler}
          />
          {i < education.length - 1 && (
            <Box mt={2}>
              <Divider />
            </Box>
          )}
        </>
      ))}
      <EmptyNotice show={education.length === 0} icon={faPlus} />

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
          name="name"
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
    </Card>
  );
};

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Education;
