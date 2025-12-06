import {
  VStack,
  Text,
  HStack,
  useColorModeValue,
  Icon,
  Box,
  Divider,
} from "@chakra-ui/react";
import {
  FaHome,
  FaSearch,
  FaMusic,
  FaCrown,
  FaChartLine,
  FaUserCircle,
} from "react-icons/fa";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavItem = ({ icon, children, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeBg = useColorModeValue("brand.100", "brand.900");
  const activeColor = useColorModeValue("brand.700", "brand.200");
  const hoverBg = useColorModeValue("gray.200", "gray.700");

  return (
    <RouterLink to={to} style={{ width: "100%" }}>
      <HStack
        spacing={4}
        p={3}
        borderRadius="md"
        w="full"
        cursor="pointer"
        bg={isActive ? activeBg : "transparent"}
        color={isActive ? activeColor : "inherit"}
        fontWeight={isActive ? "bold" : "medium"}
        _hover={{ bg: isActive ? activeBg : hoverBg }}
        transition="background 0.2s, color 0.2s"
      >
        <Icon as={icon} />
        <Text>{children}</Text>
      </HStack>
    </RouterLink>
  );
};

const Sidebar = () => {
  const { authUser } = useAuth();
  const sidebarBg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <VStack
      align="start"
      p={4}
      spacing={2}
      bg={sidebarBg}
      color={textColor}
      h="100vh"
      w="240px"
      position="fixed"
      left="0"
      top="0"
      borderRight="1px"
      borderColor={borderColor}
    >
      <Text fontSize="2xl" fontStyle="italic" fontWeight="bold" p={2} mb={4}>
        🎵 Survana
      </Text>

      <NavItem icon={FaHome} to="/">
        Home
      </NavItem>
      
      <NavItem icon={FaChartLine} to="/charts">
        Charts
      </NavItem>
      <NavItem icon={FaMusic} to="/library">
        Library
      </NavItem>

      <Divider my={2} />

      {/* --- User Account Links --- */}
      <NavItem icon={FaUserCircle} to="/account">
        My Account
      </NavItem>
      {authUser?.subscription === "free" && (
        <NavItem icon={FaCrown} to="/premium">
          Go Premium
        </NavItem>
      )}

      <Box flex="1" />
    </VStack>
  );
};

export default Sidebar;
