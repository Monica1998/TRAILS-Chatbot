# Ollama Chatbot Project

This is a chatbot project using the Ollama framework, Llama2 model, MongoDB for session persistence, and Material-UI for the frontend interface.

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running locally or set up your MongoDB Atlas)
- [Ollama](https://github.com/ollama/ollama) (Set up and running)

## Project Structure

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

### Diagram

    graph TD;
        User-->|Sends message|Frontend;
        Frontend-->|Request with message|Backend;
        Backend-->|Fetches session|Database;

        Backend-->|Sends message|Ollama;
        Ollama-->|Sends prompt|llama2;
        llama2-->|Generates response|Ollama
        Ollama-->|Sends response|Backend;
        Backend-->|Saves response|Database;
        Backend-->|Returns response|Frontend;
        Frontend-->|Displays response|User;
        Database-->|Retrieves history|Backend

## Technologies and Frameworks

1. Frontend: React (JavaScript)
2. Backend: Node.js with Express
3. Database: MongoDB
4. AI Model Framework: Ollama (llama2 model)

## Setup Instructions

### Backend Setup

#### Navigate to the server directory.

1. Install dependencies:

        npm install

2. Run the server:

        node app.js

3. Testing the setup:

### Frontend Setup

#### Navigate to the client directory.

1. Install dependencies:

        npm install

2. Start the React development server:

        npm start

The application should open in your default web browser at http://localhost:3000.

## Testing the Application

Ensure ollama in running

    ollama serve

Ensure both the backend and frontend services are running.
Use the chat interface at http://localhost:3000 to send messages. The backend will handle sessions and communicate with the Ollama AI model to generate responses, which will then be displayed in the chat interface.

## Understanding the Data Flow

The application's data flow involves the frontend sending user messages to the backend, which then interacts with the Ollama model to generate responses. These interactions are logged in a MongoDB database for session persistence and history retrieval.

### Data Flow Diagram

    sequenceDiagram
        participant User as User
        participant Frontend as React Frontend
        participant Backend as Express Backend
        participant Database as MongoDB
        participant Ollama as Ollama Framework
        participant Llama2 as llama2 Model
        
        User->>+Frontend: Enter message
        Frontend->>+Backend: POST /api/messages/message
        Backend->>+Database: Save User Message
        Database-->>-Backend: Acknowledge
        Backend->>+Ollama: Request AI Response
        Ollama->>+Llama2: Generate Response using llama2
        Llama2-->>-Ollama: AI Response
        Ollama-->>-Backend: AI Response
        Backend->>+Database: Save AI Response
        Database-->>-Backend: Acknowledge
        Backend-->>-Frontend: Return AI Response
        Frontend-->>-User: Display Conversation

## Current To Do:

1. Dockerise this setup
2. Style the frontend to look like a chatbot
