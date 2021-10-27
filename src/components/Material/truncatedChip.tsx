import { Chip, Tooltip } from "@mui/material";

// helpers
import { truncateLabel } from "../../helpers";

export const TruncateChip = ({ label, limit, ...rest }: any) => {
  return (
    <Tooltip title={label}>
      <Chip {...rest} label={truncateLabel(label)} />
    </Tooltip>
  );
};
