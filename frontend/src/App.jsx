import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import { Chatbot} from './AlumAichatbot/AlumAichatbot'
import { UsernameSignIn } from './AlumAiLogin/UsernameSignIn';
import { HomePage } from './AlumAIHomepage/Frame/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<UsernameSignIn />}/>
        <Route path='/chatbot' element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
