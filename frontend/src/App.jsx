import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import ChatBot from './Pages/chatbot/chat';
import Sidebar from './Pages/chatbot/sidebar';
import Login from './Pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/chatbot" element={<Sidebar> <ChatBot /> </Sidebar>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
