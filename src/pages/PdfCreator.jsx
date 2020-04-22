import React, { useContext, useState } from "react";
import { FirebaseAppContext } from "../context/FirebaseContext";
import resumeMock from "../mock/smallmock.json";
import { useForm, FormContext } from "react-hook-form";
import { Box, Button, Heading } from "rebass";
import { Input, Textarea } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  faAddressCard,
  faGraduationCap,
  faBriefcase,
  faCodeBranch,
  faBrain,
  faCertificate,
  faUserCircle,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";

import validationSchema, { MIN_NUMBER_OF_EXPERIENCE } from "../config/validation";
import {
  AvatarInput,
  EducationInput,
  ExperienceInput,
} from "../components/CreatorComponents";

import {
  FieldsInput,
  FormField,
  FormGroup,
  InputWrapper,
} from "../components/FormComponents";

const PdfCreator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const { firebase } = useContext(FirebaseAppContext);
  const methods = useForm({
    defaultValues: { ...resumeMock },
    validationSchema,
  });

  const onSubmit = async (data) => {
    //TODO: Use a toast/notification to show success or errors
    try {
      setIsLoading(true);
      const resumesRef = firebase.firestore().collection().doc();
      await resumesRef.set(data);
      setIsLoading(false);
      history.push("./overview");
    } catch (e) {
      setIsLoading(false);
      alert(`Error writing document. ${e.message}`);
    }
  };

  return (
    <FormContext {...methods}>
      <Box
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
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

          <FormField name="personalia.email" label="First name">
            <Input name="personalia.email" type="email" ref={methods.register()} />
          </FormField>

          <FormField name="personalia.firstName" label="First name">
            <Input name="personalia.firstName" ref={methods.register()} />
          </FormField>

          <FormField name="personalia.lastName" label="Last name">
            <Input name="personalia.lastName" ref={methods.register()} />
          </FormField>

          <FormField name="personalia.dateOfBirth" label="Birth date">
            <Input
              name="personalia.dateOfBirth"
              type="date"
              ref={methods.register()}
            />
          </FormField>

          <FormField name="personalia.city" label="City">
            <Input name="personalia.city" ref={methods.register()} />
          </FormField>

          <FormField name="introduction" label="Introduction">
            <Textarea name="introduction" ref={methods.register()} />
          </FormField>
        </FormGroup>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faBriefcase} size="sm" /> Work Experience
          </Heading>

          <InputWrapper>
            <ExperienceInput
              name="experience"
              label="Work experience"
              addButtonLabel="Add experience"
              min={MIN_NUMBER_OF_EXPERIENCE}
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faGraduationCap} size="sm" /> Education
          </Heading>

          <InputWrapper>
            <EducationInput name="education" addButtonLabel="Add education" />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faBrain} size="sm" /> Skills
          </Heading>

          <InputWrapper>
            <FieldsInput name="skills" addButtonLabel="Add skill" />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faCodeBranch} size="sm" /> Projects
          </Heading>

          <InputWrapper>
            <ExperienceInput
              name="projects"
              label="Project"
              addButtonLabel="Add project"
            />
          </InputWrapper>
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

          <InputWrapper>
            <AvatarInput />
          </InputWrapper>
        </FormGroup>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Icon icon={faSyncAlt} spin color="white" /> : "Submit"}
        </Button>
      </Box>
    </FormContext>
  );
};

export default PdfCreator;
