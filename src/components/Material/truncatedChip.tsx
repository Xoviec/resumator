import { Chip, Tooltip, ChipProps } from "@mui/material";
import { VoidFunctionComponent } from "react";

const MAX_LENGTH = 12;

<<<<<<< HEAD
// helpers
import { truncateLabel } from "../../helpers";

export const TruncateChip = ({ label, limit, ...rest }: any) => {
=======
const truncateLabel = (content: string) => {
  if (content.length < MAX_LENGTH) return content;
  return `${content.substr(0, MAX_LENGTH)}...`;
};

export interface TruncatedChipProps extends ChipProps {
  label: string;
}

export const TruncatedChip: VoidFunctionComponent<TruncatedChipProps> = (props) => {
  const { label, ...rest } = props;
>>>>>>> fix: refactor FormSkillsSelectAutocomplete
  return (
    <Tooltip title={label}>
      <Chip
        size="small"
        color="secondary"
        variant="outlined"
        {...rest}
        label={truncateLabel(label)}
      />
    </Tooltip>
  );
};
