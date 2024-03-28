import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Grid, Typography, Paper, Avatar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Person as PersonIcon, Chat as ChatIcon } from '@material-ui/icons';
//import axios from 'axios'; // Import Axios
const Chatbot = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you?", type: "bot" },
    { text: "do you have a question.", type: "bot", summary: true }
  ]);
  const chatContainerRef = useRef(null);

  const handleMessageSend = async (message) => {
    let newMessages = [...messages];
    newMessages.push({ text: message, type: "user" });

    if (message.toLowerCase() === "yes" && newMessages[newMessages.length - 2].summary) {
// Make Axios call to get story details
      try {
        //const response = await axios.get('YOUR_BACKEND_URL_HERE'); // Replace with your backend URL
        //const storyDetails = response.data; // Assuming the response contains the story details
      const storyDetails = {
        story: {
          "Story ID": "STORY-123",
          "Summary": "Example Jira Story",
          "Description": "This is an example Jira story.",
          "Assignee": "John Doe",
          "Status": "To Do",
          "Priority": "High",
          "Labels": "Feature, Bug"
        },
        subtasks: [
          { id: 1, title: "Subtask 1", description: "Description 1", acceptanceCriteria: "Criteria 1", assignee: "Jane Doe", status: "In Progress" },
          { id: 2, title: "Subtask 2", description: "Description 2", acceptanceCriteria: "Criteria 2", assignee: "John Smith", status: "To Do" }
        ]
      }
      newMessages.push({ text: "Fetching story details...", type: "bot" });
      setMessages(newMessages);

      // Navigate to StoryPage with story details
      navigate('/story-page', {state:{ storyDetails}});
      } catch (error) {
        console.error("Error fetching story details:", error);
        newMessages.push({ text: "Error fetching story details.", type: "bot" });
        setMessages(newMessages);
      }
    } else if (message.toLowerCase() === "no" && newMessages[newMessages.length - 2].summary) {
      newMessages.push({ text: "No clicked", type: "user" });
    } else {
      newMessages.push({ text: "I'm sorry, I didn't understand that.", type: "bot" });
    }

    setMessages(newMessages);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Paper elevation={1} style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" align="center" style={{ marginBottom: '20px' }}>
        Chatbot
      </Typography>
      <div ref={chatContainerRef} style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start' }}>
            {message.type === 'bot' ? (
              <Avatar style={{ marginRight: '8px' }}>
                <ChatIcon />
              </Avatar>
            ) : (
              <Avatar style={{ marginRight: '8px', backgroundColor: '#2196f3', color: 'white' }}>
                <PersonIcon />
              </Avatar>
            )}
            <div style={{ maxWidth: '80%', wordWrap: 'break-word' }}>
              <Paper style={{ padding: '10px', borderRadius: '5px' }}>
                {message.text}
              </Paper>
              {message.summary && (
                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                  <Grid item>
                    <Button onClick={() => handleMessageSend('Yes')} variant="contained" color="primary">Yes</Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => handleMessageSend('No')} variant="contained" >No</Button>
                  </Grid>
                </Grid>
              )}
            </div>
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
        style={{ marginBottom: '20px' }}
      />
    </Paper>
  );
};

export default Chatbot;
