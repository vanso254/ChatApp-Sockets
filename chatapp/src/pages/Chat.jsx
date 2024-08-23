import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './Chat.css'; // Import the CSS file for styling

const socket = io('http://localhost:3000'); //connect to the socket server

// Define the Chat component as a default export
export default function Chat() {
    useEffect(() => {
        // Listen for the 'connect' event and log when the connection is established
        socket.on('connect', () => {
          console.log('A user connected');
        });
    
        // Listen for the 'disconnect' event and log when the user disconnects
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
        // Clean up the socket connection when the component unmounts
    return () => {
        socket.off('connect');
        socket.off('disconnect');
      };
    }, []);

    //Handling the incoming messages from the server
    useEffect(() => {
        // Listen for incoming chat messages from the server
        socket.on('chat message', (msg) => {
          setMessages((prevMessages) => [...prevMessages, msg]); // Update state with new message
        });
    
        // Clean up the listener when the component unmounts
        return () => {
          socket.off('chat message');
        };
      }, []);

    

  // State to hold the current input value
  const [input, setInput] = useState('');
  // State to hold the list of messages
  const [messages, setMessages] = useState([]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (input.trim()) { // Check if the input is not empty after trimming whitespace
        socket.emit('chat message', input); // Emit the 'chat message' event with the input value
      setInput(''); // Clear the input field after sending the message
    }
  };

  return (
    <div>
      {/* List of messages */}
      <ul id="messages">
        {messages.map((message, index) => (
          <li key={index}>{message}</li> // Render each message as a list item
        ))}
      </ul>
      
      {/* Form for entering new messages */}
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          autoComplete="off" // Disable browser autocomplete for the input field
          value={input} // Bind the input value to the state
          onChange={(e) => setInput(e.target.value)} // Update state on input change
          />
           <button type="submit">Send</button>  {/*Button to submit the form */}
      </form>
    </div>
  );
}
