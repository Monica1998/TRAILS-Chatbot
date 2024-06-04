const express = require('express');
const router = express.Router();
const axios = require('axios');
const Conversation = require('../models/conversationModel');
const chatController = require('../controllers/conversationController');

// Route to initiate a new chat session
router.post('/session', chatController.createSession);

// Route to send a message
router.post('/message', chatController.sendMessage);

// Route to get chat history for a session
router.get('/history/:sessionId', chatController.getHistory);

router.post('/flag', chatController.flagMessage);

router.post('/end-session', chatController.endSession);

router.get('/sessions/:userId', chatController.getSessions);


module.exports = router;