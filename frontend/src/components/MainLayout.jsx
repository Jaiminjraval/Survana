import React from "react";
import { Box, Button, HStack, useToast } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import PlayerBar from "./PlayerBar";
import ThemeToggleButton from "./ThemeToggleButton.jsx";

const MainLayout = ({ children }) => {
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast({ title: "Logged out successfully", status: "success", isClosable: true });
        window.location.href = "/login"; // Redirect to login page
      } else {
        throw new Error("Failed to log out");
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, status: "error", isClosable: true });
    }
  };

  return (
    <>
      <Sidebar />
      <HStack spacing={4} position="fixed" top={4} right={4} zIndex={20}>
        <ThemeToggleButton />
        <Button fontStyle="italic" onClick={handleLogout} colorScheme="red">
          Log Out
        </Button>
      </HStack>
      <Box ml="240px" mb="100px" p={6}>
        {children}
      </Box>
      <PlayerBar />
    </>
  );
};

export default MainLayout;
