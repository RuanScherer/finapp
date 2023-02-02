import { extendTheme } from "@chakra-ui/react";

export const boxShadow = {
  100: "#959da533 0px 8px 24px"
}

export const colors = {
  dark: {
    400: "#2F2F2F",
    500: "#1F1F1F",
    900: "#141414",
  },
  primary: {
    100: "#CBD2FF",
    200: "#A5B4FF",
    300: "#7F9BFF",
    400: "#5E7CFC",
    500: "#4563EE",
    600: "#3B55D8",
    700: "#5A10E6",
    800: "#4C0DD5",
    900: "#3B0BA4",
  },
  primaryAlpha: {
    100: "#CBD2FF33",
    200: "#A5B4FF33",
    300: "#7F9BFF33",
    400: "#5E7CFC33",
    500: "#4563EE33",
    600: "#3B55D833",
    700: "#5A10E633",
    800: "#4C0DD533",
  },
  light: {
    500: "#FBFCFE",
  },
  text: {
    100: "#FDFDFD",
    200: "#F2F2F2",
    300: "#DFDFDF",
    400: "#BFBFBF",
    500: "#8F8F8F",
    600: "#6F6F6F",
    700: "#4F4F4F",
    800: "#2F2F2F",
    900: "#1B2338",
  },
  background: {
    100: "#FDFDFD",
    200: "#F2FAFF",
    300: "#F2F2F2",
    400: "#DFDFDF",
  }
}

const fonts = {
  body: `'Poppins', sans-serif`,
  heading: `'Poppins', sans-serif`,
}

export const theme = extendTheme({ colors, fonts });
