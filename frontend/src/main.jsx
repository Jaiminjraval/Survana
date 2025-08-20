import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// Note: You will also need to wrap this with your PlayerProvider from the first suggestion
import { PlayerProvider } from "./context/PlayerContext.jsx";
import theme from "./theme.js";
// Optional: Define a global dark theme for your app
// const theme = extendTheme({
//   styles: {
//     global: {
//       body: {
//         bg: "gray.900",
//         color: "white",
//       },
//     },
//   },
// });

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* 1. Provides Chakra UI styles to your app */}
    <ChakraProvider theme={theme}>
      {/* 2. Enables routing functionality */}
      <BrowserRouter>
        <PlayerProvider>
        <App />
        </PlayerProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
