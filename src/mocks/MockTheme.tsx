import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export function MockTheme({ children }: any) {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
