import "../assets/css/global.css";
import theme, { colors } from "../config/theme";
import styled from "@emotion/styled";

import frontmenLogo from "../assets/images/frontmenLogoIcon.png";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider } from "@material-ui/core/styles";
import { FunctionComponent } from "react";

export const LoginLayout: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Layout bgColor={colors.lightGrey}>
      <Card>
        <LogoWrapper>
          <img src={frontmenLogo} alt="logo" />
        </LogoWrapper>
        <div>{children}</div>
      </Card>
    </Layout>
  </ThemeProvider>
);

interface LayoutProps {
  bgColor: string;
}

const Layout = styled.div<LayoutProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  height: 100vh;
  background-color: ${({ bgColor }) => bgColor};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  background-color: white;
`;

const LogoWrapper = styled.div`
  max-width: 200px;
`;
