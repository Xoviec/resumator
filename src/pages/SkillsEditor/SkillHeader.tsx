import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Box, Typography, InputBase, Button } from "@mui/material";
import { ChangeEvent, FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { SpacedButton } from "../../components/Material";
import { inputStyle } from "./skillsEditorStyles";

export interface SkillHeaderProps {
  isBtnDisabled: boolean;
  saveNewSkill: (event: React.FormEvent<HTMLFormElement>) => void;
  newSkill: string;
  editCount: number;
  saveEditedSkills: () => void;
  handleNewSkill: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const SkillHeader: FunctionComponent<SkillHeaderProps> = ({
  isBtnDisabled,
  saveNewSkill,
  newSkill,
  handleNewSkill,
  editCount,
  saveEditedSkills,
  ...props
}) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Typography variant="h3" component="h1">
              Skills &nbsp;
            </Typography>

            <Button color="primary" variant="contained" component={NavLink} to="/">
              Go to overview
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            height="100%"
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <Box
              height="100%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              marginBottom={{ xs: 2, md: 0 }}
            >
              <form onSubmit={saveNewSkill} data-testid="form">
                <InputBase
                  autoFocus
                  placeholder="Skill name"
                  value={newSkill}
                  sx={inputStyle}
                  onChange={handleNewSkill}
                />
                <SpacedButton
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="secondary"
                  disabled={isBtnDisabled}
                  type="submit"
                  mx={2}
                >
                  Add skill
                </SpacedButton>
              </form>
            </Box>
            <Box
              height="100%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <SpacedButton
                startIcon={<DeleteIcon />}
                variant="contained"
                color="secondary"
                disabled={!editCount}
                onClick={saveEditedSkills}
              >
                Delete selected skills ({editCount})
              </SpacedButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <br />
    </>
  );
};
