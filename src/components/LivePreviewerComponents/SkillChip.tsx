import { Chip, ChipProps } from "@mui/material";
import { MouseEventHandler, VoidFunctionComponent } from "react";

export interface SkillChipProps extends ChipProps {
  label: string;
  // TODO: fix any type
  onDelete?: MouseEventHandler<HTMLDivElement>;
  isActive?: boolean;
  onActiveChange?: (label: string) => void;
}

export const SkillChip: VoidFunctionComponent<SkillChipProps> = (props) => {
  const { label, onDelete, isActive, onActiveChange } = props;
  return (
    <Chip
      size="small"
      color="secondary"
      variant="outlined"
      label={label}
      onDelete={onDelete}
      onClick={onActiveChange ? () => onActiveChange(label) : () => null}
    />
  );
};
