import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you?", type: "bot" },
    { text: "do you have a question.", type: "bot" , summary: true}
  ]);

  const handleMessageSend = (message) => {
    // Simulate backend call
    let newMessages = [...messages];
    newMessages.push({ text: message, type: "user" });

    if (message.toLowerCase() === "yes" && newMessages[newMessages.length - 2].summary) {
      // Handle yes button click
      //newMessages.push({ text: "Yes clicked", type: "user" });
    } else if (message.toLowerCase() === "no" && newMessages[newMessages.length - 2].summary) {
      // Handle no button click
      //newMessages.push({ text: "No clicked", type: "user" });
    } else {
      // Normal bot response
      newMessages.push({ text: "I'm sorry, I didn't understand that.", type: "bot" });
    }

    setMessages(newMessages);
  };

  return (
    <div>
      <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            {message.type === 'bot' ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {message.text}
                </Grid>
                {message.summary && (
                  <Grid item xs={12}>
                    <Button onClick={() => handleMessageSend('Yes')}>Yes</Button>
                    <Button onClick={() => handleMessageSend('No')}>No</Button>
                  </Grid>
                )}
              </Grid>
            ) : (
              <div style={{ textAlign: 'right' }}>{message.text}</div>
            )}
          </div>
        ))}
      </div>
      <TextField
        label="Type your message here"
        variant="outlined"
        fullWidth
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleMessageSend(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
};

export default Chatbot;
