import React, { useState, useRef } from "react";
import { Container, Text, VStack, IconButton, Box, Button, useToast, HStack } from "@chakra-ui/react";
import { FaMicrophone, FaStop } from "react-icons/fa";

const AudioRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef(null);
  const toast = useToast();

  const startAudioRecording = () => {
    setIsRecording(true);

    toast({
      title: "Audio recording started.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const stopAudioRecording = () => {
    setIsRecording(false);

    toast({
      title: "Audio recording stopped and uploaded.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Audio Recording</Text>
        <HStack spacing={4}>
          <IconButton aria-label="Record Audio" icon={<FaMicrophone />} size="lg" onClick={startAudioRecording} isDisabled={isRecording} />
          <IconButton aria-label="Stop Recording" icon={<FaStop />} size="lg" onClick={stopAudioRecording} isDisabled={!isRecording} />
        </HStack>
        <Box ref={audioRef} width="100%" height="200px" border="1px solid" borderColor="gray.200" borderRadius="md" p={2}>
          {}
        </Box>
      </VStack>
    </Container>
  );
};

export default AudioRecording;
