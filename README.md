Ollama Chatbot Project

Project Structure

ollama-chatbot/
├── client/ (React frontend)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.js
│   │   │   └── MessageForm.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/ (Node.js backend)
│   ├── controllers/
│   │   └── conversationController.js
│   ├── models/
│   │   └── conversationModel.js
│   ├── routes/
│   │   ├── chatRoute.js
│   │   └── conversationRoute.js
│   ├── .env
│   ├── app.js
│   └── package.json
└── README.md

Technologies and Frameworks

Frontend: React (JavaScript)
Backend: Node.js with Express
Database: MongoDB
AI Model Framework: Ollama (llama2 model)

Setup Instructions

Backend Setup

Navigate to the server directory.

Install dependencies:

npm install

Run the server:

npm start app.js

Testing the setup:

Frontend Setup

Navigate to the client directory.

Install dependencies:

npm install

Start the React development server:

npm start

The application should open in your default web browser at http://localhost:3000.

Testing the Application

Ensure both the backend and frontend services are running.
Use the chat interface at http://localhost:3000 to send messages. The backend will handle sessions and communicate with the Ollama AI model to generate responses, which will then be displayed in the chat interface.

Understanding the Data Flow

The application's data flow involves the frontend sending user messages to the backend, which then interacts with the Ollama model to generate responses. These interactions are logged in a MongoDB database for session persistence and history retrieval.

Data Flow Diagram

graph TD;
    User-->|Sends message|Frontend;
    Frontend-->|Request with message|Backend;
    Backend-->|Fetches session|Database;
    Database-->Backend;
    Backend-->|Sends message|Ollama[llama2 Model];
    Ollama-->|Generates response|Backend;
    Backend-->|Saves response|Database;
    Backend-->|Returns response|Frontend;
    Frontend-->|Displays response|User;

Current To Do:

1. Dockerise this setup
2. Style the frontend to look like a chatbot
>>>>>>> 10211cca (Initial commit)
