import BookIcon from "@mui/icons-material/Book";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import logos from "../../assets/images/socials";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/system";
import * as React from "react";
import { useEffect, VoidFunctionComponent } from "react";
import { useFormContext } from "react-hook-form";
import { colors } from "../../config/theme";
import { getDomain, isValidUrl } from "../../lib/url";
import { FormColumn, FormRow } from "../Form";
import { FormSelect } from "../Form/FormSelect";
import { FormTextField } from "../Form/FormTextField";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { useModal } from "../../hooks/useModal";

const StyledList = styled(List)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  min-width: 420px;
  ${({ theme: { breakpoints } }) => breakpoints.between(1200, 1400)} {
    min-width: 260px;
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 50px;
`;

const StyledListItemText = styled(ListItemText)`
  max-width: 280px;
`;

type OnSubmit = (data: SocialLinkModel[]) => void;

const iconButtonStyle = { color: colors.black };

interface SocialLinkTypeInfo {
  title: string;
  icon: JSX.Element;
  domain?: string;
  image: string;
}

export enum SocialLinkType {
  LinkedIn = "linkedin",
  Github = "github",
  Twitter = "twitter",
  Medium = "medium",
  DevTo = "dev.to",
  Blog = "blog",
  Other = "other",
}

export const SocialLinkTypeToInfoMapping: Record<
  SocialLinkType,
  SocialLinkTypeInfo
> = {
  [SocialLinkType.LinkedIn]: {
    title: "LinkedIn",
    icon: <LinkedInIcon />,
    domain: "linkedin.com",
    image: logos.linkedin,
  },
  [SocialLinkType.Github]: {
    title: "Github",
    icon: <GithubIcon />,
    domain: "github.com",
    image: logos.github,
  },
  [SocialLinkType.Twitter]: {
    title: "Twitter",
    icon: <TwitterIcon />,
    domain: "twitter.com",
    image: logos.twitter,
  },
  [SocialLinkType.Medium]: {
    title: "Medium",
    icon: <LinkIcon />,
    domain: "medium.com",
    image: logos.medium,
  },
  [SocialLinkType.DevTo]: {
    title: "Dev.to",
    icon: <LinkIcon />,
    domain: "dev.to",
    image: logos.devto,
  },
  [SocialLinkType.Blog]: {
    title: "Blog",
    icon: <BookIcon />,
    image: logos.blogging,
  },
  [SocialLinkType.Other]: {
    title: "Other",
    icon: <LinkIcon />,
    image: logos.other,
  },
};

export interface SocialLinkModel {
  linkType: SocialLinkType;
  title: string | null;
  link: string;
}

const SocialLinksFormContent: VoidFunctionComponent = () => {
  const { watch, setValue } = useFormContext();
  const linkType = watch("linkType") as SocialLinkType;
  const link = watch("link") as string;

  useEffect(() => {
    if (!isValidUrl(link)) {
      setValue("linkType", SocialLinkType.Other);
      return;
    }
    const socialLinkType: string =
      Object.keys(SocialLinkTypeToInfoMapping).find((key) => {
        return getDomain(link) === (SocialLinkTypeToInfoMapping as any)[key].domain;
      }) || SocialLinkType.Other;

    setValue("linkType", socialLinkType || SocialLinkType.Other);
  }, [link, setValue]);

  return (
    <FormColumn>
      <FormRow>
        <FormSelect
          required
          defaultValue={SocialLinkType.Other}
          name="linkType"
          label="Link Type"
        >
          {Object.entries(SocialLinkTypeToInfoMapping).map(([key, info]) => {
            return (
              <MenuItem key={key} value={key}>
                <Box
                  display="flex"
                  flexDirection="row"
                  gap="10px"
                  alignItems="center"
                >
                  {info.icon}
                  {info.title}
                </Box>
              </MenuItem>
            );
          })}
        </FormSelect>
      </FormRow>
      {linkType === SocialLinkType.Other && (
        <FormRow>
          <FormTextField required name="title" label="Title" />
        </FormRow>
      )}
      <FormRow>
        <FormTextField required name="link" label="Link" />
      </FormRow>
    </FormColumn>
  );
};

export interface SocialLinksProps {
  socialLinks: SocialLinkModel[];
  onSubmit: OnSubmit;
}

export const SocialLinks: React.VFC<SocialLinksProps> = ({
  socialLinks,
  onSubmit,
}) => {
  const {
    isEditing,
    editItem,
    editItemIndex,
    handleEdit,
    handleEditCancel,
    setEditItem,
    setEditItemIndex,
    setIsEditing,
  } = useModal();

  const handleDelete = (index: number) => {
    const filteredSocialLinks = [...socialLinks];
    filteredSocialLinks.splice(index, 1);
    onSubmit(filteredSocialLinks);
  };

  const handleSave = (item: SocialLinkModel) => {
    if (!item.title) {
      item.title = null;
    }
    const updatedSocialLinks = [...socialLinks];
    if (editItemIndex !== null) updatedSocialLinks.splice(editItemIndex!, 1, item);
    else updatedSocialLinks.push(item);

    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
    onSubmit(updatedSocialLinks);
  };

  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.between(1200, 1400));
  const secondaryListItem = (link: string) => (matches ? {} : { secondary: link });

  return (
    <Section
      title="Online presence"
      action="add"
      actionTooltip="Add link"
      actionOnClick={() => setIsEditing(true)}
    >
      <StyledList>
        {socialLinks.map((socialLinkItem: SocialLinkModel, index: number) => {
          const socialLinkItemInfo =
            SocialLinkTypeToInfoMapping[socialLinkItem.linkType];
          return (
            <ListItem
              key={index}
              button
              component="a"
              rel="noreferrer noopener"
              target="_blank"
              color="secondary"
              href={socialLinkItem.link}
            >
              <StyledListItemIcon>{socialLinkItemInfo.icon}</StyledListItemIcon>
              <StyledListItemText
                primary={
                  socialLinkItem.linkType === SocialLinkType.Other
                    ? socialLinkItem.title
                    : socialLinkItemInfo.title
                }
                {...secondaryListItem(socialLinkItem.link)}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete link"
                  onClick={() => handleDelete(index)}
                  size="large"
                >
                  <DeleteIcon style={iconButtonStyle} />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit link"
                  onClick={() => handleEdit(socialLinkItem, index)}
                  size="large"
                >
                  <EditIcon style={iconButtonStyle} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </StyledList>

      <SectionEditDialog
        title={editItem ? `Edit link` : `Add link`}
        data={editItem!}
        open={isEditing}
        onCancel={handleEditCancel}
        onSave={handleSave}
      >
        <SocialLinksFormContent />
      </SectionEditDialog>
    </Section>
  );
};
