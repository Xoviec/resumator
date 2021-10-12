import { createTheme, adaptV4Theme } from "@mui/material/styles";

export const colors = {
  lightBlue: "#00cccc",
  midBlue: "#0B959D",
  darkBlue: "#1f1e32",
  orange: "#ff5900",
  lightGrey: "#e6e6e6",
  mediumGrey: "#d1d1d1",
  background: "#fafafa",
  darkGray: "#777",
};

const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: { main: colors.darkBlue },
      secondary: { main: colors.orange },
      info: { main: colors.midBlue },
    },
  })
);

export default theme;
