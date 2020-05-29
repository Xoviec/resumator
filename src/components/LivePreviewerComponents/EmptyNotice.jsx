import React from "react";
import { Typography } from "@material-ui/core";

const EmptyNotice = ({ items, children }) => {
  return (
    <div>
      {items.length === 0 && (
        <Typography
          color={items.length > 0 ? "primary" : "secondary"}
          variant="body1"
        >
          {children ? children : "Click on the + icon to add new items"}
        </Typography>
      )}
    </div>
  );
};

export default EmptyNotice;
