import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primary: "#27AE60",
    secundary: "#eb5757",
    black: "#333",
    gray: {
      600: "#333",
      300: "#828282",
      100: "#e0e0e0",
      0: "#f5f5f5",
    },
    negative: "#e60000",
    warning: "#ffcd07",
    sucess: "#168821",
    information: "#155bcb",
    green_hover: "#93D7AF",
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "",
      },
    },
  },
});
