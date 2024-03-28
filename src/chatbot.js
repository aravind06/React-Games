// src/components/Chatbot.js
import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';

const mockMessages = [
  { id: 1, text: 'Hello, how can I help you today?', sender: 'bot' },
  { id: 2, text: 'I can assist with Verizon services.', sender: 'bot' }
  // Add more mock messages as needed
];

const Chatbot = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { id: messages.length + 1, text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    //setMessages([...messages, { id: messages.length + 2, text: "hola", sender: 'bot' }]);
    // Here you would send the input to your chatbot service and handle the response
    setTimeout(() => {
        const botResponse = { id: newMessages.length + 1, text: 'I am a bot response.', sender: 'bot' };
        setMessages([...newMessages, botResponse]);
      }, 500);
  };

  return (
    <div>
      <Typography variant="h5">Verizon Chatbot</Typography>
      <Paper style={{ padding: '20px', margin: '20px 0', height: '400px', overflowY: 'auto' }}>
        {messages.map(message => (
          <Message key={message.id} text={message.text} sender={message.sender} />
        ))}
      </Paper>
      <div style={{ display: 'flex' }}>
        <TextField
          label="Type your message"
          variant="outlined"
          style={{ flex: 1, marginRight: '10px' }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          <Send />
        </Button>
      </div>
    </div>
  );
};

const Message = ({ text, sender }) => {
  return (
    <div style={{ textAlign: sender === 'bot' ? 'left' : 'right', marginBottom: '10px' }}>
      <Typography variant="body1" style={{ backgroundColor: sender === 'bot' ? '#f0f0f0' : '#d9f1ff', padding: '10px', borderRadius: '5px', display: 'inline-block' }}>
        {text}
      </Typography>
    </div>
  );
};

export default Chatbot;
