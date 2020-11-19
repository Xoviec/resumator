import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Card, Hidden, TextField, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import isEqual from "lodash/isEqual";
import { formatDate } from "../../lib/date";
import Input from "../Input";
import AvatarSelector from "../FormComponents/AvatarSelector";
import { DATE_FIELD_DEFAULT_VALUE } from "../constants";
import EditModalWrapper from "./ModalWrapper";
import getAvatarDataUri from "../../lib/getAvatarDataUri";
import { TooltipIconButton } from "../Material";
import { SectionHeader } from "./SectionHeader";
// Icons
import CakeIcon from "@material-ui/icons/CakeOutlined";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import EditIcon from "@material-ui/icons/Edit"
import PlaceIcon from "@material-ui/icons/PlaceOutlined";
import { SectionEditDialog } from "./SectionEditDialog";

interface TopSectionProps {
  personalia: {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    dateOfBirth: Date;
  };
  introduction: string;
  onSubmit: (key: string, values: any) => void;
}

export const TopSection: FunctionComponent<TopSectionProps> = ({ personalia, introduction, onSubmit }) => {
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

  /**
   * Get first and last name.
   * Will return John / Jane Doe if the name is not filled in.
   */
  const getFirstName = () => personalia.firstName ? personalia.firstName : (+personalia.avatar > 4 ? "John" : "Jane");
  const getLastName = () => personalia.lastName ? personalia.lastName : "Doe";

  return (
    // We use a card directly here instead of a section because this is a custom full width section.
    <Card>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box
          display="flex"
          flexDirection="row"
          // justifyContent="space-between"
          padding={1}
          flex={1}
        >
          <Box
            display="flex"
            alignItems="center"
            // As we have a button in mobile mode on the right, 5.5 gives us 44px, the same as the button.
            marginLeft={{ xs: 5.5, sm: 0 }}
            flexDirection={{ xs: "column", sm: "row"}}
            padding={1}
            gridGap={16}
            flex={1}
          >
            {/* Avatar */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              overflow="hidden"
              width={160}
              height={160}
              border={2}
              flexShrink={0}
            >
              <img
                alt="Avatar"
                height="90%"
                // Drop shadow for the avatar, only works if all avatars have a transparent background.
                style={{ marginTop: "10%", filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.7))"}}
                src={getAvatarDataUri(personalia.avatar)}
              />
            </Box>
            {/* Personalia */}
            <Box display="flex" flexDirection="column" marginBottom={1} gridGap={8}>
              <Typography variant="h3" align="left">
                {getFirstName()} {getLastName()}
              </Typography>
              <Personalia icon={<EmailIcon />}>{personalia.email}</Personalia>
              <Personalia icon={<PlaceIcon />}>{personalia.city}</Personalia>
              <Personalia icon={<CakeIcon />}>{formatDate(personalia.dateOfBirth)}</Personalia>
            </Box>
          </Box>
          {/* Edit button in mobile view */}
          <Hidden mdUp>
            <Box>
              <TooltipIconButton
                color="inherit"
                tooltip={"Edit personal details"}
                onClick={() => setIsEditing(true)}
              >
                <EditIcon fontSize="small" />
              </TooltipIconButton>
            </Box>
          </Hidden>
        </Box>
        
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
        >
          {/* Have the ability to edit the personalia when in normal view. */}
          <Hidden smDown> 
            <SectionHeader
              title={`About ${personalia.firstName}`}
              action="edit"
              actionTooltip="Edit personal details"
              actionOnClick={() => setIsEditing(true)}
            />
          </Hidden>
          {/* Only show about in mobile view, the edit option will be somewhere else. */}
          <Hidden mdUp> 
            <SectionHeader
              title={`About ${personalia.firstName}`}
            />
          </Hidden>
          {/* Introduction text. */}
          <Box padding={2} paddingTop={0}>
            <Typography variant="body2">
              {introduction
                ? introduction
                : `${getFirstName()} has nothing to tell you.`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <SectionEditDialog
        title="Personal details"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onSave={() => {}}
      >
        <Box display="flex" flexDirection="column" gridGap={16}>
          <Box display="flex" flexDirection="row" gridGap={8}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="First name"
            />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Last name"
            />

            {/* <Input
              as={TextField}
              name="firstName"
              label="First Name"
              control={methods.control}
              defaultValue=""
              flex={1}
            />
            <Input
              as={TextField}
              name="lastName"
              label="Last name"
              control={methods.control}
              defaultValue=""
              flex={1}
            /> */}
          </Box>
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Email"
            />
          </Box>
          <Box display="flex" flexDirection="row" gridGap={8}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="City"
            />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Date of birth"
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              size="small"
              label="Introduction"
              rows={6}
            />
          </Box>
          <Input
            as={AvatarSelector}
            name="avatar"
            label="Avatar"
            control={methods.control}
          />
        </Box>
      </SectionEditDialog>

      <EditModalWrapper
        isOpen={false}
        onRequestClose={() => setIsEditing(false)}
        methods={methods}
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
          onChange={([selected]: any) => {
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

const Personalia: FunctionComponent<{ icon: ReactNode }> = ({ icon, children }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridGap={8}
    >
      {icon}
      {children ? children : "---"}
    </Box>
  );
};
