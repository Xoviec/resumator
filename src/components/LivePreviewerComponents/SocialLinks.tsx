import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import { useState, VoidFunctionComponent } from "react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormColumn, FormRow } from "../Form";
import { FormSelect } from "../Form/FormSelect";
import { FormTextField } from "../Form/FormTextField";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkIcon from "@material-ui/icons/Link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GithubIcon from "@material-ui/icons/GitHub";
import BookIcon from "@material-ui/icons/Book";
import { colors } from "../../config/theme";

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
  },
  [SocialLinkType.Github]: {
    title: "Github",
    icon: <GithubIcon />,
  },
  [SocialLinkType.Twitter]: {
    title: "Twitter",
    icon: <TwitterIcon />,
  },
  [SocialLinkType.Medium]: {
    title: "Medium",
    icon: <LinkIcon />,
  },
  [SocialLinkType.DevTo]: {
    title: "Dev.to",
    icon: <LinkIcon />,
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
  const { watch } = useFormContext();
  const linkType = watch("linkType") as SocialLinkType;

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
                  gridGap={10}
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
    const filteredEducation = [...socialLinks];
    filteredEducation.splice(index, 1);
    onSubmit(filteredEducation);
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
    const updatedEducation = [...socialLinks];
    if (editItemIndex !== null) updatedEducation.splice(editItemIndex!, 1, item);
    else updatedEducation.push(item);

    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
    onSubmit(updatedEducation);
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
                >
                  <DeleteIcon style={iconButtonStyle} />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit social link"
                  onClick={() => handleEdit(socialLinkItem, index)}
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
