import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Preprocessing from "./pages/Preprocessing";
import Results from "./pages/Results";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/preprocess" element={<Preprocessing />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}
