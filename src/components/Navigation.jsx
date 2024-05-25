import React from "react";
import { Link } from "react-router-dom";
import { HStack, Button, useColorMode } from "@chakra-ui/react";

const Navigation = ({ toggleColorMode }) => {
  const { colorMode } = useColorMode();
  return (
    <HStack spacing={4} padding={4}>
      <Button as={Link} to="/">
        Home
      </Button>
      <Button as={Link} to="/video">
        Video Recording
      </Button>
      <Button as={Link} to="/audio">
        Audio Recording
      </Button>
      <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
    </HStack>
  );
};

export default Navigation;
