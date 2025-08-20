import { extendTheme } from "@chakra-ui/react";

// Configuration for color mode
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// Your custom color palette
const colors = {
  brand: {
    50: "#f6f2ff",
    100: "#e4d9ff",
    200: "#d1c0ff",
    300: "#bfa7ff",
    400: "#ac8eff",
    500: "#9775fa",
    600: "#865bef",
    700: "#7042f4",
    800: "#5a29ee",
    900: "#3c0eee",
  },
};

// Global styles, including the background image for light mode
const styles = {
  global: (props) => ({
    body: {
      // Styles applied only in light mode
      _light: {
        backgroundImage:
          "url('https://images.unsplash.com/photo-1687873803693-46f9b2800904?q=80&w=1585&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      },
      // Styles applied only in dark mode (defaults to solid color)
      _dark: {
        bg: "gray.900",
      },
    },
  }),
};

// Combine everything into the theme
const theme = extendTheme({
  fonts: {
    heading: '"Courier New", Courier, monospace',
    body: '"Courier New", Courier, monospace',
  },
  config,
  colors,
  styles, // Make sure 'styles' is included here
});

export default theme;
