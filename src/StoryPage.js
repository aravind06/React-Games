import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Typography, TextField, List, ListItem, ListItemText, Collapse, Button, Snackbar, IconButton, TextareaAutosize } from '@material-ui/core';
import { ExpandLess, ExpandMore, CheckCircleOutline } from '@material-ui/icons';

const StoryPage = () => {

  const location = useLocation(); // Get location from useLocation hook
  console.log(location)
  const { storyDetails } = location.state; // Get storyDetails from location state
  const [editableField, setEditableField] = useState(null);
  const [openSubtasks, setOpenSubtasks] = useState(false);
  const [storyFields, setStoryFields] = useState(storyDetails.story);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const subtasks = storyDetails.subtasks;

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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" style={{ textAlign: 'center' }}>Jira Story Details</Typography>
      <List>
        {Object.entries(storyFields).map(([field, value]) => (
          <ListItem key={field} button onClick={() => handleFieldClick(field)}>
            <ListItemText primary={field} secondary={editableField === field ? <TextareaAutosize name={field} value={value} onBlur={() => setEditableField(null)} onChange={(e) => handleFieldChange(e, field)} style={{ width: '100%', minHeight: '100px' }} /> : value} />
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

      <Button style={{ alignItems: 'center', alignContent: 'center' }} variant="contained" color="primary" onClick={handleCreateJira}>Create Jira</Button>

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
