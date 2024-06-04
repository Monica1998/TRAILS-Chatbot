const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

router.post('/session', conversationController.createSession);
router.post('/message', conversationController.sendMessage);
router.get('/history/:sessionId', conversationController.getHistory);
router.post('/flag', conversationController.flagMessage);
router.get('/sessions/:userId', conversationController.getSessions);

module.exports = router;
