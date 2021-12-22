// Icons
import BusinessIcon from "@mui/icons-material/Business";
import DateRangeIcon from "@mui/icons-material/DateRangeOutlined";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { FunctionComponent } from "react";
import { colors } from "../../config/theme";
import { formatTimespan } from "../../lib/date";
import { DetailWithIcon } from "./DetailWithIcon";
import { SectionItemHeader } from "./SectionItemHeader";
import { SkillChip } from "./SkillChip";
import { SkillModel } from "./Skills";

export interface ExperienceModel {
  role: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
  stackAndTechniques: SkillModel[]; // TODO: rename it to skills?
}

interface ExperienceItemProps {
  type: string;
  experienceItem: ExperienceModel;
  onDelete: () => void;
  onEdit: (item: ExperienceModel) => void;
}

const DescriptionBox = styled(Box)(({ theme }) => ({
  "& p": {
    margin: 0,
  },
  "& ul, ol": {
    margin: 0,
  },
}));

export const ExperienceItem: FunctionComponent<ExperienceItemProps> = ({
  type,
  experienceItem,
  onDelete,
  onEdit,
}) => {
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
    <SectionItemHeader
      title={experienceItem.role}
      type={type.toLowerCase()}
      onDelete={() => onDelete()}
      onEdit={() => onEdit(experienceItem)}
    >
      <Box display="flex" flexDirection="column" gap="8px">
        <DetailWithIcon icon={<BusinessIcon style={{ color: colors.midBlue }} />}>
          {experienceItem.company}
        </DetailWithIcon>
        <DetailWithIcon icon={<DateRangeIcon style={{ color: colors.midBlue }} />}>
          {formatTimespan({
            startDate: experienceItem.startDate,
            endDate: experienceItem.endDate,
            dateFormat: "MMMM yyyy",
          })}
        </DetailWithIcon>
        <DescriptionBox
          marginTop={description ? 1.5 : 0}
          marginBottom={1.5}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {experienceItem.stackAndTechniques && (
          <Box display="flex" flexWrap="wrap" gap="8px" marginBottom={1.5}>
            {experienceItem.stackAndTechniques.map((skill) => (
              <SkillChip key={skill.name} label={skill.name} />
            ))}
          </Box>
        )}
      </Box>
    </SectionItemHeader>
  );
};
