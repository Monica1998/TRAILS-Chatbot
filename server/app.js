const express = require('express');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoute');
const conversationRoutes = require('./routes/conversationRoute');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;
const MONGO_URI = process.env.MONGO_URI;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/messages', chatRoutes);
app.use('/api/conversations', conversationRoutes);

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



