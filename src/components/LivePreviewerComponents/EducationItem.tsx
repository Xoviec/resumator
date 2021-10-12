import { FunctionComponent } from "react";
import { Box } from "@material-ui/core";
import { formatDate, formatTimespan } from "../../lib/date";
import { SectionItemHeader, useSectionItemHeaderStyles } from "./SectionItemHeader";
import { DetailWithIcon } from "./DetailWithIcon";
// Icons
import SchoolIcon from "@material-ui/icons/School";
import DateRangeIcon from "@material-ui/icons/DateRangeOutlined";
import { colors } from "../../config/theme";

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
  const sectionItemHeaderClasses = useSectionItemHeaderStyles();

  const getTimespan = () => {
    return formatTimespan({
      startDate: educationItem.startDate,
      endDate: educationItem.endDate,
      showEndYear: true,
    });
  };

  return (
    <Box className={sectionItemHeaderClasses.container}>
      <SectionItemHeader
        type="education"
        title={educationItem.name}
        classes={sectionItemHeaderClasses}
        onDelete={() => onDelete()}
        onEdit={() => onEdit(educationItem)}
      ></SectionItemHeader>
      <Box display="flex" flexDirection="column" gridGap={8}>
        <DetailWithIcon icon={<SchoolIcon style={{ color: colors.midBlue }} />}>
          {educationItem.institute}
        </DetailWithIcon>
        <DetailWithIcon icon={<DateRangeIcon style={{ color: colors.midBlue }} />}>
          {getTimespan()}
        </DetailWithIcon>
      </Box>
    </Box>
  );
};
