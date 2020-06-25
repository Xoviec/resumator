import React from "react";
import { Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";

const EmptyNotice = ({ show, color, children, icon, className }) => {
  return (
    <div className={className}>
      {show && (
        <Typography color={color || "secondary"} variant="body1">
          {children ? (
            children
          ) : (
            <span>
              Click on the {icon && <EmptyIcon icon={icon} />} icon to add new items
            </span>
          )}
        </Typography>
      )}
    </div>
  );
};

const EmptyIcon = styled(FontAwesomeIcon)`
  position: relative;
  top: -1px;
  font-size: 11px;
  opacity: 0.7;
`;

export default EmptyNotice;
