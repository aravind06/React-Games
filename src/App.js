import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from './chatbot'; 
import StoryPage from './StoryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Chatbot/>} />
        <Route path="/story-page" element={<StoryPage/>} />
      </Routes>
    </Router>
  );
};

export default App;