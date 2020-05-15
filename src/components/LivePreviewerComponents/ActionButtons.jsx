import React from "react";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Box } from "rebass";

const ActionButtons = ({ onEditClick, onDeleteClick, className }) => {
  return (
    <ActionButtonsContainer className={className ? className : "action-buttons"}>
      <Flex>
        <Box mx={2}>
          <FontAwesomeIcon onClick={onEditClick} icon={faPen} />
        </Box>
        <Box mx={2}>
          <FontAwesomeIcon onClick={onDeleteClick} icon={faTrash} />
        </Box>
      </Flex>
    </ActionButtonsContainer>
  );
};

const ActionButtonsContainer = styled.div`
  visibility: hidden;
  position: absolute;
  right: 16px;
  top: 16px;
`;

export default ActionButtons;
