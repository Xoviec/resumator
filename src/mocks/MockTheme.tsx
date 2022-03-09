import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

function MockTheme({ children }: any) {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MockTheme;
