import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import avatars from "../../assets/images/avatars";
import { useForm } from "react-hook-form";
import { Button, Flex } from "rebass";
import { Input } from "@rebass/forms";
import Card from "../Card";
import EditIcon from "./EditIcon";
import { FormField } from "../FormComponents";
import EditModalWrapper from "./ModalWrapper";

const TopSection = ({ personalia, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: { ...personalia },
  });

  const register = methods.register;

  useEffect(() => {
    methods.reset(personalia);
  }, [personalia]);

  const reset = () => {
    methods.reset(personalia);
  };

  return (
    <TopSectionContainer>
      <LeftSection>
        <Greeting>
          Hi, I am &nbsp; <b> {personalia.firstName}</b>
        </Greeting>
        <Greeting>Frontend expert</Greeting>
        <Meta>
          {personalia.city} region - NL - {personalia.dateOfBirth}
        </Meta>
      </LeftSection>
      <Avatar
        src={(avatars.find((x) => x.name === personalia.avatar) || avatars[6]).img}
      />
      <EditIcon
        className="edit-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        isEditing={isEditing}
      />

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        methods={methods}
        contentLabel="Edit personal details"
        heading="Personal details"
      >
        <FormField name="email" label="Email">
          <Input name="email" type="email" ref={register()} />
        </FormField>

        <FormField name="firstName" label="First Name">
          <Input name="firstName" ref={register()} />
        </FormField>

        <FormField name="lastName" label="Last name">
          <Input name="lastName" ref={register()} />
        </FormField>

        <FormField name="dateOfBirth" label="Birth date">
          <Input name="dateOfBirth" type="date" ref={register()} />
        </FormField>

        <FormField name="city" label="City">
          <Input name="city" ref={register()} />
        </FormField>
        <Flex justifyContent="flex-end">
          <Button
            onClick={() => {
              reset();
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
              onSubmit("personalia", methods.getValues());
              setIsEditing(false);
            }}
            variant="primary"
            type="button"
          >
            Save
          </Button>
        </Flex>
      </EditModalWrapper>
    </TopSectionContainer>
  );
};

const LeftSection = styled.div`
  padding: 24px;
`;

const Avatar = styled.img`
  margin-right: 20px;
  height: 150px;
  align-self: flex-end;
`;

const Greeting = styled.h1`
  color: black;
  font-weight: 500;
  margin: 0;
  padding: 0;
  letter-spacing: 1.6px;
  display: flex;
`;

const Meta = styled.h3`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  letter-spacing: 1.6px;
`;

const TopSectionContainer = styled(Card)`
  position: relative;
  display: flex;
  background-color: ${({ theme }) => theme.colors.gray};

  justify-content: space-between;
  &:hover {
    .edit-button {
      visibility: visible;
    }
  }
`;

export default TopSection;
