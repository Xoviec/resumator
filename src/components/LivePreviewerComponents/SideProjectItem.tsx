import { Box, Link } from "@mui/material";
import { FunctionComponent } from "react";
import { SectionItemHeader } from "./SectionItemHeader";

export interface SideProjectModel {
  title: string;
  description: string;
  link: string;
}

interface SideProjectItemProps {
  type: string;
  projectItem: SideProjectModel;
  onDelete: () => void;
  onEdit: (item: SideProjectModel) => void;
}

export const SideProjectItem: FunctionComponent<SideProjectItemProps> = ({
  type,
  projectItem,
  onDelete,
  onEdit,
}) => {
  return (
    <SectionItemHeader
      title={projectItem.title}
      type={type.toLowerCase()}
      onDelete={() => onDelete()}
      onEdit={() => onEdit(projectItem)}
    >
      <Box display="flex" flexDirection="column" gap="8px">
        {projectItem.description && <Box>{projectItem.description}</Box>}
        <Link
          rel="noreferrer noopener"
          target="_blank"
          color="secondary"
          href={projectItem.link}
        >
          {projectItem.link}
        </Link>
      </Box>
    </SectionItemHeader>
  );
};
