import styled from "@emotion/styled";
import CssBaseline from "@mui/material/CssBaseline";
import { FunctionComponent } from "react";
import "../assets/css/global.css";
import LogoBlack from "../assets/images/iO-logo-black.png";

import { colors } from "../config/theme";

export const LoginLayout: FunctionComponent = ({ children }) => (
  <>
    <CssBaseline />
    <Layout bgColor={colors.lightGrey}>
      <Card>
        <LogoWrapper>
          <img src={LogoBlack} alt="logo" />
        </LogoWrapper>
        <div>{children}</div>
      </Card>
    </Layout>
  </>
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
