import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from './chatbot'; 
import StoryPage from './StoryPage';
import BubbleRefinedView from './bubbleRefinedView'
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={<BubbleRefinedView/>} />
        <Route path="/chatbot"  element={<Chatbot/>} />
        <Route path="/story-page" element={<StoryPage/>} />
      </Routes>
    </Router>
  );
};

export default App;