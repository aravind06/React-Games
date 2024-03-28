import React, { useState, useEffect, useRef } from 'react';
import {TextField, Button, Grid } from '@material-ui/core';
import { useNavigate  } from 'react-router-dom'; 
//import axios from 'axios'; // Import Axios

const Chatbot = () => {

    const navigate = useNavigate(); 

  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you?", type: "bot" },
    { text: "do you have a question.", type: "bot" , summary: true}
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
                // Add more fields as needed
              },
              subtasks: [
                { id: 1, title: "Subtask 1", description: "Description 1", acceptanceCriteria: "Criteria 1", assignee: "Jane Doe", status: "In Progress" },
                { id: 2, title: "Subtask 2", description: "Description 2", acceptanceCriteria: "Criteria 2", assignee: "John Smith", status: "To Do" }
                // Add more subtasks as needed
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
    <div>
      <div ref={chatContainerRef} style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
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
