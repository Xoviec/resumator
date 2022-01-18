import { Box } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import { Section } from "./Section";
import { useModal } from "../../hooks/useModal";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormRow, FormTextField } from "../Form";

interface IntroductionProps {
  onSubmit: (value: { motivation: string }) => void;
  introText: string;
}

interface IntroductionDialogProps {
  data: {
    motivation: string;
  };
  onCancel: () => void;
  onSave: (data: { motivation: string }) => void;
  open: boolean;
}

const IntroductionDialog: FunctionComponent<IntroductionDialogProps> = ({
  data,
  onCancel,
  onSave,
  open,
}) => {
  return (
    <SectionEditDialog
      title="Edit introduction"
      data={data}
      onCancel={onCancel}
      onSave={onSave}
      open={open}
    >
      <FormRow>
        <FormTextField multiline name="motivation" label="Introduction" rows={8} />
      </FormRow>
    </SectionEditDialog>
  );
};

export const Introduction: FunctionComponent<IntroductionProps> = ({
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
        title="Introduction"
        action={introText ? "edit" : "add"}
        actionOnClick={handleOpenDialog}
      >
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
          <p>{introText}</p>
        </Box>

        <IntroductionDialog
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
