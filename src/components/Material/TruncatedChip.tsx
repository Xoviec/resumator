import { Chip, Tooltip, ChipProps } from "@mui/material";
import { VoidFunctionComponent } from "react";

// helpers
import { truncateLabel } from "../../helpers";

export interface TruncatedChipProps extends ChipProps {
  label: string;
}

export const TruncatedChip: VoidFunctionComponent<TruncatedChipProps> = (props) => {
  const { label, ...rest } = props;
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
