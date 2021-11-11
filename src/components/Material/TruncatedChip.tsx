import { VoidFunctionComponent } from "react";
import { Chip, Tooltip, ChipProps } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

// helpers
import { truncateLabel } from "../../helpers";

export interface TruncatedChipProps extends ChipProps {
  label: string;
  // TODO: fix any type
  onDelete?: any;
  isActive?: boolean;
  onActiveChange?: (label: string) => void;
}

export const TruncatedChip: VoidFunctionComponent<TruncatedChipProps> = (props) => {
  const { label, onDelete, isActive, onActiveChange } = props;

  return (
    <Tooltip title={label}>
      <Chip
        size="small"
        color="secondary"
        variant="outlined"
        icon={isActive && <DoneIcon />}
        label={truncateLabel(label)}
        onDelete={onDelete ? onDelete?.onClick : null}
        onClick={onActiveChange ? () => onActiveChange(label) : null}
        {...onDelete}
      />
    </Tooltip>
  );
};