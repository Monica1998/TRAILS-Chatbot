import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBox from './components/ChatBox';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import './App.css';

function App() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [userId, setUserId] = useState('');
  const [chatEnded, setChatEnded] = useState(false);

  useEffect(() => {
    if (!userId) {
      const newUserId = prompt('Enter your user ID:');
      if (newUserId) {
        setUserId(newUserId);
      }
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const fetchSessions = async () => {
        try {
          const response = await axios.get(`http://localhost:5500/api/conversations/sessions/${userId}`);
          setSessions(response.data);
        } catch (error) {
          console.error('Failed to fetch sessions:', error);
        }
      };

      fetchSessions();
    }
  }, [userId]);

  const startNewSession = async () => {
    const sessionName = prompt('Enter session name:');
    if (!sessionName) return;

    try {
      const response = await axios.post('http://localhost:5500/api/messages/session', { userId, sessionName });
      setSessions([...sessions, { sessionId: response.data.sessionId, sessionName: response.data.sessionName }]);
      setActiveSession(response.data.sessionId);
      setChatEnded(false); // Ensure chat interface is active
    } catch (error) {
      console.error('Failed to start a new session:', error);
    }
  };

  const endChatExperience = () => {
    setActiveSession(null);
    setChatEnded(true); // Show thank you message
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
        <Box sx={{ width: '25%', mr: 2 }}>
          <Typography variant="h5">Chat Sessions</Typography>
          <Button variant="contained" color="primary" onClick={startNewSession} sx={{ mt: 2 }}>
            New Session
          </Button>
          <List>
            {sessions.map((session) => (
              <ListItem button key={session.sessionId} onClick={() => setActiveSession(session.sessionId)}>
                <ListItemText primary={session.sessionName} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="secondary" onClick={endChatExperience} sx={{ mt: 2 }}>
            End Chat Experience
          </Button>
        </Box>
        <Box sx={{ width: '75%' }}>
          <header className="chat-header">
            <Typography variant="h4">TRAILS ChatBot</Typography>
          </header>
          {chatEnded ? (
            <Typography variant="h5" color="primary" sx={{ mt: 4, textAlign: 'center' }}>
              Thank you for using the chat!
            </Typography>
          ) : (
            activeSession && <ChatBox sessionId={activeSession} />
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;