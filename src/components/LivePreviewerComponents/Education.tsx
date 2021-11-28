import { useState, FunctionComponent, VoidFunctionComponent } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Box, Divider } from "@mui/material";
import { styled } from "@mui/system";

// components
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormColumn, FormRow, FormTextField, FormDatePicker } from "../Form";
import { EducationModel, EducationItem } from "./EducationItem";

// config
import { colors } from "../../config/theme";

// hooks
import { useDragDrop } from "../../hooks/useDragDrop";

interface EducationProps {
  education: EducationModel[];
  onSubmit: (value: EducationModel[]) => void;
}

const Root = styled(Box)(({ theme }) => ({
  cursor: "move",
  backgroundColor: colors.white,
}));

// TODO: create Sortable item component with dynamic props.
const SortableItem = SortableElement(
  ({
    education = [],
    entry,
    handleDelete,
    handleEdit,
    idx,
  }: {
    education: EducationModel[];
    entry: EducationModel;
    handleDelete: (idx: number) => void;
    handleEdit: (item: EducationModel, idx: number) => void;
    idx: number;
  }) => {
    return (
      <Root display="flex" flexDirection="column" key={idx} gap="16px">
        <EducationItem
          educationItem={entry}
          onDelete={() => handleDelete(idx)}
          onEdit={(item) => handleEdit(item, idx)}
        />
        {idx < education.length - 1 && <Divider />}
      </Root>
    );
  }
);

const SortableList = SortableContainer(
  ({
    items,
    handleDelete,
    handleEdit,
  }: {
    items: EducationModel[];
    handleDelete: (idx: number) => void;
    handleEdit: (item: EducationModel, idx: number) => void;
  }) => {
    return (
      <Box display="flex" flexDirection="column" marginTop={-1} gap="8px">
        {items.map((value: EducationModel, index: number) => (
          <SortableItem
            index={index}
            key={`item-${value.name}-${index}`}
            education={items}
            idx={index}
            entry={value}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </Box>
    );
  }
);

const EducationFormFields: VoidFunctionComponent = () => {
  return (
    <FormColumn>
      <FormRow>
        <FormTextField required name="name" label="Name" />
        <FormTextField label="Institute" name="institute" />
      </FormRow>
      <FormRow>
        <FormDatePicker name="startDate" label="Start" />
        <FormDatePicker name="endDate" label="End" />
      </FormRow>
    </FormColumn>
  );
};

export const Education: FunctionComponent<EducationProps> = ({
  education,
  onSubmit,
}) => {
  const { onSortEnd, items } = useDragDrop({ elems: education, onSubmit });
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<EducationModel | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    const filteredEducation = [...education];
    filteredEducation.splice(index, 1);
    onSubmit(filteredEducation);
  };

  const handleEdit = (item: EducationModel, index: number) => {
    setEditItem(item);
    setEditItemIndex(index);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
  };

  const handleSave = (item: EducationModel) => {
    const updatedEducation = [...education];
    if (editItemIndex !== null) updatedEducation.splice(editItemIndex!, 1, item);
    else updatedEducation.push(item);

    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
    onSubmit(updatedEducation);
  };

  return (
    <Section
      title="Education"
      action="add"
      actionTooltip="Add education"
      actionOnClick={() => setIsEditing(true)}
    >
      <SortableList
        distance={1}
        items={items}
        onSortEnd={onSortEnd}
        axis="y"
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <SectionEditDialog
        title={editItem ? `Edit education` : `Add education`}
        data={editItem!}
        open={isEditing}
        onCancel={handleEditCancel}
        onSave={handleSave}
      >
        <EducationFormFields />
      </SectionEditDialog>
    </Section>
  );
};
