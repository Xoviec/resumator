import DateRangeIcon from "@mui/icons-material/DateRangeOutlined";
// Icons
import SchoolIcon from "@mui/icons-material/School";
import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { colors } from "../../config/theme";
import { formatTimespan } from "../../lib/date";
import { DetailWithIcon } from "./DetailWithIcon";
import { SectionItemHeader } from "./SectionItemHeader";

export interface EducationModel {
  name: string;
  institute: string;
  startDate: Date;
  endDate: Date;
}

interface EducationItemProps {
  educationItem: EducationModel;
  onDelete: () => void;
  onEdit: (item: EducationModel) => void;
}

export const EducationItem: FunctionComponent<EducationItemProps> = ({
  educationItem,
  onDelete,
  onEdit,
}) => {
  const getTimespan = () => {
    return formatTimespan({
      startDate: educationItem.startDate,
      endDate: educationItem.endDate,
      showEndYear: true,
      dateFormat: "MMMM yyyy",
    });
  };

  return (
    <SectionItemHeader
      type="education"
      title={educationItem.name}
      onDelete={() => onDelete()}
      onEdit={() => onEdit(educationItem)}
    >
      <Box display="flex" flexDirection="column" gap="8px">
        <DetailWithIcon icon={<SchoolIcon style={{ color: colors.midBlue }} />}>
          {educationItem.institute}
        </DetailWithIcon>
        <DetailWithIcon icon={<DateRangeIcon style={{ color: colors.midBlue }} />}>
          {getTimespan()}
        </DetailWithIcon>
      </Box>
    </SectionItemHeader>
  );
};
