import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import avatars from "../../assets/images/avatars";
import { useForm } from "react-hook-form";
import Card from "../Card";
import EditIcon from "./EditIcon";
import EditModalWrapper from "./ModalWrapper";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { TextField } from "@material-ui/core";
import Input from "../Input";
import AvatarSelector from "../FormComponents/AvatarSelector";
import { DatePicker } from "@material-ui/pickers";
import isEqual from "lodash/isEqual";

const TopSection = ({ personalia, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: { ...personalia },
  });

  const reset = methods.reset;
  const getValues = methods.getValues;

  useEffect(() => {
    if (!isEqual(personalia, getValues())) {
      reset(personalia);
    }
  }, [personalia, getValues, reset]);

  return (
    <TopSectionContainer>
      <LeftSection>
        <Greeting>
          Hi, I am &nbsp; <b> {personalia.firstName}</b>
        </Greeting>
        <Greeting>Frontend expert</Greeting>
        <Meta>
          {personalia.city} region - NL - {getFormattedDate(personalia.dateOfBirth)}
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
        onPrimaryActionClicked={() => {
          onSubmit("personalia", methods.getValues());
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          reset();
          setIsEditing(false);
        }}
      >
        <Input
          as={TextField}
          name="email"
          label="Email"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="firstName"
          label="First Name"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="lastName"
          label="Last name"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="city"
          label="City"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={DatePicker}
          control={methods.control}
          rules={{ required: true }}
          onChange={([selected]) => {
            return selected;
          }}
          name="dateOfBirth"
          label="Date of birth"
          format="dd/MM/yyyy"
        />

        <Input
          as={AvatarSelector}
          name="avatar"
          label="Avatar"
          control={methods.control}
        />
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
  font-weight: 500;
  letter-spacing: 1.6px;
`;

const TopSectionContainer = styled(Card)`
  position: relative;
  display: flex;

  justify-content: space-between;
  &:hover {
    .edit-button {
      visibility: visible;
    }
  }
`;

export default TopSection;
