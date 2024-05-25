import React from "react";
import { Link } from "react-router-dom";
import { HStack, Button } from "@chakra-ui/react";

const Navigation = () => {
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
    </HStack>
  );
};

export default Navigation;
