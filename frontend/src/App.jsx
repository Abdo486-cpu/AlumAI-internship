import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Flex } from '@chakra-ui/react';

// Pages
import ChatBot from './Pages/chatbot/chat';
import Sidebar from './Pages/chatbot/sidebar';
import Login from './Pages/login/login';
import Home from './Pages/home/home';
// import Home2 from './Pages/testPages/home2'
// import Header2 from './Pages/testPages/headerr';
// import Sidebar2 from './Pages/testPages/sidebarr';
// import ChatWindow2 from './Pages/testPages/chat2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/chatbot" element={<Sidebar> <ChatBot /> </Sidebar>} />
        {/* <Route path="/home2" element={<Home2 />}/>
        <Route path="/chat2" element={ <Flex> <Sidebar2 /> <Flex flex="1" flexDirection="column"> <Header2 /> <ChatWindow2 /></Flex></Flex>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
