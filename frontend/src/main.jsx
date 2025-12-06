import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PlayerProvider } from "./context/PlayerContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; 
import theme from "./theme.js";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          {" "}
          {/* AuthProvider wraps PlayerProvider */}
          <PlayerProvider>
            <App />
          </PlayerProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);



