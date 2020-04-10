import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Heading } from "rebass";
import { Input, Textarea } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faGraduationCap,
  faBriefcase,
  faCodeBranch,
  faBrain,
  faCertificate,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import validationSchema from "../config/validation";
import {
  EducationInput,
  FieldsInput,
  WorkExperienceInput,
} from "../components/form";

import {
  ErrorMessage,
  FormGroup,
  InputWrapper,
  StyledLabel,
} from "../components/form/styledComponents";

// TODO: remove when firebase values are truly fetched
const firebaseValues = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1980-01-30",
  city: "Amsterdam",
  introduction: "Lorem ipsum",
  education: [{}],
  experience: [{}],
  skills: [{ name: "JavaScript" }, { name: "React" }],
};

const PdfCreator = () => {
  const { control, register, handleSubmit, errors } = useForm({
    defaultValues: firebaseValues,
    validationSchema,
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
        <Heading as="legend" color="white" p="0">
          <Icon icon={faAddressCard} size="sm" /> Personal details
        </Heading>
        <InputWrapper>
          <StyledLabel htmlFor="firstName">First name</StyledLabel>
          <Input name="firstName" ref={register()} />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="lastName">Last name</StyledLabel>
          <Input name="lastName" ref={register()} />
          {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="dateOfBirth">Birthdate</StyledLabel>

          <Input type="date" name="dateOfBirth" ref={register()} />
          {errors.dateOfBirth && (
            <ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="city">City</StyledLabel>
          <Input name="city" ref={register()} />
          {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="introduction">Introduction</StyledLabel>
          <Textarea name="introduction" ref={register()} />
          {errors.introduction && (
            <ErrorMessage>{errors.introduction.message}</ErrorMessage>
          )}
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Heading as="legend" color="white" p="0">
          <Icon icon={faBriefcase} size="sm" /> Work Experience
        </Heading>

        <InputWrapper>
          <WorkExperienceInput
            name="experience"
            addButtonLabel="Add experience"
            control={control}
            register={register}
          />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Heading as="legend" color="white" p="0">
          <Icon icon={faGraduationCap} size="sm" /> Education
        </Heading>

        <InputWrapper>
          <EducationInput
            name="education"
            addButtonLabel="Add education"
            control={control}
            register={register}
          />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Heading as="legend" color="white" p="0">
          <Icon icon={faBrain} size="sm" /> Skills
        </Heading>

        <InputWrapper>
          <FieldsInput
            name="skills"
            addButtonLabel="Add skill"
            control={control}
            register={register}
          />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Heading as="legend" color="white" p="0">
          <Icon icon={faCodeBranch} size="sm" /> Projects
        </Heading>
      </FormGroup>
      <FormGroup>
        <Heading as="legend" color="white" p="0">
          <Icon icon={faCertificate} size="sm" /> Badges
        </Heading>
      </FormGroup>
      <FormGroup>
        <Heading as="legend" color="white" p="0">
          <Icon icon={faUserCircle} size="sm" /> Avatar
        </Heading>
      </FormGroup>
      <Button as="input" type="submit" />
    </Box>
  );
};

export default PdfCreator;
