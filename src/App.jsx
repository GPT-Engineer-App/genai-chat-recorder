import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import VideoRecording from "./pages/VideoRecording.jsx";
import AudioRecording from "./pages/AudioRecording.jsx";
import Navigation from "./components/Navigation.jsx";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/video" element={<VideoRecording />} />
        <Route path="/audio" element={<AudioRecording />} />
      </Routes>
    </Router>
  );
}

export default App;
