import React from "react";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Flex, Box } from "rebass";
import ActionIcon from "./ActionIcon";

const ActionButtons = ({
  onEditClick,
  onDeleteClick,
  className,
  tooltipTextLabel = "",
}) => {
  return (
    <div className={className}>
      <Flex>
        <Box mx={2}>
          <ActionIcon
            tooltipText={`Edit ${tooltipTextLabel} item`}
            icon={faPen}
            onClick={onEditClick}
          />
        </Box>
        <Box mx={2}>
          <ActionIcon
            tooltipText={`Remove ${tooltipTextLabel} item`}
            onClick={onDeleteClick}
            icon={faTrash}
          />
        </Box>
      </Flex>
    </div>
  );
};

export default ActionButtons;
