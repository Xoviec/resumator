import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Menu, MenuItem } from "@material-ui/core";
import styled from "@emotion/styled";

interface IDropdownButtonProperties {
  label: string;
  actions: string[];
  startIcon?: React.ReactNode;
  onClick: (action: string) => void;
}

const DropdownButton = ({ label, actions, startIcon, onClick }: IDropdownButtonProperties) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    handleClose();
    onClick(action);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={startIcon}
        onClick={handleClick}
      >
        {label}
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {actions.map((action) => (
          <MenuItem key={action} onClick={() => handleAction(action)}>{action}</MenuItem>
        ))}
      </Menu>
    </>
  );
};

// const StyledButton = styled(Button)`
//   margin: 0 8px;
// `;

export default DropdownButton;
