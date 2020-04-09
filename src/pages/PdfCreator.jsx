import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Heading } from "rebass";
import { Input, Textarea } from "@rebass/forms";

import {
  EducationInput,
  ErrorMessage,
  FormGroup,
  InputWrapper,
  StyledLabel,
  FieldsInput,
} from "../components/form";

// TODO: remove when firebase values are truly fetched
const firebaseValues = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1980-01-30",
  city: "Amsterdam",
  introduction: "",
  skills: [{ name: "JavaScript" }, { name: "React" }],
};

const PdfCreator = () => {
  const { control, register, handleSubmit, errors } = useForm({
    defaultValues: firebaseValues,
  });

  const onSubmit = (data) => {
    // TODO: save values in firebase
    console.log(data); // eslint-disable-line
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      py={3}
      maxWidth="600px"
      margin="0 auto"
    >
      <Heading as="h1" color="white" p="0" mb="2rem" fontSize="3rem">
        Create Resume
      </Heading>
      <FormGroup>
        <InputWrapper>
          <Heading as="legend" color="white" p="0" mb="2rem">
            Personal details
          </Heading>
          <StyledLabel htmlFor="firstName">First name</StyledLabel>
          <Input name="firstName" ref={register({ required: true })} />
          {errors.firstName && <ErrorMessage>First name is required</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="lastName">Last name</StyledLabel>
          <Input name="lastName" ref={register({ required: true })} />
          {errors.lastName && "Last name is required"}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="dateOfBirth">Birthdate</StyledLabel>

          <Input type="date" name="dateOfBirth" ref={register({ required: true })} />
          {errors.lastName && <ErrorMessage>Last name is required</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="city">City</StyledLabel>
          <Input name="city" ref={register({ required: true })} />
          <ErrorMessage> {errors.city && "City is required"}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="introduction">Introduction</StyledLabel>
          <Textarea name="introduction" ref={register({ required: true })} />
          {errors.introduction && (
            <ErrorMessage>Introduction is required</ErrorMessage>
          )}
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Work Experience
        </Heading>
        <Button variant="outline" color="white">
          + Add Work Experience
        </Button>
      </FormGroup>

      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Education
        </Heading>

        <InputWrapper>
          <EducationInput
            name="education"
            addButtonLabel="+ Add education"
            control={control}
            register={register}
          />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Skills
        </Heading>

        <InputWrapper>
          <FieldsInput
            name="skills"
            addButtonLabel="+ Add skill"
            control={control}
            register={register}
          />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Projects
        </Heading>
      </FormGroup>
      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Badges
        </Heading>
      </FormGroup>
      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Avatar
        </Heading>
      </FormGroup>
      <Button as="input" type="submit" />
    </Box>
  );
};

export default PdfCreator;
