// Icons
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Typography,
} from "@mui/material";
import { isEmpty } from "ramda";
import { PropsWithChildren, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TooltipIconButton } from "../Material";
// components
import { EditConfirmationModal } from "../common/Modal";

export interface SectionEditDialogProps<T> extends DialogProps {
  title: string;
  data: { [x: string]: any };
  onCancel: () => void;
  onSave: (data: T) => void;
}

// FunctionComponent doesn't work well with additional generics, so we use the props type directly.
// To have generics work in TSX with an arrow function, we have to hint the compiler to use generics, thus the trailing comma.
const SectionEditDialogInternal = <T,>({
  title,
  data,
  onCancel,
  onSave,
  children,
  ...props
}: PropsWithChildren<SectionEditDialogProps<T>>) => {
  const { reset, ...form } = useForm();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const isFormDirty = !isEmpty(form.formState.dirtyFields);

  useEffect(() => reset({ ...data }), [reset, data]);

  const handleCloseAttempt = () => {
    if (isFormDirty) {
      setIsConfirmModalOpen(true);
    } else {
      onCancel();
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="section-edit-dialog-title"
      aria-describedby="section-edit-dialog-content"
      onClose={handleCloseAttempt}
      {...props}
    >
      {/* Custom title to include a close button, example from material documentation doesn't work. */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding={1}
      >
        <Box paddingX={2} paddingY={1}>
          <Typography id="section-edit-dialog-title" variant="h6">
            {title}
          </Typography>
        </Box>
        <TooltipIconButton tooltip="Close" onClick={handleCloseAttempt}>
          <CloseIcon />
        </TooltipIconButton>
      </Box>
      {/* Content */}
      <DialogContent id="section-edit-dialog-content">
        <FormProvider reset={reset} {...form}>
          <form
            data-testid="form"
            id="section-edit-dialog-form"
            onSubmit={form.handleSubmit((formData) => onSave(formData as T))}
          >
            {children}
          </form>
        </FormProvider>
      </DialogContent>
      {/* Actions for cancel and save. */}
      <DialogActions>
        <Button type="button" onClick={handleCloseAttempt}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={Object.keys(form.formState.errors).length > 0}
          color="primary"
          form="section-edit-dialog-form"
        >
          Save
        </Button>
      </DialogActions>
      <EditConfirmationModal
        isModalOpen={isConfirmModalOpen}
        isFilledData={isFormDirty}
        onClose={() => onCancel()}
        onContinue={() => {
          setIsConfirmModalOpen(false);
        }}
      />
    </Dialog>
  );
};

export const SectionEditDialog = <T,>(
  props: PropsWithChildren<SectionEditDialogProps<T>>
): JSX.Element | null => {
  return props.open ? <SectionEditDialogInternal {...props} /> : null;
};
