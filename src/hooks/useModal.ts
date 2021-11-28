import { useState } from "react";

export const useModal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

  const handleEdit = (item: any, index: number) => {
    setEditItem(item);
    setEditItemIndex(index);
    setIsEditing(true);
  };

  const handleEditCancel = (isEmpty: boolean) => {
    if (!isEmpty) {
      setIsEditing(false);
      setEditItem(null);
      setEditItemIndex(null);
      return;
    }
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
