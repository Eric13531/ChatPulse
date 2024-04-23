import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateRoom from "./routes/CreateRoom.js";
import Dashboard from "./routes/Dashboard.js";
import FrontPage from "./routes/FrontPage.js";

// import logo from './logo.svg';
import './App.css';

import SocketContext from "./components/socketContext";

import { io } from 'socket.io-client';

const socket = io("https://chatpulse-flask-wi0j.onrender.com/");

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />}/>
          <Route path="/create" element={<CreateRoom />}/>
          <Route path="/room" element={<Dashboard />}/>
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
