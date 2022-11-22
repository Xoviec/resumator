import { FunctionComponent, VoidFunctionComponent } from "react";
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
import { useDragDrop, useStartDate, useModal } from "../../hooks";

// libs
import { setYear } from "../../lib/date";

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
  const startMinDate = setYear(1970);
  const { startDate, onStartDateChange } = useStartDate();
  return (
    <FormColumn>
      <FormRow>
        <FormTextField autoFocus required name="name" label="Name" />
        <FormTextField label="Institute" name="institute" />
      </FormRow>
      <FormRow>
        <FormDatePicker
          minDate={startMinDate}
          onDateSet={onStartDateChange}
          disableFuture
          name="startDate"
          label="Start date"
        />
        <FormDatePicker
          minDate={startDate}
          disableFuture
          name="endDate"
          label="End date"
        />
      </FormRow>
    </FormColumn>
  );
};

export const Education: FunctionComponent<EducationProps> = ({
  education,
  onSubmit,
}) => {
  const { onSortEnd, items } = useDragDrop({ elems: education, onSubmit });
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
    const filteredEducation = [...education];
    filteredEducation.splice(index, 1);
    onSubmit(filteredEducation);
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
