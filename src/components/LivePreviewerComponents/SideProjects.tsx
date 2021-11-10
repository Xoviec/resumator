import { useState, FunctionComponent, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  SortableContainer,
  SortableElement,
  SortEndHandler,
} from "react-sortable-hoc";

// helpers
import { arrayMove } from "../../helpers";

// components
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormColumn, FormRow, FormTextField } from "../Form";
import { SideProjectModel, SideProjectItem } from "./SideProjectItem";
import { colors } from "../../config/theme";

interface SideProjectProps {
  type: string;
  projects: SideProjectModel[];
  onSubmit: (value: SideProjectModel[]) => void;
  isDraggable?: boolean;
}

const useStyles = makeStyles({
  root: {
    cursor: "move",
    backgroundColor: colors.white,
  },
});

const SortableItem = SortableElement(
  ({
    projects = [],
    type,
    entry,
    handleDelete,
    handleEdit,
    idx,
  }: {
    projects: SideProjectModel[];
    type: string;
    entry: SideProjectModel;
    handleDelete: (idx: number) => void;
    handleEdit: (item: SideProjectModel, idx: number) => void;
    idx: number;
  }) => {
    const classes = useStyles();

    return (
      <Box display="flex" flexDirection="column" gap="16px" className={classes.root}>
        <SideProjectItem
          type={type}
          projectItem={entry}
          onDelete={() => handleDelete(idx)}
          onEdit={(item) => handleEdit(item, idx)}
        />
        {idx < projects.length - 1 && <Divider />}
      </Box>
    );
  }
);

const SortableList = SortableContainer(
  ({
    items,
    type,
    handleDelete,
    handleEdit,
  }: {
    items: SideProjectModel[];
    type: string;
    handleDelete: (idx: number) => void;
    handleEdit: (item: SideProjectModel, idx: number) => void;
  }) => {
    return (
      <Box display="flex" flexDirection="column" marginTop={-1} gap="8px">
        {items.map((value: SideProjectModel, index: number) => (
          <>
            <SortableItem
              index={index}
              key={`item-${value.title}-${index}`}
              projects={items}
              idx={index}
              type={type}
              entry={value}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </>
        ))}
      </Box>
    );
  }
);

export const SideProjects: FunctionComponent<SideProjectProps> = ({
  type,
  projects,
  onSubmit,
  isDraggable = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<SideProjectModel | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);
  const [items, setItems] = useState<SideProjectModel[]>(projects);

  const handleDelete = (index: number) => {
    const filteredProjects = [...projects];
    filteredProjects.splice(index, 1);
    onSubmit(filteredProjects);
  };

  const handleEdit = (item: SideProjectModel, index: number) => {
    setEditItem(item);
    setEditItemIndex(index);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
  };

  const handleSave = (item: SideProjectModel) => {
    const updatedProjects = [...projects];
    if (editItemIndex !== null) updatedProjects.splice(editItemIndex!, 1, item);
    else updatedProjects.push(item);

    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
    onSubmit(updatedProjects);
  };

  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    const updatedItems = arrayMove(items, oldIndex, newIndex);
    onSubmit(updatedItems);
    setItems(updatedItems);
  };

  useEffect(() => {
    setItems(projects);
  }, [projects]);

  return (
    <Section
      title={type}
      action="add"
      actionTooltip={`Add ${type.toLowerCase()}`}
      actionOnClick={() => setIsEditing(true)}
    >
      {isDraggable ? (
        <SortableList
          distance={1}
          items={items}
          onSortEnd={onSortEnd}
          axis="y"
          type={type}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : (
        <Box display="flex" flexDirection="column" marginTop={-1} gap="8px">
          {projects.map((entry: SideProjectModel, index: number) => (
            <Box display="flex" flexDirection="column" key={index} gap="16px">
              <SideProjectItem
                type={type}
                projectItem={entry}
                onDelete={() => handleDelete(index)}
                onEdit={(item) => handleEdit(item, index)}
              />
              {index < projects.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      )}

      <SectionEditDialog
        title={editItem ? `Edit ${type}` : `Add ${type}`}
        data={editItem!}
        open={isEditing}
        onCancel={handleEditCancel}
        onSave={handleSave}
      >
        <FormColumn>
          <FormRow>
            <FormTextField required name="title" label="Title" />
            <FormTextField name="link" label="Link" />
          </FormRow>
          <FormRow>
            <FormTextField
              multiline
              name="description"
              label="Description"
              rows={8}
            />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
    </Section>
  );
};
