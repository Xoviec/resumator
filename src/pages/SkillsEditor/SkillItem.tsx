import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, InputBase, IconButton, Card, Box } from "@mui/material";
import { FunctionComponent } from "react";
import { inputEditedStyle, inputStyle } from "./skillsEditorStyles";

export interface SkillItemProps {
  handleChangeSkill: (value: string) => any;
  didChange: boolean;
  setDeleteIndex: () => any;
  setOpenConfirmation: () => any;
  skill: string;
}

export const SkillItem: FunctionComponent<SkillItemProps> = ({
  handleChangeSkill,
  didChange,
  setDeleteIndex,
  setOpenConfirmation,
  skill,
  ...props
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card elevation={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <InputBase
            inputProps={{ "data-testid": "content-input" }}
            defaultValue={skill}
            onChange={(event: any) => {
              handleChangeSkill(event.target.value);
            }}
            placeholder="Skill"
            sx={didChange ? inputEditedStyle : inputStyle}
          />
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              setDeleteIndex();
              setOpenConfirmation();
            }}
            size="large"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );
};
