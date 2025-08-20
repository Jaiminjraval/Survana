import { VStack, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { FaHome, FaSearch, FaMusic } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

// A reusable navigation item component
const NavItem = ({ icon, children, to }) => (
  <RouterLink to={to} style={{ width: "100%" }}>
    <HStack
      spacing={4}
      p={3}
      borderRadius="md"
      w="full"
      cursor="pointer"
      _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
      transition="background 0.2s"
    >
      {icon}
      <Text fontStyle="italic" fontWeight="medium">
        {children}
      </Text>
    </HStack>
  </RouterLink>
);

const Sidebar = () => {
  // Define different background colors for light and dark modes
  const sidebarBg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <VStack
      align="start"
      p={4}
      spacing={2}
      bg={sidebarBg} // Apply the theme-aware background color
      color={textColor} // Apply the theme-aware text color
      h="100vh"
      w="240px"
      position="fixed"
      left="0"
      top="0"
      borderRight="1px" // Add a subtle border for separation
      borderColor={borderColor}
    >
      <Text fontSize="2xl" fontStyle="italic" fontWeight="bold" p={2} mb={4}>
        🎵 Survana
      </Text>
      <NavItem icon={<FaHome />} to="/">
        Home
      </NavItem>
      <NavItem icon={<FaSearch />} to="/search">
        Search
      </NavItem>
      <NavItem icon={<FaMusic />} to="/library">
        Library
      </NavItem>
    </VStack>
  );
};

export default Sidebar;
