export const colors = {
  lightBlue: "#00cccc",
  darkBlue: " #1f1e32",
  orange: "#ff5900",
  lightGrey: "#e6e6e6",
  mediumGrey: "#d1d1d1",
};

export default {
  colors: {
    text: "#000",
    background: "#fff",
    primary: colors.orange,
    secondary: colors.darkBlue,
    muted: "#f6f6f9",
    gray: colors.mediumGrey,
    highlight: "hsla(205, 100%, 40%, 0.125)",
  },
  fonts: {
    body: "Stratum, Arial, system-ui, sans-serif",
    heading: "Stratum, Arial, sans-serif",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.1,
    heading: 1,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 0,
    circle: 99999,
  },
  shadows: {
    card: "0 0 4px rgba(0, 0, 0, .125)",
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    display: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [5, 6, 7],
    },
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
  },
  variants: {
    avatar: {
      width: "avatar",
      height: "avatar",
      borderRadius: "circle",
    },
    card: {
      p: 2,
      bg: "background",
      boxShadow: "card",
    },
    link: {
      color: "primary",
    },
    nav: {
      fontSize: 1,
      fontWeight: "bold",
      display: "inline-block",
      p: 2,
      color: "inherit",
      textDecoration: "none",
      ":hover,:focus,.active": {
        color: "primary",
      },
    },
  },
  buttons: {
    primary: {
      fontFamily: "Stratum, Arial, system-ui, sans-serif",
      fontSize: 3,
      fontWeight: "bold",
      color: "background",
      bg: "primary",
      borderRadius: "default",
    },
    outline: {
      fontFamily: "Stratum, Arial, system-ui, sans-serif",
      variant: "buttons.primary",
      color: "secondary",
      bg: "transparent",
      boxShadow: "inset 0 0 2px",
    },
    secondary: {
      fontFamily: "Stratum, Arial, system-ui, sans-serif",
      variant: "buttons.primary",
      color: "background",
      bg: "secondary",
    },
  },
  forms: {
    input: {
      color: "white",
    },
    select: {},
    textarea: {
      color: "white",
    },
    label: {
      color: "white",
    },
    radio: {},
    checkbox: {},
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
  },
};
