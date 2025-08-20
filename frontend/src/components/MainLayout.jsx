import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import PlayerBar from "./PlayerBar";
import ThemeToggleButton from "./ThemeToggleButton.jsx";

// This component wraps all your main pages to provide a consistent layout
const MainLayout = ({ children }) => {
  const handleLogout = () => {
    // In a real app, you would clear the user's token and redirect
    console.log("User logged out!");
    // For now, we'll just reload to simulate the auth check again
    window.location.href = "/login";
  };

  return (
    <>
      <Sidebar />
      <HStack spacing={4} position="fixed" top={4} right={4} zIndex={20}>
        <ThemeToggleButton /> {/* <-- ADD THE BUTTON HERE */}
        <Button fontStyle="italic" onClick={handleLogout} colorScheme="red">
          Log Out
        </Button>
      </HStack>
      {/* This Box is the main content area */}
      <Box ml="240px" mb="100px" p={6}>
        {children}{" "}
        {/* The actual page component (e.g., Home) will be rendered here */}
      </Box>

      <PlayerBar />
    </>
  );
};

export default MainLayout;
