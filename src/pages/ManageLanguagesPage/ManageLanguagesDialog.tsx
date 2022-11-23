import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";
import { FC } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FormColumn, FormRow, FormTextField } from "../../components/Form";

type Props = {
  onSubmit: (data: FieldValues) => Promise<void>;
  open: boolean;
  setIsDialogOpen: (open: boolean) => void;
};

const Content = styled(DialogContent)`
  overflow-y: visible;
`;

export const ManageLanguagesDialog: FC<Props> = ({
  open,
  onSubmit,
  setIsDialogOpen,
}) => {
  const { ...form } = useForm();
  return (
    <Dialog
      onClose={() => setIsDialogOpen(false)}
      fullWidth
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>Add new language</DialogTitle>
      <Content>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormColumn>
              <FormRow>
                <FormTextField autoFocus required name="name" label="Name" />
              </FormRow>
            </FormColumn>
            <DialogActions>
              <Button type="button">Cancel</Button>
              <Button
                type="submit"
                disabled={Object.keys(form.formState.errors).length > 0}
                color="primary"
              >
                Save
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Content>
    </Dialog>
  );
};
