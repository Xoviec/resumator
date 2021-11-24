import { useState } from "react";

export const useModal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    setIsModalOpen(true);
  };

  const handleCloseAllModals = () => {
    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
    setIsModalOpen(false);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    isEditing,
    editItem,
    editItemIndex,
    isModalOpen,
    setIsEditing,
    setEditItem,
    setEditItemIndex,
    setIsModalOpen,
    handleEdit,
    handleEditCancel,
    handleCloseAllModals,
    onCloseModal,
  };
};
