import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "/src/styles.css"
import Home from "/src/Home"
import Login from "/src/Login"
import EventManager from "/src/EventManager"
import CreateEvent from './CreateEvent';
import CreateGroupEvent from "/src/CreateGroupEvent"
import Register from "/src/Register"

export default function App() {

  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/eventmanager" element={<EventManager />} />
                <Route path="/createEvent" element={<CreateEvent />} />
                <Route path="/createGroupEvent" element={<CreateGroupEvent />} />
            </Routes>
    </Router>
  )
}