import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import ChatBot from './Pages/chatbot/chat';
import Sidebar from './Pages/chatbot/sidebar';
import Login from './Pages/login/login';
// import Home from './Pages/home/home';
import { AlumAi } from './AlumAi/AlumAi';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AlumAi />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/chatbot" element={<Sidebar> <ChatBot /> </Sidebar>} />
        {/* <Route path="/home2" element={<Home2 />}/>
        <Route path="/chat2" element={ <Flex> <Sidebar2 /> <Flex flex="1" flexDirection="column"> <Header2 /> <ChatWindow2 /></Flex></Flex>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
