import { createTheme } from "@mui/material/styles";

export const colors = {
  lightBlue: "#00cccc",
  midBlue: "#0B959D",
  darkBlue: "#1f1e32",
  orange: "#fdbc75",
  lightGrey: "#e6e6e6",
  mediumGrey: "#d1d1d1",
  background: "#fafafa",
  darkGray: "#777",
  white: "#fff",
  darkGrayOpacity: "rgba(119, 119, 119, .2)",
  primary: "#873170",
  secondary: "#fdbc75",
  tertiary: "#868ADA",
  black: "#000",
};

const theme = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    info: { main: colors.tertiary },
  },
  typography: {
    fontFamily: [
      "TT Commons Pro",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default theme;
