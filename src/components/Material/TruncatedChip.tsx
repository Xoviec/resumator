import { Chip, Tooltip, ChipProps } from "@mui/material";
import { useRef, VoidFunctionComponent } from "react";
import { useDrag, useDrop } from "react-dnd";

// helpers
import { truncateLabel } from "../../helpers";

export interface TruncatedChipProps extends ChipProps {
  label: string;
  index?: number;
  moveCard?: any;
}

export const TruncatedChip: VoidFunctionComponent<TruncatedChipProps> = (props) => {
  const { label, index, moveCard, ...rest } = props;
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      // @ts-ignore
      const dragIndex = item.index || "";
      const hoverIndex = index || "";
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      // @ts-ignore
      const hoverClientY = clientOffset?.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(Number(dragIndex), Number(hoverIndex));
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // @ts-ignore
      item.index = Number(hoverIndex);
    },
  });
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: () => ({
        label,
        index,
      }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <Tooltip title={label}>
      <Chip
        style={{ opacity }}
        ref={ref}
        size="small"
        color="secondary"
        variant="outlined"
        {...rest}
        label={truncateLabel(label)}
        data-handler-id={handlerId}
      />
    </Tooltip>
  );
};
