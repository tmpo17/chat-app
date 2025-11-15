<<<<<<< HEAD
// server.js – clean & fixed
=======
// server.js - Main server file for Socket.io chat application

>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

<<<<<<< HEAD
dotenv.config();

=======
// Load environment variables
dotenv.config();

// Initialize Express app
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
<<<<<<< HEAD
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
=======
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

<<<<<<< HEAD
=======
// Middleware
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
=======
// Store connected users and messages
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
const users = {};
const messages = [];
const typingUsers = {};

<<<<<<< HEAD
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // JOIN
=======
// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
  socket.on('user_join', (username) => {
    users[socket.id] = { username, id: socket.id };
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    console.log(`${username} joined the chat`);
  });

<<<<<<< HEAD
  // SEND MESSAGE
=======
  // Handle chat messages
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
  socket.on('send_message', (messageData) => {
    const message = {
      ...messageData,
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
    };
<<<<<<< HEAD

    messages.push(message);
    if (messages.length > 100) messages.shift();

    io.emit('receive_message', message);
  });

  // ✅ MOVE reaction listener OUTSIDE send_message
  socket.on('react_message', ({ messageId, emoji }) => {
    const msg = messages.find((m) => m.id === messageId);
    if (msg) {
      if (!msg.reactions) msg.reactions = {};
      msg.reactions[emoji] = (msg.reactions[emoji] || 0) + 1;
      io.emit('message_reacted', { messageId, reactions: msg.reactions });
    }
  });

  // TYPING
  socket.on('typing', (isTyping) => {
    const user = users[socket.id];
    if (!user) return;
    if (isTyping) typingUsers[socket.id] = user.username;
    else delete typingUsers[socket.id];
    io.emit('typing_users', Object.values(typingUsers));
  });

  // PRIVATE MESSAGE
  socket.on('private_message', ({ to, message }) => {
    const msgData = {
=======
    
    messages.push(message);
    
    // Limit stored messages to prevent memory issues
    if (messages.length > 100) {
      messages.shift();
    }
    
    io.emit('receive_message', message);
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    if (users[socket.id]) {
      const username = users[socket.id].username;
      
      if (isTyping) {
        typingUsers[socket.id] = username;
      } else {
        delete typingUsers[socket.id];
      }
      
      io.emit('typing_users', Object.values(typingUsers));
    }
  });

  // Handle private messages
  socket.on('private_message', ({ to, message }) => {
    const messageData = {
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
    };
<<<<<<< HEAD
    socket.to(to).emit('private_message', msgData);
    socket.emit('private_message', msgData);
  });

  // READ RECEIPT
  socket.on('message_received', ({ messageId, senderId }) => {
    io.to(senderId).emit('message_received', { messageId, senderId });
  });

  // DISCONNECT
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      io.emit('user_left', { username: user.username, id: socket.id });
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(users));
      io.emit('typing_users', Object.values(typingUsers));
      console.log(`${user.username} left the chat`);
    }
  });
});

// --------  REST API endpoints --------
app.get('/api/messages', (req, res) => res.json(messages));
app.get('/api/users', (req, res) => res.json(Object.values(users)));
app.get('/', (req, res) => res.send('Socket.io Chat Server is running'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

module.exports = { app, server, io };
=======
    
    socket.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const { username } = users[socket.id];
      io.emit('user_left', { username, id: socket.id });
      console.log(`${username} left the chat`);
    }
    
    delete users[socket.id];
    delete typingUsers[socket.id];
    
    io.emit('user_list', Object.values(users));
    io.emit('typing_users', Object.values(typingUsers));
  });
});

// API routes
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/users', (req, res) => {
  res.json(Object.values(users));
});

// Root route
app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io }; 
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
