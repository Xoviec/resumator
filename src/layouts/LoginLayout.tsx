import styled from "@emotion/styled";
import { Grid, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { FunctionComponent } from "react";
import "../assets/css/global.css";
import LogoBlack from "../assets/images/bg-portrait-black.jpg";
import { colors } from "../config/theme";

export const LoginLayout: FunctionComponent = ({ children }) => (
  <>
    <CssBaseline />
    <Layout bgColor={colors.lightGrey}>
      <Grid container justifyContent="center" maxWidth={1200}>
        <Card item xs={8} md={10}>
          <LogoWrapper display={{ xs: "none", md: "flex" }}>
            <img src={LogoBlack} alt="logo" />
          </LogoWrapper>
          <ContentWrapper>{children}</ContentWrapper>
        </Card>
      </Grid>
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
  height: 100vh;
  background: url(/iO-blend-blue.jpg) no-repeat 0 0;
  background-size: cover;
`;

const Card = styled(Grid)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  border-radius: 0.25rem;
  background-color: white;
`;

const LogoWrapper = styled(Box)`
  & > img {
    border-radius: 0.25rem 0 0 0.25rem;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 3rem;
`;
