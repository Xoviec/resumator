import { HelpSharp } from "@mui/icons-material";
import { Box, Divider } from "@mui/material";
import { styled } from "@mui/system";
import { useState, FunctionComponent, useEffect } from "react";
import {
  SortableContainer,
  SortableElement,
  SortEndHandler,
} from "react-sortable-hoc";
import { colors } from "../../config/theme";
// helpers
import { arrayMove } from "../../helpers";
import { useModal } from "../../hooks/useModal";
import { FormColumn, FormRow, FormTextField } from "../Form";
// components
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { SideProjectModel, SideProjectItem } from "./SideProjectItem";

interface SideProjectProps {
  type: string;
  projects: SideProjectModel[];
  onSubmit: (value: SideProjectModel[]) => void;
}

const Container = styled(Box)(({ theme }) => ({
  cursor: "move",
  backgroundColor: colors.white,
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));

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
    return (
      <Container>
        <SideProjectItem
          type={type}
          projectItem={entry}
          onDelete={() => handleDelete(idx)}
          onEdit={(item) => handleEdit(item, idx)}
        />
        {idx < projects.length - 1 && <Divider />}
      </Container>
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
        ))}
      </Box>
    );
  }
);

export const SideProjects: FunctionComponent<SideProjectProps> = ({
  type,
  projects,
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
  const [items, setItems] = useState<SideProjectModel[]>(projects);

  const handleDelete = (index: number) => {
    const filteredProjects = [...projects];
    filteredProjects.splice(index, 1);
    onSubmit(filteredProjects);
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
      tooltipTitle="You can change your publications ordering with drag and drop"
      tooltipIcon={<HelpSharp />}
    >
      <SortableList
        distance={1}
        items={items}
        onSortEnd={onSortEnd}
        axis="y"
        type={type}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <SectionEditDialog
        title={editItem ? `Edit ${type}` : `Add ${type}`}
        data={editItem!}
        open={isEditing}
        onCancel={handleEditCancel}
        onSave={handleSave}
      >
        <FormColumn>
          <FormRow>
            <FormTextField autoFocus required name="title" label="Title" />
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
