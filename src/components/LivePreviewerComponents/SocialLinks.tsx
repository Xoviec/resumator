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
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState, VoidFunctionComponent } from "react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormColumn, FormRow } from "../Form";
import { FormSelect } from "../Form/FormSelect";
import { FormTextField } from "../Form/FormTextField";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import BookIcon from "@mui/icons-material/Book";
import { colors } from "../../config/theme";
import { isValidUrl, getDomain } from "../../lib/url";

type OnSubmit = (data: SocialLinkModel[]) => void;

const iconButtonStyle = { color: colors.midBlue };

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    minWidth: 420,
  },
  listItemIcon: {
    minWidth: 50,
  },
  listItemText: {
    maxWidth: 280,
  },
}));

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
  const classes = useStyles();
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
      title="Social Links"
      action="add"
      actionTooltip="Add social link"
      actionOnClick={() => setIsEditing(true)}
    >
      <List className={classes.list}>
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
              <ListItemIcon className={classes.listItemIcon}>
                {socialLinkItemInfo.icon}
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
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
                  aria-label="delete social link"
                  onClick={() => handleDelete(index)}
                  size="large"
                >
                  <DeleteIcon style={iconButtonStyle} />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit social link"
                  onClick={() => handleEdit(socialLinkItem, index)}
                  size="large"
                >
                  <EditIcon style={iconButtonStyle} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>

      <SectionEditDialog
        title={editItem ? `Edit social link` : `Add social link`}
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
