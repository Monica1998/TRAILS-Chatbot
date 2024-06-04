const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  sessionName: { type: String, required: true }, // Added session name
  messages: [{
    sender: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  flaggedMessages: [{
    index: { type: Number, required: true },
    message: { type: Object, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
