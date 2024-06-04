const axios = require('axios');
const Conversation = require('../models/conversationModel');

exports.createSession = async (req, res) => {
  const { userId, sessionName } = req.body;
  try {
    const newSession = new Conversation({ userId, sessionId: new Date().toISOString(), sessionName, messages: [] });
    await newSession.save();
    res.status(201).send({ sessionId: newSession.sessionId, sessionName: newSession.sessionName });
  } catch (error) {
    res.status(500).send({ message: 'Failed to create a new chat session', error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { sessionId, message } = req.body;
  if (!sessionId || !message) {
    return res.status(400).send({ message: 'Session ID and message are required.' });
  }

  try {
    const conversation = await Conversation.findOne({ sessionId: sessionId });
    if (!conversation) {
      return res.status(404).send({ message: 'Session not found.' });
    }

    const messages = conversation.messages.map(msg => ({
      role: msg.sender,
      content: msg.content
    }));

    messages.push({ role: 'user', content: message });

    const ollamaUrl = 'http://localhost:11434/api/chat';
    const ollamaResponse = await axios.post(ollamaUrl, {
      model: "llama2",
      messages: messages,
      stream: false
    });

    const botMessage = ollamaResponse.data.message.content;

    conversation.messages.push({ sender: 'user', content: message, timestamp: new Date() });
    conversation.messages.push({ sender: 'assistant', content: botMessage, timestamp: new Date() });
    await conversation.save();

    res.status(200).send({ userMessage: message, botResponse: botMessage });
  } catch (error) {
    console.error('Error when sending message:', error);
    res.status(500).send({ message: 'Failed to send message.', error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const conversation = await Conversation.findOne({ sessionId: sessionId });
    if (!conversation) {
      return res.status(404).send({ message: 'Chat session not found' });
    }
    res.send(conversation.messages);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve chat history', error: error.message });
  }
};

exports.flagMessage = async (req, res) => {
  const { sessionId, message, index } = req.body;
  try {
    const conversation = await Conversation.findOne({ sessionId });
    if (conversation) {
      if (!conversation.flaggedMessages) {
        conversation.flaggedMessages = [];
      }
      conversation.flaggedMessages.push({ index, message });
      await conversation.save();
      res.status(200).json({ message: 'Message flagged successfully' });
    } else {
      res.status(404).json({ message: 'Conversation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error flagging message', error });
  }
};

exports.endSession = async (req, res) => {
  const { sessionId } = req.body;
  try {
    const conversation = await Conversation.findOne({ sessionId: sessionId });
    if (!conversation) {
      return res.status(404).send({ message: 'Session not found' });
    }
    await Conversation.deleteOne({ sessionId: sessionId });
    res.status(200).send({ message: 'Session ended successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to end session', error: error.message });
  }
};


exports.getSessions = async (req, res) => {
  const { userId } = req.params;
  try {
    const sessions = await Conversation.find({ userId }).select('sessionId sessionName');
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve sessions', error: error.message });
  }
};
