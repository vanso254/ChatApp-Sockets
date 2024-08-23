const express = require('express');
const { createServer } = require('node:http');
const {Server}= require ('socket.io');
const cors = require('cors'); // Import the cors middleware

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Allow this origin (React app)
      methods: ["GET", "POST"], // Allow these HTTP methods
    }
  });

//Enable cors for all origins
app.use(cors({
    origin: "http://localhost:5173", // Allow this origin (React app)
    methods: ["GET", "POST"], // Allow these HTTP methods
  }));

io.on('connection', (socket) => {
    console.log('connection has been established')
   //handling connection
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // Optionally broadcast the message to all connected clients
        io.emit('chat message', msg);
    });
    //handling disconection
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});