import { Chip, Tooltip } from "@mui/material";

const truncateLabel = (content: string) => {
  const maxLength = 12;
  if (content.length < maxLength) return content;
  return `${content.substr(0, maxLength)}...`;
};

export const TruncateChip = (props: any) => {
  const { label, limit, ...rest } = props;
  return (
    <Tooltip title={label}>
      <Chip {...rest} label={truncateLabel(label)} />
    </Tooltip>
  );
};
