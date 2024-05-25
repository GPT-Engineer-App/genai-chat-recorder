import React, { useState, useRef } from "react";
import { Container, Text, VStack, IconButton, useToast, HStack } from "@chakra-ui/react";
import VideoPreview from "../components/VideoPreview.jsx";
import { FaVideo, FaStop } from "react-icons/fa";
import { handleFileUpload } from "../utils/genai.js";

const VideoRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const toast = useToast();

  const startVideoRecording = () => {
    setIsRecording(true);

    toast({
      title: "Video recording started.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const stopVideoRecording = () => {
    setIsRecording(false);

    toast({
      title: "Video recording stopped and uploaded.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Video Recording</Text>
        <HStack spacing={4}>
          <IconButton aria-label="Record Video" icon={<FaVideo />} size="lg" onClick={startVideoRecording} isDisabled={isRecording} />
          <IconButton aria-label="Stop Recording" icon={<FaStop />} size="lg" onClick={stopVideoRecording} isDisabled={!isRecording} />
        </HStack>
        <VideoPreview videoRef={videoRef} />
      </VStack>
    </Container>
  );
};

export default VideoRecording;
