import React, { useState } from 'react';
import { Typography, TextField, List, ListItem, ListItemText, Collapse, Button, Snackbar, IconButton, TextareaAutosize } from '@material-ui/core';
import { ExpandLess, ExpandMore, CheckCircleOutline } from '@material-ui/icons';

const StoryPage = () => {
  const [editableField, setEditableField] = useState(null);
  const [openSubtasks, setOpenSubtasks] = useState(false);
  const [storyFields, setStoryFields] = useState({
    "Story ID": "STORY-123",
    "Summary": "Example Jira Story",
    "Description": "keep the storyfields in state and update them on each edit. Also have the field capable of having larger content like with bullet points, here the fields are truncated. make the values of field more clear and give them larged text area based on the content",
    "Assignee": "John Doe",
    "Status": "To Do",
    "Priority": "High",
    "Labels": "Feature, Bug"
    // Add more fields as needed
  });
  const [notificationOpen, setNotificationOpen] = useState(false);

  const subtasks = [
    { id: 1, title: "Subtask 1", description: "Description 1", acceptanceCriteria: "Criteria 1", assignee: "Jane Doe", status: "In Progress" },
    { id: 2, title: "Subtask 2", description: "Description 2", acceptanceCriteria: "Criteria 2", assignee: "John Smith", status: "To Do" }
    // Add more subtasks as needed
  ];

  const handleFieldClick = (field) => {
    setEditableField(field);
  };

  const handleSubtasksClick = () => {
    setOpenSubtasks(!openSubtasks);
  };

  const handleFieldChange = (event, field) => {
    setStoryFields({ ...storyFields, [field]: event.target.value });
    //setEditableField(null);
  };

  const handleCreateJira = () => {
    // Logic to create Jira story (for demonstration, just show notification)
    setNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <div>
      <Typography variant="h4">Jira Story Details</Typography>
      <List>
        {Object.entries(storyFields).map(([field, value]) => (
          <ListItem key={field} button onClick={() => handleFieldClick(field)}>
            <ListItemText primary={field} secondary={editableField === field ? <TextareaAutosize name={field} value={value} onBlur={() => setEditableField(null)} onChange={(e) => handleFieldChange(e, field)} style={{ width: '100%', minHeight: '100px' }}  /> : value} />
          </ListItem>
        ))}
        <ListItem button onClick={handleSubtasksClick}>
          <ListItemText primary="Subtasks" />
          {openSubtasks ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSubtasks} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subtasks.map(subtask => (
              <ListItem key={subtask.id}>
                <ListItemText
                  primary={
                    <div>
                      {editableField === `Subtask ${subtask.id}` ? (
                        <TextField name={`Subtask ${subtask.id}`} label="Title" value={subtask.title} onChange={(e) => handleFieldChange(e, `Subtask ${subtask.id}`)} fullWidth multiline />
                      ) : (
                        <Typography variant="h6">{subtask.title}</Typography>
                      )}
                      <Typography variant="body1">Description: {editableField === `Subtask ${subtask.id}` ? (
                        <TextareaAutosize name={`Subtask ${subtask.id}`} label="Description" value={subtask.description} onChange={(e) => handleFieldChange(e, `Subtask ${subtask.id}`)} style={{ width: '100%', minHeight: '100px' }} />
                      ) : (
                        subtask.description
                      )}</Typography>
                      <Typography variant="body1">Acceptance Criteria: {editableField === `Subtask ${subtask.id}` ? (
                        <TextareaAutosize name={`Subtask ${subtask.id}`} label="Acceptance Criteria" value={subtask.acceptanceCriteria} onChange={(e) => handleFieldChange(e, `Subtask ${subtask.id}`)} style={{ width: '100%', minHeight: '100px' }} />
                      ) : (
                        subtask.acceptanceCriteria
                      )}</Typography>
                      <Typography variant="body1">Assignee: {subtask.assignee}</Typography>
                      <Typography variant="body1">Status: {subtask.status}</Typography>
                    </div>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
      <Button variant="contained" color="primary" onClick={handleCreateJira}>Create Jira</Button>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notificationOpen}
        onClose={handleCloseNotification}
        message="Jira Story Created!"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseNotification}>
            <CheckCircleOutline />
          </IconButton>
        }
      />
    </div>
  );
};

export default StoryPage;
