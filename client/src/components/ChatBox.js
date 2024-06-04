import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageForm from './MessageForm';
import Flag from './Flag';
import './ChatBox.css';

const ChatBox = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/messages/history/${sessionId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [sessionId]);

  const addMessage = (msg) => {
    setMessages(prevMessages => [...prevMessages, msg]);
  };

  const handleFlag = async (index) => {
    const flaggedMessage = messages[index];
    try {
      await axios.post('http://localhost:5500/api/messages/flag', {
        sessionId,
        message: flaggedMessage,
        index
      });
      console.log('Message flagged successfully');
    } catch (error) {
      console.error('Error flagging message:', error);
    }
  };

  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className="message-container">
          <div className={`message ${msg.sender}`}>
            {msg.sender === 'user' ? 'You' : 'Bot'}: {msg.content}
          </div>
          <div className="flag-button-container">
            <Flag onFlag={() => handleFlag(index)} />
          </div>
        </div>
      ))}
      <MessageForm onSendMessage={addMessage} sessionId={sessionId} />
    </div>
  );
};

export default ChatBox;
