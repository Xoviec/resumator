import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { Box, TextField, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import isEqual from "lodash/isEqual";
import { formatDate } from "../../lib/date";
import Card from "../Card";
import Input from "../Input";
import AvatarSelector from "../FormComponents/AvatarSelector";
import { DATE_FIELD_DEFAULT_VALUE } from "../constants";
import EditModalWrapper from "./ModalWrapper";
import ActionIcon from "./ActionIcon";
// import EmptyNotice from "./EmptyNotice";
import getAvatarDataUri from "../../lib/getAvatarDataUri";
// Icons
import CakeIcon from "@material-ui/icons/CakeOutlined";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import PlaceIcon from "@material-ui/icons/PlaceOutlined";

// const isInfoEmpty = ({ firstName, lastName, email, city }) =>
//   !(firstName || lastName || email || city);

const TopSection = ({ personalia, introduction, onSubmit }) => {
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

  const getFirstName = () => personalia.firstName ? personalia.firstName : (personalia.avatar > 4 ? "John" : "Jane");
  const getLastName = () => personalia.lastName ? personalia.lastName : "Doe";

  return (
    <Card>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
        <Box display="flex" flexDirection="row" flex={1}>
          <AvatarWrapper>
            <AvatarImg
              src={getAvatarDataUri(personalia.avatar)}
              alt="Avatar"
            />
          </AvatarWrapper>

          <Box marginRight={2}>
            <Typography variant="h3" align="left">
              {getFirstName()} {getLastName()}
            </Typography>
            <SubInfo>
              <EmailIcon />
              {personalia.email ? personalia.email : "---"}
            </SubInfo>
            <SubInfo>
              <PlaceIcon />
              {personalia.city ? personalia.city : "---"}
            </SubInfo>
            <SubInfo>
              <CakeIcon />
              {personalia.dateOfBirth ? formatDate(personalia.dateOfBirth) : "---"}
            </SubInfo>
          </Box>
        </Box>
        
        <Box display="flex" flexDirection="column" flex={1} marginTop={{ xs: 2, md: 0 }}>
          <Typography variant="h5" align="left">
            About {personalia.firstName}
          </Typography>
          <Typography variant="body2">
            {introduction
              ? introduction
              : `${getFirstName()} has nothing to tell you.`}
          </Typography>
        </Box>
      </Box>
      

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
    </Card>
  );
};

const AVATAR_SIZE = 150;
const AvatarWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: ${AVATAR_SIZE}px;
  width: ${AVATAR_SIZE}px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(0, 0, 0, 0.7);
  margin-right: 32px;
`;

const AvatarImg = styled.img`
  width: 60%;
  margin-top: 50%;
  margin-left: 10%;
`;

const SubInfo = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  .MuiSvgIcon-root {
    margin-right: 8px;
  }
`;

const CustomActionIcon = styled(ActionIcon)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export default TopSection;
