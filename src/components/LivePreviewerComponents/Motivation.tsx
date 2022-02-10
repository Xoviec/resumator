import { Box } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import { Section } from "./Section";
import { useModal } from "../../hooks/useModal";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormRow, FormTextField } from "../Form";

interface MotivationProps {
  onSubmit: (value: { motivation: string }) => void;
  introText: string;
}

interface MotivationDialogProps {
  data: {
    motivation: string;
  };
  onCancel: () => void;
  onSave: (data: { motivation: string }) => void;
  open: boolean;
}

const MotivationDialog: FunctionComponent<MotivationDialogProps> = ({
  data,
  onCancel,
  onSave,
  open,
}) => {
  return (
    <SectionEditDialog
      title="Edit motivation"
      data={data}
      onCancel={onCancel}
      onSave={onSave}
      open={open}
    >
      <FormRow>
        <FormTextField
          multiline
          name="motivation"
          label="Motivation"
          rows={8}
          required={false}
        />
      </FormRow>
    </SectionEditDialog>
  );
};

export const Motivation: FunctionComponent<MotivationProps> = ({
  onSubmit,
  introText,
}) => {
  const { isEditing, setIsEditing } = useModal();

  const handleOpenDialog = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  return (
    <Box marginTop={2}>
      <Section
        title="Motivation"
        action={introText ? "edit" : "add"}
        actionOnClick={handleOpenDialog}
      >
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
          <p>{introText}</p>
        </Box>

        <MotivationDialog
          data={{ motivation: introText }}
          open={isEditing}
          onCancel={() => setIsEditing(false)}
          onSave={(data) => {
            onSubmit(data);
            setIsEditing(false);
          }}
        />
      </Section>
    </Box>
  );
};
