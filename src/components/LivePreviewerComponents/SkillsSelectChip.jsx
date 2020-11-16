import React, { useRef } from "react";
import { Chip } from "@material-ui/core";
import { useDrag, useDrop } from "react-dnd";
import styled from "@emotion/styled";

const DNDTYPE = "SkillsChip"

const SkillsSelectChip = ({ label, index, onDrag, onDelete }) => {
  /**
   * Create a reference to attach to the Component used for dragging and dropping.
   */
  const ref = useRef(null);

  /**
   * Setup the chip drag handler.
   */
  const [, drag] = useDrag({
    item: { index, type: DNDTYPE },
  })

  /**
   * Setup the chip drop handler.
   */
  const [, drop] = useDrop({
    accept: DNDTYPE,
    hover(item, monitor) {
      if (!ref.current) return;

      const sourceIndex = item.index;
      const destinationIndex = index;

      // Don't replace items with themselves.
      if (sourceIndex === destinationIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      // Take a % of the width and height.
      const hoverWidth = hoverBoundingRect.width * 0.3;
      const hoverHeight = hoverBoundingRect.height * 0.1;

      // Use the remaining % as hover hit box.
      const hoverTop = hoverBoundingRect.top + hoverHeight;
      const hoverRight = hoverBoundingRect.right - hoverWidth;
      const hoverBottom = hoverBoundingRect.bottom - hoverHeight;
      const hoverLeft = hoverBoundingRect.left + hoverWidth;

      // Only drag when the position matches the hover hit box.
      if (clientOffset.x < hoverLeft || clientOffset.x > hoverRight) return;
      if (clientOffset.y < hoverTop || clientOffset.y > hoverBottom) return;

      onDrag(sourceIndex, destinationIndex);
      item.index = destinationIndex;
    }
  })

  // Enable drag & drop.
  drag(drop(ref));

  return (
    <StyledChip
      size="small"
      variant="outlined"
      color="secondary"
      ref={ref}
      label={label}
      onDelete={onDelete}
      // Stop propagation of the mouse event to avoid it being swallowed by the autocomplete.
      // If the event is swallowed, drag & drop doesn't work.
      onMouseDown={event => event.stopPropagation()}
    />
  )
};

// Make the chip have some space around it.
// The transform is needed to keep the rounded edges when dragging.
const StyledChip = styled(Chip)`
  margin: 0 8px 8px 0;
  background-color: #fff;
  cursor: move;
  transform: translate(0, 0);
`;

export default SkillsSelectChip;