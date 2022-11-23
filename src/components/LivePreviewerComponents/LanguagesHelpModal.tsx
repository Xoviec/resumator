import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import React from "react";
import { Proficiency } from "../../types/language";

type Props = {
  proficiencies: Proficiency[];
  isModalOpen: boolean;
  onClose: () => void;
};

export const LanguagesHelpModal: React.FC<Props> = ({
  proficiencies,
  isModalOpen,
  onClose,
}) => {
  return (
    <Dialog onClose={onClose} open={isModalOpen}>
      <DialogContent>
        <Box>
          {proficiencies.map((proficiency) => {
            return (
              <Box mb={2} key={proficiency.id}>
                <Typography fontStyle={"italic"} fontWeight={"bold"}>
                  {proficiency.name}
                </Typography>
                <Typography>{proficiency.description}</Typography>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
