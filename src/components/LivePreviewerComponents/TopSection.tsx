// Icons
import CakeIcon from "@mui/icons-material/CakeOutlined";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import PlaceIcon from "@mui/icons-material/PlaceOutlined";
import { Box, Card, Hidden, Typography } from "@mui/material";
import { FunctionComponent, useMemo, useState } from "react";
import { colors } from "../../config/theme";
import { getCountryIcon, formatDate } from "../../lib";
import getAvatarDataUri from "../../lib/getAvatarDataUri";
import { TooltipIconButton } from "../Material";
import { DetailWithIcon } from "./DetailWithIcon";
import { PersonaliaDialog } from "./PersonaliaDialog";
import { SectionHeader } from "./SectionHeader";

export enum CountryCode {
  NL = "NL",
  BE = "BE",
}

export interface PersonaliaModel {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  countryCode: keyof typeof CountryCode;
  dateOfBirth: Date | string | null;
  role: string;
}

interface FormModel extends PersonaliaModel {
  introduction: string | undefined;
}

interface TopSectionProps {
  personalia: PersonaliaModel;
  introduction?: string;
  isArchived?: boolean;
  onSubmit: (value: FormModel) => void;
}

export const TopSection: FunctionComponent<TopSectionProps> = ({
  personalia,
  introduction = "",
  isArchived = false,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const getFirstName = () => personalia.firstName;
  const getLastName = () => personalia.lastName;

  const dateOfBirth = useMemo(() => personalia.dateOfBirth || "", [personalia]);

  return (
    // We use a card directly here instead of a section because this is a custom full width section.
    <Card elevation={3}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} padding={1.5}>
        <Box display="flex" flexDirection="row" flex={1}>
          <Box
            display="flex"
            alignItems="center"
            marginLeft={{ xs: 2, sm: 0 }}
            flexDirection={{ xs: "column", sm: "row" }}
            gap="16px"
            flex={1}
          >
            {/* Avatar */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              overflow="hidden"
              width={160}
              height={160}
              border={2}
              borderColor={colors.black}
              marginRight={2}
              marginLeft={2}
              flexShrink={0}
            >
              <img
                alt="Avatar"
                height="90%"
                // Drop shadow for the avatar, only works if all avatars have a transparent background.
                style={{
                  marginTop: "10%",
                }}
                src={getAvatarDataUri(personalia.avatar)}
              />
            </Box>
            {/* Personalia */}
            <Box display="flex" flexDirection="column" marginBottom={1} gap="8px">
              <Typography
                variant="h3"
                align="left"
                style={{
                  fontSize: "2.53rem",
                  marginBottom: "-10px",
                }}
              >
                {isArchived && "(Archived) "}
                {getFirstName()} {getLastName()}
              </Typography>
              <Typography
                variant="h5"
                style={{
                  marginBottom: "20px",
                }}
              >
                {personalia.role}
              </Typography>
              <DetailWithIcon icon={<EmailIcon style={{ color: colors.black }} />}>
                {personalia.email}
              </DetailWithIcon>
              <DetailWithIcon icon={<PlaceIcon style={{ color: colors.black }} />}>
                {personalia.city}
                <Box display="flex" alignItems="center" style={{ width: "16px" }}>
                  {getCountryIcon(personalia.countryCode)}
                </Box>
              </DetailWithIcon>
              <DetailWithIcon icon={<CakeIcon style={{ color: colors.black }} />}>
                {formatDate(dateOfBirth)}
              </DetailWithIcon>
            </Box>
          </Box>
          {/* Edit button in mobile view */}
          <Hidden mdUp>
            <Box>
              <TooltipIconButton
                color="inherit"
                tooltip={"Edit personal details"}
                onClick={() => setIsEditing(true)}
              >
                <EditIcon fontSize="small" />
              </TooltipIconButton>
            </Box>
          </Hidden>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          borderLeft={{ md: "1px solid" }}
          paddingLeft={{ md: 2 }}
          marginLeft={{ md: 2 }}
          maxWidth={{ md: "50%" }}
        >
          {/* Have the ability to edit the personalia when in normal view. */}
          <Hidden mdDown>
            <SectionHeader
              title={`About ${getFirstName()}`}
              action="edit"
              actionTooltip="Edit personal details"
              actionOnClick={() => setIsEditing(true)}
            />
          </Hidden>
          {/* Only show about in mobile view, the edit option will be somewhere else. */}
          <Hidden mdUp>
            <SectionHeader title={`About ${getFirstName()}`} />
          </Hidden>
          {/* Introduction text. */}
          <Box padding={2} paddingTop={0}>
            <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
              {introduction || `${getFirstName()} has nothing to tell you.`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <PersonaliaDialog
        data={{ ...personalia, introduction }}
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onSave={(data) => {
          setIsEditing(false);
          onSubmit(data);
        }}
      />
    </Card>
  );
};
