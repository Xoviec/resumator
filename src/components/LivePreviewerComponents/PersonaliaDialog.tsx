import { VoidFunctionComponent } from "react";
import {
  FormColumn,
  FormDatePicker,
  FormRow,
  FormTextField,
  FormCountrySelect,
} from "../Form";
import { SectionEditDialog, SectionEditDialogProps } from "./SectionEditDialog";
import { PersonaliaModel } from "./TopSection";
import { setYear, getCurrentYear } from "../../lib/date";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";

type DialogFormData = PersonaliaModel & { introduction: string | undefined };

type PersonaliaDialogProps = Omit<SectionEditDialogProps<DialogFormData>, "title">;

export const PersonaliaDialog: VoidFunctionComponent<PersonaliaDialogProps> = ({
  data,
  open,
  onSave,
  onCancel,
}) => {
  const minDate = setYear(getCurrentYear() - 100);
  const { userRecord } = useFirebaseApp();
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
          <FormTextField required name="firstName" label="First name*" />
          <FormTextField required name="lastName" label="Last name*" />
        </FormRow>
        <FormRow>
          <FormTextField required name="role" label="Role*" />
        </FormRow>
        {userRecord?.isManager && (
          <FormRow>
            <FormTextField required name="email" label="Email*" />
          </FormRow>
        )}
        <FormRow>
          <FormColumn>
            <FormTextField name="city" label="City*" />
          </FormColumn>
          <FormColumn>
            <FormCountrySelect name="countryCode" />
          </FormColumn>
          <FormColumn>
            <FormDatePicker
              name="dateOfBirth"
              label="Date of birth*"
              inputFormat="dd-MM-yyyy"
              disableFuture
              minDate={minDate}
              views={["year", "month", "day"]}
            />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormTextField
            multiline
            name="introduction"
            label="Introduction*"
            rows={8}
            required={false}
          />
        </FormRow>
      </FormColumn>
    </SectionEditDialog>
  );
};
