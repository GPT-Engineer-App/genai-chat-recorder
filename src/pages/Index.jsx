import React, { useState, useEffect, useRef } from "react";
import { Container, Text, VStack, IconButton, Box, HStack, useToast, Button } from "@chakra-ui/react";
import { FaMicrophone, FaVideo, FaTerminal, FaTimes, FaVolumeUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { uploadToGemini, startChatSession, sendMessageToChatSession } from "../utils/genai.js";

const handleFileUpload = async (file, type) => {
  const response = await uploadToGemini(file);
  if (response.success) {
    const sessionId = await startChatSession();
    const prompt = type === "video" ? "This is a video." : "This is an audio.";
    const messageResponse = await sendMessageToChatSession(sessionId, prompt);
    return messageResponse.response;
  }
  return "Upload failed.";
};

const Index = () => {
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [consoleVisible, setConsoleVisible] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const chatSessionRef = useRef(null);
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

  useEffect(() => {
    const requestMicrophonePermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setConsoleOutput((prev) => [...prev, "Microphone permission granted."]);
      } catch (error) {
        setConsoleOutput((prev) => [...prev, `Microphone permission denied: ${error.message}`]);
      }
    };

    requestMicrophonePermission();
  }, []);

  const startVideoRecording = async () => {
    try {
      setIsRecordingVideo(true);
      setConsoleOutput((prev) => [...prev, "Started video recording..."]);
    } catch (error) {
      setConsoleOutput((prev) => [...prev, `Error starting video recording: ${error.message}`]);
    }
  };

  const stopVideoRecording = async () => {
    try {
      setIsRecordingVideo(false);
      setConsoleOutput((prev) => [...prev, "Stopped video recording. Uploading..."]);
    } catch (error) {
      setConsoleOutput((prev) => [...prev, `Error stopping video recording: ${error.message}`]);
    }
  };

  const startAudioRecording = async () => {
    try {
      setIsRecordingAudio(true);
      setConsoleOutput((prev) => [...prev, "Started audio recording..."]);
    } catch (error) {
      setConsoleOutput((prev) => [...prev, `Error starting audio recording: ${error.message}`]);
    }
  };

  const stopAudioRecording = async () => {
    try {
      setIsRecordingAudio(false);
      setConsoleOutput((prev) => [...prev, "Stopped audio recording. Uploading..."]);
    } catch (error) {
      setConsoleOutput((prev) => [...prev, `Error stopping audio recording: ${error.message}`]);
    }
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
