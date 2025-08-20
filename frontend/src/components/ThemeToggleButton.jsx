import { useColorMode, IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />} // Show moon in light mode, sun in dark
      onClick={toggleColorMode}
      isRound={true}
      size="md"
    />
  );
};

export default ThemeToggleButton;
