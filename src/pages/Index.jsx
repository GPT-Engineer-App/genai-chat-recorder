import React, { useState, useEffect, useRef } from "react";
import { Container, Text, VStack, IconButton, Box, HStack, useToast } from "@chakra-ui/react";
import { FaMicrophone, FaVideo, FaTerminal, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Index = () => {
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [consoleVisible, setConsoleVisible] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" && !isRecordingVideo) {
        startVideoRecording();
      } else if (event.code === "KeyA" && !isRecordingAudio) {
        startAudioRecording();
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "Space" && isRecordingVideo) {
        stopVideoRecording();
      } else if (event.code === "KeyA" && isRecordingAudio) {
        stopAudioRecording();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRecordingVideo, isRecordingAudio]);

  const startVideoRecording = () => {
    setIsRecordingVideo(true);
    setConsoleOutput((prev) => [...prev, "Started video recording..."]);
    // Add video recording logic here
  };

  const stopVideoRecording = () => {
    setIsRecordingVideo(false);
    setConsoleOutput((prev) => [...prev, "Stopped video recording. Uploading..."]);
    // Add video upload logic here
  };

  const startAudioRecording = () => {
    setIsRecordingAudio(true);
    setConsoleOutput((prev) => [...prev, "Started audio recording..."]);
    // Add audio recording logic here
  };

  const stopAudioRecording = () => {
    setIsRecordingAudio(false);
    setConsoleOutput((prev) => [...prev, "Stopped audio recording. Uploading..."]);
    // Add audio upload logic here
  };

  const toggleConsoleVisibility = () => {
    setConsoleVisible(!consoleVisible);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Chat Application with Google GenAI</Text>
        <HStack spacing={4}>
          <IconButton aria-label="Record Video" icon={<FaVideo />} size="lg" onClick={startVideoRecording} isDisabled={isRecordingVideo} />
          <IconButton aria-label="Record Audio" icon={<FaMicrophone />} size="lg" onClick={startAudioRecording} isDisabled={isRecordingAudio} />
          <IconButton aria-label="Toggle Console" icon={consoleVisible ? <FaTimes /> : <FaTerminal />} size="lg" onClick={toggleConsoleVisibility} />
        </HStack>
        {consoleVisible && (
          <Box width="100%" height="200px" overflowY="scroll" border="1px solid" borderColor="gray.200" borderRadius="md" p={2}>
            {consoleOutput.map((line, index) => (
              <Text key={index}>{line}</Text>
            ))}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
