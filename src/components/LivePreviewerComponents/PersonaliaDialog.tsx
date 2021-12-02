import { Typography } from "@mui/material";
import { VoidFunctionComponent } from "react";
import {
  FormAvatarSelect,
  FormColumn,
  FormDatePicker,
  FormRow,
  FormTextField,
} from "../Form";
import { SectionEditDialog, SectionEditDialogProps } from "./SectionEditDialog";
import { PersonaliaModel } from "./TopSection";

type DialogFormData = PersonaliaModel & { introduction: string };

type PersonaliaDialogProps = Omit<SectionEditDialogProps<DialogFormData>, "title">;

export const PersonaliaDialog: VoidFunctionComponent<PersonaliaDialogProps> = ({
  data,
  open,
  onSave,
  onCancel,
}) => {
  return (
    <SectionEditDialog
      title="Personal details"
      data={data}
      open={open}
      onCancel={onCancel}
      onSave={onSave}
    >
      <FormColumn>
        <FormRow>
          <FormTextField required name="firstName" label="First name" />
          <FormTextField required name="lastName" label="Last name" />
        </FormRow>
        <FormRow>
          <FormTextField required name="email" label="Email" />
        </FormRow>
        <FormRow>
          <FormColumn>
            <FormTextField name="city" label="City" />
          </FormColumn>
          <FormColumn>
            <FormDatePicker
              name="dateOfBirth"
              label="Date of birth"
              inputFormat="dd-MM-yyyy"
              views={["year", "month", "day"]}
            />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormTextField
            multiline
            name="introduction"
            label="Introduction"
            rows={8}
          />
        </FormRow>
        <FormRow>
          <FormAvatarSelect name="avatar" label="Avatar" />
        </FormRow>
        <FormRow>
          <Typography>
            Want to add your own avatar? Make a PR{" "}
            <a
              href="https://github.com/FrontMen/resumator/tree/develop/src/assets/images/avatars"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </Typography>
        </FormRow>
      </FormColumn>
    </SectionEditDialog>
  );
};
