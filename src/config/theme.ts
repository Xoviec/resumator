import { createTheme } from "@mui/material/styles";

export const colors = {
  lightBlue: "#ebf4ff",
  midBlue: "#5079f3",
  darkBlue: "#1f1e32",
  orange: "#ed7f53",
  lightGrey: "#ebebeb",
  mediumGrey: "#eaeaea",
  background: "#fafafa",
  darkGray: "#aaaaaa",
  white: "#fff",
  darkGrayOpacity: "rgba(119, 119, 119, .2)",
  primary: "#365fd9",
  secondary: "#e6e6e6",
  tertiary: "#365fd9",
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
