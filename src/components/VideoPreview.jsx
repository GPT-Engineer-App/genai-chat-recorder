import React from "react";
import { Box } from "@chakra-ui/react";

const VideoPreview = ({ videoRef }) => {
  return (
    <Box ref={videoRef} width="100%" height="400px" border="1px solid" borderColor="gray.200" borderRadius="md" p={2}>
      {}
    </Box>
  );
};

export default VideoPreview;
