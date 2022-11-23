import { useState } from "react";

export const useModal = () => {
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editItem, setEditItem] = useState<any | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (item: any, index: number) => {
    setEditItem(item);
    setEditItemIndex(index);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
  };

  const handleCloseAllModals = () => {
    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
  };

  return {
    isEditing,
    editItem,
    editItemIndex,
    setIsEditing,
    setEditItem,
    setEditItemIndex,
    handleEdit,
    handleEditCancel,
    handleCloseAllModals,
  };
};
