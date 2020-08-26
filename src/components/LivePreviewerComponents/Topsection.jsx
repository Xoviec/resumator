import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import isEqual from "lodash/isEqual";
import avatars from "../../assets/images/avatars";
import { formatDate } from "../../lib/date";
import Card from "../Card";
import Input from "../Input";
import AvatarSelector from "../FormComponents/AvatarSelector";
import { DATE_FIELD_DEFAULT_VALUE } from "../constants";
import EditModalWrapper from "./ModalWrapper";
import ActionIcon from "./ActionIcon";
import EmptyNotice from "./EmptyNotice";

const isInfoEmpty = ({ firstName, lastName, email, city }) =>
  !(firstName || lastName || email || city);

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

  const { city, dateOfBirth } = personalia;

  const renderInfo = () => {
    if (isInfoEmpty(personalia)) {
      return <EmptyNotice show icon={faPen} />;
    }

    return (
      <>
        <AvatarWrapper>
          <AvatarImg
            src={
              (avatars.find((x) => x.name === personalia.avatar) || avatars[6]).img
            }
            alt="Avatar"
          />
        </AvatarWrapper>

        <MainInfo>
          <Typography variant="h2">
            {personalia.firstName} {personalia.lastName}
          </Typography>

          <Typography variant="h5">{personalia.email}</Typography>
        </MainInfo>

        <OtherInfo variant="subtitle1">
          {city} {city && dateOfBirth && <Separator />}{" "}
          {formatDate(dateOfBirth)}
        </OtherInfo>
      </>
    );
  };

  return (
    <TopSectionContainer>
      {renderInfo()}

      <CustomActionIcon
        onClick={() => setIsEditing((prevState) => !prevState)}
        icon={faPen}
        tooltipText="Edit personal information"
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
          defaultValue={DATE_FIELD_DEFAULT_VALUE}
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

const TopSectionContainer = styled(Card)`
  &,
  .MuiCardContent-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const AVATAR_SIZE = 200;
const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${AVATAR_SIZE}px;
  width: ${AVATAR_SIZE}px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(0, 0, 0, 0.7);
`;

const AvatarImg = styled.img`
  width: 60%;
  margin-top: 50%;
  margin-left: 10%;
`;

const MainInfo = styled.div`
  margin-top: 8px;
  text-align: center;
`;

const OtherInfo = styled(Typography)`
  display: flex;
  margin-top: 16px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Separator = styled.div`
  width: 20px;
  height: 1px;
  background-color: currentColor;
  margin: 0 8px;
  opacity: 0.75;
`;

const CustomActionIcon = styled(ActionIcon)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export default TopSection;
