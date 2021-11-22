import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/system";
import { FunctionComponent } from "react";
import "../assets/css/global.css";
import { Nav } from "../components/layout/Nav";
import { colors } from "../config/theme";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
}));

// TODO: fix toolbar
// @ts-ignore
const Spacer = styled("div")(({ theme }) => theme.mixins?.toolbar);

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: colors.background,
  padding: theme.spacing(3),
}));

export const MainLayout: FunctionComponent = ({ children }) => {
  return (
    <Root>
      <CssBaseline />
      <Nav />
      <Content>
        <Spacer />
        {children}
      </Content>
    </Root>
  );
};
