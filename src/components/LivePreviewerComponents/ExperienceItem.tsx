import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";
import { formatDate } from "../../lib/date";
import Chip from "@material-ui/core/Chip";
import { SectionItemHeader, useSectionItemHeaderStyles } from "./SectionItemHeader";
import { DetailWithIcon } from "./DetailWithIcon";
// Icons
import BusinessIcon from "@material-ui/icons/Business"
import DateRangeIcon from "@material-ui/icons/DateRangeOutlined"

export interface ExperienceModel {
  role: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
  stackAndTechniques: { name: string }[];
}

interface ExperienceItemProps {
  type: string
  experienceItem: ExperienceModel;
  onDelete: () => void;
  onEdit: (item: ExperienceModel) => void;
}

export const ExperienceItem: FunctionComponent<ExperienceItemProps> = ({ type, experienceItem, onDelete, onEdit }) => {
  const classes = useSectionItemHeaderStyles();

  const getTimespan = () => {
    const start = experienceItem.startDate;
    const end = experienceItem.endDate;

    if (start && end) return `${formatDate(start)} - ${formatDate(end)}`;
    if (start && !end) return `${formatDate(start)} - present`;
    if (!start && end) return `somewhere in the past - ${formatDate(end)}`;

    return null;
  }

  return (
    <Box className={classes.container}>
      <SectionItemHeader
        title={experienceItem.role}
        type={type.toLowerCase()}
        classes={classes}
        onDelete={() => onDelete()}
        onEdit={() => onEdit(experienceItem)}
      ></SectionItemHeader>
      <Box display="flex" flexDirection="column" gridGap={8}>
        <DetailWithIcon icon={<BusinessIcon />}>{experienceItem.company}</DetailWithIcon>
        <DetailWithIcon icon={<DateRangeIcon />}>{getTimespan()}</DetailWithIcon>
        <Box>{experienceItem.description}</Box>
        {experienceItem.stackAndTechniques && (
          <Box display="flex" flexWrap="wrap" gridGap={8}>
            {experienceItem.stackAndTechniques.map((skill) => (
              <Chip
                key={skill.name}
                label={skill.name}
                size="small"
                variant="outlined"
                color="secondary"
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
