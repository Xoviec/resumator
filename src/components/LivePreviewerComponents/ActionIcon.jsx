import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@material-ui/core";

const ActionIcon = ({ onClick, icon, tooltipText, className }) => {
  return (
    <Tooltip title={tooltipText} aria-label={tooltipText}>
      <Icon className={className} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </Icon>
    </Tooltip>
  );
};

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 15px;
  cursor: pointer;
  transition: opacity 250ms ease-out;

  &:hover {
    opacity: 0.7;
  }
`;

export default ActionIcon;
