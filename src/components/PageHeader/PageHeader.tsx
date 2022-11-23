import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  title: string;
};

export const PageHeader: FC<Props> = ({ title }) => {
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center">
      <Typography variant="h3" component="h1">
        {title} &nbsp;
      </Typography>
      <Button color="primary" variant="contained" component={NavLink} to="/">
        Go to overview
      </Button>
    </Box>
  );
};
