import BookIcon from "@mui/icons-material/Book";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
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
import { styled } from "@mui/system";
import * as React from "react";
import { useEffect, useState, VoidFunctionComponent } from "react";
import { useFormContext } from "react-hook-form";
import { colors } from "../../config/theme";
import { getDomain, isValidUrl } from "../../lib/url";
import { FormColumn, FormRow } from "../Form";
import { FormSelect } from "../Form/FormSelect";
import { FormTextField } from "../Form/FormTextField";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";

const StyledList = styled(List)`
  width: "100%";
  background-color: ${({ theme }) => theme.palette.background.paper};
  min-width: 420px;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 50px;
`;

const StyledListItemText = styled(ListItemText)`
  max-width: 280px;
`;

type OnSubmit = (data: SocialLinkModel[]) => void;

const iconButtonStyle = { color: colors.midBlue };

interface SocialLinkTypeInfo {
  title: string;
  icon: JSX.Element;
  domain?: string;
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
  },
  [SocialLinkType.Github]: {
    title: "Github",
    icon: <GithubIcon />,
    domain: "github.com",
  },
  [SocialLinkType.Twitter]: {
    title: "Twitter",
    icon: <TwitterIcon />,
    domain: "twitter.com",
  },
  [SocialLinkType.Medium]: {
    title: "Medium",
    icon: <LinkIcon />,
    domain: "medium.com",
  },
  [SocialLinkType.DevTo]: {
    title: "Dev.to",
    icon: <LinkIcon />,
    domain: "dev.to",
  },
  [SocialLinkType.Blog]: {
    title: "Blog",
    icon: <BookIcon />,
  },
  [SocialLinkType.Other]: {
    title: "Other",
    icon: <LinkIcon />,
  },
};

export interface SocialLinkModel {
  linkType: SocialLinkType;
  title?: string;
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
        <FormTextField required name="link" label="Link" autoFocus />
      </FormRow>
    </FormColumn>
  );
};

interface SocialLinksProps {
  socialLinks: SocialLinkModel[];
  onSubmit: OnSubmit;
}

export const SocialLinks: React.VFC<SocialLinksProps> = ({
  socialLinks,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<SocialLinkModel | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    const filteredSocialLinks = [...socialLinks];
    filteredSocialLinks.splice(index, 1);
    onSubmit(filteredSocialLinks);
  };

  const handleEdit = (item: SocialLinkModel, index: number) => {
    setEditItem(item);
    setEditItemIndex(index);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
  };

  const handleSave = (item: SocialLinkModel) => {
    const updatedSocialLinks = [...socialLinks];
    if (editItemIndex !== null) updatedSocialLinks.splice(editItemIndex!, 1, item);
    else updatedSocialLinks.push(item);

    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
    onSubmit(updatedSocialLinks);
  };

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
                secondary={socialLinkItem.link}
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
