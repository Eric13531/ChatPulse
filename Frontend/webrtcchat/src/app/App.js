import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateRoom from "./routes/CreateRoom.js";
import Dashboard from "./routes/Dashboard.js";
import FrontPage from "./routes/FrontPage.js";

// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />}/>
        <Route path="/create" element={<CreateRoom />}/>
        <Route path="/room" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
