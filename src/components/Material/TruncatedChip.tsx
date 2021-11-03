import { Chip, Tooltip, ChipProps } from "@mui/material";
import { VoidFunctionComponent } from "react";

// helpers
import { truncateLabel } from "../../helpers";

export interface TruncatedChipProps extends ChipProps {
  label: string;
  // TODO: fix any type
  onDelete?: any;
}

export const TruncatedChip: VoidFunctionComponent<TruncatedChipProps> = (props) => {
  const { label, onDelete } = props;

  return (
    <Tooltip title={label}>
      <Chip
        size="small"
        color="secondary"
        variant="outlined"
        label={truncateLabel(label)}
        onDelete={onDelete?.onClick}
        {...onDelete}
      />
    </Tooltip>
  );
};
