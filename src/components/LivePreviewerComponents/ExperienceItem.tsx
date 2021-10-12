import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { formatDate, formatTimespan } from "../../lib/date";
import { SectionItemHeader, useSectionItemHeaderStyles } from "./SectionItemHeader";
import { DetailWithIcon } from "./DetailWithIcon";
// Icons
import BusinessIcon from "@mui/icons-material/Business";
import DateRangeIcon from "@mui/icons-material/DateRangeOutlined";
import { colors } from "../../config/theme";
import { TruncateChip } from "../Material/truncatedChip";

export interface ExperienceStackItem {
  name: string;
}

export interface ExperienceModel {
  role: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
  stackAndTechniques: ExperienceStackItem[];
}

interface ExperienceItemProps {
  type: string;
  experienceItem: ExperienceModel;
  onDelete: () => void;
  onEdit: (item: ExperienceModel) => void;
}

const useStyles = makeStyles({
  description: {
    "& p": {
      margin: 0,
    },
    "& ul, ol": {
      margin: 0,
    },
  },
});

export const ExperienceItem: FunctionComponent<ExperienceItemProps> = ({
  type,
  experienceItem,
  onDelete,
  onEdit,
}) => {
  const classes = useStyles();
  const sectionItemHeaderClasses = useSectionItemHeaderStyles();
  let description;

  // Parse the description.
  try {
    const parsed = convertFromRaw(JSON.parse(experienceItem.description));
    const editor = EditorState.createWithContent(parsed);
    description = stateToHTML(editor.getCurrentContent());
  } catch (err) {
    // If parsing fails, we just use the string description.
    description = experienceItem.description;
  }

  return (
    <Box className={sectionItemHeaderClasses.container}>
      <SectionItemHeader
        title={experienceItem.role}
        type={type.toLowerCase()}
        classes={sectionItemHeaderClasses}
        onDelete={() => onDelete()}
        onEdit={() => onEdit(experienceItem)}
      ></SectionItemHeader>
      <Box display="flex" flexDirection="column" gap="8px">
        <DetailWithIcon icon={<BusinessIcon style={{ color: colors.midBlue }} />}>
          {experienceItem.company}
        </DetailWithIcon>
        <DetailWithIcon icon={<DateRangeIcon style={{ color: colors.midBlue }} />}>
          {formatTimespan({
            startDate: experienceItem.startDate,
            endDate: experienceItem.endDate,
          })}
        </DetailWithIcon>
        <Box
          marginTop={description ? 1.5 : 0}
          marginBottom={1.5}
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {experienceItem.stackAndTechniques && (
          <Box display="flex" flexWrap="wrap" gap="8px" marginBottom={1.5}>
            {experienceItem.stackAndTechniques.map((skill) => (
              <TruncateChip
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
