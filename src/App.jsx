import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Index from "./pages/Index.jsx";
import VideoRecording from "./pages/VideoRecording.jsx";
import AudioRecording from "./pages/AudioRecording.jsx";
import Navigation from "./components/Navigation.jsx";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
});

function App() {
  const [colorMode, setColorMode] = useState("light");

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navigation toggleColorMode={toggleColorMode} />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/video" element={<VideoRecording />} />
          <Route path="/audio" element={<AudioRecording />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
