import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button } from '@mui/material';
import './MessageForm.css';

const MessageForm = ({ onSendMessage, sessionId }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage({ sender: 'user', content: message }); // Display user message immediately

    const apiUrl = 'http://localhost:5500/api/messages/message';

    try {
      const response = await axios.post(apiUrl, { sessionId, message });
      onSendMessage({ sender: 'assistant', content: response.data.botResponse }); // Display bot message after response
      setMessage(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
        Send
      </Button>
    </Box>
  );
};

export default MessageForm;