// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage";
import SignupPage from "./views/SignupPage";
import DashboardPage from "./views/DashboardPage";
import FeedbackPage from "./views/FeedbackPage"; // Import FeedbackPage
import DemoNavbar from "./components/Navbars/DemoNavbar";

function App() {
  return (
    <div>
      <DemoNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/feedback" element={<FeedbackPage />} /> {/* Add FeedbackPage route */}
      </Routes>
    </div>
  );
}

export default App;