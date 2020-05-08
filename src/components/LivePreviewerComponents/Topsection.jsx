import React, { useState } from "react";
import styled from "@emotion/styled";
import avatars from "../../assets/images/avatars";
import { useFormContext } from "react-hook-form";
import { Input, Textarea } from "@rebass/forms";
import Card from "../Card";
import EditIcon from "./EditIcon";
import Modal from "react-modal";
import { FormField, FormGroup } from "../FormComponents";
import { Box, Heading } from "rebass";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

const TopSection = ({ personalia }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { register } = useFormContext();
  return (
    <TopSectionContainer>
      <LeftSection>
        <Greeting>
          Hi, I am{" "}
          {isEditing ? (
            <Input name={"personalia.firstName"} ref={register()} />
          ) : (
            <b>{personalia.firstName}</b>
          )}
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

      <Modal
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        contentLabel="Edit personalia"
      >
        <div>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faAddressCard} size="sm" /> Personal details
          </Heading>

          <FormField name="personalia.email" label="First name">
            <Input name="personalia.email" type="email" ref={register()} />
          </FormField>

          <FormField name="personalia.firstName" label="First name">
            <Input name="personalia.firstName" ref={register()} />
          </FormField>

          <FormField name="personalia.lastName" label="Last name">
            <Input name="personalia.lastName" ref={register()} />
          </FormField>

          <FormField name="personalia.dateOfBirth" label="Birth date">
            <Input name="personalia.dateOfBirth" type="date" ref={register()} />
          </FormField>

          <FormField name="personalia.city" label="City">
            <Input name="personalia.city" ref={register()} />
          </FormField>
        </div>
      </Modal>
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
