import styled from "@emotion/styled";
import Chip from "@material-ui/core/Chip";

export const SPACING = 8;

const CustomChip = styled(Chip)`
  position: relative;
  top: -${SPACING}px;
  left: -${SPACING}px;
  margin-left: ${SPACING}px;
  margin-top: ${SPACING}px;
`;
export default CustomChip;
