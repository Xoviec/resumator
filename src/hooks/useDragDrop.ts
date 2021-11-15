import { SortEndHandler } from "react-sortable-hoc";
import { arrayMove } from "../helpers";
import { useEffect, useState } from "react";

// TODO: create dynamic hook for each draggable component
interface UseDragDropArgs {
  elems: any;
  onSubmit: (items: any[]) => void;
}

interface UseDragDrop {
  onSortEnd: SortEndHandler;
  items: any[];
}

export const useDragDrop = ({ elems, onSubmit }: UseDragDropArgs): UseDragDrop => {
  const [items, setItems] = useState<any[]>(elems);

  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    const updatedItems = arrayMove(items, oldIndex, newIndex);
    onSubmit(updatedItems);
    setItems(updatedItems);
  };

  useEffect(() => {
    setItems(elems);
  }, [elems]);

  return { onSortEnd, items };
};
