import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Box, Typography } from "@mui/material/";
import { styled } from "@mui/system";
import Fuse from "fuse.js";
import { ReactElement, VFC } from "react";
import { getCountryIcon } from "../../lib";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import { findExperience, findSkillExperience } from "./utils";

const StyledUl = styled("ul")({
  margin: 0,
  padding: 0,
});
const StyledLi = styled("li")({
  listStyle: "none",

  "& div:first-child  > svg": {
    opacity: ".2",
  },
});

interface Props {
  resume: ResumeModel;
  matches: ReadonlyArray<Fuse.FuseResultMatch> | undefined;
}

export const OverviewResumeSecondaryContent: VFC<Props> = ({ matches, resume }) => {
  const getSecondaryContent = (
    match: Fuse.FuseResultMatch,
    resume: ResumeModel
  ): ReactElement | null => {
    switch (match.key) {
      case "skills.name":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <WorkspacePremiumIcon />
            {match.value}
            <Typography typography={{ fontStyle: "italic" }}>
              {findSkillExperience(resume, match.value)}
            </Typography>
          </Box>
        );
        break;
      case "projects.company":
      case "experience.company":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <BusinessIcon />
            {match.value}
            <Typography typography={{ fontStyle: "italic" }}>
              {findExperience(resume, match.value)}
            </Typography>
          </Box>
        );
        break;

      case "personalia.city":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnIcon />
            {resume.personalia.city}
            <Box display="flex" alignItems="center" style={{ width: "16px" }}>
              {getCountryIcon(resume.personalia.countryCode)}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Typography variant="body2" component="span">
      <StyledUl>
        {matches?.map((match) => {
          return (
            <StyledLi key={`${match.key}${match.value}`}>
              {getSecondaryContent(match, resume)}
            </StyledLi>
          );
        })}
      </StyledUl>
    </Typography>
  );
};
